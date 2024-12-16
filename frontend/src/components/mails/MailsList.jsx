import { useState } from "react";
import { CheckSquare, Square, Star } from "lucide-react";
import { useEmailsContext, PriorityIcons } from "../../context/EmailsContext";
import { useNavigate } from "react-router-dom";
import SendMail from "../mail-composing/send-mail/SendMail"; // Import SendMail for draft editing
import { useUI } from "../../context/UIContext";
const MailsList = () => {
  const navigate = useNavigate();
  const {
    emails,
    drafts,
    setEmails,
    deleteDraft,
    selectedEmails,
    toggleEmailSelection,
    toggleSelectAll,
    setFilter,
    currentFolder, // Add currentFolder
    setCurrentFolder, // Add setCurrentFolder
  } = useEmailsContext();
  const { setComposing } = useUI();
  const [editingDraft, setEditingDraft] = useState(null);
  const priorityOptions = ["All", "Major", "Medium", "Minor"];

  const handleEmailClick = (email) => {
    if (currentFolder === "drafts") {
      setComposing(false);
      setEditingDraft(email);
    }
    // Placeholder for email navigation
    else navigate(`/email/${email.id}`);
  };

  const [active, setActive] = useState(0);
  const handleOptionsClick = (item, index) => {
    setActive(index);
    if (item === "drafts") {
      setCurrentFolder("drafts");
    } else {
      // For priority filters
      setFilter(item);
    }
  };

  const handleToggleStar = (email, e) => {
    //TODO: update to backend
    e.stopPropagation(); // Prevent email from being opened when clicking star
    email.starred = !email.starred;
    setEmails((prevEmails) =>
      prevEmails.map((e) => (e.id === email.id ? email : e))
    );
  };

  if (editingDraft) {
    return (
      <SendMail
        draftToEdit={editingDraft}
        onCancel={() => setEditingDraft(null)}
      />
    );
  }

  const displayItems = currentFolder === "drafts" ? drafts : emails;

  //* for (select all) check box
  const isAllSelected = () => {
    if (currentFolder === "drafts")
      return selectedEmails.length === drafts.length && selectedEmails > 0;
    return selectedEmails.length === emails.length && emails.length > 0;
  };

  return (
    <div className="bg-white rounded-lg flex flex-col w-full lg:mr-5">
      {/* MailsList Header */}
      <div className="md:flex hidden lg:gap-5 gap-2 items-center inbox-nav">
        {priorityOptions.map((item, index) => {
          return (
            <div
              className={`flex items-center gap-3 hover:bg-gray-100 cursor-pointer px-5 py-3 ${
                active === index
                  ? "text-indigo-500 border-b-2 border-indigo-500"
                  : ""
              }`}
              key={index}
              onClick={() => handleOptionsClick(item, index)}
            >
              <img
                src={item === "drafts" ? "/draft.png" : PriorityIcons[item]}
                alt={item}
                width={20}
              />
              {item}
            </div>
          );
        })}
      </div>

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
            onClick={() => {
              //TODO: Implement delete functionality for emails and drafts
              if (currentFolder === "drafts") {
                selectedEmails.forEach((id) => deleteDraft(id));
              } else {
                // Delete selected emails
                // Implement email deletion logic
              }
            }}
          >
            Delete Selected
          </button>
        )}
      </div>

      {/* Email/Draft List */}
      {displayItems.map((item) => (
        <div
          key={item.id}
          className={`flex gap-2 items-center justify-between border-b py-2 cursor-pointer hover:bg-gray-50 ${
            selectedEmails.includes(item.id) ? "bg-gray-100" : ""
          }`}
        >
          <div className="mr-4" onClick={() => toggleEmailSelection(item.id)}>
            {selectedEmails.includes(item.id) ? (
              <CheckSquare size={20} />
            ) : (
              <Square size={20} />
            )}
          </div>

          {/* Content differs slightly for drafts vs emails */}
          {currentFolder === "drafts" ? (
            <div
              className="flex-grow flex items-center gap-2"
              onClick={() => handleEmailClick(item)}
            >
              <div className="flex-grow">
                <p className="font-semibold">{item.to || "No recipient"}</p>
                <p className="text-sm text-gray-600 truncate">
                  {item.subject || "No subject"}
                </p>
                <p className="text-xs text-gray-500">
                  Saved: {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ) : (
            <>
              <div
                className="flex-grow flex items-center gap-2"
                onClick={() => handleEmailClick(item)}
              >
                <img
                  src={PriorityIcons[item.priority]}
                  alt={`${item.priority} priority`}
                  className="w-5 h-5"
                />
                <div className="flex-grow">
                  <p
                    className={`font-semibold ${
                      !item.read ? "text-black" : "text-gray-500"
                    }`}
                  >
                    {item.to}
                  </p>
                  <p className="text-sm text-gray-600 truncate">
                    {item.subject}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Star Button */}
                <button
                  onClick={(e) => handleToggleStar(item, e)}
                  className="hover:bg-gray-100 rounded-full p-1"
                >
                  <Star
                    size={20}
                    fill={item.starred ? "gold" : "none"}
                    stroke={item.starred ? "gold" : "currentColor"}
                    className="transition-colors duration-200"
                  />
                </button>

                <div className="text-sm text-gray-500 mr-2">
                  {new Date(item?.createdAt?.seconds * 1000)
                    .toUTCString()
                    .slice(5, 11)}
                </div>
              </div>
            </>
          )}
        </div>
      ))}

      {/* No Items State */}
      {displayItems.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          {currentFolder === "drafts" ? "No drafts saved" : "No emails found"}
        </div>
      )}
    </div>
  );
};

export default MailsList;
