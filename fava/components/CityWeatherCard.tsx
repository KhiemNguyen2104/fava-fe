import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type CityWeatherCardProps = {
    city?: string;
    range?: string;
    currentTemp?: string;
    };

const CityWeatherCard = ({ city = "London", range = "10 ~ 20 ℃", currentTemp = "18 ℃" } : CityWeatherCardProps) => {
  return (
    <LinearGradient
      colors={['#124BAD', '#9BD4FF']}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={styles.container}
    >
      <View style={styles.left}>
        <Text style={styles.cityName}>{city}</Text>
        <Text style={styles.tempRange}>{range}</Text>
      </View>
      <Text style={styles.currentTemp}>{currentTemp}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 3,
  },
  left: {
    flexDirection: 'column',
  },
  cityName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  tempRange: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    opacity: 0.85,
  },
  currentTemp: {
    color: '#0D47A1',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default CityWeatherCard;
