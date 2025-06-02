import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import RecommendationBar from '@/components/RecommendationBar';
import ItemCard from '@/components/ItemCard';
import { useRouter } from 'expo-router';
import CircleButton from '@/components/CircleButton';

const itemCardData = [
  {
    image: require('@/assets/images/placeholder_big.png'),
    name: "T1 Jacket Faker",
    label: "",
    size: "XL",
    category: "Coat",
  },
  {
    image: require('@/assets/images/placeholder_big.png'),
    name: "T1 Jacket Faker",
    label: "",
    size: "L",
    category: "Coat",
  },
    {
    image: require('@/assets/images/placeholder_big.png'),
    name: "T1 Jacket Faker",
    label: "",
    size: "L",
    category: "Pants",
  },
    {
    image: require('@/assets/images/placeholder_big.png'),
    name: "T1 Jacket Faker",
    label: "",
    size: "L",
    category: "Shoes",
  },
];

const WardrobeTabScreen = () => {
    const router = useRouter();
    const categories = ['All', 'Pants', 'T-shirt', 'Coat', 'Shoes', 'Hat']; 
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredData = selectedCategory === 'All'
      ? itemCardData
      : itemCardData.filter(item => item.category === selectedCategory);

    return (
        <View style={styles.container}>
            <RecommendationBar 
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryPress={setSelectedCategory} />

            <ScrollView horizontal={false} showsVerticalScrollIndicator={false} contentContainerStyle={styles.suggestionContainer}>
            {filteredData.length === 0 ? (
              <Text style={{ textAlign: 'center', color: '#888', marginTop: 20 }}>
                No items found
              </Text>
            ) : (
              filteredData.map((item, index) => (
                <ItemCard
                  key={index}
                  image={item.image}
                  name={item.name}
                  label={item.label}
                  size={item.size}
                  onPress={() => router.push({
                    pathname: '/(root)/(tabs)/wardrobe/detail',
                    params: {
                      parImage: item.image,
                      parName: item.name,
                      parLabel: item.label,
                      parSize: item.size,
                    },
                  })}
                />
              ))
            )}
          </ScrollView>

          <View style={styles.addButtonContainer}>
            <CircleButton
              iconName="plus"
              buttonColor="#C2185B"
              width={50}
              height={50}
              onPress={() => router.push('/(root)/(tabs)/wardrobe/addItem')}
            />
          </View>
        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    suggestionContainer: {
        paddingHorizontal: 10,
        marginTop: 10,
    },
    addButtonContainer: {
      position: 'absolute',   
      right: 20,
      bottom: 40,
      zIndex: 10,
    },
});

export default WardrobeTabScreen;