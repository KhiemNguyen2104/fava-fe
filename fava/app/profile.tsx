import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import ProfileInfoCard from '../components/ProfileInfoCard';
import CircleButton from '../components/CircleButton';
import { useRouter } from 'expo-router';
import { useUser } from '@/context/UserContext';
import * as FileSystem from 'expo-file-system';
import api from '@/ultils/axiosInstance';
import RectButton from '@/components/RectangleButton';

const gradientPlaceholder = require('../assets/images/gradient-placeholder.jpg');
const avatarPlaceholder = require('../assets/images/avatar-placeholder.png');

export default function ProfileScreen() {
  const { user, refreshUser, logout } = useUser()

  const router = useRouter();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [shouldUpdateAvatar, setShouldUpdateAvatar] = useState(false);
  const [name, setName] = useState('')

  const convertImageToBuffer = async (image: string) => {
    const isBase64Uri = (uri: string): boolean =>
      typeof uri === 'string' && uri.startsWith('data:image/');

    if (isBase64Uri(image)) {
      return image;
    } else if (image.startsWith('file')) {
      try {
        const base64 = await FileSystem.readAsStringAsync(image, {
          encoding: FileSystem.EncodingType.Base64,
        });
        // console.log("Base64 string:", base64);
        return `data:image/png;base64,${base64}`;
      } catch (error) {
        console.error("Error converting image to base64:", error);
      }
    } else {
      return image;
    }
  };

  const fetchAvatar = async () => {
    const response = await api.get(`/users/avatar`, { responseType: 'blob' })

    if (response.status != 200) return;

    const blob = response.data;
    const reader = new FileReader();

    reader.onloadend = () => {
      setAvatar(reader.result as string);
    };

    reader.readAsDataURL(blob);
  }

  const updateAvatar = async (avatar: string) => {
    try {
      const response = await api.post('users/avatar', { avatar: avatar })

      await refreshUser()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    refreshUser()
    fetchAvatar()
  }, [])

  useEffect(() => {
    if (avatar?.startsWith('data:image/') && shouldUpdateAvatar) {
      updateAvatar(avatar);
      setShouldUpdateAvatar(false);
    }
  }, [avatar, shouldUpdateAvatar]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
    });

    if (!result.canceled) {
      const base64Avatar = await convertImageToBuffer(result.assets[0].uri);
      setAvatar(base64Avatar);
      setShouldUpdateAvatar(true);
    }
  };

  const handleLogout = async () => {
    await logout()
    router.replace('/(root)/(auth)/login')
  }

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

      <Text style={styles.username}>{user?.name}</Text>

      {/* Info Card */}
      <View style={styles.card}>
        <ProfileInfoCard
          title="Personal information"
          firstLabel="Full name"
          firstValue={user?.name}
          secondLabel="Email"
          secondValue={user?.email}
        />

        <ProfileInfoCard
          title="My wardrobe"
          firstLabel="Total clothes"
          firstValue={user?.clothes.length}
          secondLabel="Total useful suggestions"
          secondValue={`${user?.usefulSuggestions}/${user?.suggestions}`}
        />
      </View>

      {/* Back Button */}
      <View style={styles.buttonRow}>
        <CircleButton
          iconName="arrow-left"
          buttonColor="#C2185B"
          width={60}
          height={60}
          onPress={() => router.replace('/(root)/(tabs)/home')}
        />
        <RectButton
          title="Logout"
          buttonColor="#FF4242"
          width={100}
          height={50}
          onPress={() => handleLogout()}
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    position: 'absolute',
    left: '10%',
    bottom: 80,
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
