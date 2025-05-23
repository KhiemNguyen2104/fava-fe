import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useRouter } from "expo-router";
import SearchBar from "./SearchBar";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    const router = useRouter();
    const handleSearch = (keyword: string) => {
        // Handle search logic here
        console.log("Search keyword:", keyword);
    }


  if (title != "Home") {
    return (
      <View style={styles.header}>
        
        <TouchableOpacity onPress={() => console.log("Open List")}>
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

      </View>
    );
  }
  return <View></View>;
};

const styles = StyleSheet.create({
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
