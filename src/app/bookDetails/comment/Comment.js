import React, {Component} from 'react';
import { FaComment } from 'react-icons/fa';
import {Growl} from 'primereact/growl';
import CommentsList from './CommentsList';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.commentTextRef = React.createRef();
    }

    onComment = () => {
        if (this.commentTextRef.current.value === '') {
            this.growl.show({ severity: 'error', summary: 'Comment Required', detail: 'Please enter the comment!' });
            return;
        }

        this.props.onComment(this.commentTextRef.current.value)
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
