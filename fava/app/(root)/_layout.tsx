import React, { useState, useEffect } from "react";
import { Stack, useSegments } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BackHandler, Alert } from "react-native";

export default function AppLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // TODO: thực hiện kiểm tra đăng nhập thực tế
  const segments = useSegments();


  useEffect(() => {
    const backAction = () => {
      if (segments.length === 3) {
        Alert.alert("Exit Smart Home", "Are you sure?", [
          { text: "Cancel", onPress: () => null, style: "cancel" },
          { text: "Exit", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [segments]);

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
            <Stack.Screen name="(auth)/index" />
            <Stack.Screen name="(auth)/register" />
            <Stack.Screen name="(auth)/login" />
          </Stack>
        )}
    </GestureHandlerRootView>
  );
}