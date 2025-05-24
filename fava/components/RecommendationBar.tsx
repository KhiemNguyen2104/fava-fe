import React from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';

type RecommendationBarProps = {
  categories: string[];
};

const RecommendationBar: React.FC<RecommendationBarProps> = ({ categories }) => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      contentContainerStyle={styles.container}
    >
      {categories.map((item, index) => (
        <TouchableOpacity key={index} style={styles.button}>
          <Text style={styles.buttonText}>{item}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    height: 80,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 2,
    marginBottom: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    backgroundColor: 'white',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
});

export default RecommendationBar;
