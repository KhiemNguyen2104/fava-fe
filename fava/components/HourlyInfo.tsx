import React from 'react';
import { Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type HourlyInfoProps = {
    height?: number;
    width?: number;
    temperature: string;
    hour: string;
    icon?: string;
};

const HourlyInfo: React.FC<HourlyInfoProps> = ({  height = 130, width = 70, temperature, hour, icon = 'partly-sunny-outline' }) => {
  return (
    <LinearGradient
      colors={['#124BAD', '#9BD4FF']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={[styles.container, { height, width }]}
    >
      <Text style={styles.tempText}>{temperature}</Text>
      <Image
        source={{ uri: `https:${icon}` }} 
        style={{height: width * 0.85, width: width * 0.85}}
      />
      <Text style={styles.hourText}>{hour}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 3,
    marginLeft: 15,
    marginRight: 15,
  },
  tempText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  hourText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  }
});

export default HourlyInfo;
