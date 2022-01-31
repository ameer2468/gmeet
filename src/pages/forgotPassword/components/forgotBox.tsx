import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {useAppSelector} from "../../../redux/hooks";
import {userReducer} from "../../../redux/user/userSlice";
import LoadingSpinner from "../../../components/global/LoadingSpinner";
import { motion } from "framer-motion"
import {useUser} from "../../../hooks/useUser";
import Input from "../../../components/global/input";
import underline from "../../../assets/images/underline.png";

const ForgotBox = () => {

    const userStore = useAppSelector(userReducer)
    const userHook = useUser();
    const {userForm} = userStore;
    const userRedux = useAppSelector(userReducer)
    const {Loading} = userRedux;
    const [step, setStep] = useState(0);
    const [error, setError] = useState('');

    const variants = {
        active: {
            type: "spring",
            damping: 20,
            stiffness: 100,
            opacity: 1,
            y: 0
        },
        hidden: {
            opacity: 0,
            y: 30,
        }
    }

    const underStyle = {
        backgroundImage: `url(${underline})`,
        width: '29rem',
        height: '2rem',
        top: '46%',
        left: '15%',
        zIndex: '-1',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
        position: 'absolute' as 'absolute',
    }

    console.log(userForm)

    return (
            <div className="loginBox">
                <div className="side">
                    <h3 style={{textAlign: 'center', width: '78%'}}>
                        Connecting people through working together on projects
                    </h3>
                    <div style={underStyle} className="underline"/>
                </div>
                <div className="side">
                    <Link to={'/'}>
                        <div className="back">
                        <FontAwesomeIcon className='icon' icon={faArrowLeft}/>
                        <p>Back To Home</p>
                    </div>
                    </Link>
                    <motion.div variants={variants} initial={"hidden"} animate="active">
                        <div className="welcome">
                            {step === 0 ?
                                <>
                                <h1>Forgot your password?</h1>
                                <h1>No problem, we got you</h1>
                                </>
                                :
                                <h1 style={{width: '40rem'}}>{step === 1 ? 'Verification code sent to your email' : step === 2 && 'Password reset successfully'}</h1>
                            }
                        </div>
                        {step === 0 ?
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                userHook.forgotPassword().then(() => {
                                    setStep(1)
                                }).catch((err) => {
                                    setError(err.message)
                                })
                            }}>
                                <Input value={userForm.username} maxWidth={'100%'} placeholder={"Enter your username"} useHook={userHook} name={'username'}/>
                                {error.length === 0 ? '' : <p className='error'>{error.toString()}</p>}
                                <div className="links">
                                    <Link to={'/login'}><p>Have an account? Login now</p></Link>
                                </div>
                                <button className={userForm.username.length === 0 ? 'disabledButton' : ''} disabled={userForm.username.length === 0}>{Loading ? <LoadingSpinner height={35} width={35}/> : 'Confirm'}</button>
                            </form>
                            : step === 1 ?
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    userHook.forgotPasswordConfirm().then(() => {
                                        setStep(2);
                                    })
                                }}>
                                    <Input value={userForm.code} maxWidth={'100%'} placeholder={"Enter verification code"} useHook={userHook} name={'code'}/>
                                    <Input type={'password'} value={userForm.password} maxWidth={'100%'} placeholder={"Enter a new password"} useHook={userHook} name={'password'}/>
                                    <button className={userForm.code.length === 0 || userForm.password.length === 0 ? 'disabledButton' : ''}
                                            disabled={userForm.code.length === 0 || userForm.password.length === 0}>
                                        {Loading ? <LoadingSpinner height={35} width={35}/> : 'Confirm'}
                                    </button>
                                </form> :
                                <form>
                                    <Link to={'/login'}><button>
                                        Go to Login
                                    </button></Link>
                                </form>
                        }
                    </motion.div>
                </div>
            </div>
    );
};

export default ForgotBox;
