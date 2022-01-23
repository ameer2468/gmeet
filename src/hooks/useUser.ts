import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {changePasswordLoading, userFormHandler, userReducer} from "../redux/user/userSlice";
import {followUserThunk, sendNotificationThunk, unFollowUserThunk} from "../redux/user/thunk";
import {v4 as uuidv4} from "uuid";
import {following} from "../redux/types";
import {Auth} from "aws-amplify";
import {notify} from "../helpers/notify";


export function useUser() {
    const user = useAppSelector(userReducer)
    const {userInfo, authUser, userForm} = user;
    const dispatch = useAppDispatch();


    function onChange(key: string, value: string) {
        return dispatch(userFormHandler({...userForm, [key]: value}))
    }

    function sendNotification(users: [], text: string) {
        dispatch(sendNotificationThunk(users, text))
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
            sendNotification([id] as unknown as [], `${authUser.username} has followed you!`)
        } else {
           dispatch(unFollowUserThunk(userId));
        }
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



    return {
        user,
        userInfo,
        onChange,
        changePassword,
        followHandler,
        authUser,
    }
}
