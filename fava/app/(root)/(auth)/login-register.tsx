import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginRegisterScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<'login' | 'register'>('login');

  const handleLogin = () => {
    setSelected('login');
    router.push('/(root)/(auth)');
  };

  const handleRegister = () => {
    setSelected('register');
    router.push('/(root)/(auth)/register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Already have an{'\n'}account?</Text>
      <View style={styles.buttonRow}>
        <Pressable
          style={[styles.button, selected === 'login' && styles.buttonActive]}
          onPress={handleLogin}
        >
          <Text style={[styles.buttonText, selected === 'login' && styles.buttonTextActive]}>
            Login
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.buttonGhost,
            selected === 'register' && styles.buttonGhostActive
          ]}
          onPress={handleRegister}
        >
          <Text style={[styles.buttonGhostText]}>
            Register
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#D0136C',
    textAlign: 'center',
    marginBottom: 64,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 48,
    marginRight: 16,
    shadowColor: '#D0136C',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 3,
  },
  buttonActive: {
    backgroundColor: '#D0136C',
  },
  buttonText: {
    color: '#D0136C',
    fontSize: 22,
    fontWeight: 'bold',
  },
  buttonTextActive: {
    color: '#fff',
  },
  buttonGhost: {
    backgroundColor: 'transparent',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderWidth: 2,
    borderColor: '#D0136C',
    shadowColor: '#D0136C',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 2,
  },
  buttonGhostActive: {
    backgroundColor: '#fff',
    borderColor: '#D0136C',
    shadowOpacity: 0.18,
    elevation: 4,
  },
  buttonGhostText: {
    color: '#D0136C',
    fontSize: 22,
    fontWeight: 'bold',
  },
});