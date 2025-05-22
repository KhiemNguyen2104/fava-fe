// import * as React from 'react';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { Tabs } from 'expo-router';
// import Colors from '@/constants/Colors';
// import { useColorScheme } from '@/components/useColorScheme';

// function TabBarIcon(props: {
//   name: React.ComponentProps<typeof FontAwesome>['name'];
//   color: string;
// }) {
//   return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
// }

// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//         headerShown: false,
//       }}>
//       <Tabs.Screen
//         name="(tabs)/wardrobe"
//         options={{
//           title: 'wardrobe',
//           headerShown: false,
//           tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="(tabs)/home"
//         options={{
//           title: 'home',
//           headerShown: false,
//           tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="(tabs)/ai"
//         options={{
//           title: 'ai',
//           headerShown: false,
//           tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
//         }}
//       />

//       <Tabs.Screen
//         name="(tabs)/shopping"
//         options={{
//           title: 'shopping',
//           headerShown: false,
//           tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
//         }}
//       />
//     </Tabs>
//   );
// }

import React from "react";
import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// For other page except Sign In Page
const AppLayout = () => {
  return (
    <GestureHandlerRootView>
      <Slot />
    </GestureHandlerRootView>
  );
};

export default AppLayout;
