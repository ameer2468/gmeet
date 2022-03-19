import {FormEvent, useState} from "react";
import * as type from "../pages/register/types";
import {Auth} from "aws-amplify";
import {useAppDispatch} from "../redux/hooks";
import {loading} from "../redux/user/userSlice";
import {createUserThunk} from "../redux/user/thunk";


export function useRegister() {

    const [inputValues, setInputValues] = useState<type.Register>({
        username: '',
        password: '',
        email: '',
        code: '',
        confirmpass: '',
        profession: ''
    })
    const [error, setError] = useState('')
    const [step, setStep] = useState<number>(0);
    const dispatch = useAppDispatch();

    async function confirmSignUp(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
           dispatch(loading(true))
            await Auth.confirmSignUp(inputValues.username, inputValues.code);
            setInputValues({email: "", password: "", username: "", code: "", confirmpass: "", profession: ""})
            setStep(prevState => prevState + 1);
            dispatch(loading(false))
        } catch (error) {
            setError('Error confirming signup')
            dispatch(loading(false))
        }
    }

    async function registerHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (inputValues.confirmpass !== inputValues.password) {
            return setError('Password does not match confirm password')
        }
           dispatch(loading(true))
            await Auth.signUp({
                username: inputValues.username,
                password: inputValues.password,
                attributes: {
                    email: inputValues.email,
                    'custom:profession': inputValues.profession
                }
            })
                .then(async (res: any) => {
                  return dispatch(createUserThunk({
                        id: res.userSub,
                        username: res.user.username,
                        profession: inputValues.profession,
                        userImage: '',
                        followers: [],
                        following: [],
                        notifications: [],
                        website: ''
                    }))
                })
                .then(() => {
                    setStep(prevState => prevState + 1);
                    setError('')
                    dispatch(loading(false))
                })
                .catch(err => {
                    dispatch(loading(false))
                    if (err.code === 'UsernameExistsException'){
                        setError('The username entered is taken')
                    } else {
                        setError(err.message)
                    }
                })
    }

    return {
        error,
        step,
        registerHandler,
        confirmSignUp,
        inputValues,
        setInputValues
    }

}
