"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter, useSearchParams } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect');
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            fetchUser(token);
        } else {
            setIsLoading(false);
        }
    }, []);

    const fetchUser = async (token) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error('Failed to fetch user:', error);
        } finally {
            setIsLoading(false);
        }
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

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
