import React, { useState } from 'react';
import { Alert, View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import RectButton from '@/components/RectangleButton';
import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';
import CustomModal from '@/components/CustomModal';
import ClothingPickerModal from '@/components/ClothingModal';
import ScreenDivider from '@/components/ScreenDivider';
import ItemCard from '@/components/ItemCard';
import PurposePickerModal from '@/components/PurposePickerModal';

const itemCardData = [
  {
    image: require('@/assets/images/placeholder_big.png'),
    name: "T1 Jacket Faker",
    label: "",
    size: "XL",
  },
  {
    image: require('@/assets/images/placeholder_big.png'),
    name: "T1 Jacket Faker",
    label: "",
    size: "L",
  },
    {
    image: require('@/assets/images/placeholder_big.png'),
    name: "T1 Jacket Faker",
    label: "",
    size: "L",
  },
    {
    image: require('@/assets/images/placeholder_big.png'),
    name: "T1 Jacket Faker",
    label: "",
    size: "L",
  },
];

export default function AddItem() {
  const [type, setType] = useState('');
  const [label, setLabel] = useState('');
  const [size, setSize] = useState('');
  const [purpose, setPurpose] = useState('');
  const [isFullOutfit, setIsFullOutfit] = useState(false);

  const [temperatureModalVisible, setTemperatureModalVisible] = useState(false);
  const [temperatureFrom, setTemperatureFrom] = useState('');
  const [temperatureTo, setTemperatureTo] = useState('');

  const [clothingModalVisible, setClothingModalVisible] = useState(false);
  const [clothingSelectedItem, setClothingSelectedItem] = useState<string | null>(null);

  const [purposeModalVisible, setPurposeModalVisible] = useState(false);
  const [purposes, setPurposes] = useState<string[]>([]);

  const handleAddPurpose = (purpose: string) => {
    if (purpose && !purposes.includes(purpose)) {
      setPurposes([...purposes, purpose]);
    }
    setPurpose(purpose); 
  };

  const router = useRouter();
  
  const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      

      <View style={styles.form}>  
        <Text style={styles.sectionTitle}>◆ Purpose</Text>
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
        
        <Text style={styles.sectionTitle}>◆ Other criteria</Text>
        <View style={styles.inputRow}>
            <Text style={styles.label}>Type:</Text>
             <TouchableOpacity
              style={[styles.input, { justifyContent: 'center' }]}
              onPress={() => setClothingModalVisible(true)}
             >
              <Text  style={{ color: clothingSelectedItem ? '#111' : '#666' }}>
                { clothingSelectedItem
                  ? `${clothingSelectedItem}`
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
            <TextInput style={styles.input} placeholder="XL" value={size} onChangeText={setSize} />
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
          <TouchableOpacity
            style={styles.radioCircle}
            onPress={() => setIsFullOutfit(!isFullOutfit)}
          >
            {isFullOutfit && <View style={styles.selectedRb} />}
          </TouchableOpacity>
          <Text style={styles.label}>Full outfit</Text>
        </View>
                
      </View>
      
      <View style={styles.submitButton}>
        <RectButton
          title="Submit"
          buttonColor="#C2185B"
          width={120}
          height={50}
          onPress={() => setShowSuggestions(true)}
        />
      </View>

      <ScreenDivider />

      {showSuggestions && (
        <ScrollView horizontal={false} showsVerticalScrollIndicator={false} contentContainerStyle={styles.suggestionContainer}>
          {itemCardData.map((item, index) => (
            <ItemCard
              key={index}
              image={item.image}
              name={item.name}
              label={item.label}
              size={item.size}
              onPress={() => router.push({
                pathname: '/(root)/(tabs)/wardrobe/detail',
                params: {
                  image: item.image,
                  name: item.name,
                  label: item.label,
                  size: item.size,
                },
              })}
            />
          ))}
        </ScrollView>
      )}
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
  submitButton: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'flex-end',
  },
   sectionTitle: {
    fontWeight: 'bold',
    color: '#d10a6a',
    marginTop: 10,
    marginBottom: 10,
  },
  radioCircle: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#d10a6a',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRb: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#d10a6a',
  },
  suggestionContainer: {
    paddingHorizontal: 10,
    marginTop: 10,
    alignItems: 'center',
  },
});
