import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import ContactsService from "../services/ContactsService";
const ContactsContext = createContext();

export const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "John Doe",
      username: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      label: "Personal",
    },
    {
      id: 2,
      name: "Jane Smith",
      username: "jane.smith@work.com",
      phone: "+1 (555) 987-6543",
      label: "Work",
    },
  ]);

  const [selectedContact, setSelectedContact] = useState(null);

  const addContact = async (newContact) => {
    const contactToAdd = await ContactsService.addContact(newContact);
    setContacts((prevContacts) => [
      ...prevContacts,
      {
        id: contactToAdd.id,
        name: contactToAdd.name,
        username: contactToAdd.emails[0],
      },
    ]);
  };

  const updateContact = (id, updatedContact) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === id ? { ...contact, ...updatedContact } : contact
      )
    );
  };

  useEffect(() => {
    const getContacts = async () => {
      try {
        const fetchedContacts = await ContactsService.fetchContacts();
        console.log("Fetched contacts:", fetchedContacts);

        // Transform the fetched contacts
        const transformedContacts = fetchedContacts.map((contact) => ({
          id: contact.id,
          name: contact.name,
          username: contact.emails[0],
        }));

        // Update the state
        setContacts(transformedContacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    getContacts();
  }, []);

  const deleteContact = async (id) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
    if (selectedContact && selectedContact.id === id) {
      setSelectedContact(null);
    }
    await ContactsService.deleteContact(id);
  };

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        addContact,
        updateContact,
        deleteContact,
        selectedContact,
        setSelectedContact,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};

export const useContacts = () => {
  const context = useContext(ContactsContext);
  if (context === undefined) {
    throw new Error("useContacts must be used within a ContactsProvider");
  }
  return context;
};

ContactsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
