import React, {Component} from 'react';
import { FaComment, FaUserCircle } from 'react-icons/fa';
import {Growl} from 'primereact/growl';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.commentTextRef = React.createRef();
    }

    onComment = () => {
        if (this.commentTextRef.current.value === '') {
            this.growl.show({ severity: 'error', summary: 'Comment Required', detail: 'Please enter the Comment in the Textarea!' });
            return;
        }

        this.props.addBookComment(this.props.bookID, this.commentTextRef.current.value)
        this.commentTextRef.current.value = '';
    }

    render() {

        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="form-group">
                        <Growl ref={(el) => this.growl = el} />
                        <label htmlFor="exampleFormControlTextarea1"><b>Your Comments</b></label>
                        <textarea ref={this.commentTextRef} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                </div>
                <div className="col-md-12">
                    <button  className="btn btn-primary btn-sm" style={{ float: "right" }} onClick={this.onComment}> comment <FaComment /> </button>
                </div>

                <br/><br/>

                <div className="col-md-12">
                    <div className="list-group">
                        {
                            this.props.comments.sort((a,  b)  =>  a.commentedAt  <  b.commentedAt)
                            .map((comment,  item)  =>  {
                                return  <CommentsList key={item} {...comment} />
                            })
                        }
                    </div>

                </div>

            </div>
        );
    }
}

export default Comment;


export const CommentsList = ({description, username, commentedAt}) => {
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