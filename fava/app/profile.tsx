import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import ProfileInfoCard from '../components/ProfileInfoCard'; 
import CircleButton from '../components/CircleButton'; 
import { useRouter } from 'expo-router';

const gradientPlaceholder = require('../assets/images/gradient-placeholder.jpg');
const avatarPlaceholder = require('../assets/images/avatar-placeholder.png');

export default function ProfileScreen() {
  const router = useRouter();
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
        <Image
          source={gradientPlaceholder}
          style={{ width: '100%', height: '100%' }}
        />
        <TouchableOpacity style={styles.gearIcon}>
          <Ionicons name="settings-sharp" size={40} color="#d4006b" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerCameraIcon} onPress={pickImage}>
          <Ionicons name="camera" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Avatar Section */}
      <View style={styles.avatarContainer}>
        <Image
          source={avatar ? { uri: avatar } : avatarPlaceholder}
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.avatarCamera} onPress={pickImage}>
          <Ionicons name="camera" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <Text style={styles.username}>Phuc Gia Khiem Nguyen</Text>

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
      <View style={styles.backButton}>
        <CircleButton  
          iconName="arrow-left"
          buttonColor="#C2185B"
          width={60}
          height={60}
          onPress={() => router.back()} 
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: "30%",
    justifyContent: 'flex-end',
  },
  gearIcon: {
    position: 'absolute',
    top: 50,
    right: "5%",
  },
  headerCameraIcon: {
    position: 'absolute',
    bottom: "5%",
    right: '5%',
    backgroundColor: '#d4006b',
    padding: 7,
    borderRadius: 100,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: "-20%",
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
    bottom: "0%",
    right: '35%',
    backgroundColor: '#d4006b',
    padding: 7,
    borderRadius: 100,
  },
  username: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
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
    bottom: "6%",
    left: "13%",
  },
});
