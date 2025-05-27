import React from "react";
import { Stack } from "expo-router";

const WardrobeLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="detail" />
      <Stack.Screen name="addItem" />
    </Stack>
  );
};

export default WardrobeLayout;
