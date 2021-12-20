import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGlobe, faEdit} from "@fortawesome/free-solid-svg-icons";
import Card from "./card";
import LoadingSpinner from "../../../components/global/LoadingSpinner";
import {useAppSelector} from "../../../redux/hooks";
import {userReducer} from "../../../redux/user/userSlice";
import {useUser} from "../../../hooks/useUser";

interface props {
    data: any;
}

const User = ({data}: props) => {

    const {Loading} = useAppSelector(userReducer);
    const userHook = useUser();
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = async (e: any) => {
            setSelectedFile(e.target.files[0])
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
                                <img src={userHook.userImage ? userHook.userImage : ''} alt="profile"/>
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
                                <button style={{marginTop: '3rem'}} className='btn btn--green'>
                                    <FontAwesomeIcon style={{marginRight: '0.5rem'}} icon={faEdit}/>
                                    Edit Profile
                                </button>
                                <input type="file" onChange={handleFileInput}/>
                                <button onClick={() => userHook.uploadFile(selectedFile)}>upload</button>
                            </div>
                        }
                    </div>
                </Card>
    );
};

export default User;