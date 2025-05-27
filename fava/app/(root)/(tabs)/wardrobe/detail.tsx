import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import RectButton from "@/components/RectangleButton";
import CircleBurron from "@/components/CircleButton"; 
import InformationRow from '@/components/InformationRow';

const ItemDetailScreen = ({}) => {
  const { image, name, label, size } = useLocalSearchParams();
  const tempImage = require('@/assets/images/placeholder_big.png'); 

  return (
    <View style={styles.container}>
      <Image source={ tempImage } style={styles.image} /> 
      <Text style={styles.name}>{name}</Text>


      <InformationRow label="Type" value="Coat" />
      <InformationRow label="Label" value="T1" />
      <InformationRow label="Size" value="XL" />
      <InformationRow label="Temperature" value="30 - 35" />
      <InformationRow label="Purpose" value="Work, Go out" />
      
      
      
      <View style={styles.buttonRow}>
        <CircleBurron
          iconName="arrow-left"
          buttonColor="#C2185B"
          width={50}
          height={50}
          onPress={() => router.back()}
        />
        <RectButton
          title="Remove"
          buttonColor="#FF4242"
          width={120}
          height={50}
          onPress={() => console.log('Remove pressed')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  image: { width: "80%", height: "35%", marginBottom: 10, borderBottomWidth: 2, borderBottomColor: '#000' },
  name: { fontSize: 24, fontWeight: 'bold', margin: 10, paddingBottom: 5 },
  label: { fontSize: 18, margin: 5 },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
});

export default ItemDetailScreen;