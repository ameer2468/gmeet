import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {changePasswordLoading, userFormHandler, userReducer} from "../redux/user/userSlice";
import {
    followUserThunk,
    sendGlobalMessageThunk,
    sendNotificationThunk,
    unFollowUserThunk,
    uploadUserAssetThunk
} from "../redux/user/thunk";
import {v4 as uuidv4} from "uuid";
import {following} from "../redux/types";
import {Auth} from "aws-amplify";
import {notify} from "../helpers/notify";
import moment from "moment";


export function useUser() {
    const user = useAppSelector(userReducer)
    const {userInfo, authUser, userForm} = user;
    const dispatch = useAppDispatch();


    function onChange(key: string, value: string) {
        return dispatch(userFormHandler({...userForm, [key]: value}))
    }

    function sendNotification(user_id: string, text: string) {
        dispatch(sendNotificationThunk(user_id, text))
    }

    async function sendGlobalMessage() {
        const data = {
            username: authUser.username,
            message: userForm.globalMessage,
            time: moment().format('MMM Do YYYY, h:mm a')
        }
        await dispatch(sendGlobalMessageThunk(data))
    }

    function followHandler(user: string, id: string) {
        const checkIfFollowing = authUser.following.map((item: following) => item.follower_id).includes(id);
        const filterFollowers = authUser.following.filter((value: following) => {
            return value.follower_id === id;
        })
        const userId = filterFollowers.length === 0 ? '' : filterFollowers[0].id;
        const data = {
            id: uuidv4(),
            user_id: authUser.attributes.sub,
            follower_id: userInfo.id,
        }
        if (!checkIfFollowing) {
            dispatch(followUserThunk(data));
            sendNotification(authUser.attributes.sub, `${authUser.username} has followed you!`)
        } else {
           dispatch(unFollowUserThunk(userId));
        }
    }

    async function forgotPassword() {
        await Auth.forgotPassword(userForm.username);
    }

    async function forgotPasswordConfirm() {
        await Auth.forgotPasswordSubmit(userForm.username, userForm.code, userForm.password).then(() => {
            dispatch(userFormHandler({...userForm, code: '', password: '', username: ''}))
        });
    }

    async function changePassword() {
        if (userForm.newPassword.length === 0 || userForm.oldPassword.length === 0) {
           return notify('Please fill all fields')
        }
        dispatch(changePasswordLoading(true));
        const user = await Auth.currentAuthenticatedUser();
        await Auth.changePassword(user, userForm.oldPassword, userForm.newPassword)
            .then(() => {
                notify('Password changed successfully!');
                dispatch(userFormHandler({
                    ...userForm,
                    oldPassword: '',
                    newPassword: '',
                }));
            })
            .catch((err) => {
                notify(err.message);
                dispatch(changePasswordLoading(false));
            });
        dispatch(changePasswordLoading(false));
    }

   async function uploadUserImage() {
        await dispatch(uploadUserAssetThunk())
    }


    return {
        user,
        userInfo,
        onChange,
        changePassword,
        sendGlobalMessage,
        uploadUserImage,
        forgotPassword,
        forgotPasswordConfirm,
        followHandler,
        authUser,
    }
}
