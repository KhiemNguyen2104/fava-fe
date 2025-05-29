import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);  

  const validate = () => {
    if (!email) {
      setError('Please give me your email');
      setShowError(true);
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Email is invalid');
      setShowError(true);
      return false;
    }
    if (!password) {
      setError('Please give me your password');
      setShowError(true);
      return false;
    }
    setError('');
    setShowError(false);
    return true;
  };

  const handleSignIn = () => {
    router.push('/(root)/(tabs)/home');
  };

  const handleCreateAccount = () => {
      router.push('/(root)/(auth)/register');
  };

  return (
    <View style={styles.container}>
      {showError && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorBannerText}>{error}</Text>
        </View>
      )}
      <Text style={styles.header}>Login here</Text>
      <Text style={styles.subHeader}>Welcome back you&apos;ve been missed!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#6B7280"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        onFocus={() => setShowError(false)}
      />
      <TextInput
        style={styles.inputPassword}
        placeholder="Password"
        placeholderTextColor="#6B7280"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        onFocus={() => setShowError(false)}
      />
      <TouchableOpacity style={styles.forgotContainer}>
        <Text style={styles.forgotText}>Forgot your password?</Text>
      </TouchableOpacity>
      <Pressable style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInText}>Sign in</Text>
      </Pressable>
      <Pressable onPress={handleCreateAccount}>
        <Text style={styles.createAccount}>Create new account</Text>
      </Pressable>
      <Text style={styles.orContinue}>Or continue with</Text>
      <View style={styles.socialContainer}>
        <View style={styles.socialButton}><Text style={styles.socialIcon}>G</Text></View>
        <View style={styles.socialButton}><Text style={styles.socialIcon}>f</Text></View>
        <View style={styles.socialButton}><Text style={styles.socialIcon}></Text></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#F9FAFF' },
  errorBanner: {
    position: 'absolute',
    top: 5,
    left: 24,
    right: 24,
    backgroundColor: '#FF4848',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    zIndex: 10,
    elevation: 10,
  },
  errorBannerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: { fontSize: 32, fontWeight: 'bold', color: '#D0136C', textAlign: 'center', marginBottom: 8 },
  subHeader: { fontSize: 18, color: '#222', textAlign: 'center', marginBottom: 32, fontWeight: '500' },
  input: {
    backgroundColor: '#F4F7FE',
    borderColor: '#3B5AFB',
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    color: '#222',
  },
  inputPassword: {
    backgroundColor: '#F4F7FE',
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    marginBottom: 8,
    color: '#222',
  },
  forgotContainer: { alignItems: 'flex-end', marginBottom: 24 },
  forgotText: { color: '#3B5AFB', fontWeight: '500' },
  signInButton: {
    backgroundColor: '#D0136C',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#D0136C',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 3,
  },
  signInText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  createAccount: { textAlign: 'center', color: '#444', fontSize: 16, marginBottom: 24, fontWeight: '500' },
  orContinue: { textAlign: 'center', color: '#3B5AFB', fontWeight: '500', marginBottom: 16 },
  socialContainer: { flexDirection: 'row', justifyContent: 'center', gap: 16 },
  socialButton: {
    backgroundColor: '#F4F7FE',
    borderRadius: 12,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  socialIcon: { fontSize: 28, color: '#222', fontWeight: 'bold' },
  errorText: {
    color: '#D0136C',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '500',
  },
});