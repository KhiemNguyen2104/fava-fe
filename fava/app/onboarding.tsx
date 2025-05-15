// app/onboarding.tsx
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function OnboardingScreen() {
  const router = useRouter();

  const handleFinish = async () => {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test OnboardingScreen</Text>
      <Text style={styles.description}>#%@#@EWRREW</Text>
      <Button title="Bắt đầu ngay" onPress={handleFinish} />
    </View>
  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20,
  },
  title: {
    fontSize: 24, fontWeight: 'bold', marginBottom: 10,
  },
  description: {
    fontSize: 16, textAlign: 'center', marginBottom: 30,
  },
});
