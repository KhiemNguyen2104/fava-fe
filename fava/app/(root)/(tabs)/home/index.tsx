import React, { useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import EnvironmentInfo from '@/components/EnvironmentInfo';
import { Route, RouteParams, useRouter } from 'expo-router';
import api from '@/ultils/axiosInstance';
import { useUser } from '@/context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const { user, loading, refreshUser, logout } = useUser();

  const [environmentInfo, setEnvironmentInfo] = React.useState({
    temperature: '',
    humidity: '',
    location: '',
    weatherIcon: '',
  });

  const fetchWeather = async () => {
    try {
      const url = `/weather/forecast?location=${user?.currentLocation}`

      const response = await api.get(url)
      const data = response.data;

      await AsyncStorage.setItem('weatherData', JSON.stringify(data))

      setEnvironmentInfo({
        location: data.location?.name || "",
        temperature: data.current?.temp_c || "",
        weatherIcon: data.current?.condition?.icon || "",
        humidity: data.current?.humidity || "",
      });

      console.log("Weather data:", environmentInfo);
    } catch (error) {
      console.error("Weather fetch error:", error);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  useEffect(() => {
    if (user && user.currentLocation) {
      fetchWeather();
    }
  }, [user]);

  const router = useRouter();
  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      <TouchableOpacity onPress={() => router.push('/(tabs)/home/environment' as Route)}>
        <EnvironmentInfo
          weatherIcon={environmentInfo.weatherIcon}
          temperature={environmentInfo.temperature}
          humidity={environmentInfo.humidity}
          location={environmentInfo.location}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Shopping suggestion</Text>
      <View style={styles.alterContainer}>
        <Text style={styles.alterText}>This feature is coming soon!</Text>
      </View>
      {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.suggestionContainer}>
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
                image: "@/assets/images/placeholder_big.png",
                name: item.name,
                label: item.label,
                size: item.size,
              },
            })}
          />
        ))}
      </ScrollView> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 23,
    marginLeft: 35,
    marginVertical: 20,
  },
  suggestionContainer: {
    paddingHorizontal: 10,
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

export default HomeScreen;
