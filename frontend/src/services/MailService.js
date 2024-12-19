import { handleRequest } from "./handleRequest";
import authAxios from "./authAxios";
class MailService {
  static fetchReceivedEmails = async (filter) => {
    console.log("Fetching emails with filter:", filter);
    const { data, error } = await handleRequest(() =>
      authAxios.post(`/mails/received`, filter)
    );
    if (error) {
      console.error("Error fetching emails:", error);
    }
    return data;
  };

  static fetchSendEmails = async (filter) => {
    console.log("Fetching emails with filter:", filter);
    const { data, error } = await handleRequest(() =>
      authAxios.post(`/mails/sent`, filter)
    );
    if (error) {
      console.error("Error fetching emails:", error);
    }
    return data;
  };

  static fetchEmail = async (id) => {
    const { data, error } = await handleRequest(() => authAxios.get(`/mails/${id}`));
    console.log("Fetched email:", data);
    if (error) {
      console.error("Error fetching email:", error);
    }
    return data;
  };

  static sendEmail = async (email) => {
    const { data, error } = await handleRequest(() =>
      authAxios.post(`/compose`, email)
    );
    console.log("Sent email:", data);
    if (error) {
      console.error("Error sending email:", error);
    }
    return data;
  };

  static createFolderFilter = async (filter, folderName) => {
    const { data, error } = await handleRequest(() =>
      authAxios.post(`/folder/filter/${folderName}`, filter)
    );
    console.log("Created folder filter:", data);
    if (error) {
      console.error("Error creating folder filter:", error);
    }
    return data;
  };
  // static deleteEmail = (id) => {
  //   const { data, error } = handleRequest(() =>
  //     authAxios.delete(`/mails/${id}`)
  //   );
  //   if (error) {
  //     console.error("Error deleting email:", error);
  //   }
  //   return data;
  // };
}

export default MailService;
