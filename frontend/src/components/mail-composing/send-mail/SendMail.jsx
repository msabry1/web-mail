import { useState } from "react";
import { IoMdClose, IoMdAttach, IoMdTrash } from "react-icons/io";
import { FaCircle, FaUserPlus } from "react-icons/fa";
import EmailSuccessAnimation from "../EmailSuccessAnimation";
import { useUI } from "../../../context/UIContext";
import { useEmailsContext } from "../../../context/EmailsContext";
import { useContacts } from "../../../context/ContactsContext"; // Assuming you have a contacts context
import { useEmail } from "../../../hooks/useEmail";
import EmailEditor from "./EmailEditor";
import PropTypes from "prop-types";

const PRIORITY_OPTIONS = [
  {
    value: "Low",
    label: "Low Priority",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    value: "Medium",
    label: "Medium Priority",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
  },
  {
    value: "High",
    label: "High Priority",
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
];

const SendMail = ({ draftToEdit = null, onCancel }) => {
  const {
    formData,
    loading,
    showSuccessAnimation,
    handleInputChange,
    resetForm,
    handleSaveDraft,
    handleSuccessClose,
    setLoading,
    setShowSuccessAnimation,
  } = useEmail(draftToEdit);

  const { setComposing } = useUI();
  const { deleteDrafts } = useEmailsContext();
  const { contacts } = useContacts(); // Get contacts from context

  const [attachments, setAttachments] = useState(formData.attachments || []);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleFileSelect = (event) => {
    const newFiles = Array.from(event.target.files);

    // Add new files, avoiding duplicates
    const updatedAttachments = [
      ...attachments,
      ...newFiles.filter(
        (newFile) =>
          !attachments.some(
            (existingFile) => existingFile.name === newFile.name
          )
      ),
    ];

    setAttachments(updatedAttachments);

    // Update form data
    handleInputChange({
      target: {
        name: "attachments",
        value: updatedAttachments,
      },
    });
  };

  const removeAttachment = (fileToRemove) => {
    const updatedAttachments = attachments.filter(
      (file) => file !== fileToRemove
    );
    setAttachments(updatedAttachments);

    handleInputChange({
      target: {
        name: "attachments",
        value: updatedAttachments,
      },
    });
  };

  const sendMail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Combine manually entered 'to' emails with selected contacts' emails
      const recipientEmails = [
        ...(formData.to ? [formData.to] : []),
        ...selectedContacts.map((contact) => contact.email),
      ].join(", ");

      const updatedFormData = {
        ...formData,
        to: recipientEmails,
      };

      console.log("Sending mail to:", recipientEmails);
      console.log("Attachments to send:", attachments);

      if (formData.id) {
        deleteDrafts([formData.id]);
      }

      setShowSuccessAnimation(true);
      resetForm();
      setAttachments([]); // Clear attachments
      setSelectedContacts([]); // Clear selected contacts
      setComposing(false);
    } catch (err) {
      console.error("Error sending email:", err);
    } finally {
      setLoading(false);
      setTimeout(() => {
        onCancel();
      }, 1000);
    }
  };

  const handleContactSelect = (contact) => {
    // Toggle contact selection
    setSelectedContacts((prev) =>
      prev.some((c) => c.id === contact.id)
        ? prev.filter((c) => c.id !== contact.id)
        : [...prev, contact]
    );
  };

  return (
    <>
      <div className="fixed bottom-0 right-0 lg:right-16 lg:max-w-screen-lg bg-white p-5 shadow-lg rounded-t-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center bg-gray-200 p-2 rounded-lg mb-3 justify-between">
          <span>{draftToEdit ? "Edit Draft" : "New Message"}</span>
          <div className="flex items-center gap-2">
            <IoMdClose
              className="cursor-pointer"
              onClick={() => {
                handleSaveDraft({ ...formData, attachments });
                setComposing(false);
                onCancel();
              }}
            />
          </div>
        </div>
        <form className="flex flex-col gap-3" onSubmit={sendMail}>
          <div className="border-b flex items-center gap-3 pb-1">
            <span>To</span>
            <div className="flex items-center w-full gap-2">
              <input
                type="email"
                name="to"
                value={formData.to}
                onChange={handleInputChange}
                className="outline-none flex-grow"
                placeholder="Enter email or select from contacts"
              />
              <button
                type="button"
                onClick={() => setIsContactModalOpen(true)}
                className="text-blue-600 hover:bg-blue-50 p-1 rounded-full"
              >
                <FaUserPlus />
              </button>
            </div>
          </div>

          {/* Selected Contacts Chips */}
          {selectedContacts.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center"
                >
                  {contact.name}
                  <button
                    type="button"
                    onClick={() => handleContactSelect(contact)}
                    className="ml-2 text-blue-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="border-b flex items-center gap-3 pb-1">
            <span>Subject</span>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="outline-none w-full"
              required
            />
          </div>

          {/* Priority Selector (Previous Implementation) */}
          <div className="border-b flex items-center gap-3 pb-1">
            <span>Priority</span>
            <div className="flex items-center space-x-2 w-full">
              {PRIORITY_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className={`
                    flex items-center justify-center gap-1 px-2 py-1 rounded-full cursor-pointer w-full
                    ${
                      formData.priority === option.value
                        ? `${option.bgColor} ${option.color} font-semibold`
                        : "hover:bg-gray-100"
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="priority"
                    value={option.value}
                    checked={formData.priority === option.value}
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  <FaCircle className={`w-3 h-3 ${option.color}`} />
                  {option.label.split(" ")[0]}
                </label>
              ))}
            </div>
          </div>

          {/* Attachments Section */}
          <div className="border-b pb-1 overflow-y-auto">
            <div className="flex items-center gap-3">
              <span>Attachments</span>
              <label className="cursor-pointer flex items-center gap-1">
                <input
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <IoMdAttach className="text-gray-600" />
                <span className="text-sm text-gray-600">Add files</span>
              </label>
            </div>

            {/* Attachment List */}
            {attachments.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {attachments.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="flex items-center bg-gray-100 rounded-full px-2 py-1 text-sm"
                  >
                    <span className="mr-2 max-w-[150px] truncate">
                      {file.name}
                    </span>
                    <span className="text-xs text-gray-500 mr-2">
                      {(file.size / 1024).toFixed(1)} KB
                    </span>
                    <IoMdTrash
                      className="text-red-500 cursor-pointer"
                      onClick={() => removeAttachment(file)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-group">
            <EmailEditor
              initialContent={formData.message}
              onChange={handleInputChange}
            />
          </div>

          {isContactModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Select Contacts</h2>
                  <button
                    onClick={() => setIsContactModalOpen(false)}
                    className="text-gray-600 hover:bg-gray-100 p-1 rounded-full"
                  >
                    <IoMdClose />
                  </button>
                </div>
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => handleContactSelect(contact)}
                    className={`
                      flex items-center justify-between p-2 rounded-lg cursor-pointer
                      ${
                        selectedContacts.some((c) => c.id === contact.id)
                          ? "bg-blue-100 text-blue-800"
                          : "hover:bg-gray-100"
                      }
                    `}
                  >
                    <div>
                      <div className="font-medium">{contact.name}</div>
                      <div className="text-sm text-gray-600">
                        {contact.email}
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedContacts.some(
                        (c) => c.id === contact.id
                      )}
                      readOnly
                      className="form-checkbox"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setIsContactModalOpen(false)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg"
                >
                  Confirm Selection
                </button>
              </div>
            </div>
          )}

          {/* Existing Submit Button */}
          <div className="flex gap-2 items-center">
            <button
              type="submit"
              className="bg-[#1A73E8] text-white px-4 py-1 rounded-full"
            >
              {loading ? "Sending..." : "Send"}
            </button>
            <span className="text-sm text-gray-500">
              {attachments.length > 0 &&
                `${attachments.length} file(s) attached`}
            </span>
          </div>
        </form>
      </div>
      <EmailSuccessAnimation
        isVisible={showSuccessAnimation}
        onClose={handleSuccessClose}
      />
    </>
  );
};

export default SendMail;

SendMail.propTypes = {
  draftToEdit: PropTypes.shape({
    id: PropTypes.number,
    to: PropTypes.string,
    subject: PropTypes.string,
    message: PropTypes.string,
    priority: PropTypes.oneOf(["Low", "Medium", "High"]),
    attachments: PropTypes.arrayOf(PropTypes.instanceOf(File)),
  }),
  onCancel: PropTypes.func,
};
