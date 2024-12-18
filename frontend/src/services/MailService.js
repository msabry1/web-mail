import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

class MailService {
  static fetchEmails = async (filter) => {
    try {
      const response = await axios.post(`${BASE_URL}/mails`, filter);
      return response.data;
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  static fetchEmail = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/mails/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching email:", error);
    }
  };

  static deleteEmail = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/mails/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting email:", error);
    }
  };
}

export default MailService;
