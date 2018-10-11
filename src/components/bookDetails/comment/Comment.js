import React from 'react';
import { FaComment } from 'react-icons/fa';
import CommentsList from '../commentList/CommentsList';

const Comment = (props) => {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1"><b>Your Comments</b></label>
                        <textarea ref={props.commentRef} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                </div>
                <div className="col-md-12">
                    <button  className="btn btn-primary btn-sm" style={{ float: "right" }} onClick={() => props.onComment(props.bookId, props.commentRef)}> comment <FaComment /> </button>
                </div>

                <br/><br/>

                <div className="col-md-12">
                    <div className="list-group">
                        {
                            props.comments.sort((a,  b)  =>  a.commentedAt  <  b.commentedAt)
                            .map((comment,  item)  =>  {
                                return  <CommentsList key={item} {...comment} />
                            })
                        }
                    </div>

                </div>

            </div>
        );
    }

export default Comment;
