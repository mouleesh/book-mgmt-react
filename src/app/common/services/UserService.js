import Axios from "axios";
import {getCurrentLoggedInUser} from './AuthService';
import { APIserverURL } from "../../../constant";

export function getUserDetails() {
    return Axios.get(APIserverURL.userAPI+'?username=' + getCurrentLoggedInUser());
}