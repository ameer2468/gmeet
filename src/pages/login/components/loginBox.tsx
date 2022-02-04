import React, {ChangeEvent} from 'react';
import underline from '../../../assets/images/underline.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {useLogin} from "../../../hooks/useLogin";
import {useAppSelector} from "../../../redux/hooks";
import {userReducer} from "../../../redux/user/userSlice";
import LoadingSpinner from "../../../components/global/LoadingSpinner";
import { motion } from "framer-motion"


const LoginBox = () => {

    const loginHook = useLogin();
    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        loginHook.setInputValues({...loginHook.inputValues, [e.target.name]: e.target.value})
    }
    const {inputValues} = loginHook;
    const passwordLength = inputValues.password.length;
    const errorLength = Object.entries(loginHook.error).length;
    const userRedux = useAppSelector(userReducer)
    const {Loading} = userRedux;

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
                            <h1>Hello,</h1>
                            <h1>welcome user!</h1>
                        </div>
                        <form onSubmit={loginHook.loginHandler}>
                            <input autoComplete={'off'} name='username' onChange={inputHandler} value={loginHook.inputValues.username} placeholder='username' type="text"/>
                            <input autoComplete={'off'} name='password' onChange={inputHandler} value={loginHook.inputValues.password} placeholder='password' type="password"/>
                            {errorLength === 0 ? '' : <p className='error'>{loginHook.error.toString()}</p>}
                            <div className="links">
                                <Link to={'/forgot-password'}><p>Forgot password?</p></Link>
                                <Link to={'/register'}>No account? register now</Link>
                            </div>
                            <button className={passwordLength === 0 ? 'disabledButton' : ''} disabled={passwordLength === 0}>{Loading ? <LoadingSpinner height={35} width={35}/> : 'Login'}</button>
                        </form>
                    </motion.div>
                </div>
            </div>
    );
};

export default LoginBox;
