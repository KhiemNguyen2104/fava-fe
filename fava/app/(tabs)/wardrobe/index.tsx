import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import RecommendationBar from '../../../components/RecommendationBar';
import ItemCard from './../../../components/ItemCard';

const itemCardData = [
  {
    image: require('../../../assets/images/placeholder_big.png'),
    name: "T1 Jacket Faker",
    label: "",
    size: "XL",
  },
  {
    image: require('../../../assets/images/placeholder_big.png'),
    name: "T1 Jacket Faker",
    label: "",
    size: "L",
  },
    {
    image: require('../../../assets/images/placeholder_big.png'),
    name: "T1 Jacket Faker",
    label: "",
    size: "L",
  },
    {
    image: require('../../../assets/images/placeholder_big.png'),
    name: "T1 Jacket Faker",
    label: "",
    size: "L",
  },
];

const WardrobeTabScreen = () => {
    
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
                />
            ))}
            </ScrollView>

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
});

export default WardrobeTabScreen;