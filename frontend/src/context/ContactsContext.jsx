import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

const ContactsContext = createContext();

export const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      label: "Personal",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@work.com",
      phone: "+1 (555) 987-6543",
      label: "Work",
    },
  ]);

  const [selectedContact, setSelectedContact] = useState(null);

  const addContact = (newContact) => {
    const contactToAdd = {
      ...newContact,
      id: contacts.length > 0 ? Math.max(...contacts.map((c) => c.id)) + 1 : 1,
    };
    setContacts((prevContacts) => [...prevContacts, contactToAdd]);
  };

  const updateContact = (id, updatedContact) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === id ? { ...contact, ...updatedContact } : contact
      )
    );
  };

  const deleteContact = (id) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
    // Clear selection if deleted contact was selected
    if (selectedContact && selectedContact.id === id) {
      setSelectedContact(null);
    }
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
