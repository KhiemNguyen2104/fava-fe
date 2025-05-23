import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { router } from "expo-router";
import { Alert, Platform, ToastAndroid } from "react-native";

const API_URL = "http://192.168.2.41:4000/api/";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

const getUserData = async () => {
  const data = await SecureStore.getItemAsync("_user_data");
  return data ? JSON.parse(data) : null;
};

const updateUserData = async (newData: any) => {
  await SecureStore.setItemAsync("_user_data", JSON.stringify(newData));
};

const refreshAccessToken = async () => {
  try {
    const userData = await getUserData();
    if (!userData?.refreshToken) {
      throw new Error("No refresh token found");
    }
    const response = await axios.post(`${API_URL}/auth/refresh`, {
      refreshToken: userData.refreshToken,
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data.data;

    const updatedUserData = {
      ...userData,
      accessToken,
      refreshToken: newRefreshToken || userData.refreshToken, // if the server doesn't return a new refresh token, keep the old one
    };

    await updateUserData(updatedUserData);
    console.log("Refresh token successfully");
    return accessToken;
  } catch (error) {
    console.log("Error refreshing token:", error);
    throw error;
  }
};

// Interceptor automatically refreshes token if it's expired
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log("Token expired, refreshing...");
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.log(
          "Unable to refresh token, kick the user out:",
          refreshError
        );
        showAlert("Session expired. Please log in.");
        await SecureStore.deleteItemAsync("_user_data"); // Clear user data on error
        router.push("/"); // Redirect to login page
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Interceptor automatically adds Authorization header to requests
api.interceptors.request.use(async (config) => {
  const userData = await getUserData();
  if (userData?.accessToken) {
    config.headers.Authorization = `Bearer ${userData.accessToken}`;
  }
  return config;
});

export const showAlert = (message: string) => {
  if (Platform.OS === "android") {
    ToastAndroid.show(message, ToastAndroid.LONG);
  } else {
    Alert.alert("Notice", message, [{ text: "OK" }]);
  }
};

export default api;
