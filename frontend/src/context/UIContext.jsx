import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

// Create the context
const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [composing, setComposing] = useState(false);
  const [profile, setProfile] = useState(false);
  const toggleComposing = () => setComposing((prev) => !prev);
  const toggleProfile = () => setProfile((prev) => !prev);

  // Value to be provided to consuming components
  const value = {
    composing,
    setComposing,
    toggleComposing,
    profile,
    setProfile,
    toggleProfile,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = () => {
  const context = useContext(UIContext);

  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }

  return context;
};

UIProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UIContext;
