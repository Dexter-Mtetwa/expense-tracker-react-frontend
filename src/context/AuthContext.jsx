import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser as loginApi, registerUser as registerApi } from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('expense_tracker_token'));
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('expense_tracker_user');
    try {
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleUnauthorized = () => {
      setToken(null);
      setUser(null);
      localStorage.removeItem('expense_tracker_token');
      localStorage.removeItem('expense_tracker_user');
    };

    window.addEventListener('auth_unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth_unauthorized', handleUnauthorized);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await loginApi(email, password);
      const accessToken = response.access_token;
      const userData = response.user;

      setToken(accessToken);
      setUser(userData);

      localStorage.setItem('expense_tracker_token', accessToken);
      localStorage.setItem('expense_tracker_user', JSON.stringify(userData));

      return userData;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password) => {
    setLoading(true);
    try {
      const newUser = await registerApi(email, password);
      // Auto login after successful user creation
      await login(email, password);
      return newUser;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('expense_tracker_token');
    localStorage.removeItem('expense_tracker_user');
  };

  const isAuthenticated = Boolean(token);
  const isAdmin = user?.role === 'ADMIN';

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        isAdmin,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
