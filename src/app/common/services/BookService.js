import Axios from "axios";
import { APIserverURL } from "../../../constant";

export function getBookDetails() {
    return Axios.get(APIserverURL.bookAPI);
}