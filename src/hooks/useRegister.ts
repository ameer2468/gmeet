import {useState} from "react";
import * as type from "../pages/register/types";
import {Auth} from "aws-amplify";
import {useAppDispatch} from "../redux/hooks";
import {loading} from "../redux/user/userSlice";


export function useRegister() {

    const [inputValues, setInputValues] = useState<type.Register>({
        username: '',
        password: '',
        email: '',
        code: '',
        confirmpass: ''
    })
    const [error, setError] = useState('')
    const [step, setStep] = useState<number>(0);
    const dispatch = useAppDispatch();

    async function confirmSignUp(e: any) {
        e.preventDefault();
        try {
            await dispatch(loading(true))
            await Auth.confirmSignUp(inputValues.username, inputValues.code);
            await setInputValues({email: "", password: "", username: "", code: "", confirmpass: ""})
            await setStep(prevState => prevState + 1);
            await dispatch(loading(false))
        } catch (error) {
            setError('Error confirming signup')
            dispatch(loading(false))
        }
    }

    async function registerHandler(e: any) {
        e.preventDefault();
        if (inputValues.confirmpass !== inputValues.password) {
            return setError('Password does not match confirm password')
        } else {
            await dispatch(loading(true))
            await Auth.signUp({
                username: inputValues.username,
                password: inputValues.password,
                attributes: {
                    email: inputValues.email
                }
            })
                .then(() => {
                    setStep(prevState => prevState + 1);
                    setError('')
                    dispatch(loading(false))
                })
                .catch(err => {
                    setError(err)
                    dispatch(loading(false))
                })
        }
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