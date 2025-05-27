import React from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    TouchableWithoutFeedback,
    StyleSheet,
    FlatList,
} from 'react-native';

type ClothingPickerModalProps = {
  visible: boolean;
  onClose: () => void;
  onSelect: (item: string) => void;
};

const CLOTHING_ITEMS = ['Coat', 'T-Shirt', 'Shirt', 'Skirt', 'Pants', 'Hat'];

const ClothingPickerModal = ({ visible, onClose, onSelect } : ClothingPickerModalProps) => {
  return (
    <Modal visible={visible} animationType="fade" transparent>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <FlatList
                  data={CLOTHING_ITEMS}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                  <TouchableOpacity
                      style={styles.item}
                      onPress={() => {
                      onSelect(item);
                      onClose();
                      }}
                  >
                      <Text style={styles.itemText}>{item}</Text>
                  </TouchableOpacity>
                  )}
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
    borderBottomWidth: 2,
    borderColor: '#ddd',
  },
  itemText: {
    fontSize: 18,
    paddingLeft: 10,
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

export default ClothingPickerModal;
