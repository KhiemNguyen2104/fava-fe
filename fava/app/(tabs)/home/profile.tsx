import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import ProfileInfoCard from '../../../components/ProfileInfoCard'; 

export default function ProfileScreen() {
  const [avatar, setAvatar] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
    });
    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with Gear Icon */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.gearIcon}>
          <Ionicons name="settings-sharp" size={26} color="#d4006b" />
        </TouchableOpacity>
      </View>

      {/* Avatar Section */}
      <View style={styles.avatarContainer}>
        <Image
          source={avatar ? { uri: avatar } : require('../../../assets/images/placeholder.png')}
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.avatarCamera} onPress={pickImage}>
          <Ionicons name="camera" size={18} color="white" />
        </TouchableOpacity>
        <Text style={styles.username}>Phuc Gia Khiem Nguyen</Text>
      </View>

      {/* Info Card */}
      <View style={styles.card}>
        <ProfileInfoCard
            title="Personal information"
            firstLabel="Full name"
            firstValue="Nguyen Phuc Gia Khiem"
            secondLabel="Email"
            secondValue="abc@gmail.com"
        />

        <ProfileInfoCard
            title="My wardrobe"
            firstLabel="Total clothes"
            firstValue="30"
            secondLabel="Total useful suggestions"
            secondValue="12/25"
        />
      </View>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="arrow-back" size={26} color="white" />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: "25%",
    backgroundColor: 'black',
    justifyContent: 'flex-end',
  },
  gearIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: -40,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: 'white',
  },
  avatarCamera: {
    position: 'absolute',
    bottom: "20%",
    right: '37%',
    backgroundColor: '#d4006b',
    padding: 10,
    borderRadius: 100,
  },
  username: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    marginTop: 20,
    paddingHorizontal: 25,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#d4006b',
    marginTop: 20,
    marginBottom: 8,
  },
  label: {
    fontSize: 15,
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#d4006b',
    padding: 12,
    borderRadius: 30,
  },
});
