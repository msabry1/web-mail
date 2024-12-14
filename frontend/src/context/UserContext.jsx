import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  
  useEffect(() => {
    setUser(
      {
        name: "Ahmed Mohsen",
        username: "ahmed-mohsen",
        image: "https://ui-avatars.com/api/?name=Ahmed+Mohsen",
      }
    )
    /*
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        setToken(storedToken);
        setIsAuthenticated(true);
        fetchUserDetails(storedToken);
      } catch (error) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    }
*/
  }, []);

  const login = async (credentials) => {
    try {
      const response = /*AuthService.login(credentials)*/ null;
      const data = response.data;
      if (!data || !response.ok) {
        localStorage.setItem("token", data.token);

        setToken(data.token);
        setIsAuthenticated(true);
        setUser(data.user);
      }
    } catch (error) {
      console.error("Login failed", error);
      setIsAuthenticated(false);
    }
  };

  const fetchUserDetails = async (authToken) => {
    try {
      const response = await fetch("/api/user/me", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const userData = response.data;
      setUser(userData);
    } catch (error) {
      console.error("Failed to fetch user details", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    token,
    isAuthenticated,
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
