import React from 'react';
import {comment} from "../../../redux/types";

interface props {
    data: comment;
}

const Comment = (props: props) => {

    return (
                <div key={props.data.id} className="comments">
                <div className="comment">
                    <div className="commentInfo">
                        <p className='poster'>{props.data.posted_by}</p>
                        <p className='date'>{props.data.date}</p>
                    </div>
                    <p>{props.data.comment}</p>
                </div>
            </div>
    );
};

export default Comment;