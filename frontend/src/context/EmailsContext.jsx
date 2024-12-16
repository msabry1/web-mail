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
  const [drafts, setDrafts] = useState(() => {
    //! Initializing drafts from localStorage on first render
    try {
      const savedDrafts = localStorage.getItem("emailDrafts");
      return savedDrafts ? JSON.parse(savedDrafts) : [];
    } catch (error) {
      console.error("Error parsing drafts from localStorage:", error);
      return [];
    }
  });

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

  useEffect(() => {
    localStorage.setItem("emailDrafts", JSON.stringify(drafts));
  }, [drafts]);

  useEffect(() => {
    setSelectedEmails([]);
  }, [filter, searchQuery, currentFolder]);

  const filteredEmails = useMemo(() => {
    let emailsToFilter = emails;

    if (currentFolder === "starred") {
      emailsToFilter = emails.filter((email) => email.starred);
    } else if (currentFolder !== "inbox") {
      emailsToFilter = emails.filter((email) => email.folder === currentFolder);
    }

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
    if (currentFolder === "drafts") {
      setSelectedEmails(
        selectedEmails.length > 0 ? [] : drafts.map((email) => email.id)
      );
    } else
      setSelectedEmails(
        selectedEmails.length > 0 ? [] : filteredEmails.map((email) => email.id)
      );
  };

  const saveDraft = (draftData) => {
    const existingDraftIndex = drafts.findIndex(
      (draft) => draft.id === draftData.id
    );

    if (existingDraftIndex !== -1) {
      const updatedDrafts = [...drafts];
      updatedDrafts[existingDraftIndex] = {
        ...draftData,
        createdAt: new Date(),
      };
      setDrafts(updatedDrafts);
    } else {
      const newDraft = {
        ...draftData,
        id: Date.now(), //! Use timestamp as unique ID
        createdAt: new Date(),
      };
      setDrafts([...drafts, newDraft]);
    }
    localStorage.setItem("emailDrafts", JSON.stringify(drafts));
  };

  const deleteDraft = (draftId) => {
    setDrafts(drafts.filter((draft) => draft.id !== draftId));
  };
  return (
    <EmailsContext.Provider
      value={{
        emails: filteredEmails,
        setEmails,
        drafts,
        saveDraft,
        deleteDraft,
        selectedEmails,
        setSelectedEmails,
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
