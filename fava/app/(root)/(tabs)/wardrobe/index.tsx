import React from 'react';
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
  },
  {
    image: require('@/assets/images/placeholder_big.png'),
    name: "T1 Jacket Faker",
    label: "",
    size: "L",
  },
    {
    image: require('@/assets/images/placeholder_big.png'),
    name: "T1 Jacket Faker",
    label: "",
    size: "L",
  },
    {
    image: require('@/assets/images/placeholder_big.png'),
    name: "T1 Jacket Faker",
    label: "",
    size: "L",
  },
];

const WardrobeTabScreen = () => {
    const router = useRouter();
    const categories = ['Pants', 'T-shirt', 'Coat', 'Shoes', 'Hat']; 

    return (
        <View style={styles.container}>
            <RecommendationBar categories={categories} />

            <ScrollView horizontal={false} showsVerticalScrollIndicator={false} contentContainerStyle={styles.suggestionContainer}>
            {itemCardData.map((item, index) => (
                <ItemCard
                key={index}
                image={item.image}
                name={item.name}
                label={item.label}
                size={item.size} 
                onPress={() => router.push({
                  pathname: '/(root)/(tabs)/wardrobe/detail',
                  params: {
                    image: item.image,
                    name: item.name,
                    label: item.label,
                    size: item.size,
                  },
                })}
                />
            ))}
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