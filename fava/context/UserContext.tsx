import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import api from '@/ultils/axiosInstance';

type User = {
  name: string;
  email: string;
  currentLocation: string;
  suggestions: number;
  clothes: any[]
  usefulSuggestions: number;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('accessToken');
      console.log('Current accessToken in AsyncStorage:', token);

      const response = await api.get('/users/profile', {
        // Optional: force inspect headers here too
        transformRequest: [(data, headers) => {
          console.log('Request headers in refreshUser:', headers);
          return data;
        }]
      });

      setUser({
        email: response.data.userEmail,
        name: response.data.userName,
        currentLocation: response.data.currentLocation,
        suggestions: response.data.suggestions,
        clothes: response.data.clothes,
        usefulSuggestions: response.data.usefulSuggestions
      });
    } catch (error) {
      setUser(null);
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, setUser, loading, refreshUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
