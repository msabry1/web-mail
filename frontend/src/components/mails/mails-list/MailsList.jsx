import { useState } from "react";
import { CheckSquare, Square } from "lucide-react";
import { useEmailsContext } from "../../../context/EmailsContext";
import { useNavigate } from "react-router-dom";
import SendMail from "../../mail-composing/send-mail/SendMail";
import { useUI } from "../../../context/UIContext";
import MailsListHeader from "./MailsListHeader";
import MailsListItem from "./MailsListItem";

const MailsList = () => {
  const navigate = useNavigate();
  const {
    emails,
    selectedEmails,
    toggleEmailSelection,
    toggleSelectAll,
    currentFolder,
    setCurrentFolder,
    setPriority,
    deleteEmails,
    deleteDrafts,
    toggleStarEmail,
  } = useEmailsContext();

  const { setComposing } = useUI();

  const [editingDraft, setEditingDraft] = useState(null);
  const [activeFilter, setActiveFilter] = useState(0);
  const priorityOptions = ["All", "High", "Medium", "Low"];

  const handleEmailClick = (email) => {
    if (currentFolder === "drafts") {
      setComposing(false);
      setEditingDraft(email);
    }
    
    // Placeholder for email navigation
    else navigate(`/email/${email.id}`);
  };

  const handleFilterChange = (item, index) => {
    console.log("Filtering by:", item, index);
    setActiveFilter(index);
    if (item === "drafts") {
      setCurrentFolder("drafts");
    }
    setPriority(item);
    console.log(emails);
  };

  const handleDelete = () => {
    if (currentFolder === "drafts") {
      deleteDrafts(selectedEmails);
    } else {
      deleteEmails(selectedEmails);
    }
  };

  //* for (select all) check box
  const isAllSelected = () => {
    if (currentFolder === "drafts")
      return selectedEmails.length === emails.length && selectedEmails > 0;
    return selectedEmails.length === emails.length && emails.length > 0;
  };
  console.log("selected emails",emails);

  return (
    <div className="bg-white rounded-lg flex flex-col w-full lg:mr-5">
      <MailsListHeader
        priorityOptions={priorityOptions}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />
      {/* Email List Header */}
      <div className="flex items-center border-b pb-2 mb-2 mt-3">
        <div className="mr-4 cursor-pointer" onClick={toggleSelectAll}>
          {isAllSelected() ? <CheckSquare size={20} /> : <Square size={20} />}
        </div>

        <div className="flex-grow text-sm text-gray-500">
          {selectedEmails.length > 0
            ? `${selectedEmails.length} ${
                currentFolder === "drafts" ? "drafts" : "emails"
              } selected`
            : `No ${currentFolder === "drafts" ? "drafts" : "emails"} selected`}
        </div>

        {selectedEmails.length > 0 && (
          <button
            className="bg-red-500 text-white px-3 py-1 rounded text-sm"
            onClick={handleDelete}
          >
            Delete Selected
          </button>
        )}
      </div>
      {emails.map((item) => (
        <MailsListItem
          key={item.id}
          item={item}
          isSelected={selectedEmails.includes(item.id)}
          onSelect={() => toggleEmailSelection(item.id)}
          onClick={() => handleEmailClick(item)}
          onStar={(e) => {
            e.stopPropagation();
            toggleStarEmail(item.id);
          }}
          isDraft={currentFolder === "drafts"}
        />
      ))}
      {/* No Items State */}
      {emails.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          {currentFolder === "drafts" ? "No drafts saved" : "No emails found"}
        </div>
      )}

      {editingDraft && (
        <SendMail
          draftToEdit={editingDraft}
          onCancel={() => setEditingDraft(null)}
        />
      )}
    </div>
  );
};

export default MailsList;
