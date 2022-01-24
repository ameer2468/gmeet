import React from 'react';
import {toggleChatHandler, userReducer} from "../redux/user/userSlice";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCommentDots} from "@fortawesome/free-solid-svg-icons";
import {useAppDispatch, useAppSelector} from "../redux/hooks";

const ChatToggle = () => {

    const dispatch = useAppDispatch();
    const userRedux = useAppSelector(userReducer)
    const {toggleChat} = userRedux;

    return (
        <div style={{right: `${toggleChat ? '23%' : '10%'}`}} onClick={() => dispatch(toggleChatHandler(!toggleChat))} className="chatToggle">
                <FontAwesomeIcon className='chatIcon' icon={faCommentDots}/>
        </div>
    );
};

export default ChatToggle;
