import { useState } from "react";
import { CheckSquare, Square, Star } from "lucide-react";
import { useEmailsContext, PriorityIcons } from "../../context/EmailsContext";
import { useNavigate } from "react-router-dom";

const MailsList = () => {
  const navigate = useNavigate();
  const {
    emails,
    setEmails,
    selectedEmails,
    toggleEmailSelection,
    toggleSelectAll,
    setFilter,
  } = useEmailsContext();

  const priorityOptions = ["All", "Major", "Medium", "Minor"];

  const handleEmailClick = (email) => {
    // Placeholder for email navigation
    navigate(`/email/${email.id}`);
  };

  const [active, setActive] = useState(0);
  const handleOptionsClick = (item, index) => {
    setActive(index);
    setFilter(item);
  };

  const handleToggleStar = (email, e) => {
    //TODO: update to backend 
    e.stopPropagation(); // Prevent email from being opened when clicking star
    email.starred = !email.starred;
    setEmails((prevEmails) =>
      prevEmails.map((e) => (e.id === email.id ? email : e))
    );
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
              <img src={PriorityIcons[item]} alt={item} width={20} />
              {item}
            </div>
          );
        })}
      </div>

      {/* Email List Header */}
      <div className="flex items-center border-b pb-2 mb-2 mt-3">
        <div className="mr-4 cursor-pointer" onClick={toggleSelectAll}>
          {selectedEmails.length === emails.length && emails.length > 0 ? (
            <CheckSquare size={20} />
          ) : (
            <Square size={20} />
          )}
        </div>

        <div className="flex-grow text-sm text-gray-500">
          {selectedEmails.length > 0
            ? `${selectedEmails.length} emails selected`
            : "No emails selected"}
        </div>

        {selectedEmails.length > 0 && (
          <button
            className="bg-red-500 text-white px-3 py-1 rounded text-sm"
            onClick={() => {
              //TODO:
              /* Delete selected emails */
            }}
          >
            Delete Selected
          </button>
        )}
      </div>

      {/* Email List */}
      {emails.map((email) => (
        <div
          key={email.id}
          className={`flex gap-2 items-center justify-between border-b py-2 cursor-pointer hover:bg-gray-50 ${
            selectedEmails.includes(email.id) ? "bg-gray-100" : ""
          }`}
        >
          <div className="mr-4" onClick={() => toggleEmailSelection(email.id)}>
            {selectedEmails.includes(email.id) ? (
              <CheckSquare size={20} />
            ) : (
              <Square size={20} />
            )}
          </div>
          <div
            className="flex-grow flex items-center gap-2"
            onClick={() => handleEmailClick(email)}
          >
            <img
              src={PriorityIcons[email.priority]}
              alt={`${email.priority} priority`}
              className="w-5 h-5"
            />
            <div className="flex-grow">
              <p
                className={`font-semibold ${
                  !email.read ? "text-black" : "text-gray-500"
                }`}
              >
                {email.to}
              </p>
              <p className="text-sm text-gray-600 truncate">{email.subject}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Star Button */}
            <button
              onClick={(e) => handleToggleStar(email, e)}
              className="hover:bg-gray-100 rounded-full p-1"
            >
              <Star
                size={20}
                fill={email.starred ? "gold" : "none"}
                stroke={email.starred ? "gold" : "currentColor"}
                className="transition-colors duration-200"
              />
            </button>

            <div className="text-sm text-gray-500">
              {new Date(email?.createdAt?.seconds * 1000)
                .toUTCString()
                .slice(5, 11)}
            </div>
          </div>
        </div>
      ))}

      {/* No Emails State */}
      {emails.length === 0 && (
        <div className="text-center text-gray-500 py-8">No emails found</div>
      )}
    </div>
  );
};

export default MailsList;
