import React, { useState, useEffect } from 'react';
import { googleUser, verifyToken } from '../services/api';
import { AuthContext } from './AuthContext';
import { useGoogleLogin } from "@react-oauth/google";

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    // Retrieve user data from localStorage on page load
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          const userData = await verifyToken(token);
          setUser(userData);
          setIsAuthenticated(true);
          localStorage.setItem("user", JSON.stringify(userData)); // Store user persistently
        } catch (err) {
          console.error("Authentication error:", err);
          localStorage.removeItem("access_token");
          localStorage.removeItem("user");
          setError("Session expired. Please login again.");
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (google_code) => {
      try {
        const access_token = await googleUser(google_code);
        if (access_token) {
          localStorage.setItem('access_token', access_token.access_token);
          const userData = await verifyToken(access_token.access_token);
          setUser(userData);
          setIsAuthenticated(true);
          localStorage.setItem("user", JSON.stringify(userData));
        }
      } catch (err) {
        console.error("Google login error:", err);
        setError(err.message || "Failed to login. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    onError: (error) => {
      console.error("Google login failed:", error);
      setError("Google login failed. Please try again.");
    },
  });

  // Login with Google
  const login = async () => {
    setLoading(true);
    setError(null);
    googleLogin();
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
    setIsAuthenticated(false);
  };

  // Get current token
  const getToken = () => {
    return localStorage.getItem('access_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        login,
        logout,
        getToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};