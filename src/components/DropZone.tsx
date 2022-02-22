import React, {useCallback, useMemo} from 'react'
import {useDropzone} from 'react-dropzone'
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {projectReducer, projectValues} from "../redux/projects/projectSlice";
import {notify} from "../helpers/notify";

export function DropZone() {

    const dispatch = useAppDispatch();
    const projectStore = useAppSelector(projectReducer);
    const {projectForm} = projectStore;

    const focusedStyle = {
        borderColor: '#2196f3'
    };

    const acceptStyle = {
        borderColor: '#00e676'
    };

    const rejectStyle = {
        borderColor: '#ff1744'
    };

    const baseStyle = {
        height: '7rem',
        marginBottom: '1.5rem',
        borderRadius: '0.5rem',
        background: 'rgba(50, 50, 50, 0.5)',
        padding: '2rem',
        borderWidth: '1px',
        borderStyle: 'dashed',
        borderColor: '#393939'
    }

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.map((file: Blob) => {
            if (file.size > 3000000) {
                return notify('You cannot upload a file larger than 3MB')
            }
            const reader: FileReader = new FileReader()
            reader.onabort = () => notify('Image aborted');
            reader.onerror = () => notify('File reading failed');
            reader.onload = () => {
                dispatch(projectValues({...projectForm, imageFile: file, imageSrc: reader.result}));
            }
            reader.readAsDataURL(file);
            return file;
        })

    }, [dispatch, projectForm])
    const {getRootProps, getInputProps, isDragAccept, isDragReject, isFocused} = useDropzone({onDrop, accept: 'image/jpeg, image/png'})

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle: {}),
        ...(isDragReject ? rejectStyle: {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject,
    ]);

    return (
        <div {...getRootProps({style})}
        >
            <input {...getInputProps()} />
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                {projectForm.imageSrc === '' ? '' : <img style={{width: '3rem', height: '3rem', marginRight: '1rem'}} src={projectForm.imageSrc} alt=""/>}
                <p>{!projectForm.imageFile.name ? 'Project Image: Drag and drop, or click to select file' : projectForm.imageFile.name}</p>
            </div>
        </div>
    )
}
