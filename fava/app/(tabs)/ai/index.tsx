import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { RadioButton } from 'react-native-paper';

const AiTabScreen = () => {
  const [purpose, setPurpose] = useState('');
  const [type, setType] = useState('');
  const [label, setLabel] = useState('');
  const [size, setSize] = useState('');
  const [temperature, setTemperature] = useState('');
  const [outfitType, setOutfitType] = useState('full');

  const handleSubmit = () => {
    //console.log({ purpose, type, label, size, temperature, outfitType });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>◆ Purpose</Text>
      <TextInput
        style={styles.input}
        placeholder="Work, Go out, ..."
        value={purpose}
        onChangeText={setPurpose}
        placeholderTextColor="#999"
      />

      <Text style={styles.sectionTitle}>◆ Other criteria</Text>

      <Text style={styles.label}>Type:</Text>
      <TextInput
        style={styles.input}
        placeholder="Pants, skirt, ..."
        value={type}
        onChangeText={setType}
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Label</Text>
      <TextInput
        style={styles.input}
        placeholder="Adidas, Nike, ..."
        value={label}
        onChangeText={setLabel}
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Size:</Text>
      <TextInput
        style={styles.input}
        placeholder="XL"
        value={size}
        onChangeText={setSize}
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Temperature:</Text>
      <TextInput
        style={styles.input}
        placeholder="10 - 30"
        value={temperature}
        onChangeText={setTemperature}
        placeholderTextColor="#999"
      />

      <View style={styles.radioContainer}>
        <RadioButton
          value="full"
          status={outfitType === 'full' ? 'checked' : 'unchecked'}
          onPress={() => setOutfitType('full')}
          color="#d10a6a"
        />
        <Text style={styles.radioLabel}>Full outfit</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AiTabScreen;









const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#d10a6a',
    marginTop: 10,
    marginBottom: 6,
  },
  label: {
    marginTop: 10,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#f5f6ff',
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
  },
  radioLabel: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#d10a6a',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
