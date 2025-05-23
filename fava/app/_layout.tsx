import React from "react";
import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import './sentry.config'

const AppLayout = () => {
  return (
    <GestureHandlerRootView>
      <Slot />
    </GestureHandlerRootView>
  );
};

export default AppLayout;
