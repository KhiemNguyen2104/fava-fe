import React, { useState } from 'react';
import { Alert, View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from "react-native-vector-icons/FontAwesome6";
import RectButton from '@/components/RectangleButton';
import CircleBurron from '@/components/CircleButton';
import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';
import CustomModal from '@/components/CustomModal';
import ClothingPickerModal from '@/components/ClothingModal';
import ScreenDivider from '@/components/ScreenDivider';
import PurposePickerModal from '@/components/PurposePickerModal';
import { useLocalSearchParams } from 'expo-router';

const transparentBg = require('@/assets/images/transparent-bg.jpg'); 


const ItemDetailScreen = ({}) => {
  const { parImage, parName, parKind, parLabel, parSize, parTempFloor, parTempRoof, parPurposes } = useLocalSearchParams();
  const tempImage = require('@/assets/images/placeholder_big.png');

  const [name, setName] = useState(
    Array.isArray(parName) ? parName[0] : parName || ''
  );
  const [image, setImage] = useState<string | null>(
    Array.isArray(parImage) ? parImage[0] : parImage ?? null
  );

  // State variables for item details
  const [type, setType] = useState(parKind);
  const [label, setLabel] = useState(
    Array.isArray(parLabel) ? parLabel[0] : parLabel || ''
  );
  const [size, setSize] = useState(parSize || '');  
  const [purpose, setPurpose] = useState('');
  
  const [temperatureFrom, setTemperatureFrom] = useState(parTempFloor);
  const [temperatureTo, setTemperatureTo] = useState(parTempRoof);
  const [temperatureModalVisible, setTemperatureModalVisible] = useState(false);
  
  const [clothingModalVisible, setClothingModalVisible] = useState(false);
  const [clothingSelectedItem, setClothingSelectedItem] = useState<string | null>(null);

  const [purposeModalVisible, setPurposeModalVisible] = useState(false);
  const [purposes, setPurposes] = useState<string[]>(parPurposes || []);

  const router = useRouter();

  const handleAddPurpose = (purpose: string) => {
    if (purpose && !purposes.includes(purpose)) {
      setPurposes([...purposes, purpose]);
    }
    setPurpose(purpose); 
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

  const handleRemoveItem = () => {
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
          onPress: () => {
            // Logic to remove the item goes here
            console.log('Item removed');
            router.back();
          },
        },
      ],
      { cancelable: true }
    );
  }

  const handleSaveItem = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a name for the item.');
      return;
    }

    if (!image) {
      Alert.alert('Error', 'Please upload an image for the item.');
      return;
    }

    // Logic to save the item goes here
    console.log('Item saved:', { name, image, type, label, size, temperatureFrom, temperatureTo, purpose });
    
    // Navigate back and show success message
    Alert.alert('Success', 'Item saved successfully!');
    router.back();
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
          <Image source={{ uri: image }} style={styles.image} />
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
    
      <ScreenDivider  />  
      
      
      <TextInput style={styles.nameInput} placeholder="Name" value={name} onChangeText={setName} />


      <View style={styles.form}>        
        <View style={styles.inputRow}>
            <Text style={styles.label}>Type:</Text>
             <TouchableOpacity
              style={[styles.input, { justifyContent: 'center' }]}
              onPress={() => setClothingModalVisible(true)}
            >
              <Text  style={{ color: type ? '#222' : '#666' }}>
                { type
                  ? `${type}`
                  : 'Select Type'}
              </Text>
            </TouchableOpacity>
        </View>
        {/* Modal for selecting clothing type */}
          <ClothingPickerModal
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
            <TextInput style={styles.input} placeholder="XL" value={Array.isArray(size) ? size[0] : size} onChangeText={setSize} />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Temperature:</Text>
          <TouchableOpacity
            style={[styles.input, { justifyContent: 'center' }]}
            onPress={() => setTemperatureModalVisible(true)}
          >
            <Text  style={{ color: (temperatureFrom && temperatureTo) ? '#222' : '#666' }}>
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
              <Text  style={{ color: purpose ? '#111' : '#666' }}>
                { purpose
                  ? `${purpose}`
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