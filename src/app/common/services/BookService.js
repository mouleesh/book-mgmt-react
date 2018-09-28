import Axios from "axios";

export function getBookDetails() {
    return Axios.get('https://my-json-server.typicode.com/vcoderz/lms-json-api/book');
}