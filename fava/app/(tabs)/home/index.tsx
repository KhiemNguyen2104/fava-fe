import React, { useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import EnvironmentInfo from '../../../components/EnvironmentInfo';
import ItemCard from './../../../components/ItemCard';

const weatherAPIKey = process.env.EXPO_PUBLIC_WEATHER_API_KEY;
const itemCardData = [
  {
    image: require('../../../assets/images/placeholder_big.png'),
    name: "T1 Jacket Faker",
    label: "",
    size: "XL",
  },
  {
    image: require('../../../assets/images/placeholder_big.png'),
    name: "T1 Jacket Faker",
    label: "",
    size: "L",
  },
    {
    image: require('../../../assets/images/placeholder_big.png'),
    name: "T1 Jacket Faker",
    label: "",
    size: "L",
  },
    {
    image: require('../../../assets/images/placeholder_big.png'),
    name: "T1 Jacket Faker",
    label: "",
    size: "L",
  },
];

const HomeScreen = () => {

    const [environmentInfo, setEnvironmentInfo] = React.useState({
        temperature: '',
        humidity: '',
        location: '',
        weatherIcon: '',
    });

    const fetchWeather = async () => {
        try {
            const response = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=${weatherAPIKey}&q=auto:ip&aqi=no`
            );
            const data = await response.json();
            setEnvironmentInfo({
                location: data.location.name || "",
                temperature: data.current.temp_c || "",
                weatherIcon: data.current.condition.icon || "",
                humidity: data.current.humidity || "",
            });
            console.log("Weather data:", environmentInfo);
        } catch (error) {
            console.error("Weather fetch error:", error);
        }
    };

    useEffect(() => {
        fetchWeather();
    }, []);

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
        <EnvironmentInfo
            weatherIcon={environmentInfo.weatherIcon}
            temperature={environmentInfo.temperature}
            humidity={environmentInfo.humidity}
            location={environmentInfo.location}
        />
        <Text style={styles.title}>Shopping suggestion</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.suggestionContainer}>
        {itemCardData.map((item, index) => (
            <ItemCard
            key={index}
            image={item.image}
            name={item.name}
            label={item.label}
            size={item.size}
            />
        ))}
        </ScrollView>
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
});

export default HomeScreen;
