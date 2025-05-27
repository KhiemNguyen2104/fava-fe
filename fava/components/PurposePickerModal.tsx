// PurposePickerModal.js
import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  FlatList,
  TextInput,
} from 'react-native';

const PURPOSES = ['Work', 'Go out', 'Party'];

type PurposePickerModalProps = {
    visible: boolean;
    onClose: () => void;
    onSelect: (item: string) => void;
};

const PurposePickerModal = ({ visible, onClose, onSelect } : PurposePickerModalProps) => {
  const [customPurpose, setCustomPurpose] = useState('');

  const handleSelect = (item: string) => {
    onSelect(item);
    onClose();
  };

  const handleCustomSubmit = () => {
    if (customPurpose.trim()) {
      onSelect(customPurpose.trim());
      setCustomPurpose('');
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <FlatList
            data={PURPOSES}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            )}
            ListFooterComponent={
              <View style={styles.otherContainer}>
                <Text style={styles.otherLabel}>Other:</Text>
                <TextInput
                  placeholder="Enter your purpose"
                  value={customPurpose}
                  onChangeText={setCustomPurpose}
                  style={styles.textInput}
                  onSubmitEditing={handleCustomSubmit}
                  returnKeyType="done"
                />
              </View>
            }
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 12,
    elevation: 10,
  },
  item: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  itemText: {
    fontSize: 18,
    paddingLeft: 10,
  },
  otherContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  otherLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    paddingRight: 8,
  },
  textInput: {
    backgroundColor: '#F1F4FF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    flexShrink: 1,
    flexGrow: 1,
  },
  closeButton: {
    marginTop: 10,
    padding: 12,
    backgroundColor: '#800040',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PurposePickerModal;
