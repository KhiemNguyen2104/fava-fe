import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from "react-native-vector-icons/FontAwesome6";
import RectButton from '../../../components/RectangleButton';
import CircleBurron from '../../../components/CircleButton';
import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';

const transparentBg = require('../../../assets/images/transparent-bg.jpg'); 

export default function AddItem() {
  const [name, setName] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [type, setType] = useState('');
  const [label, setLabel] = useState('');
  const [size, setSize] = useState('');
  const [temperature, setTemperature] = useState('');
  const [purpose, setPurpose] = useState('');
  const router = useRouter();

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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
        <ImageBackground
          source={transparentBg}
          style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
          imageStyle={{ borderRadius: 10 }}
        >
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

        </ImageBackground>
      </TouchableOpacity>

      <View style={styles.AiCameraButtons}>
        <TouchableOpacity onPress={takePhoto}>
          <Icon name="lightbulb" size={24} color="white" />
        </TouchableOpacity>
      </View>

      
      <View style={styles.divider} />  
      
      
      <TextInput style={styles.nameInput} placeholder="Name" value={name} onChangeText={setName} />


      <View style={styles.form}>        
        <View style={styles.inputRow}>
            <Text style={styles.label}>Type:</Text>
            <TextInput style={styles.input} placeholder="Pants, skirt, ..." value={type} onChangeText={setType} />
        </View>

        <View style={styles.inputRow}>
            <Text style={styles.label}>Label:</Text>
            <TextInput style={styles.input} placeholder="Adidas, Nike, ..." value={label} onChangeText={setLabel} />
        </View>

        <View style={styles.inputRow}>
            <Text style={styles.label}>Size:</Text>
            <TextInput style={styles.input} placeholder="XL" value={size} onChangeText={setSize} />
        </View>

        <View style={styles.inputRow}>
            <Text style={styles.label}>Temperature:</Text>
            <TextInput style={styles.input} placeholder="25 - 30" value={temperature} onChangeText={setTemperature} />
        </View>

        <View style={styles.inputRow}>         
            <Text style={styles.label}>Purpose:</Text>
            <TextInput style={styles.input} placeholder="Work, Go out" value={purpose} onChangeText={setPurpose} />
        </View>
                
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
          onPress={() => console.log('Remove pressed')}
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
    divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    width: '100%',
    alignSelf: 'center',
    marginTop: 5,
  },
});
