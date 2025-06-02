import React, { useEffect, useState } from 'react';
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
import { useUser } from '@/context/UserContext';

export default function WeatherScreen() {
  const { user, refreshUser } = useUser()

  const [hourlyForecast, setHourlyForecast] = useState<any[]>([]);
  const [currentTemp, setCurrentTemp] = useState<number | null>(null);
  const [currentState, setCurrentState] = useState<string>('');
  const [minTemp, setMinTemp] = useState<number | null>(null);
  const [maxTemp, setMaxTemp] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [windSpeed, setWindSpeed] = useState<number | null>(null);
  const [uv, setUv] = useState<number | null>(null);

  const getWeatherData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('weatherData');
      console.log("User: ", user)

      if (jsonValue !== null) {
        const data = JSON.parse(jsonValue);
        const currentHour = (new Date()).getHours()
        const hours = data.forecast.forecastday[0].hour.filter((item: any) => (new Date(item.time)).getHours() >= currentHour)

        // console.log("Hours: ", data.forecast.forecastday[0].hour.map((item) => {return {condition: item.condition, temp_c: String(item.temp_c), time: String(new Date(item.time).getHours())}}))

        setHourlyForecast(hours.map((item: any) => { return { condition: item.condition, temp_c: String(item.temp_c), time: String(new Date(item.time).getHours()) } }));
        setCurrentTemp(data.current.temp_c);
        setCurrentState(data.current.condition.text);
        setMinTemp(data.forecast.forecastday[0].day.mintemp_c);
        setMaxTemp(data.forecast.forecastday[0].day.maxtemp_c);
        setHumidity(data.current.humidity);
        setWindSpeed(data.current.wind_mph);
        setUv(data.current.uv);
      }
    } catch (err) {
      console.error("Error reading weather data: ", err)
    }
  }

  const router = useRouter();

  useEffect(() => {
    refreshUser()
  }, [])

  useEffect(() => {
    getWeatherData()
  }, [user])

  useEffect(() => {
    console.log("Hourly Forecast Updated:", hourlyForecast);
  }, [hourlyForecast]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.city}>{user?.currentLocation}</Text>
        <TouchableOpacity onPress={() => router.push('/(root)/(tabs)/home/environment/locations')}>
          <MaterialCommunityIcons name="file-document-outline" size={35} color="black" />
        </TouchableOpacity>
      </View>

      {/* Current Temp */}
      <Text style={styles.currentTemp}>{`${currentTemp} ℃`}</Text>
      <Text style={styles.weatherStatus}>{currentState}</Text>

      {/* Extra Info */}
      <View style={styles.extraInfo}>
        <Text style={styles.infoText}>{`${minTemp} ~ ${maxTemp} ℃, humidity ${humidity}%`}</Text>
        <View style={styles.row}>
          <MaterialCommunityIcons name="weather-windy" size={25} color="black" />
          <Text style={styles.infoText}>{`${windSpeed} mph`}</Text>
        </View>
        <View style={styles.row}>
          <MaterialCommunityIcons name="weather-sunny" size={25} color="black" />
          <Text style={styles.infoText}>{uv}</Text>
        </View>
      </View>

      {/* Hourly Forecast */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hourlyScroll}>
        {(hourlyForecast.length != 0) ? hourlyForecast.map((item, index) => (
          <HourlyInfo
            key={index}
            height={200}
            width={80}
            temperature={`${item.temp_c} ℃`}
            hour={`${item.time}:00`}
            icon={item.condition.icon}
          />
        )) : (
          <Text>No forecast data.</Text>
        )}
      </ScrollView>

      {/* Back Button */}
      <View style={styles.backButton}>
        <CircleButton
          iconName="arrow-left"
          buttonColor="#C2185B"
          width={50}
          height={50}
          onPress={() => router.replace('/(root)/(tabs)/home')}
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
