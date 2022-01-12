import React, {useRef} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGlobe, faEdit, faPencilAlt,faCheck, faUser} from "@fortawesome/free-solid-svg-icons";
import Card from "./card";
import LoadingSpinner from "../../../components/global/LoadingSpinner";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {userImageUpload, userReducer} from "../../../redux/user/userSlice";
import {useUser} from "../../../hooks/useUser";
import placeholder from '../../../assets/images/placeholder.png';
import {uploadUserAssetThunk} from "../../../redux/user/thunk";
import {notify} from "../../../helpers/notify";

interface props {
    data: any;
}

const User = ({data}: props) => {

    const {Loading} = useAppSelector(userReducer);
    const userHook = useUser();
    const {userImageLoading} = userHook.user;
    const {authUser} = userHook;
    const {imageUpload} = userHook.user;
    const uploadRef = useRef<any>(null);
    const dispatch = useAppDispatch();

    const handleUploadClick = () => {
        uploadRef.current?.click();
    }
    const handleFileInput = (e: any) => {
       const file = e.target.files[0]
        if (file.size > 210000) {
            return notify('You cannot upload a file larger than 200kb')
        }
       dispatch(userImageUpload(file));
    }


    return (
                <Card height={'50rem'} flex={'0 0 40%'} customClass={'user'}>
                    <div className="info">
                        {Loading ? <div style={{
                            position: 'absolute',
                            left: 0,
                            top: '40%',
                            right: 0,
                            bottom: 0,
                            margin: 'auto',
                            textAlign: 'center',
                        }}>
                            <LoadingSpinner height={60} width={60}/>
                        </div> :
                            <div className="wrap">
                                {userImageLoading ? <div style={{marginBottom: '2rem'}}><LoadingSpinner height={60} width={60}/></div> :
                                    <div className="userImage">
                                        {authUser.username === data.username ?
                                            <div className="actions">
                                                <button onClick={handleUploadClick} className="uploadImage">
                                                    <FontAwesomeIcon icon={faPencilAlt}/>
                                                </button>
                                                {imageUpload === undefined || imageUpload === '' ?
                                                    '' :
                                                    <button className='confirm' onClick={() => dispatch(uploadUserAssetThunk())}>
                                                        <FontAwesomeIcon icon={faCheck}/>
                                                    </button>
                                                }
                                            </div>
                                            :
                                            ''
                                        }
                                        <img onError={e => {e.currentTarget.src = placeholder}} src={data.userImage} alt="profile"/>
                                    </div>
                                }
                                <div className="titles">
                                    <h1>{data.username}</h1>
                                    <h2>
                                        {data.profession === undefined ? '' : data.profession}
                                    </h2>
                                </div>
                                {data.website === '' ? '' : <a rel='noreferrer' target={'_blank'} href="http://www.aashhab.design">
                                    <div className="website">
                                        <FontAwesomeIcon className='icon' icon={faGlobe}/>
                                        www.aashhab.design
                                    </div>
                                </a>}
                                {authUser.username === data.username ?
                                    <button style={{marginTop: '3rem'}} className='btn btn--green'>
                                        <FontAwesomeIcon style={{marginRight: '0.5rem'}} icon={faEdit}/>
                                        Edit Profile
                                    </button>
                                    :
                                    <button onClick={() => userHook.followHandler(data.username, data.id)} style={{marginTop: '3rem'}} className='btn btn--green'>
                                        <FontAwesomeIcon style={{marginRight: '0.5rem'}} icon={faUser}/>
                                        {authUser.following.map((item: { follower_id: string }) => item.follower_id).includes(data.id) ? 'Unfollow' : 'Follow'}
                                    </button>
                                }
                                <input style={{display: 'none'}} ref={uploadRef} type="file" onChange={handleFileInput}/>
                            </div>
                        }
                    </div>
                </Card>
    );
};

export default User;
