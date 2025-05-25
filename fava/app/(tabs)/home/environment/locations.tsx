import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity, TextInput } from 'react-native';
import CityWeatherCard from '@/components/CityWeatherCard';
import CircleButton from '@/components/CircleButton';
import { useRouter } from 'expo-router';

const cityWeatherData = [
  { id: '1', city: 'London', range: '10 ~ 20 ℃', currentTemp: '18 ℃' },
  { id: '2', city: 'New York', range: '12 ~ 22 ℃', currentTemp: '20 ℃' },
  { id: '3', city: 'Tokyo', range: '14 ~ 24 ℃', currentTemp: '21 ℃' },
  { id: '4', city: 'Paris', range: '11 ~ 19 ℃', currentTemp: '17 ℃' },
  { id: '5', city: 'Sydney', range: '16 ~ 26 ℃', currentTemp: '23 ℃' },
  { id: '6', city: 'Tokyo', range: '14 ~ 24 ℃', currentTemp: '21 ℃' },
  { id: '7', city: 'Paris', range: '11 ~ 19 ℃', currentTemp: '17 ℃' },
  { id: '8', city: 'Sydney', range: '16 ~ 26 ℃', currentTemp: '23 ℃' },
];


const LocationsScreen = () => {
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [newCity, setNewCity] = useState('');

    const handleAddCity = () => {
        // Xử lý thêm thành phố mới ở đây (ví dụ: gọi API hoặc cập nhật state)
        setModalVisible(false);
        setNewCity('');
    };

    return (
        <View>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            {cityWeatherData.map(item => (
                <CityWeatherCard
                key={item.id}
                city={item.city}
                range={item.range}
                currentTemp={item.currentTemp}
                />
            ))}
            </ScrollView>


            <View style={styles.buttonRow}>
                <CircleButton
                iconName="arrow-left"
                buttonColor="#C2185B"
                width={50}
                height={50}
                onPress={() => router.back()}
                />
                <CircleButton
                iconName="plus"
                buttonColor="#C2185B"
                width={50}
                height={50}
                onPress={() => setModalVisible(true)}
                />
            </View>



<Modal
  visible={modalVisible}
  transparent
  animationType="fade"
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContent}>
      <View style={styles.row}>
        <Text style={styles.label}>City:</Text>
        <TextInput
          style={styles.input}
          placeholder="City Name"
          value={newCity}
          onChangeText={setNewCity}
        />
      </View>

      <View style={styles.modalButtonRow}>
        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
          <Text>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAddCity} style={styles.modalButton}>
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>



        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10, 
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        position: 'absolute',
        left: '10%',         
        bottom: 30,          
        marginTop: 0,       
    },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '85%',
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
    width: 60,
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f3ff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 16,
    color: '#333',
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 1,
  },
  modalButton: {
    marginLeft: 15,
    paddingHorizontal: 15,
    paddingVertical: 2,
  },
});

export default LocationsScreen;