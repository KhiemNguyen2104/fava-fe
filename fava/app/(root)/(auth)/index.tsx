import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import RectButton from '@/components/RectangleButton';

export default function LoginRegisterScreen() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/(root)/(auth)/login');
  };

  const handleRegister = () => {
    router.push('/(root)/(auth)/register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Already have an{'\n'}account?</Text>
      <View style={styles.buttonRow}>
        <RectButton
          title="Login"
          buttonColor="#D0136C"
          width={150}
          height={60}
          onPress={() => handleLogin()}
        />
        <RectButton
          title="Register"
          buttonColor="#D0136C"
          width={150}
          height={60}
          onPress={() => handleRegister() }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#D0136C',
    textAlign: 'center',
    marginBottom: 64,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignItems: 'center',
  },
});