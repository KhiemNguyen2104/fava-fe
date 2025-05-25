import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome6";

type RoundIconButtonProps = {
  iconName?: string;
  buttonColor?: string;
  width?: number;
  height?: number;
  onPress: () => void;
};

const RoundIconButton = ({
  iconName = 'arrowleft',
  buttonColor = '#C2185B',
  width = 40,
  height = 40,
  onPress,
}: RoundIconButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: buttonColor,
          width,
          height,
          borderRadius: Math.min(width, height) / 2,
        },
      ]}
    >
      <Icon name={iconName} size={Math.min(width, height) * 0.5} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RoundIconButton;
