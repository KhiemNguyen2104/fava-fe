import React, { useState } from 'react';
import { Alert, View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from "react-native-vector-icons/FontAwesome6";
import RectButton from '@/components/RectangleButton';
import CircleBurron from '@/components/CircleButton';
import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';
import CustomModal from '@/components/CustomModal';
import SingleOptionPickerModal from '@/components/SingleOptionModal';
import ScreenDivider from '@/components/ScreenDivider';
import PurposePickerModal from '@/components/PurposePickerModal';
import * as FileSystem from 'expo-file-system';
import api from '@/ultils/axiosInstance';
import { useUser } from '@/context/UserContext';
import ImageWrapper from '@/components/ImageWrapper';

const transparentBg = require('@/assets/images/transparent-bg.jpg');
const SIZE = ['S', 'M', 'L', 'X', 'XL', 'XXL'];

export default function AddItem() {
  const { user, refreshUser } = useUser()

  const [name, setName] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [type, setType] = useState('');
  const [label, setLabel] = useState('');
  const [size, setSize] = useState('');
  const router = useRouter();

  const [temperatureModalVisible, setTemperatureModalVisible] = useState(false);
  const [temperatureFrom, setTemperatureFrom] = useState('');
  const [temperatureTo, setTemperatureTo] = useState('');

  const [clothingModalVisible, setClothingModalVisible] = useState(false);
  const [clothingSelectedItem, setClothingSelectedItem] = useState<string | null>(null);

  const [purposeModalVisible, setPurposeModalVisible] = useState(false);
  const [chosenPurpose, setChosenPurpose] = useState('');

  const [sizeModalVisible, setSizeModalVisible] = useState(false);
  const [sizeSelectedItem, setSizeSelectedItem] = useState<string | null>(null);

  const handleAddPurpose = (purposeArray: string[]) => {
    setChosenPurpose(purposeArray.join(', '));
  };

  const convertPurpose = (p: string) => {
    if (p == 'Work') return 'Work';
    if (p == 'Party') return 'Party';
    if (p == 'Go out') return 'GoOut';
  }

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
        console.log("Base64 string:", base64);
        return  `data:image/png;base64,${base64}`;
      } catch (error) {
        console.error("Error converting image to base64:", error);
      }
    } else {
      console.log("IinURI:", encodeURIComponent(image))

      const response = await api.get(`/clothes/image?${image}`, {
        responseType: 'blob',
      });

      if (response.status !== 200) throw new Error('Failed to fetch image');

      const blob = response.data as Blob;

      return await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result as string;
          resolve(base64data);
        };
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(blob);
      });
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAddItem = async () => {
    try {
      const uri = await convertImageToBuffer(image);
      const profile = {
        name: name,
        kind: type,
        ...(temperatureFrom && { tempFloor: Number(temperatureFrom) }),
        ...(temperatureTo && { tempRoof: Number(temperatureTo) }),
        purposes: chosenPurpose.split(', ').map((item) => convertPurpose(item)).sort(),
        ...(label && { label: label }),
        ...(size && { size: size })
      }

      const data = {
        image: uri,
        prof: JSON.stringify(profile)
      }

      const response = await api.post('/clothes', data)

      console.log("Response: ", response.data)
      await refreshUser()
      router.replace('/(root)/(tabs)/wardrobe')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
        <ImageBackground
          source={transparentBg}
          style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
          imageStyle={{ borderRadius: 10 }}
        >
          {image ? (
            <ImageWrapper image={image}></ImageWrapper>
          ) : (
            <Text style={styles.uploadText}>Upload the image</Text>
          )}

          <View style={styles.cameraButtons}>
            <TouchableOpacity onPress={takePhoto}>
              <Icon name="camera" size={24} color="white" />
            </TouchableOpacity>
          </View>

        </ImageBackground>
      </TouchableOpacity>

      <View style={styles.AiCameraButtons}>
        <TouchableOpacity onPress={takePhoto}>
          <Icon name="lightbulb" size={24} color="white" />
        </TouchableOpacity>
      </View>


      <ScreenDivider />


      <TextInput style={styles.nameInput} placeholder="Name" value={name} onChangeText={setName} />


      <View style={styles.form}>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Type:</Text>
          <TouchableOpacity
            style={[styles.input, { justifyContent: 'center' }]}
            onPress={() => setClothingModalVisible(true)}
          >
            <Text style={{ color: clothingSelectedItem ? '#222' : '#666' }}>
              {clothingSelectedItem
                ? `${clothingSelectedItem}`
                : 'Select Type'}
            </Text>
          </TouchableOpacity>
        </View>
        {/* Modal for selecting clothing type */}
        <SingleOptionPickerModal
          visible={clothingModalVisible}
          onSelect={(item) => {
            setType(item);
            setClothingSelectedItem(item);
            setClothingModalVisible(false);
          }}
          onClose={() => setClothingModalVisible(false)}
        />

        <View style={styles.inputRow}>
          <Text style={styles.label}>Label:</Text>
          <TextInput style={styles.input} placeholder="Adidas, Nike, ..." value={label} onChangeText={setLabel} />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Size:</Text>
          <TouchableOpacity
            style={[styles.input, { justifyContent: 'center' }]}
            onPress={() => setSizeModalVisible(true)}
          >
            <Text style={{ color: sizeSelectedItem ? '#111' : '#666' }}>
              {sizeSelectedItem
                ? `${sizeSelectedItem}`
                : 'Select Size'}
            </Text>
          </TouchableOpacity>
        </View>
        {/* Modal for selecting size */}
        <SingleOptionPickerModal
          data={SIZE}
          visible={sizeModalVisible}
          onSelect={(item) => {
            setSize(item);
            setSizeSelectedItem(item);
            setSizeModalVisible(false);
          }}
          onClose={() => setSizeModalVisible(false)}
        />

        <View style={styles.inputRow}>
          <Text style={styles.label}>Temperature:</Text>
          <TouchableOpacity
            style={[styles.input, { justifyContent: 'center' }]}
            onPress={() => setTemperatureModalVisible(true)}
          >
            <Text style={{ color: (temperatureFrom && temperatureTo) ? '#222' : '#666' }}>
              {temperatureFrom && temperatureTo
                ? `${temperatureFrom} - ${temperatureTo}`
                : 'From - To'}
            </Text>
          </TouchableOpacity>
        </View>
        {/* Modal for adding temperature */}
        <CustomModal
          visible={temperatureModalVisible}
          onRequestClose={() => setTemperatureModalVisible(false)}
          fields={[
            {
              label: 'From:',
              placeholder: 'Temperature',
              value: temperatureFrom,
              onChangeText: setTemperatureFrom,
            },
            {
              label: 'To:',
              placeholder: 'Temperature',
              value: temperatureTo,
              onChangeText: setTemperatureTo,
            },
          ]}
          actions={[
            { label: 'Cancel', onPress: () => setTemperatureModalVisible(false) },
            {
              label: 'OK',
              onPress: () => {
                // Kiểm tra phải là số
                if (
                  !/^\d+(\.\d+)?$/.test(temperatureFrom) ||
                  !/^\d+(\.\d+)?$/.test(temperatureTo)
                ) {
                  Alert.alert('Error', 'Please enter valid value for temperature (number).');
                  return;
                }
                // Kiểm tra from < to
                if (parseFloat(temperatureFrom) >= parseFloat(temperatureTo)) {
                  Alert.alert('Error', '"From" must be lower than "To".');
                  return;
                }
                setTemperatureModalVisible(false);
              },
            },
          ]}
        />

        <View style={styles.inputRow}>
          <Text style={styles.label}>Purpose:</Text>
          <TouchableOpacity
            style={[styles.input, { justifyContent: 'center' }]}
            onPress={() => setPurposeModalVisible(true)}
          >
            <Text style={{ color: chosenPurpose ? '#111' : '#666' }}>
              {chosenPurpose
                ? `${chosenPurpose}`
                : 'Work, Go out, Party,...'}
            </Text>
          </TouchableOpacity>
        </View>
        {/* Modal for selecting purpose */}
        <PurposePickerModal
          visible={purposeModalVisible}
          onClose={() => setPurposeModalVisible(false)}
          onSelect={handleAddPurpose}
        />

      </View>

      <View style={styles.buttonRow}>
        <CircleBurron
          iconName="arrow-left"
          buttonColor="#C2185B"
          width={50}
          height={50}
          onPress={() => router.back()}
        />
        <RectButton
          title="Add"
          buttonColor="#00CA6E"
          width={120}
          height={50}
          onPress={() => handleAddItem()}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  imageBox: {
    height: 250,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    alignSelf: 'center',
  },
  uploadText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    padding: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#d4006b',
    backgroundColor: '#CC1766',
    borderRadius: 34,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  cameraButtons: {
    position: 'absolute',
    right: -25,
    bottom: 0,
    zIndex: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#d4006b',
    backgroundColor: '#CC1766',
    borderRadius: 34,
  },
  AiCameraButtons: {
    borderWidth: 1,
    borderColor: '#d4006b',
    backgroundColor: '#CC1766',
    borderRadius: 34,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  form: {
    marginTop: 0,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  nameInput: {
    paddingHorizontal: 10,
    borderRadius: 10,
    marginLeft: 10,
    flexShrink: 1,
    flexGrow: 1,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#F1F4FF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginLeft: 10,
    flexShrink: 1,
    flexGrow: 1,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: "3%",
    marginHorizontal: "5%",
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 30,
    right: 35,
    zIndex: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
});
