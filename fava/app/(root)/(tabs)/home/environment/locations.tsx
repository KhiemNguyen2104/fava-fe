import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert, Text } from 'react-native';
import CityWeatherCard from '@/components/CityWeatherCard';
import CircleButton from '@/components/CircleButton';
import { useRouter } from 'expo-router';
import CustomModal from '@/components/CustomModal';
import { useUser } from '@/context/UserContext';
import api from '@/ultils/axiosInstance';
import { AxiosResponse } from 'axios';

const LocationsScreen = () => {
  const { user, refreshUser } = useUser()

  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [cities, setCities] = useState<string[]>([]);
  const [weatherData, setWeatherData] = useState<{
    city: string;
    range: string;
    currentTemp: string;
  }[]>([]);
  const [newCity, setNewCity] = useState('');
  const [deleteCity, setDeleteCity] = useState('');

  const getAllCities = async () => {
    try {
      const citiesRes = await api.get('/weather/cities')

      console.log("Cities: ", citiesRes.data)

      setCities(citiesRes.data)
    } catch (error) {
      console.error(error)
    }
  }

  const getAllWeatherData = async () => {
    let data = []
    for (const city of cities) {
      const weatherRes = await api.get(`/weather/forecast?location=${city}`)
      const resData = weatherRes.data

      data.push({
        city: city,
        range: `${resData.forecast.forecastday[0].day.mintemp_c} ~ ${resData.forecast.forecastday[0].day.maxtemp_c} ℃`,
        currentTemp: `${resData.current.temp_c} ℃`
      })
    }

    setWeatherData(data)
  }

  const handleAddCity = async () => {
    try {
      const response: AxiosResponse<string, any> = await api.post(`/weather/city?name=${newCity}`)

      setModalVisible(false);
      setNewCity('');

      await getAllCities()
      await getAllWeatherData()
    } catch (err) {
      console.error(err)
    }
  };

  const handleDeleteCity = async () => {
    Alert.alert("Delete City", "Are you sure you want to delete this city?", [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "OK",
        onPress: async () => {
          try {
            const response = await api.delete(`/weather/city?name=${deleteCity}`)

            await getAllCities()
            await getAllWeatherData()

            console.log("City deleted");
          } catch (error) {
            console.error(error)
          }
        }
      }
    ]);
  }

  const handleSelectCity = async () => {
    try {
      const data = {
        userEmail: user?.email,
        userName: user?.name,
        currentLocation: newCity
      }

      const response = await api.put('/users/profile', data)

      router.push('/(root)/(tabs)/home/environment')
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    refreshUser()
    getAllCities()
  }, [])

  useEffect(() => {
    if (cities.length > 0) {
      getAllWeatherData()
    }
  }, [cities])

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {weatherData.length > 0 ? weatherData.map(item => (
          <TouchableOpacity key={item.city} onPress={() => handleSelectCity()}>
            <CityWeatherCard
              city={item.city}
              range={item.range}
              currentTemp={item.currentTemp}
            />
          </TouchableOpacity>
        )) : (
          <View style={styles.alterContainer}>
            <Text style={styles.alterText}>There is nothing here!</Text>
          </View>
        )}
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
      {/* Modal for adding city */}
      <CustomModal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        fields={[
          {
            label: 'City:',
            placeholder: 'City Name',
            value: newCity,
            onChangeText: setNewCity,
          },
        ]}
        actions={[
          { label: 'Cancel', onPress: () => setModalVisible(false) },
          { label: 'Add', onPress: handleAddCity },
        ]}
      />
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
  alterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  alterText: {
    fontSize: 18,
    textAlign: 'center'
  }
});

export default LocationsScreen;