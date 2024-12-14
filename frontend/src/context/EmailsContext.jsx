import { createContext, useContext, useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";

export const PriorityIcons = {
  All: "/inbox.png",
  Major: "/high.png",
  Medium: "/medium.png",
  Minor: "/low.png",
};

const EmailsContext = createContext();

export const EmailsProvider = ({ children }) => {
  const [emails, setEmails] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentFolder, setCurrentFolder] = useState("inbox");

  useEffect(() => {
    const fetchedEmails = [
      {
        id: 1,
        to: "john.doe@example.com",
        subject: "Meeting Reminder",
        message: "Don't forget about the meeting at 10am.",
        createdAt: { seconds: 1678955452 },
        priority: "Major",
        read: false,
        starred: false,
      },
      {
        id: 2,
        to: "jane.doe@example.com",
        subject: "Promotion Offer",
        message: "Get 50% off on your next purchase.",
        createdAt: { seconds: 1678955735 },
        priority: "Minor",
        read: false,
        starred: true,
      },
      {
        id: 3,
        to: "support@company.com",
        subject: "System Update Notification",
        message: "Important system maintenance scheduled.",
        createdAt: { seconds: 1678956000 },
        priority: "Medium",
        read: false,
        starred: true,
      },
    ];
    setEmails(fetchedEmails);
  }, []);

  const filteredEmails = useMemo(() => {
    console.log("in filtering currentFolder", currentFolder);
    // First, filter based on folder
    let emailsToFilter = emails;
    if (currentFolder === "starred") {
      emailsToFilter = emails.filter((email) => email.starred);
    } else if (currentFolder !== "inbox") {
      // For custom folders or other specific filters
      // You might fetch or filter differently based on the folder
      // This is a placeholder for custom folder logic
      emailsToFilter = emails.filter((email) => email.folder === currentFolder);
    }

    // Then apply search and priority filters
    return emailsToFilter.filter((email) => {
      const matchesSearch =
        email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.message.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPriority = filter === "All" || email.priority === filter;

      return matchesSearch && matchesPriority;
    });
  }, [emails, searchQuery, filter, currentFolder]);

  const toggleEmailSelection = (emailId) => {
    setSelectedEmails((prev) =>
      prev.includes(emailId)
        ? prev.filter((id) => id !== emailId)
        : [...prev, emailId]
    );
  };

  const toggleSelectAll = () => {
    setSelectedEmails(
      selectedEmails.length === filteredEmails.length
        ? []
        : filteredEmails.map((email) => email.id)
    );
  };

  return (
    <EmailsContext.Provider
      value={{
        emails: filteredEmails,
        setEmails,
        selectedEmails,
        toggleEmailSelection,
        toggleSelectAll,
        setSearchQuery,
        searchQuery,
        setFilter,
        filter,
        currentFolder,
        setCurrentFolder,
      }}
    >
      {children}
    </EmailsContext.Provider>
  );
};

// Hook to use the EmailsContext
export const useEmailsContext = () => {
  const context = useContext(EmailsContext);
  if (!context) {
    throw new Error("useEmailsContext must be used within an EmailsProvider");
  }
  return context;
};

EmailsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
