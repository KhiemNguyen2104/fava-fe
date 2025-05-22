import { View, BackHandler, Alert } from "react-native";
import React, { useEffect } from "react";
import { Tabs } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useSegments } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const TabIcon = ({
  focused,
  iconName,
}: {
  focused: boolean;
  iconName: string;
}) => {
  return (
    <View className="flex flex-col">
      <Icon name={iconName} size={28} color={focused ? "#0061ff" : "#666876"} />
    </View>
  );
};

const TabLayout = () => {
  // const segments = useSegments();
  // const segment = segments[2] || "";
  // const segmentName = segment.charAt(0).toUpperCase() + segment.slice(1);

  // const tabTitles: { [key: string]: string } = {
  //   Home: "Home",
  //   Ai: "Ai",
  //   Shopping: "Shopping",
  //   Wardrobe: "Wardrobe",
  // };

  // const currentRoute = segmentName;

  // useEffect(() => {
  //   const backAction = () => {
  //     if (currentRoute === "Home") {
  //       Alert.alert("Exit Smart Home", "Are you sure?", [
  //         { text: "Cancel", onPress: () => null, style: "cancel" },
  //         { text: "Exit", onPress: () => BackHandler.exitApp() },
  //       ]);
  //       return true;
  //     }
  //     return false;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );

  //   return () => backHandler.remove();
  // }, [currentRoute]);



  return (
    <SafeAreaView style={{ flex: 1}}  edges={["bottom"]}>
      {/* <Header title={currentTitle} /> */}
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 10,
            paddingTop: 10,
            height: 70,
          },
          tabBarItemStyle: {
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
      <Tabs.Screen
        name="wardrobe/index"
        options={{
          title: "Wardrobe",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="box-archive" />
          ),
        }}
      />
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="house" />
          ),
        }}
      />
      <Tabs.Screen
        name="ai/index"
        options={{
          title: "AI",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="star" />
          ),
        }}
      />
      <Tabs.Screen
        name="shopping/index"
        options={{
          title: "Shopping",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="cart-shopping" />
          ),
        }}
      />
      </Tabs>
    </SafeAreaView>
  );
};

export default TabLayout;
