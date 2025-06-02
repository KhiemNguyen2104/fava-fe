// components/SideMenu.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

type Props = {
  onClose: () => void;
};

export default function SideMenu({ onClose }: Props) {
  const router = useRouter();
  return (
    <View style={styles.menu}>
      {['Profile', 'Wardrobe', 'Home', 'AI suggestion', 'Shopping'].map((item, index) => (
        <TouchableOpacity key={index} style={styles.item} 
          onPress={
            () => {
              onClose(); 
              if (item === 'Profile') {
                router.push('/profile');
              } else if (item === 'Home') {
                router.push('/(tabs)/home');
              } else if (item === 'Wardrobe') {
                router.push('/(tabs)/wardrobe');
              } else if (item === 'AI suggestion') {
                router.push('/(tabs)/ai');
              } else if (item === 'Shopping') {
                router.push('/(tabs)/shopping');
              }
            }
          }>
          <Text style={styles.text}>{item}</Text>
          <View style={styles.separator} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '65%',
    backgroundColor: '#C71575',
    paddingTop: 60,
    paddingHorizontal: 20,
    zIndex: 10,
  },
  item: {
    marginBottom: 30,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  separator: {
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
    marginTop: 30,
  },
});
