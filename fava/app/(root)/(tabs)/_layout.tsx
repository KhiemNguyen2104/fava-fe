import { TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome6";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { useSegments } from "expo-router";
import { StatusBar } from "react-native";

const ACTIVE_COLOR = "#CC1766";
const INACTIVE_COLOR = "#fff";

const TabIcon = ({
  focused,
  iconName,
}: {
  focused: boolean;
  iconName: string;
}) => {
  return (
    <Icon
      name={iconName}
      size={24}
      color={focused ? ACTIVE_COLOR : INACTIVE_COLOR}
    />
  );
};

const TabLayout = () => {
  const segments = useSegments();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000"  }} edges={['top', 'left', 'right']}>
      <Header title={segments[1] ?? ""} />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle:  styles.tabBarStyle ,
        }}
      >
        {[
          { name: "wardrobe", icon: "box-archive" },
          { name: "home", icon: "house" },
          { name: "ai/index", icon: "star" },
          { name: "shopping/index", icon: "cart-shopping" },
        ].map(({ name, icon }) => (
          <Tabs.Screen
            key={name}
            name={name}
            options={{
              tabBarIcon: ({ focused }) => (
                <TabIcon focused={focused} iconName={icon} />
              ),
              tabBarButton: (props) => {
                const focused = segments[2] === name.split("/")[0];
                const filteredProps = Object.fromEntries(
                  Object.entries(props).filter(([_, v]) => v !== null)
                );
                return (
                  <TouchableOpacity
                    {...filteredProps}
                    style={[
                      props.style,
                      styles.tabBarButton,
                      { backgroundColor: focused ? INACTIVE_COLOR : ACTIVE_COLOR },
                      { flex: 1}
                    ]}
                  />
                );
              },
            }}
          />
        ))}
      </Tabs>
    </SafeAreaView>
  );
};

export default TabLayout;


const styles = StyleSheet.create({
  tabBarButton: { 
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarStyle: {
    backgroundColor: "#000", // TODO: this is temporary, change to #CC1766 when succesfully implement immersive mode
    height: "14%",
  },
});