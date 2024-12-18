import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
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
  const [drafts, setDrafts] = useState([]);
  const { user } = useUser();
  const [filter, setFilter] = useState({
    subject: "",
    body: "",
    date: null,
    attachmentName: "",
    folder: "",
  });

  // Refactored filtering logic with improved readability
  const applyEmailFilters = useCallback(
    (emailsToFilter) => {
      return emailsToFilter.filter((email) => {
        const matchesSearch = [email.subject, email.to, email.body].some(
          (field) => field.toLowerCase().includes(searchQuery.toLowerCase())
        );

        const matchesPriority =
          priority === "All" ||
          email.priority.toUpperCase() === priority.toUpperCase();

        return matchesSearch && matchesPriority;
      });
    },
    [searchQuery, priority]
  );

  // Centralized email fetching and filtering logic
  const fetchFilteredEmails = useCallback(async () => {
    try {
      // Create a copy of filter to avoid mutation
      const filterDTO = { ...filter };

      // Adjust filter based on current folder
      if (currentFolder === "sent") {
        filterDTO.sender = user?.username;
        filterDTO.receiver =
          filterDTO.receiver === user?.username ? "" : filterDTO.receiver;
      } else {
        filterDTO.receiver = user?.username;
        filterDTO.sender =
          filterDTO.sender === user?.username ? "" : filterDTO.sender;
      }

      // Fetch emails based on filter
      let emailsToFilter = await MailService.fetchEmails(filterDTO);

      // Apply folder-specific filtering
      switch (currentFolder) {
        case "starred":
          emailsToFilter = emailsToFilter.filter((email) => email.starred);
          break;
        case "drafts":
          emailsToFilter = drafts;
          break;
        default:
          if (currentFolder !== "inbox" && currentFolder !== "sent") {
            emailsToFilter = emails.filter(
              (email) => email.folder === currentFolder
            );
          }
      }

      // Apply search and priority filters
      const result = applyEmailFilters(emailsToFilter);
      setFilteredEmails(result);
    } catch (error) {
      console.error("Error fetching filtered emails:", error);
    }
  }, [emails, drafts, filter, currentFolder, user, applyEmailFilters]);

  // Fetch and filter emails when dependencies change
  useEffect(() => {
    fetchFilteredEmails();
  }, [fetchFilteredEmails]);

  // Load drafts from localStorage when username changes
  useEffect(() => {
    if (user?.username) {
      const savedDrafts =
        getFromLocalStorage(`${user.username}-emailDrafts`) || [];
      setDrafts(savedDrafts);
    }
  }, [user?.username]);

  // Save drafts to localStorage when drafts change
  useEffect(() => {
    if (user?.username && drafts) {
      saveToLocalStorage(`${user.username}-emailDrafts`, drafts);
    }
  }, [user?.username, drafts]);

  // Reset selected emails on certain changes
  useEffect(() => {
    setSelectedEmails([]);
  }, [priority, searchQuery, currentFolder]);

  // Memoized email selection handlers
  const toggleEmailSelection = useCallback((emailId) => {
    setSelectedEmails((prev) =>
      prev.includes(emailId)
        ? prev.filter((id) => id !== emailId)
        : [...prev, emailId]
    );
  }, []);

  const toggleSelectAll = useCallback(() => {
    const emailsToSelect =
      currentFolder === "drafts"
        ? drafts.map((email) => email.id)
        : filteredEmails.map((email) => email.id);

    setSelectedEmails((prev) => (prev.length > 0 ? [] : emailsToSelect));
  }, [currentFolder, drafts, filteredEmails]);

  // Draft-related utilities
  const isEmptyDraft = useCallback(
    (draft) => !draft.id && !draft.to && !draft.subject && !draft.message,
    []
  );

  const saveDraft = useCallback(
    (draftData) => {
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
    },
    [isEmptyDraft]
  );

  // Email management methods
  const deleteDrafts = useCallback(
    (draftIds) => {
      setSelectedEmails(selectedEmails.filter((id) => !draftIds.includes(id)));
      setDrafts(drafts.filter((draft) => !draftIds.includes(draft.id)));
    },
    [selectedEmails, drafts]
  );

  const deleteEmails = useCallback(
    async (emailIds) => {
      // Uncomment and implement actual deletion when backend is ready
      // await Promise.all(emailIds.map(id => MailService.deleteEmail(id)));

      setSelectedEmails(
        selectedEmails.filter((email) => !emailIds.includes(email.id))
      );
      setEmails((prev) => prev.filter((email) => !emailIds.includes(email.id)));
    },
    [selectedEmails]
  );

  const toggleStarEmail = useCallback((email) => {
    // TODO: Update to backend
    setEmails((prevEmails) =>
      prevEmails.map((e) =>
        e.id === email.id ? { ...e, starred: !e.starred } : e
      )
    );
  }, []);

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

export const useEmailsContext = () => {
  const context = useContext(EmailsContext);
  if (!context) {
    throw new Error("useEmailsContext must be used within an EmailsProvider");
  }
  return context;
};

export default EmailsContext;
