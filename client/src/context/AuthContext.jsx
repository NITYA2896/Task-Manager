import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
            setLoading(false);
        };
        checkUserLoggedIn();
    }, []);

    const login = async (email, password) => {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
            email,
            password,
        });
        if (res.data) {
            localStorage.setItem('user', JSON.stringify(res.data));
            setUser(res.data);
        }
        return res.data;
    };

    const register = async (name, email, password) => {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
            name,
            email,
            password,
        });
        // Do not auto-login
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
