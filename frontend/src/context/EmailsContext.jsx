import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useUser } from "./UserContext";
import PropTypes from "prop-types";
import { toast } from "sonner";

export const PriorityIcons = {
  All: "/inbox.png",
  High: "/high.png",
  Medium: "/medium.png",
  Low: "/low.png",
};

const EmailsContext = createContext();

export const EmailsProvider = ({ children }) => {
  const [emails, setEmails] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentFolder, setCurrentFolder] = useState("inbox");
  const [drafts, setDrafts] = useState();
  const { user } = useUser();

  useEffect(() => {
    const fetchedEmails = [
      {
        id: 1,
        to: "john.doe@example.com",
        subject: "Meeting Reminder",
        message: "Don't forget about the meeting at 10am.",
        createdAt: { seconds: 1678955452 },
        priority: "High",
        read: false,
        starred: false,
      },
      {
        id: 2,
        to: "jane.doe@example.com",
        subject: "Promotion Offer",
        message: "Get 50% off on your next purchase.",
        createdAt: { seconds: 1678955735 },
        priority: "Low",
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
    if (user?.username) {
      try {
        const savedDrafts = JSON.parse(
          localStorage.getItem(`${user.username}-emailDrafts`) ?? "[]"
        );
        setDrafts(savedDrafts);
      } catch (error) {
        console.error("Error parsing drafts from localStorage:", error);
      }
    }
  }, [user?.username]);

useEffect(() => {
  if (user?.username) {
    try {
      // Attempt to save drafts to localStorage
      localStorage.setItem(
        `${user.username}-emailDrafts`,
        JSON.stringify(drafts)
      );
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "QuotaExceededError"
      ) {
        toast.error("Draft could not be saved", {
          description:
            "Your draft is too large to save locally. Try removing some attachments or large content.",
          duration: 3000,
        });

      } else {
        toast.error("Unable to save draft", {
          description: "An unexpected error occurred while saving your draft.",
          duration: 3000,
        });
      }
    }
  }
}, [user?.username, drafts]);

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
        attachments: []
      };
      setDrafts(updatedDrafts);
    } else {
      if (
        draftData.id === null &&
        draftData.to === "" &&
        draftData.subject === "" &&
        draftData.message === ""
      )
        return;
      const newDraft = {
        ...draftData,
        id: Date.now(), //! Use timestamp as unique ID
        createdAt: new Date(),
        attachments: [],
      };
      setDrafts([...drafts, newDraft]);
    }
  };

  const deleteDrafts = (draftIds) => {
    setSelectedEmails(selectedEmails.filter((id) => !draftIds.includes(id)));
    setDrafts(drafts.filter((draft) => !draftIds.includes(draft.id)));
  };
  //TODO: update to backend
  const deleteEmails = (emailIds) => {
    setSelectedEmails(
      selectedEmails.filter((email) => !emailIds.includes(email.id))
    );
    setEmails((prev) => prev.filter((email) => !emailIds.includes(email.id)));
  };

  const toggleStarEmail = (email, e) => {
    //TODO: update to backend
    e.stopPropagation(); // Prevent email from being opened when clicking star
    email.starred = !email.starred;
    setEmails((prevEmails) =>
      prevEmails.map((e) => (e.id === email.id ? email : e))
    );
  };

  return (
    <EmailsContext.Provider
      value={{
        emails: filteredEmails,
        setEmails,
        drafts,
        saveDraft,
        deleteDrafts,
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
        toggleStarEmail,
        deleteEmails,
      }}
    >
      {children}
    </EmailsContext.Provider>
  );
};

EmailsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook to use the EmailsContext
export const useEmailsContext = () => {
  const context = useContext(EmailsContext);
  if (!context) {
    throw new Error("useEmailsContext must be used within an EmailsProvider");
  }
  return context;
};
