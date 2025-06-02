import React, { useState, useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BackHandler, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosResponse } from "axios";

export default function AppLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const checkIsLoggedIn = async () => {
    const refreshToken = await AsyncStorage.getItem('refreshToken')

    // console.log("Check logged in: ", refreshToken)

    if (refreshToken) {
      try {
        const response: AxiosResponse<string> = await axios.post(
          `https://testgithubactions-jx4x.onrender.com/auth/resignAccessToken?Refresh Token=${refreshToken}`
        )

        // console.log("Check logged in: Access Token: ", response.data)

        await AsyncStorage.setItem('accessToken', response.data)
        setIsLoggedIn(true)
        router.replace('/(root)/(tabs)/home') 
      } catch (error) {
        console.error("Refresh Error: ", error)
        setIsLoggedIn(false)
      }
    } else {
      setIsLoggedIn(false)
    }

    setLoading(false)
  }

  useEffect(() => {
    checkIsLoggedIn()
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {isLoggedIn ? (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)/wardrobe" />
          <Stack.Screen name="(tabs)/home" />
          <Stack.Screen name="(tabs)/ai" />
          <Stack.Screen name="(tabs)/shopping" />
        </Stack>
      ) : (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)/login" />
          <Stack.Screen name="(auth)/register" />
        </Stack>
      )}
    </GestureHandlerRootView>
  );
}