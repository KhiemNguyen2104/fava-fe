import React, { useState } from 'react';
import { Alert, View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ImageBackground, Platform } from 'react-native';
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
import { useLocalSearchParams } from 'expo-router';
import ImageWrapper from '@/components/ImageWrapper';
import api from '@/ultils/axiosInstance';
import { AxiosResponse } from 'axios';
import { useUser } from '@/context/UserContext';
import * as FileSystem from 'expo-file-system';

const transparentBg = require('@/assets/images/transparent-bg.jpg');
const SIZE = ['S', 'M', 'L', 'X', 'XL', 'XXL'];


const ItemDetailScreen = ({ }) => {
  const { user, refreshUser } = useUser()


  const { parImage, parName, parKind, parLabel, parSize, parTempFloor, parTempRoof, parPurposes } = useLocalSearchParams();
  const tempImage = require('@/assets/images/placeholder_big.png');

  const [name, setName] = useState(
    Array.isArray(parName) ? parName[0] : parName || ''
  );
  const [originName, setOriginName] = useState(
    Array.isArray(parName) ? parName[0] : parName || ''
  );
  const [image, setImage] = useState(parImage);
  const [newImage, setNewImage] = useState('');
  console.log("I: ", parImage);

  // State variables for item details
  const [type, setType] = useState(parKind);
  const [originType, setOriginType] = useState(parKind);
  const [label, setLabel] = useState(
    Array.isArray(parLabel) ? parLabel[0] : parLabel || ''
  );
  const [originLabel, setOriginLabel] = useState(
    Array.isArray(parLabel) ? parLabel[0] : parLabel || ''
  );
  const [size, setSize] = useState(parSize || '');
  const [originSize, setOriginSize] = useState(parSize || '');

  const [temperatureFrom, setTemperatureFrom] = useState(parTempFloor);
  const [originTemperatureFrom, setOriginTemperatureFrom] = useState(parTempFloor);
  const [temperatureTo, setTemperatureTo] = useState(parTempRoof);
  const [originTemperatureTo, setOriginTemperatureTo] = useState(parTempRoof);
  const [temperatureModalVisible, setTemperatureModalVisible] = useState(false);

  const [clothingModalVisible, setClothingModalVisible] = useState(false);
  const [clothingSelectedItem, setClothingSelectedItem] = useState<string | null>(null);

  const [purposeModalVisible, setPurposeModalVisible] = useState(false);
  const [chosenPurpose, setChosenPurpose] = useState(parPurposes.split(',').sort().join(', '));
  const [originChosenPurpose, setOriginChosenPurpose] = useState(parPurposes.split(',').sort().join(','));

  const [sizeModalVisible, setSizeModalVisible] = useState(false);
  const [sizeSelectedItem, setSizeSelectedItem] = useState<string | null>(
    Array.isArray(parSize) ? parSize[0] : parSize || ''
  );

  const router = useRouter();

  const handleAddPurpose = (purposeArray: string[]) => {
    setChosenPurpose(purposeArray.join(', '));
  };

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
        return `data:image/png;base64,${base64}`;
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

  const handleRemoveConfirmed = async () => {
    try {
      const data = {
        name: originName,
        kind: originType,
        purposes: originChosenPurpose.split(',').sort(),
        tempFloor: Number(originTemperatureFrom),
        tempRoof: Number(originTemperatureTo),
        ...(originLabel && { label: originLabel }),
        ...(originSize && { size: originSize })
      };
      console.log("Remove data: ", data);

      const response: AxiosResponse<{ message: string }, any> = await api.delete('/clothes', { data });
      console.log("Remove: ", response.data.message);

      console.log('Item removed');
      await refreshUser()
      router.replace('/(root)/(tabs)/wardrobe');
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveItem = () => {
    console.log('handleRemoveItem called');
    Alert.alert(
      'Confirm Removal',
      'Are you sure you want to remove this item?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: handleRemoveConfirmed
        },
      ],
      { cancelable: true }
    );
  }

  const handleSaveItem = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a name for the item.');
      return;
    }

    if (!image) {
      Alert.alert('Error', 'Please upload an image for the item.');
      return;
    }

    // Logic to save the item goes here
    try {
      const uri = await convertImageToBuffer(image)
      console.log("Save Image: ", uri);

      const data = {
        name: originName,
        kind: originType,
        purposes: originChosenPurpose.split(',').sort(),
        tempFloor: Number(originTemperatureFrom),
        tempRoof: Number(originTemperatureTo),
        ...(originLabel && { label: originLabel }),
        ...(originSize && { size: originSize })
      };
      console.log("Remove data: ", data);

      const response: AxiosResponse<{ message: string }, any> = await api.delete('/clothes', { data });
      console.log("Remove: ", response.data.message);

      const profile = {
        name: name,
        kind: type,
        tempFloor: Number(temperatureFrom),
        tempRoof: Number(temperatureTo),
        purposes: chosenPurpose.split(', ').sort(),
        ...(label && { label: label }),
        ...(size && { size: size })
      }

      const sendData = {
        image: uri,
        prof: JSON.stringify(profile)
      }

      console.log("Save data: ", sendData);
      const responseSave = await api.post('/clothes', sendData);

      const d = await responseSave.data;
      console.log('Success:', d);
      console.log('Item saved:', { name, image, type, label, size, temperatureFrom, temperatureTo, chosenPurpose });

      // Navigate back and show success message
      Alert.alert('Success', 'Item saved successfully!');
      await refreshUser()
      router.replace('/(root)/(tabs)/wardrobe');
    } catch (error) {
      console.error("Save Error: ", error)
    }
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
        {/* <ImageBackground
          source={transparentBg}
          style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
          imageStyle={{ borderRadius: 10 }}
        > */}
        {image ? (
          <ImageWrapper image={Array.isArray(image) ? image[0] : image || ''}></ImageWrapper>
        ) : (
          <Text style={styles.uploadText}>Upload the image</Text>
        )}

        <View style={styles.cameraButtons}>
          <TouchableOpacity onPress={takePhoto}>
            <Icon name="camera" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* </ImageBackground> */}
      </TouchableOpacity>

      <ScreenDivider />


      <TextInput style={styles.nameInput} placeholder="Name" value={name} onChangeText={setName} />


      <View style={styles.form}>
        <View style={styles.inputRow}>
          <Text style={styles.label}>Type:</Text>
          <TouchableOpacity
            style={[styles.input, { justifyContent: 'center' }]}
            onPress={() => setClothingModalVisible(true)}
          >
            <Text style={{ color: type ? '#222' : '#666' }}>
              {type
                ? `${type}`
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
              value: Array.isArray(temperatureFrom) ? temperatureFrom[0] : temperatureFrom || '',
              onChangeText: setTemperatureFrom,
            },
            {
              label: 'To:',
              placeholder: 'Temperature',
              value: Array.isArray(temperatureTo) ? temperatureTo[0] : temperatureTo || '',
              onChangeText: setTemperatureTo,
            },
          ]}
          actions={[
            { label: 'Cancel', onPress: () => setTemperatureModalVisible(false) },
            {
              label: 'OK',
              onPress: () => {
                // Kiểm tra phải là số
                const tempFromStr = Array.isArray(temperatureFrom) ? temperatureFrom[0] : temperatureFrom || '';
                const tempToStr = Array.isArray(temperatureTo) ? temperatureTo[0] : temperatureTo || '';
                if (
                  !/^\d+(\.\d+)?$/.test(tempFromStr) ||
                  !/^\d+(\.\d+)?$/.test(tempToStr)
                ) {
                  Alert.alert('Error', 'Please enter valid value for temperature (number).');
                  return;
                }
                // Kiểm tra from < to
                if (parseFloat(tempFromStr) >= parseFloat(tempToStr)) {
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
          onPress={() => router.replace('/(root)/(tabs)/wardrobe')}
        />
        <RectButton
          title="Save"
          buttonColor="#00CA6E"
          width={100}
          height={50}
          onPress={() => handleSaveItem()}
        />
        <RectButton
          title="Remove"
          buttonColor="#FF4242"
          width={100}
          height={50}
          onPress={() => handleRemoveItem()}
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
    marginBottom: 20,
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
    zIndex: 2,
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
    fontSize: 20,
    fontWeight: 'bold',

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

export default ItemDetailScreen;