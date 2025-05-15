// userContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Used to prevent premature redirects

  // Load user data from AsyncStorage on mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('userData');
        if (storedUser) {
          setUserData(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to load user data from storage:', error);
      } finally {
        setLoading(false); // Important: mark as finished loading
      }
    };

    loadUserData();
  }, []);

  const updateUser = async (newUserData) => {
    try {
      setUserData(newUserData);
      await AsyncStorage.setItem('userData', JSON.stringify(newUserData));
    } catch (error) {
      console.error('Failed to save user data:', error);
    }
  };

  const logoutUser = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      setUserData(null);
    } catch (error) {
      console.error('Failed to remove user data:', error);
    }
  };

  return (
    <UserContext.Provider value={{ userData, updateUser, logoutUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
