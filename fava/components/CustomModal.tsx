import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

type Field = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
};

type Action = {
  label: string;
  onPress: () => void;
};

type CustomModalProps = {
  visible: boolean;
  fields: Field[];
  onRequestClose: () => void;
  actions: Action[];
};

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  fields,
  onRequestClose,
  actions,
}) => (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={onRequestClose}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        {fields.map((field, idx) => (
          <View style={styles.row} key={idx}>
            <Text style={styles.label}>{field.label}</Text>
            <TextInput
              style={styles.input}
              placeholder={field.placeholder}
              value={field.value}
              onChangeText={field.onChangeText}
            />
          </View>
        ))}
        <View style={styles.modalButtonRow}>
          {actions.map((action, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={action.onPress}
              style={styles.modalButton}
            >
              <Text>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '85%',
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
    width: 60,
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f3ff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 16,
    color: '#333',
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 1,
  },
  modalButton: {
    marginLeft: 15,
    paddingHorizontal: 15,
    paddingVertical: 2,
  },
});

export default CustomModal;