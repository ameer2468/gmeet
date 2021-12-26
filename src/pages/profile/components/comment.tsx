import React, {useState} from 'react';
import {comment} from "../../../redux/types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisH, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {useUser} from "../../../hooks/useUser";
import ActionsMenu from "../../../components/global/ActionsMenu";
import {useDetectClickOutside} from "react-detect-click-outside";
import {useProject} from "../../../hooks/useProject";
import {NavLink} from "react-router-dom";


interface props {
    data: comment;
    index: number;
}

const Comment = (props: props) => {

    const userHook = useUser();
    const {authUser} = userHook.user;
    const projectHook = useProject();
    const [show, setShow] = useState(false);
    const closeDrop = () => {
        setShow(false);
    }
    const options = [{icon: faTrashAlt, name: 'Delete Comment', onClick: () => projectHook.deleteCommentHandler(props.data.id, userHook.userInfo.username)}]
    const ref = useDetectClickOutside({ onTriggered: closeDrop});
    const checkUser = props.data.posted_by === authUser.username;

    return (
                <div key={props.data.id} className="comments">
                <div className="comment">
                    <div className="commentInfo">
                        <NavLink to={`/profile/${props.data.posted_by}`}><p className='poster'>{props.data.posted_by}</p></NavLink>
                            <div className="side">
                                <p className='date'>{props.data.date}</p>
                                {checkUser ?
                                    <div ref={ref} onClick={() => setShow(!show)} className="comment-menu">
                                    <ActionsMenu show={show} options={options}/>
                                    <FontAwesomeIcon className='icon' icon={faEllipsisH}/>
                                </div> : '' }
                            </div>
                    </div>
                    <p className='commentText'>{props.data.comment}</p>
                </div>
            </div>
    );
};

export default Comment;