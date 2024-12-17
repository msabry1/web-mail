import { toast } from "sonner";

export const saveToLocalStorage = (key, value) => {
  try {
    if (value === undefined || value === null) {
      console.warn(`Attempted to save invalid value (${value}) to ${key}`);
      return;
    }
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
    handleLocalStorageError(error, key);
  }
};

export const getFromLocalStorage = (key, defaultValue = []) => {
  try {
    const item = localStorage.getItem(key);
    return JSON.parse(item || "[]") ?? defaultValue;
  } catch (error) {
    console.error(`Error parsing ${key} from localStorage:`, error);
    return defaultValue;
  }
};

const handleLocalStorageError = (error, key) => {
  if (error instanceof DOMException && error.name === "QuotaExceededError") {
    toast.error("Storage Limit Exceeded", {
      description: `Unable to save ${key}. Storage is full.`,
      duration: 3000,
    });
  } else {
    toast.error("Storage Error", {
      description: `Failed to save ${key} to local storage.`,
      duration: 3000,
    });
  }
};
