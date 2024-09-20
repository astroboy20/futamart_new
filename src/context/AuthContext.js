"use client";
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Typewriter } from "react-simple-typewriter";
import { Logo_Black } from "@/assets";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  //   const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
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
      console.error("Failed to fetch user:", error);
      if (error?.response?.status === 401 || error?.response?.staus === 403) {
        router.push("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (jwt, redirect) => {
    Cookies.set("token", jwt, { expires: 7 });
    await fetchUser(jwt);
    router.push(redirect || "/");
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div className="w-full h-[100dvh] flex items-center justify-center">
        <div className="flex flex-col text-center">
          <Logo_Black />
          <h1 className="text-[32px] font-[600]">
            {" "}
            <Typewriter
              words={["futamart"]}
              loop={5}
              cursor
              cursorStyle="_"
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={1000}
            />
            {/* futamart */}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
