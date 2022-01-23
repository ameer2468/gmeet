import React from 'react';
import Input from "../../components/global/input";
import {useUser} from "../../hooks/useUser";
import {useAppSelector} from "../../redux/hooks";
import {userReducer} from "../../redux/user/userSlice";
import BeatLoader from "react-spinners/BeatLoader";

const EditProfile = () => {

    const userHook = useUser();
    const userStore = useAppSelector(userReducer)
    const {changePasswordLoading, userForm} = userStore;

    return (
        <div className="editProfileContent">
            <div className="editProfileContainer">
                <h1>Edit Profile</h1>
                <div className="changePassword">
                    <h2>Change Password</h2>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        userHook.changePassword()
                    }}>
                       <Input
                           maxWidth={'100%'}
                           placeholder={'Current Password'}
                           useHook={userHook}
                           value={userForm.oldPassword}
                           type={'password'}
                           name={'oldPassword'}/>
                        <Input
                            maxWidth={'100%'}
                            placeholder={'New Password'}
                            useHook={userHook}
                            value={userForm.newPassword}
                            type={'password'}
                            name={'newPassword'}/>
                        <button disabled=
                                    {userForm.oldPassword.length === 0 ||
                                    userForm.newPassword.length === 0}
                                className={`${
                                    userForm.oldPassword.length === 0 || 
                                    userForm.newPassword.length === 0 ? 'disabledButton btn' : 'btn btn--green'}`}>
                            {changePasswordLoading ? <BeatLoader size={8} margin={1} color={'#2a2c3d'} /> : 'Confirm'}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
