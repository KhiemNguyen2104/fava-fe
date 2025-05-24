import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type EnvironmentInfoProps = {
    weatherIcon: any; 
    temperature: string;
    humidity: string;
    location: string;
};

const EnvironmentInfo: React.FC<EnvironmentInfoProps> = ({ weatherIcon, temperature, humidity, location }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `https:${weatherIcon}` }}
        style={styles.icon}
      />
      <View>
        <Text style={styles.text}>{temperature} ℃</Text>
        <Text style={styles.text}>Humidity {humidity}%</Text>
        <Text style={styles.text}>{location}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  icon: {
    width: 110,
    height: 110,
    marginRight: 10,
    marginLeft: 20,
  },
  text: {
    fontSize: 17,
  },
});

export default EnvironmentInfo;
