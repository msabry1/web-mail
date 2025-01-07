import { handleRequest } from "./handleRequest";
import authAxios from "./authAxios";
class ContactsService {
  static addContact = async (contact) => {
    const contactDTO = {
      name: contact.name,
      emails: [contact.username],
    };
    const { data, error } = await handleRequest(() =>
      authAxios.post(`users/contact`, contactDTO)
    );
    if (error) {
      console.error("Error fetching contacts:", error);
    }
    return data;
  };

  static deleteContact = async (id) => {
    const { data, error } = await handleRequest(() =>
      authAxios.delete(`users/contact/${id}`)
    );
    if (error) {
      console.error("Error fetching contacts:", error);
    }
    return data;
  };

  static fetchContacts = async () => {
    const { data, error } = await handleRequest(() =>
      authAxios.get(`users/contact`)
    );
    if (error) {
      console.error("Error fetching contacts:", error);
    }
    return data;
  };
}

export default ContactsService;
