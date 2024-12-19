import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";
import PropTypes from "prop-types";
import { PRIORITY_LEVELS } from "../constants/priorities";
import { saveToLocalStorage, getFromLocalStorage } from "../utils/localStorage";
import MailService from "../services/MailService";
const EmailsContext = createContext();

export const EmailsProvider = ({ children }) => {
  const [emails, setEmails] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [priority, setPriority] = useState(PRIORITY_LEVELS.ALL);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentFolder, setCurrentFolder] = useState("inbox");
  const [drafts, setDrafts] = useState();
  const { user } = useUser();
  const [filter, setFilter] = useState({
    subject: "",
    body: "",
    date: null,
    attachmentName: "",
    folder: "",
  });

  useEffect(() => {
    const fetchFilteredEmails = async () => {
      try {
        let filterDTO = filter;
        // if (currentFolder === "sent")
        //   (filterDTO.sender = `${user?.username}`),
        //     (filterDTO.receiver =
        //       filterDTO.receiver == user?.username ? "" : filterDTO.receiver);
        // else
        //   (filterDTO.receiver = `${user?.username}`),
        //     (filterDTO.sender =
        //       filterDTO.sender == user?.username ? "" : filterDTO.sender);

        console.log("Filter DTO:", filterDTO, filter);
        let emailsToFilter = await MailService.fetchEmails(filterDTO);
        console.log("Filtered emails:", emailsToFilter);

        if (currentFolder === "starred") {
          emailsToFilter = emailsToFilter.filter((email) => email.starred);
        } else if (currentFolder === "drafts") {
          emailsToFilter = drafts;
        } else if (currentFolder !== "inbox" && currentFolder !== "sent") {
          emailsToFilter = emails.filter(
            (email) => email.folder === currentFolder
          );
        }

        const result = emailsToFilter.filter((email) => {
          const matchesSearch =
            email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            email.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
            email.body.toLowerCase().includes(searchQuery.toLowerCase());

          const matchesPriority =
            priority === "All" ||
            email.priority.toUpperCase() === priority.toUpperCase();

          return matchesSearch && matchesPriority;
        });

        setFilteredEmails(result);
      } catch (error) {
        console.error("Error fetching filtered emails:", error);
      }
    };

    fetchFilteredEmails();
  }, [emails, searchQuery, priority, currentFolder, drafts, filter, user]);

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
  }, [priority, searchQuery, currentFolder]);

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
  const deleteEmails = async (emailIds) => {
    // console.log("Deleting emails:", emailIds);
    // await emailIds.forEach((e) => {
    //   MailService.deleteEmail(e);
    // });
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
        setPriority,
        priority,
        currentFolder,
        setCurrentFolder,
        toggleStarEmail,
        deleteEmails,
        setFilter,
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
