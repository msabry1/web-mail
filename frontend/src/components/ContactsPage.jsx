import { useState } from "react";
import { GoPlus, GoPencil, GoTrash } from "react-icons/go";
import { useContacts } from "../context/ContactsContext"; // Adjust import path as needed

const ContactsPage = () => {
  const {
    contacts,
    addContact,
    updateContact,
    deleteContact,
    selectedContact,
    setSelectedContact,
  } = useContacts();

  const [isAddingContact, setIsAddingContact] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone: "",
    label: "Personal",
  });

  const handleSubmitContact = () => {
    if (!newContact.name || !newContact.email) {
      alert("Name and email are required");
      return;
    }

    if (editingContact) {
      // Update existing contact
      updateContact(editingContact.id, newContact);
      setEditingContact(null);
    } else {
      // Add new contact
      addContact(newContact);
    }

    // Reset form
    setNewContact({ name: "", email: "", phone: "", label: "Personal" });
    setIsAddingContact(false);
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setNewContact({
      name: contact.name,
      email: contact.email,
      phone: contact.phone || "",
      label: contact.label,
    });
    setIsAddingContact(true);
  };

  return (
    <div className="flex w-full h-full">
      {/* Contacts List Sidebar */}
      <div className="w-[300px] border-r p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Contacts</h2>
          <button
            onClick={() => {
              setIsAddingContact(!isAddingContact);
              setEditingContact(null);
              setNewContact({
                name: "",
                email: "",
                phone: "",
                label: "Personal",
              });
            }}
            className="text-blue-600 hover:bg-blue-50 p-2 rounded-full"
          >
            <GoPlus size={20} />
          </button>
        </div>

        {/* Add/Edit Contact Form */}
        {isAddingContact && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <input
              type="text"
              placeholder="Name"
              value={newContact.name}
              onChange={(e) =>
                setNewContact({ ...newContact, name: e.target.value })
              }
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={newContact.email}
              onChange={(e) =>
                setNewContact({ ...newContact, email: e.target.value })
              }
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="tel"
              placeholder="Phone (optional)"
              value={newContact.phone}
              onChange={(e) =>
                setNewContact({ ...newContact, phone: e.target.value })
              }
              className="w-full p-2 mb-2 border rounded"
            />
            <select
              value={newContact.label}
              onChange={(e) =>
                setNewContact({ ...newContact, label: e.target.value })
              }
              className="w-full p-2 mb-2 border rounded"
            >
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setIsAddingContact(false);
                  setEditingContact(null);
                }}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitContact}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {editingContact ? "Update Contact" : "Add Contact"}
              </button>
            </div>
          </div>
        )}

        {/* Contacts List */}
        <div className="space-y-2">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className={`p-3 flex justify-between items-center cursor-pointer rounded hover:bg-gray-100 ${
                selectedContact && selectedContact.id === contact.id
                  ? "bg-gray-200"
                  : ""
              }`}
            >
              <div>
                <div className="font-semibold">{contact.name}</div>
                <div className="text-sm text-gray-600">{contact.email}</div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditContact(contact);
                  }}
                  className="text-blue-600 hover:bg-blue-50 p-1 rounded-full"
                >
                  <GoPencil />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteContact(contact.id);
                  }}
                  className="text-red-600 hover:bg-red-50 p-1 rounded-full"
                >
                  <GoTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Details View */}
      <div className="flex-grow p-6">
        {selectedContact ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">{selectedContact.name}</h2>
            <div className="space-y-2">
              <div>
                <strong>Email:</strong> {selectedContact.email}
              </div>
              {selectedContact.phone && (
                <div>
                  <strong>Phone:</strong> {selectedContact.phone}
                </div>
              )}
              <div>
                <strong>Label:</strong> {selectedContact.label}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            Select a contact to view details
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactsPage;
