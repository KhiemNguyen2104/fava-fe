import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HourlyInfo from '@/components/HourlyInfo'; 
import CircleButton from '@/components/CircleButton';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WeatherScreen() {
  const [weatherState, setWeather] = React.useState(null)
  
  const getWeatherData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('weatherData');
      
      if (jsonValue !== null) {
        const data = JSON.parse(jsonValue)
        return data
      }
    } catch (err) {
      console.error("Error reading weather data: ", err)
    } 
  }
  
  let hourlyForecast = [
    { time: '19:00', temp: '26°C' },
    { time: '20:00', temp: '27°C' },
    { time: '21:00', temp: '28°C' },
    { time: '19:00', temp: '29°C' },
    { time: '20:00', temp: '30°C' },
    { time: '21:00', temp: '31°C' },
  ];
  const router = useRouter();
  const v = 'b'
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.city}>Ho Chi Minh</Text>
        <TouchableOpacity onPress={() => router.push('/(root)/(tabs)/home/environment/locations')}>
          <MaterialCommunityIcons name="file-document-outline" size={35} color="black" />
        </TouchableOpacity>
      </View>

      {/* Current Temp */}
      <Text style={styles.currentTemp}>v</Text>
      <Text style={styles.weatherStatus}>Cloudy</Text>

      {/* Extra Info */}
      <View style={styles.extraInfo}>
        <Text style={styles.infoText}>25 ~ 33 °C,  Độ ẩm 53%</Text>
        <View style={styles.row}>
          <MaterialCommunityIcons name="weather-windy" size={25} color="black" />
          <Text style={styles.infoText}>8.9 mph</Text>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcons name="weather-sunny" size={25} color="black" />
          <Text style={styles.infoText}> 10.2</Text>
        </View>
      </View>

      {/* Hourly Forecast */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hourlyScroll}>
        {hourlyForecast.map((item, index) => (
            <HourlyInfo 
                key={index} 
                height={200}
                width={80}
                temperature= {item.temp}    
                hour= {item.time}
                icon="//cdn.weatherapi.com/weather/64x64/night/122.png"
            />
        ))}
      </ScrollView>

      {/* Back Button */}
      <View style={styles.backButton}>
        <CircleButton
            iconName="arrow-left"
            buttonColor="#C2185B"
            width={50}
            height={50}
            onPress={() => router.back()}
          />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 15,
  },
  city: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#e91e63',
  },
  currentTemp: {
    fontSize: 40,
    color: '#1976d2',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  weatherStatus: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
  },
  extraInfo: {
    alignItems: 'center',
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  infoText: {
    fontSize: 24,
    color: '#000',
  },
  hourlyScroll: {
    marginTop: 20,
  },
  hourCard: {
    width: 80,
    backgroundColor: '#2196f3',
    marginHorizontal: 6,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  hourTemp: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  hourTime: {
    color: '#fff',
    marginTop: 4,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#e91e63',
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  backButton: {
    paddingBottom: "10%",
    paddingLeft: "5%",
  },
});
