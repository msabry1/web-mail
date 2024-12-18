import { useState, useCallback } from 'react';
import authAxios, { setAuthData, clearAuthData } from '../services/authAxios';
import { handleRequest } from '../services/handleRequest';

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = useCallback(async (username, password) => {
        setIsLoading(true);
        setError(null);

        const { data, error: requestError } = await handleRequest(() =>
            authAxios.post('/auth/login', { username, password })
        );

        if (requestError) {
            setError(requestError);
            setIsLoading(false);
            return false;
        }

        const { token, ...userData } = data;
        setAuthData(token, userData);
        setIsLoading(false);
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
            window.location.href = '/login';
        } catch (error) {
            console.error('Logout error:', error);
            // Still clear local auth data even if logout request fails
            clearAuthData();
            window.location.href = '/login';
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { logout, isLoading };
};