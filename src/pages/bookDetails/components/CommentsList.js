import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const CommentsList = ({description, username, commentedAt}) => {
    return (<div >
        <li className="list-group-item">
            <div style={{ display: "inline-flex" }}>
                <FaUserCircle  size={40}/>
                <h4 style={{ padding: "10px 0px 0px 5px" }}>{username}</h4>
            </div>

            <div style={{ overflow: "hidden" }}>
                <p>{description}</p>
                <small className="float-right">Commented At: {commentedAt}</small>
            </div>
        </li>
        <br/>
    </div>);
}

export default CommentsList;