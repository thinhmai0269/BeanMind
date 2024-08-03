import axios from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
  isLoading: boolean;
}

const TOKEN_KEY = "jwt-token";
export const API_URL = "https://vinhtc3-001-site1.ftempurl.com";
const AuthContext = createContext<AuthProps>({ isLoading: false });

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadToken = async () => {
      setIsLoading(true);
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      console.log("Check stored token", token);
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAuthState({
          token: token,
          authenticated: true,
        });
      } else {
        router.push("/home");
      }

      setIsLoading(false);
    };
    loadToken();
  }, []);

  const register = async (email: string, password1: string) => {
    setIsLoading(true);
    console.log(email, password1);
  
    try {
      const response = await axios.post(`${API_URL}/api/v1/auth/register`, {
        username: email, 
        password: password1,
        roles: ['Parent']
      });
  
      const message = response.data.message;
      setIsLoading(false);
      return message;
    } catch (error) {
      setIsLoading(false);
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers
        });
      } else {
        console.error('Unexpected error:', error);
      }
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    console.log(email,'-',password);
    try {
      const result = await axios.post(`${API_URL}/api/v1/auth/login`, {
        email: email,
        password: password,
       
      });

      // setAuthState({
      //   token: result.data,
      //   authenticated: true,
      // });
      // axios.defaults.headers.common["Authorization"] =
      //   `Bearer ${result.data.token}`;
      // await SecureStore.setItemAsync(TOKEN_KEY, result.data);
      setIsLoading(false);
      return result;
    } catch (e) {
      setIsLoading(false);
      router.push("/sign-in");
    }
  };

  const logout = async () => {
    setIsLoading(true);
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    axios.defaults.headers.common["Authorization"] = "";
    setAuthState({
      token: null,
      authenticated: false,
    });
    setIsLoading(false);
  };

  const value = {
    authState,
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    isLoading: isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
