import {useState} from "react";
import {Auth} from "aws-amplify";
import {loading, status, userDetails} from "../redux/user/userSlice";
import {Login} from "../pages/register/types";
import {useAppDispatch} from "../redux/hooks";
import {useHistory} from "react-router-dom";

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
            }).then(() => {
                setInputValues({
                    username: '',
                    password: ''
                })
                Auth.currentUserInfo().then((data) => {
                    dispatch(userDetails(data))
                })
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
            dispatch(userDetails({
                username: ''
            }))
            dispatch(loading(false));
            dispatch(status(false));
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