"use client"
import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const router = useRouter()
    const [redirect, setRedirect] = useState(null);
    const [user, setUser] = useState(null);
    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            fetchUser(token);
        }

        const searchParams = new URLSearchParams(window.location.search);
        setRedirect(searchParams.get('redirect'));
    }, []);

    const fetchUser = async (token) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        setUser(data);
    };

    const login = async (jwt) => {
        Cookies.set('token', jwt, { expires: 7 });
        await fetchUser(jwt);
        router.push(redirect || '/');
    };

    const logout = () => {
        Cookies.remove('token');
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);