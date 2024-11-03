"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  jwtToken: string;
  xsrf: string;
  loading: boolean; // New state to indicate loading
};

// Create a context with an initial value of `null`
const AuthContext = createContext<AuthContextType | null>(null);

// Create a provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [jwtToken, setJwtToken] = useState<string>('');
  const [xsrf, setXsrf] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true); // Initial loading state

  useEffect(() => {
    const checkAuth = () => {
      try {
        const userDetails = JSON.parse(sessionStorage.getItem('userdetails')!);
        if (userDetails && userDetails.authStatus === 'AUTH') {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }

        const jwt = sessionStorage.getItem('Authorization')!;
        if (jwt) {
          setJwtToken(jwt);
        }

        const xsrf = sessionStorage.getItem('XSRF-TOKEN')!;
        if (xsrf) {
          setXsrf(xsrf);
        }

        setLoading(false); // Authentication check complete
      } catch (error) {
        console.error('Error checking authentication status:', error);
        setIsAuthenticated(false);
        setLoading(false); // Ensure loading ends even on error
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, jwtToken, xsrf, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = (): AuthContextType | null => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('AuthContext not found');
  }
  return context;
};
