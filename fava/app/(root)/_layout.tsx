import React from "react";
import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";


const AppLayout = () => {
  // TODO: Hide the status bar and the navigation bar (immersive mode)
  // Now tempoprarily let: "backgroundColor: "#000"" and hidden={false} in StatusBar
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "#000" }}>
        <StatusBar hidden={false} /> 
        <Slot />
      </View>
    </GestureHandlerRootView>
  );
};

export default AppLayout;