import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable, Modal } from 'react-native';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validate = () => {
    if (!email) {
      setError('Please give me your email');
      setShowError(true);
      setShowSuccess(false);
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Email is invalid');
      setShowError(true);
      setShowSuccess(false);
      return false;
    }
    if (!password) {
      setError('Please give me your password');
      setShowError(true);
      setShowSuccess(false);
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setShowError(true);
      setShowSuccess(false);
      return false;
    }
    if (!confirmPassword) {
      setError('Please confirm your password');
      setShowError(true);
      setShowSuccess(false);
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setShowError(true);
      setShowSuccess(false);
      return false;
    }
    setError('');
    setShowError(false);
    return true;
  };

  const handleSignUp = () => {
    if (validate()) {
      setShowSuccess(true);
      setShowError(false);
    }
  };

  const handleOkay = () => {
    setShowSuccess(false);
    router.push('/(tabs)/auth/login');
  };

  const handleAlreadyHaveAccount = () => {
    router.push('/(tabs)/auth/login');
  }

  return (
    <View style={styles.container}>
      {showError && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorBannerText}>{error}</Text>
        </View>
      )}
      <Modal
        visible={showSuccess}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.successModal}>
            <Text style={styles.successModalText}>
              Register successfully!{'\n'}You will be moved to login page
            </Text>
            <Pressable style={styles.okayButton} onPress={handleOkay}>
              <Text style={styles.okayButtonText}>Okay</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Text style={styles.header}>Create Account</Text>
      <Text style={styles.subHeader}>
        Create an account so you can explore all the existing jobs
      </Text>
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
      <TextInput
        style={styles.inputPassword}
        placeholder="Confirm Password"
        placeholderTextColor="#6B7280"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        onFocus={() => setShowError(false)}
      />
      <Pressable style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpText}>Sign up</Text>
      </Pressable>
      <Pressable>
        <Text style={styles.haveAccount} onPress={handleAlreadyHaveAccount}>Already have an account</Text>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successModal: {
    backgroundColor: '#22C55E',
    borderRadius: 16,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 280,
    elevation: 20,
  },
  successModalText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  okayButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 32,
    marginTop: 8,
  },
  okayButtonText: {
    color: '#22C55E',
    fontWeight: 'bold',
    fontSize: 16,
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
    marginBottom: 16,
    color: '#222',
  },
  signUpButton: {
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
  signUpText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  haveAccount: { textAlign: 'center', color: '#444', fontSize: 16, marginBottom: 24, fontWeight: '500' },
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
});