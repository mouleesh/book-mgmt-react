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