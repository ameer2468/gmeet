import React, {useLayoutEffect} from 'react';
import {useUser} from "../../../hooks/useUser";
import TextArea from "../textarea";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {userReducer} from "../../../redux/user/userSlice";
import { motion } from 'framer-motion';
import {chatVariant} from "../../../helpers/framer";
import {getGlobalMessagesThunk} from "../../../redux/user/thunk";


const Chat = () => {

    const userHook = useUser();
    const userStore = useAppSelector(userReducer)
    const {globalMessages} = userStore
    const {toggleChat} = userStore;
    const dispatch = useAppDispatch();
    const {globalMessage} = userStore.userForm;

    useLayoutEffect(() => {
            dispatch(getGlobalMessagesThunk())
    }, [globalMessages.length, dispatch])

    return (
        <>
            {toggleChat ?
                <motion.div
                    initial={'hidden'}
                    animate={'active'}
                    exit={'hide'}
                    variants={chatVariant}
                    className="GlobalChat">
                    <div className="container">
                        <h1>Global Chat</h1>
                        <div className="messages-container">
                            {globalMessages.map((value => {
                                return (
                                    <div key={value.id} className="message">
                                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                            <p className="user">{value.username}</p>
                                            <p style={{ color: 'white'}} className="time">{value.time}</p>
                                        </div>
                                        <p style={{fontSize: '1.5rem'}} className="text">{value.message}</p>
                                    </div>
                                )
                            }))}
                        </div>
                        <div className="controls">
                            <p style={{position: 'absolute', bottom: 80, right: 10, fontSize: '1.2rem'}} className="wordCount">{`${150 - userStore.userForm.globalMessage.length} / 150 remaining`}</p>
                            <TextArea value={globalMessage} maxLength={150} maxWidth={'100%'} placeholder={'Type a message...'} useHook={userHook} height={'12rem'} name={'globalMessage'}/>
                            <button disabled={globalMessage.length === 0} onClick={() => userHook.sendGlobalMessage()} className={`${globalMessage.length === 0 && 'disabledButton'} btn btn--green`}>Send</button>
                        </div>
                    </div>
                </motion.div>
                : ''
            }
        </>
    );
};

export default Chat;
