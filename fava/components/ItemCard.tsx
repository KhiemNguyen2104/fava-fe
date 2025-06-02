import api from '@/ultils/axiosInstance';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

type ItemCardProps = {
  image: any;
  name: string;
  label: string;
  size: string;
  onPress?: () => void;
};

const ItemCard: React.FC<ItemCardProps> = ({ image, name, label, size, onPress }) => {
  console.log(image)

  const [imageUri, setImageUri] = useState<string | null>(null);
  useEffect(() => {
    const loadImage = async () => {
      try {
        const response = await api.get(`/clothes/image?${image}`, { responseType: 'blob' })

        if (response.status != 200) throw new Error('Failed to fetch image');

        const blob = response.data;
        const reader = new FileReader();

        reader.onloadend = () => {
          setImageUri(reader.result as string);
        };

        reader.readAsDataURL(blob);
      } catch (error) {
        console.error('Error loading image:' + image, error);
      }
    };

    loadImage();
  }, [image]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.card}>
        <Image source={{ uri: imageUri || '' }} style={styles.image} resizeMode="contain" />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.label}>Label: {label}</Text>
        <Text style={styles.label}>Size: {size}</Text>
      </View>
    </TouchableOpacity>

  );
};

const styles = StyleSheet.create({
  card: {
    width: 250,
    height: 350,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowRadius: 20,
    shadowOffset: { width: 5, height: 5 },
    alignItems: 'center',
    margin: 10,
    elevation: 10
  },
  image: {
    width: 200,
    height: "60%",
    marginBottom: "20%",
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
});

export default ItemCard;
