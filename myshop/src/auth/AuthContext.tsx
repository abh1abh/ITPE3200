import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User } from "../types/user";
import { jwtDecode } from "jwt-decode";
import * as AuthService from "./AuthService";
import { LoginDto } from "../types/auth";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: LoginDto) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      try {
        const decodedUser: User = jwtDecode(token);
        if (decodedUser.exp * 1000 > Date.now()) {
          setUser(decodedUser);
        } else {
          console.warn("Token has expired");
          localStorage.removeItem("token");
          setUser(null);
          setToken(null);
        }
      } catch (error) {
        console.error("Invalid token: ", error);
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
      }
    }
    setIsLoading(false);
  }, [token]);

  const login = async (credentials: LoginDto) => {
    try {
      setIsLoading(true);
      const { token } = await AuthService.login(credentials);
      localStorage.setItem("token", token);
      const decodedUser: User = jwtDecode(token);
      setUser(decodedUser);
      setToken(token);
    } catch (error) {
      console.error("Login failed: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
