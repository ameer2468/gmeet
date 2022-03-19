import React, {ChangeEvent} from 'react';
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {useRegister} from "../../../hooks/useRegister";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useAppSelector} from "../../../redux/hooks";
import {userReducer} from "../../../redux/user/userSlice";
import LoadingSpinner from "../../../components/global/LoadingSpinner";
import {motion} from "framer-motion";
import underline from "../../../assets/images/underline.png";

const RegisterBox = () => {

    const registerHook = useRegister();
    const userRedux = useAppSelector(userReducer)
    const {Loading} = userRedux;
    const {inputValues} = registerHook;
    const emailLength = inputValues.email.length;
    const userLength = inputValues.username.length;
    const passLength = inputValues.password.length;
    const confirmPassLength = inputValues.confirmpass.length;
    const codeLength = inputValues.code.length;
    const checkRegisterForm = emailLength === 0 || userLength === 0 || passLength === 0 || confirmPassLength === 0;

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
        width: '13rem',
        height: '2rem',
        top: '46%',
        left: '38%',
        zIndex: '-1',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '140%',
        position: 'absolute' as 'absolute',
    }

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        registerHook.setInputValues({...registerHook.inputValues, [e.target.name]: e.target.value})
    }

    return (
            <div className="registerBox">
                <div className="side">
                    <h3 style={{textAlign: 'center', width: '78%'}}>
                        You are one step closer to joining and creating projects
                    </h3>
                    <div style={underStyle} className="underline"/>
                </div>
                <div className="side">
                    <Link to={'/'}>
                        <div style={{position: 'relative', top: '1.5rem'}} className="back">
                        <FontAwesomeIcon className='icon' icon={faArrowLeft}/>
                        <p>Back To Home</p>
                    </div>
                    </Link>
                    <motion.div variants={variants} initial={"hidden"} animate="active">
                   <div className="welcome">
                       {registerHook.step < 1 && <h1>Hello,</h1>}
                       <h1>{registerHook.step === 0 ? 'welcome to registeration!' : registerHook.step === 1 ? 'Check Email for verification code' : registerHook.step === 2 && 'Registeration successful'}</h1>
                   </div>
                    {registerHook.step === 0 ? <form onSubmit={registerHook.registerHandler}>
                        <input autoComplete={'none'} required onChange={inputHandler} name='email' value={registerHook.inputValues.email} placeholder='Email' type="email"/>
                        <input autoComplete={'none'} required onChange={inputHandler} name='username' value={registerHook.inputValues.username} placeholder='Username' type="text"/>
                        <input autoComplete={'none'} required onChange={inputHandler} name='profession' value={registerHook.inputValues.profession}  placeholder='Profession e.g. Software Engineer' type="text"/>
                        <input autoComplete={'none'} required onChange={inputHandler} name='password' value={registerHook.inputValues.password} placeholder='Password' type="password"/>
                        <input autoComplete={'none'} required onChange={inputHandler} name='confirmpass' value={registerHook.inputValues.confirmpass}  placeholder='Confirm password' type="password"/>
                        {registerHook.error.length === 0 ? '' :  <p className='error'>{registerHook.error}</p>}
                        <div className="links">
                            <Link to={'/login'}><p>Have an account? Login now</p></Link>
                        </div>
                        <button className={checkRegisterForm ? 'disabledButton' : ''} disabled={checkRegisterForm}>{Loading ? <LoadingSpinner height={35} width={35}/> : 'Confirm'}</button>
                    </form> : registerHook.step === 1 ?
                        <form onSubmit={registerHook.confirmSignUp}>
                            <input autoComplete={'off'} value={registerHook.inputValues.code} name={'code'} onChange={inputHandler} placeholder='Verification code' type="text"/>
                            <button className={codeLength === 0 ? 'disabledButton' : ''} disabled={registerHook.inputValues.code.length === 0}>{Loading ? <LoadingSpinner height={35} width={35}/> : 'Confirm'}</button>
                            {registerHook.error.length === 0 ? '' : <p className='error'>{registerHook.step}</p>}
                        </form>
                        : registerHook.step === 2 &&
                        <div style={{margin: '3rem auto', width: '80%'}}>
                            <Link to={'/login'}>
                                <button className='btn btn--purple'>
                                    Go to Login
                                </button>
                            </Link>
                        </div>
                    }
                    </motion.div>
                </div>
            </div>
    );
};

export default RegisterBox;
