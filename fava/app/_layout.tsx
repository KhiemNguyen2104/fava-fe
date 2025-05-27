import React from "react";
import { useEffect, useState } from "react";
import { Stack } from "expo-router";


export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(isLoggedIn);
  return (
      <Stack screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen 
              name="(tabs)/wardrobe" 
              options={{ headerShown: false }} 
            />
            <Stack.Screen
              name="(tabs)/home"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(tabs)/ai"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(tabs)/shopping"
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="(auth)"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/signup"
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack>
  );
}
