"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';


// Create a context with an initial value of `null`
const AuthContext = createContext(false);

// Create a provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
      } catch (error) {
        console.error('Error checking authentication status:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={isAuthenticated}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};