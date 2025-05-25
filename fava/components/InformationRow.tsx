import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type InformationRowProps = {
  label: string;
  value: string;
};

const InformationRow: React.FC<InformationRowProps> = ({ label, value }) => {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}:</Text>
      <View style={styles.valueContainer}>
        <Text style={styles.valueText}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginHorizontal: "10%",
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingRight: 8,
  },
  valueContainer: {
    backgroundColor: '#F1F4FF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    flexShrink: 1,
    flexGrow: 1,
  },
  valueText: {
    fontSize: 16,
    color: '#000',
  },
});

export default InformationRow;
