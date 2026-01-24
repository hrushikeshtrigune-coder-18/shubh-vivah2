import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Mock login function
    const login = async (email, password) => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setUser({ email, name: 'Test User' });
            setIsLoading(false);
        }, 1000);
    };

    // Mock logout function
    const logout = () => {
        setUser(null);
    };

    const register = async (userData) => {
        setIsLoading(true);
        setTimeout(() => {
            setUser(userData);
            setIsLoading(false);
        }, 1000);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};
