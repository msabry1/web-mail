import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import UserService from "../services/UserService";
const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userFolders, setUserFolders] = useState([]);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (credentials) => {
    try {
      const data = await UserService.fetchUserById(1);

      // localStorage.setItem("token", data.token);
      // setToken(data.token);
      setIsAuthenticated(true);
      setUser({
        name: `${data?.firstName || ""} ${data?.lastName || ""}`.trim(),
        username: data?.username,
        image:
          data?.firstName || data?.lastName
            ? `https://ui-avatars.com/api/?name=${data.firstName}+${data.lastName}`
            : `/default-avatar.jpg`,
      });
      setUserFolders(data.foldersNames);
    } catch (error) {
      console.error("Login failed", error);
      // setIsAuthenticated(false);
    }
  };

  // useEffect(() => {
    // login(null);
  // }, []);

  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    userFolders,
    token,
    isAuthenticated,
    setIsAuthenticated,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContext;
