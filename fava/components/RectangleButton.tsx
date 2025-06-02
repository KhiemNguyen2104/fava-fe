import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const RectButton = ({ title, buttonColor = '#FF3B30', onPress, width = 120, height = 40 }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: buttonColor,
          width,
          height,
        },
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default RectButton;
