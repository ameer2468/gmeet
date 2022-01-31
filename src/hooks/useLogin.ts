import {FormEvent, useState} from "react";
import {Auth} from "aws-amplify";
import {authedUser, loading, status, userImageHandler} from "../redux/user/userSlice";
import {Login} from "../pages/register/types";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {useHistory} from "react-router-dom";
import {getAssetThunk} from "../redux/user/thunk";
import {getUserFollowers} from "../redux/user/services";
import {RootState} from "../redux/store";

export function useLogin() {
    const dispatch = useAppDispatch();
    const history = useHistory();
    const [inputValues, setInputValues] = useState<Login>({
        username: '',
        password: ''
    })
    const [error, setError] = useState('');
    const {authUser} = useAppSelector((state: RootState) => state.userStore);

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
                await Auth.currentUserInfo().then((data) => {
                    dispatch(authedUser({...data}))
                });
                await dispatch(getUserFollowers(authUser.attributes.sub)).then(async (res: any) => {
                    const {following, followers} = res.payload.data;
                    dispatch(authedUser({...authUser, following: following, followers: followers}))
                })
                await dispatch(getAssetThunk(authUser.username));
                dispatch(status(true))
                dispatch(loading(false))
                history.push('/home')
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
        localStorage.removeItem('persist:root');
        Auth.signOut().then(() => {
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
