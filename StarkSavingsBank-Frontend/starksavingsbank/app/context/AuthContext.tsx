"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode} from 'react';

type AuthContextType = {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    jwtToken: string;
    xsrf: string
  };

// Create a context with an initial value of `null`
const AuthContext = createContext<AuthContextType | null>(null);

// Create a provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [jwtToken, setJwtToken] = useState<string>("");
  const [xsrf, setXsrf] = useState<string>("");

  useEffect(() => {
    // Simulate checking authentication status (e.g., checking session storage)
    const checkAuth = () => {
      try {
        const userDetails = JSON.parse(sessionStorage.getItem("userdetails")!);
        if (userDetails && userDetails.authStatus === "AUTH") {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }

        const jwt = JSON.parse(sessionStorage.getItem("Authorization")!);
        if(jwt) {
          setJwtToken(jwt);
        }

        const xsrf = JSON.parse(sessionStorage.getItem("XSRF-TOKEN")!)
        if(xsrf) {
          setXsrf(xsrf)
        }
      } catch (error) {
        console.error('Error checking authentication status:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, jwtToken, xsrf}}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = (): AuthContextType | null => {
  const context = useContext(AuthContext);

  return context;
};