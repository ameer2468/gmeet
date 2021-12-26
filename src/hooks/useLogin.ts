import {useState} from "react";
import {Auth} from "aws-amplify";
import {authedUser, loading, status} from "../redux/user/userSlice";
import {Login} from "../pages/register/types";
import {useAppDispatch} from "../redux/hooks";
import {useHistory} from "react-router-dom";
import {getCurrentUserThunk} from "../redux/user/thunk";

export function useLogin() {
    const dispatch = useAppDispatch();
    const history = useHistory();
    const [inputValues, setInputValues] = useState<Login>({
        username: '',
        password: ''
    })
    const [error, setError] = useState('');

   async function loginHandler(e: any) {
            e.preventDefault();
            if (inputValues.username.length === 0 || inputValues.password.length === 0) {
                return setError('Please fill in all the fields')
            }
            dispatch(loading(true))
            await Auth.signIn({
                username: inputValues.username,
                password: inputValues.password
            }).then(async () => {
                setInputValues({
                    username: '',
                    password: ''
                })
                await Auth.currentUserInfo().then((data) => {
                    dispatch(authedUser(data))
                });
                dispatch(getCurrentUserThunk(inputValues.username));
                dispatch(status(true))
                dispatch(loading(false))
                history.push('/home')
            }).catch((err) => {
                if (err.code === 'UserNotFoundException') {
                    setError('Incorrect username or password')
                } else {
                    setError(err)
                }
                    dispatch(loading(false))
                })
        }

    const logoutHandler = () => {
        dispatch(loading(true))
        localStorage.removeItem('persist:root')
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
