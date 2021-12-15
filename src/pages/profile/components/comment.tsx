import React, {useState} from 'react';
import {comment} from "../../../redux/types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisH} from "@fortawesome/free-solid-svg-icons";
import {useUser} from "../../../hooks/useUser";
import ActionsMenu from "../../../components/global/ActionsMenu";
import {useDetectClickOutside} from "react-detect-click-outside";
import {useProject} from "../../../hooks/useProject";

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
    const options = [{name: 'Delete', onClick: () => projectHook.deleteCommentHandler(props.data.id, userHook.userInfo.username)}]
    const ref = useDetectClickOutside({ onTriggered: closeDrop});


    return (
                <div key={props.data.id} className="comments">
                <div className="comment">
                    <div className="commentInfo">
                        <p className='poster'>{props.data.posted_by}</p>
                            <div className="side">
                                <p className='date'>{props.data.date}</p>
                                {props.data.posted_by === authUser.username ?
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