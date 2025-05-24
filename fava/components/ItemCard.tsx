import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type ItemCardProps = {
  image: any; // Use `require()` or a URI for the image
  name: string;
  label: string;
  size: string;
};

const ItemCard: React.FC<ItemCardProps> = ({ image, name, label, size }) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} resizeMode="contain" />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.label}>Label: {label}</Text>
      <Text style={styles.label}>Size: {size}</Text>
    </View>
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
