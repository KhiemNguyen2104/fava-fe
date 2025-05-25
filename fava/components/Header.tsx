import React, { useState, useRef } from "react";
import { View, TouchableOpacity, StyleSheet, Image, Dimensions, Animated } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import SearchBar from "./SearchBar";
import SideMenu from "./SideMenu";

interface HeaderProps {
  title: string;
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Header: React.FC<HeaderProps> = ({ title }) => {
    const handleSearch = (keyword: string) => {
        // TODO: Handle search logic here
        console.log("Search keyword:", keyword);
    }

    const translateX = useRef(new Animated.Value(-screenWidth)).current;
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
      const toValue = menuVisible ? -screenWidth : 0;
      setMenuVisible(!menuVisible);

      Animated.timing(translateX, {
        toValue,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        console.log(menuVisible ? "Menu closed" : "Menu opened");
      });
    };

  return (
    <View style={styles.header}>
      
      <TouchableOpacity onPress={toggleMenu}>
        <View >
          <Image
              source={require('../assets/images/placeholder.png')}
              style={styles.avatar}
          />
        </View>
      </TouchableOpacity>

      <SearchBar onSearch={()=> {}}/>

      <TouchableOpacity onPress={() => handleSearch("~~In Progress~~")}>
        <Icon name="search" size={35} style={styles.icon} />
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.animatedMenu,
          { height: screenHeight },
          { transform: [{ translateX }] }
        ]}
        pointerEvents={menuVisible ? "auto" : "none"}
      >
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: screenWidth,
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}
          activeOpacity={1}
          onPress={toggleMenu}
        />
        <SideMenu onClose={toggleMenu} />
      </Animated.View>

    </View>
  );
  };

const styles = StyleSheet.create({
  animatedMenu: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    zIndex: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: "3%",
    paddingBottom: "3%",
    paddingHorizontal: "7%",
    backgroundColor: "#CC1766",
  },
  icon: {
    color: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
  }
});

export default Header;
