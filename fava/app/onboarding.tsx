import React, { useState } from 'react';
import { Image, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import Onboarding, { DotProps } from 'react-native-onboarding-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { CustomDot } from '../components/CustomDot';
import { CustomButton } from '../components/CustomButton';


export default function OnboardingScreen() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);

  const handleFinish = async () => {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    router.replace('/(tabs)');
  };

  return (
    <Onboarding
      onSkip={handleFinish}
      onDone={handleFinish}
      DotComponent={CustomDot}
      NextButtonComponent={(props) => <CustomButton title="Next" {...props} />}
      SkipButtonComponent={(props) => <CustomButton title="Skip" {...props} />}
      DoneButtonComponent={(props) => <CustomButton title="Get Started" {...props} />}
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image source={require('../assets/images/onboarding1.png')} style={styles.image} />,
          title: 'Welcome to Your Wardrobe',
          subtitle: 'Creating your own wardrobe has not been easier with our virtual storage system.',
        },
        {
          backgroundColor: '#fff',
          image: <Image source={require('../assets/images/onboarding2.png')} style={styles.image} />,
          title: 'Don’t know what to wear?',
          subtitle: 'Professional AI stylist is here to help by all its best.',
        },
        {
          backgroundColor: '#fff',
          image: <Image source={require('../assets/images/onboarding3.png')} style={styles.image} />,
          title: 'Catch up trends with just a click.',
          subtitle: '',
        },
        {
          backgroundColor: '#fff',
          image: <Image source={require('../assets/images/onboarding4.png')} style={styles.image} />,
          title: 'Save time, try virtually!',
          subtitle: '',
        },
      ]}
    />
  );
}


const styles = StyleSheet.create({
  image: {
    width: 300,      
    height: 300,     
    resizeMode: 'contain',
    marginBottom: 40,
  },

 
});
