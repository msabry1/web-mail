import { useState, useCallback } from "react";
import authAxios, { setAuthData, clearAuthData } from "../services/authAxios";
import { handleRequest } from "../services/handleRequest";
import { useUser } from "../context/UserContext";
export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setIsAuthenticated, setUser } = useUser();
  const login = useCallback(async (username, password) => {
    setIsLoading(true);
    setError(null);
    console.log("Username:", username);
    console.log("password:", password);
    const { data, error: requestError } = await handleRequest(() =>
      authAxios.post("/auth/login", { username, password })
    );
    console.log("Login response:", data, requestError);
    if (requestError) {
      setError(requestError);
      setIsLoading(false);
      return false;
    }
    setUser({
      name: `${data?.firstName || ""} ${data?.lastName || ""}`.trim(),
      username: data?.username,
      image:
        data?.firstName || data?.lastName
          ? `https://ui-avatars.com/api/?name=${data.firstName}+${data.lastName}`
          : `/default-avatar.jpg`,
    });
    const { token, ...userData } = data;
    setAuthData(token, userData);
    setIsLoading(false);
    setIsAuthenticated(true);
    return true;
  }, []);

  return { login, isLoading, error };
};

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);

  const logout = useCallback(async () => {
    setIsLoading(true);

    try {
      // Optional: Call logout endpoint if your backend requires it
      // await authAxios.post('/auth/logout');
      clearAuthData();
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
      // Still clear local auth data even if logout request fails
      clearAuthData();
      window.location.href = "/login";
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { logout, isLoading };
};
