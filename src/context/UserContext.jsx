import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user data exists in local storage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('diasporalink_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('diasporalink_user');
      }
    }
    setLoading(false);
  }, []);

  // Update local storage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('diasporalink_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('diasporalink_user');
    }
  }, [user]);

  const updateUser = (userData) => {
    setUser(prevUser => ({
      ...prevUser,
      ...userData
    }));
  };

  const clearUser = () => {
    setUser(null);
  };

  const value = {
    user,
    loading,
    setUser,
    updateUser,
    clearUser
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;