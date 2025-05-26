import React from "react";
import { Stack } from "expo-router";

const EnvironmentLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="environment" />
        <Stack.Screen name="profile" />
    </Stack>
  );
};

export default EnvironmentLayout;
