import { handleRequest } from "./handleRequest";
import authAxios from "./authAxios";
class MailService {
  static fetchEmails = (filter) => {
    console.log("Fetching emails with filter:", filter);
    const { data, error } = handleRequest(() =>
      authAxios.post(`/mails`, filter)
    );
    if (error) {
      console.error("Error fetching emails:", error);
    }
    return data;
  };

  static fetchEmail = (id) => {
    const { data, error } = handleRequest(() => authAxios.get(`/mails/${id}`));
    if (error) {
      console.error("Error fetching email:", error);
    }
    return data;
  };

  static deleteEmail = (id) => {
    const { data, error } = handleRequest(() =>
      authAxios.delete(`/mails/${id}`)
    );
    if (error) {
      console.error("Error deleting email:", error);
    }
    return data;
  };
}

export default MailService;
