import { APIserverURL } from '../constant';
import Axios from 'axios';

export const retrieveBookByIdAction = (bookId) => dispatch => {
    Axios.get(APIserverURL.bookAPI+ bookId).then(res => {
        const {bookName, author, description, likes, comments} = res.data;
        dispatch({
            type: 'RETRIEVE_BOOK',
            payload: {
                image: '',
                bookName,
                bookId,
                comments,
                likes,
                author,
                description,
                isLike: ''
            }
        })

    }).catch(err => {
        //TODO: handle error here
    });  
}

export const addCommentByIdAction = (bookId, comment) => dispatch => {

    const payload = {
        description: comment,
        commentedAt: (new Date()).toLocaleString(),
        username: localStorage.getItem('username')
    };

    Axios.patch('https://my-json-server.typicode.com/vcoderz/lms-json-api/book/'+ bookId, payload)
        .then(res => {
            dispatch({
                type: 'ADD_COMMENT',
                bookId,
                payload
            })

        }).catch(err => {
            //TODO: handle error here
            // this.growl.show({ severity: 'error', summary: 'Comment Not Saved', detail: 'Please try later!' });
        });
}

