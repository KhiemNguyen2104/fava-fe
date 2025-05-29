import React from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';

type RecommendationBarProps = {
  categories: string[];
  selectedCategory?: string;
  onCategoryPress?: (category: string) => void;
};

const RecommendationBar: React.FC<RecommendationBarProps> = ({ 
  categories,
  selectedCategory,
  onCategoryPress,
}) => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      contentContainerStyle={styles.container}
    >
      {categories.map((item, index) => (
<TouchableOpacity
          key={index}
          style={[
            styles.button,
            selectedCategory === item && styles.buttonSelected,
          ]}
          onPress={() => onCategoryPress?.(item)}
        >
          <Text
            style={[
              styles.buttonText,
              selectedCategory === item && styles.buttonTextSelected,
            ]}
          >
            {item}
          </Text>
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
  buttonSelected: {
    backgroundColor: '#C2185B',
    borderColor: '#C2185B',
  },
  buttonTextSelected: {
    color: 'white',
  },
});

export default RecommendationBar;
