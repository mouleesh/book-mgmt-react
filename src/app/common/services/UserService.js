import Axios from "axios";
import {getCurrentLoggedInUser} from './AuthService';

export function getUserDetails() {
    return Axios.get('https://my-json-server.typicode.com/vcoderz/lms-json-api/user?username=' + getCurrentLoggedInUser());
}