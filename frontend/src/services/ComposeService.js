import { handleRequest } from "./handleRequest";
import authAxios from "./authAxios";

class ComposeService {
    static sendEmail = (EmailComposeDTO) => {
        handleRequest(() => authAxios.post(`/compose`, EmailComposeDTO));
    }
}
export default ComposeService