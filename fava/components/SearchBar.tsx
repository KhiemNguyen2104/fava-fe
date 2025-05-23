import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from "react-native";


type SearchBarProps = {
  onSearch: (keyword: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    if (keyword.trim() !== "") {
      onSearch(keyword.trim());
    }
  };

  return (
    <View
      style={styles.container}
    >
      {/* Input */}
      <View >
        <TextInput
          placeholder="Search"
          placeholderTextColor="#999"
          value={keyword}
          onChangeText={setKeyword}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          style={{ ...styles.input }}
        />
      </View>

    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 30,
        width: "65%",
        height: 40,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: "#000",
        paddingLeft: "10%",
    },

});