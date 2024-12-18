import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useUser } from "./UserContext";
import PropTypes from "prop-types";
import { PRIORITY_LEVELS } from "../constants/priorities";
import { saveToLocalStorage, getFromLocalStorage } from "../utils/localStorage";

const EmailsContext = createContext();

export const EmailsProvider = ({ children }) => {
  const [emails, setEmails] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [filter, setFilter] = useState(PRIORITY_LEVELS.ALL);
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
        message:
          "Don't forget about the meeting at 10am. this is the image in the attachments but viewed in markdown ![image](https://webmail-attachments.s3.il-central-1.amazonaws.com/3eeb7cc8-e2fd-4156-8f12-5a5b69a6524c_image-7.png)",
        date: new Date(),
        priority: PRIORITY_LEVELS.HIGH,
        attachments: [
          {
            name: "Meeting Agenda",
            url: "https://webmail-attachments.s3.il-central-1.amazonaws.com/470bf745-19a9-41e9-af26-0f5945fb8366_mvnw.cmd",
            size: 524288, //! size in bytes
            id: 1,
          },
          {
            name: "graph.png",
            url: "https://webmail-attachments.s3.il-central-1.amazonaws.com/3eeb7cc8-e2fd-4156-8f12-5a5b69a6524c_image-7.png",
            size: 524288,
            id: 2,
          },
          {
            name: "file.pdf",
            url: "https://webmail-attachments.s3.il-central-1.amazonaws.com/35c1bf74-5358-4112-8d73-c61f77664d0e_Transcript.pdf+.pdf",
            size: 524288,
            id: 3,
          },
        ],
        read: false,
        starred: false,
      },
      {
        id: 2,
        to: "jane.doe@example.com",
        subject: "Promotion Offer",
        message: "Get 50% off on your next purchase.",
        date: new Date(),
        priority: PRIORITY_LEVELS.LOW,
        read: false,
        starred: true,
      },
      {
        id: 3,
        to: "support@company.com",
        subject: "System Update Notification",
        message: "Important system maintenance scheduled.",
        date: new Date(),
        priority: PRIORITY_LEVELS.MEDIUM,
        read: false,
        starred: true,
      },
    ];
    setEmails(fetchedEmails);
  }, []);

  //* Load drafts from localStorage when username changes
  useEffect(() => {
    if (user?.username) {
      const savedDrafts = getFromLocalStorage(`${user.username}-emailDrafts`);
      setDrafts(savedDrafts ?? []);
    }
  }, [user?.username]);

  //* Save drafts to localStorage when drafts change
  useEffect(() => {
    if (user?.username && drafts) {
      saveToLocalStorage(`${user.username}-emailDrafts`, drafts);
    }
  }, [user?.username, drafts]);

  useEffect(() => {
    setSelectedEmails([]);
  }, [filter, searchQuery, currentFolder]);

  const filteredEmails = useMemo(() => {
    let emailsToFilter = emails;
    console.log("Current folder:", currentFolder);
    if (currentFolder === "starred") {
      emailsToFilter = emails.filter((email) => email.starred);
    } else if (currentFolder === "drafts") {
      emailsToFilter = drafts;
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
  }, [emails, searchQuery, filter, currentFolder, drafts]);

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

  const isEmptyDraft = (draft) =>
    draft.id === null &&
    draft.to === "" &&
    draft.subject === "" &&
    draft.message === "";

  const saveDraft = (draftData) => {
    if (isEmptyDraft(draftData)) return;

    setDrafts((prevDrafts) => {
      const existingIndex = prevDrafts.findIndex(
        (draft) => draft.id === draftData.id
      );

      if (existingIndex !== -1) {
        const updatedDrafts = [...prevDrafts];
        updatedDrafts[existingIndex] = {
          ...draftData,
          date: new Date(),
          attachments: [],
        };
        return updatedDrafts;
      }

      return [
        ...prevDrafts,
        {
          ...draftData,
          id: Date.now(),
          date: new Date(),
          attachments: [],
        },
      ];
    });
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

  const toggleStarEmail = (email) => {
    //TODO: update to backend
    setEmails((prevEmails) =>
      prevEmails.map((e) =>
        e.id === email.id ? { ...e, starred: !e.starred } : e
      )
    );
  };

  return (
    <EmailsContext.Provider
      value={{
        emails: filteredEmails,
        setEmails,
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
