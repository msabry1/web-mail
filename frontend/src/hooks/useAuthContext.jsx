import { createContext, useContext, useState, useEffect } from 'react';
import { getAuthData } from '../services/authAxios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ user: null, isLoading: true });

    useEffect(() => {
        const { user } = getAuthData();
        setAuth({ user, isLoading: false });
    }, []);

    return (
        <AuthContext.Provider value={{ ...auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};