import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from "axios";
import { useUser } from "./UserContext";
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface UpdateUserModalProps {
  modalVisible: boolean;
  hideModal: () => void;
  onUpdateUser: (updatedUser: {
    name: string;
    email: string;
    birthDate: string;
    country: string;
    password: string;
    profileImage: string;
  }) => void;
}

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  modalVisible,
  hideModal,
  onUpdateUser,
}) => {
  const { userData, updateUser } = useUser();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Désolé, nous avons besoin des autorisations pour accéder à la galerie !');
        }
      }
    })();
  }, []);

  const handleConfirm = (date: Date) => {
    setBirthDate(date.toISOString().split("T")[0]); // Format date as YYYY-MM-DD
    setDatePickerVisibility(false);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Désolé, nous avons besoin des autorisations pour accéder à la galerie !');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setProfileImage(uri);
      try {
        // Convert image to a blob
        const response = await fetch(uri);
        const blob = await response.blob();
        // Create a reference to the file in Firebase Storage
        const imageRef = ref(storage, `images/${Date.now()}`);
        // Upload the image blob to Firebase Storage
        await uploadBytes(imageRef, blob);
        // Get the download URL
        const downloadURL = await getDownloadURL(imageRef);
        console.log("URL de l'image : ", downloadURL); // Log the image URL
        setProfileImage(downloadURL); // Update the state with the URL
      } catch (error) {
        console.error("Erreur lors du téléchargement de l'image : ", error);
        Alert.alert("Erreur", "Échec du téléchargement de l'image.");
      }
    }
  };

  const handleSubmit = async () => {
    if (!name || !email || !password || !birthDate || !country) {
      Alert.alert("Erreur", "Tous les champs doivent être remplis.");
      return;
    }

    const userId = userData?.id;
    if (!userId) {
      Alert.alert("Erreur", "ID utilisateur non trouvé.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(`https://kainanewappbackend2024.onrender.com/users/update/${userId}`, {
        image: profileImage, // Use the image URL
        name,
        email,
        birthDate,
        password,
        country,
      });
      const newUserData = response.data.user;
      updateUser(newUserData);
      onUpdateUser(newUserData);
      hideModal();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
      Alert.alert("Erreur", "Échec de la mise à jour des informations de l'utilisateur.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={hideModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            Veuillez mettre à jour vos informations.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Nom"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            autoCapitalize="none"
            onChangeText={setEmail}
          />
          <TouchableOpacity
            onPress={() => setDatePickerVisibility(true)}
            style={styles.datePicker}
          >
            <Text style={styles.datePickerText}>
              {birthDate ? birthDate : "Date de Naissance"}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={() => setDatePickerVisibility(false)}
          />
          <TextInput
            style={styles.input}
            placeholder="Pays"
            value={country}
            onChangeText={setCountry}
          />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            value={password}
            secureTextEntry={true}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
            <Text style={styles.imagePickerText}>
              {profileImage ? "Changer l'image de profil" : "Choisir une image de profil"}
            </Text>
          </TouchableOpacity>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : null}
          <TouchableOpacity
            style={[styles.button, styles.updateButton]}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>Mettre à jour</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.closeButton]}
            onPress={hideModal}
          >
            <Text style={styles.buttonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: Platform.select({
      ios: 15,
      android: 10,
    }),
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    color: "#333333",
    marginBottom: 20,
    fontFamily: "Euclid", // Assuming the font is similar to the one used in SignupStyles
  },
  input: {
    width: "100%",
    backgroundColor: "#F3F3F3",
    fontFamily: "Euclid",
    height: 40,
    borderWidth: 2,
    borderColor: "#F3F3F3",
    borderRadius: 7,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  datePicker: {
    width: "100%",
    backgroundColor: "#F3F3F3",
    fontFamily: "Euclid",
    height: 40,
    borderWidth: 2,
    borderColor: "#F3F3F3",
    borderRadius: 7,
    marginBottom: 10,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  datePickerText: {
    color: "#333333",
  },
  imagePicker: {
    backgroundColor: "#F34282",
    padding: Platform.select({
      ios: 15,
      android: 10,
    }),
    borderRadius: 100,
    marginBottom: 10,
  },
  imagePickerText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Euclid",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  button: {
    width: "100%",
    padding: 15,
    borderRadius: 7,
    marginBottom: 10,
    alignItems: "center",
  },
  updateButton: {
    backgroundColor: "#F34282",
  },
  closeButton: {
    backgroundColor: "#D1D1D1",
  },
  buttonText: {
    color: "#ffffff",
    fontFamily: "Euclid",
  },
});

export default UpdateUserModal;
