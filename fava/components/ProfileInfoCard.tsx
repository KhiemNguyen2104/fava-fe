import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type InfoCardProps = {
  title: string;
  firstLabel: string;
  firstValue: React.ReactNode;
  secondLabel: string;
  secondValue: React.ReactNode;
};

export default function InfoCard({ title, firstLabel, firstValue, secondLabel, secondValue }: InfoCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>✦ {title}</Text>

      <Text style={styles.row}>
        <Text style={styles.label}>{firstLabel}: </Text>
        {firstValue}
      </Text>

      <Text style={styles.row}>
        <Text style={styles.label}>{secondLabel}: </Text>
        {secondValue}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 25,
    marginTop: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#d4006b',
    marginBottom: 8,
  },
  row: {
    fontSize: 15,
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
  },
});
