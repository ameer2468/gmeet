import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {projectReducer, projectValues} from "../redux/projects/projectSlice";
import {notify} from "../helpers/notify";

export function DropZone() {

    const dispatch = useAppDispatch();
    const projectStore = useAppSelector(projectReducer);
    const {projectForm} = projectStore;

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.map((file: Blob) => {
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
    const {getRootProps, getInputProps} = useDropzone({onDrop, accept: 'image/jpeg, image/png'})

    return (
        <div style={{height: '7rem',
            marginBottom: '1.5rem',
            borderRadius: '0.5rem',
            background: 'rgba(50, 50, 50, 0.5)',
            padding: '2rem',
            border: '1px dashed #393939'}} {...getRootProps()}
        >
            <input {...getInputProps()} />
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                {projectForm.imageSrc === '' ? '' : <img style={{width: '3rem', height: '3rem', marginRight: '1rem'}} src={projectForm.imageSrc} alt=""/>}
                <p>{!projectForm.imageFile.name ? 'Drag and drop an image here, or click to select file' : projectForm.imageFile.name}</p>
            </div>
        </div>
    )
}
