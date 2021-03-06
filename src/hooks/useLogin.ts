import {FormEvent, useState} from "react";
import {Auth} from "aws-amplify";
import {authedUser, loading, reset, status, userImageHandler} from "../redux/user/userSlice";
import {Login} from "../pages/register/types";
import {useAppDispatch} from "../redux/hooks";
import {useHistory} from "react-router-dom";
import {getAssetThunk, getNotifications} from "../redux/user/thunk";
import {getUserFollowers} from "../redux/user/services";
import {notify} from "../helpers/notify";

export function useLogin() {
    const dispatch = useAppDispatch();
    const history = useHistory();
    const [inputValues, setInputValues] = useState<Login>({
        username: '',
        password: ''
    })
    const [error, setError] = useState('');

   async function loginHandler(e: FormEvent<HTMLFormElement>) {
            e.preventDefault();
            if (inputValues.username.length === 0 || inputValues.password.length === 0) {
                return setError('Please fill in all the fields')
            }
            dispatch(loading(true))
            dispatch(userImageHandler(true))
            await Auth.signIn({
                username: inputValues.username,
                password: inputValues.password
            }).then(async () => {
                setInputValues({
                    username: '',
                    password: ''
                })
                await Auth.currentUserInfo().then(async (data) => {
                    dispatch(authedUser({...data}))
                    await Promise.all([
                        dispatch(getUserFollowers(data.attributes.sub)),
                        dispatch(getNotifications(data.attributes.sub)),
                    ]).then(async (res) => {
                        const followersData: any = res[0];
                        const {following, followers} = followersData.payload.data;
                        dispatch(authedUser({...data, following: following, followers: followers}))
                        await dispatch(getAssetThunk(data.username))
                        dispatch(status(true))
                        history.push('/home')
                    }).catch(() => {
                        notify('An error has occurred')
                    })
                });
                dispatch(loading(false))
            }).catch((err) => {
                if (err.code === 'UserNotFoundException' || err.code === 'NotAuthorizedException') {
                    setError('Invalid username or password')
                } else {
                    setError(err)
                }
                    dispatch(loading(false))
                })
        }

    const logoutHandler = () => {
        dispatch(loading(true))
        Auth.signOut().then(() => {
            dispatch(reset());
            dispatch(loading(false));
            dispatch(status(false));
            history.push('/')
        })
    }

        return {
            loginHandler,
            inputValues,
            setInputValues,
            logoutHandler,
            error
        }
}
