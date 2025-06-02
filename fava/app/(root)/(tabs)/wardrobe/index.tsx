import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import RecommendationBar from '@/components/RecommendationBar';
import ItemCard from '@/components/ItemCard';
import { useRouter } from 'expo-router';
import CircleButton from '@/components/CircleButton';
import { useUser } from '@/context/UserContext';

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
  const { user, refreshUser } = useUser();

  const router = useRouter();
  const categories = ['All', 'Pants', 'T-shirt', 'Coat', 'Shoes', 'Hat'];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [clothes, setClothes] = useState<any[]>([])

  const matched = (kind1: string, kind2: string) => {
    return (kind1 == 'T-shirt' && kind2 == 'TShirt')
      || (kind1 == 'Pants' && kind2 == 'Pants')
      || (kind1 == 'Coat' && kind2 == 'Coat')
      || (kind1 == 'Jacket' && kind2 == 'Jacket')
  }

  // const getAllClothes = async () => {
  //   const clothes = user.clothes

  //   setClothes(clothes)

  //   console.log("Clothes: ", clothes)
  // }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await refreshUser();        // Ensure user is refreshed first
  //     if (user) {
  //       console.log("User: ", user.clothes)
  //       getAllClothes();          // Only call if user exists
  //     }
  //   };

  //   fetchData();
  // }, [])

  // useEffect(() => {
  //   const f = async () => {
  //     await refreshUser()
  //   }

  //   f();
  // }, []);

  useEffect(() => {
    refreshUser()
  }, [])

  useEffect(() => {
    if (user && user.clothes && user.clothes.length > 0) {
      console.log("User clothes updated:", user.clothes)
      console.log(
        "Purposes: ",
        encodeURIComponent(JSON.stringify(user.clothes[0].purposes))
      );
      setClothes(user.clothes);
    } else {
      setClothes([]);
    }
  }, [user]);

  const filteredData = selectedCategory === 'All'
    ? clothes
    : clothes.filter(item => matched(selectedCategory, item.kind));

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
              image={
                `name=${encodeURIComponent(item.name)}` +
                `&kind=${item.kind}` +
                `&tempFloor=${item.tempFloor}` +
                `&tempRoof=${item.tempRoof}` +
                `&purposes=${encodeURIComponent(JSON.stringify(item.purposes))}` +
                (item.label ? `&label=${encodeURIComponent(item.label)}` : '') +
                (item.size ? `&size=${encodeURIComponent(item.size)}` : '')
              }
              name={item.name}
              label={item.label}
              size={item.size}
              onPress={() => router.push({
                pathname: '/(root)/(tabs)/wardrobe/detail',
                params: {
                  parImage: `name=${encodeURIComponent(item.name)}` +
                    `&kind=${item.kind}` +
                    `&tempFloor=${item.tempFloor}` +
                    `&tempRoof=${item.tempRoof}` +
                    `&purposes=${encodeURIComponent(JSON.stringify(item.purposes))}` +
                    (item.label ? `&label=${encodeURIComponent(item.label)}` : '') +
                    (item.size ? `&size=${encodeURIComponent(item.size)}` : ''),
                  parName: item.name,
                  parKind: item.kind,
                  parLabel: item.label,
                  parSize: item.size,
                  parTempFloor: item.tempFloor,
                  parTempRoof: item.tempRoof,
                  parPurposes: item.purposes
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