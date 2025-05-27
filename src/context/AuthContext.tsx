import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {createContext, ReactNode, useState} from 'react';

const API_URL = 'http://10.0.2.2:8182';

interface AuthContextData {
  token: string | null;
  isLoading: boolean;
  signUp: (
    userName: string,
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  ) => Promise<boolean>;
  signIn: (username: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const signUp = async (
    userName: string,
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  ): Promise<boolean> => {
    console.log(email, password);
    try {
      const result = await axios.post(`${API_URL}/api/v1/auth/register`, {
        userName,
        email,
        firstName,
        lastName,
        password,
      });
      console.log('Sign up result:', result.data);
      if (result?.data) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data);
        console.error('Axios error message:', error.message);
        console.error('Axios error config:', error.config);
        console.error('Axios error code:', error.code);
        console.error('Axios error response:', error.response);
      }
      return false;
    }
  };
  const signIn = async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    try {
      const result = await axios.post(`${API_URL}/api/v1/auth/login`, {
        username,
        password,
      });
      console.log('Sign in result:', result);
      console.log('Access Token:', result?.data?.data?.access_token);
      if (result?.data?.data?.access_token) {
        const token = result?.data?.data?.access_token;
        await AsyncStorage.setItem('token', token);
        setToken(token);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data);
        console.error('Axios error message:', error.message);
        console.error('Axios error config:', error.config);
        console.error('Axios error code:', error.code);
        console.error('Axios error response:', error.response);
      }
      return false;
    }
  };
  const signOut = async (): Promise<void> => {};
  return (
    <AuthContext.Provider value={{token, isLoading, signUp, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};
