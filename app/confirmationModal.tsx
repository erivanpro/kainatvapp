import LottieView from 'lottie-react-native';
import React, { useRef } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
}


const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ visible, onClose }) => {
  const animation = useRef<LottieView>(null);

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>










        <Text style={styles.modalText}>
            Vous avez ajouté à votre bibliothèque
          </Text>

          





          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: 200,
              height: 200,
            }}
            // Find more Lottie files at https://lottiefiles.com/featured
            source={require("../components/Animations/Animation - 1718117223109.json")}
          />


          
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>
              Fermer
            </Text>
          </TouchableOpacity>






        </View>
      </View>
    </Modal>
  );
};





















const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontFamily:'Euclid',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#F15991',
    paddingHorizontal: 100,
    paddingVertical:10,
    borderRadius: 20,
  },
  closeButtonText: {
    color: 'white',
    fontFamily:'Euclid',
    fontSize: 16,
  },
});

export default ConfirmationModal;
