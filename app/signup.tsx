import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
  ImageBackground,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import Checkbox from "expo-checkbox";
import * as Animatable from "react-native-animatable";
import LogoComponent from "@/components/icons/logo";
import PhotoPink from "@/assets/icons/PhotoPink";
import { router } from "expo-router";
import { styles } from "./SignupStyles"; // Import styles from SignupStyles
import axios from "axios";
import * as FileSystem from "expo-file-system";
import { useUser } from "./UserContext"; // Import useUser hook
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";
import { isValidEmail } from "@/components/hooks/isValid";






type FormState = {
  name: string;
  email: string;
  birthDate: string;
  password: string;
  verifyPassword: string;
  country: string;
  acceptTerms: boolean;
};






const Signup = () => {
  const { userData } = useUser();
  useEffect(() => {
    if (userData) {
      router.push("(drawer)");
    }
  }, [userData]);



  const [isChecked, setChecked] = useState<boolean>(false);
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    birthDate: "",
    password: "",
    verifyPassword: "",
    country: "",
    acceptTerms: false,
  });

  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useUser();
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleInputChange = (
    field: keyof FormState,
    value: string | boolean
  ) => {
    setFormState({ ...formState, [field]: value });
  };

  const handleFocus = (input: string) => {
    setFocusedInput(input);
  };




  const handleBlur = () => {
    setFocusedInput(null);
  };




  

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
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
        console.log("Image URL: ", downloadURL); // Log the image URL
        setImage(downloadURL); // Update the state with the URL
      } catch (error) {
        console.error("Error uploading image: ", error);
        Alert.alert("Error", "Failed to upload the image.");
      }
    }
  };













  const handleDateConfirm = (date: Date) => {
    handleInputChange("birthDate", date.toISOString().split("T")[0]);
    setDatePickerVisibility(false);
  };









  
  const handleSubmit = async () => {
    setIsLoading(true);
    const { name, email, birthDate, password, country, verifyPassword } = formState;
    if (!image) {
      Alert.alert("Erreur", "Veuillez choisir une photo de profil.");
      setIsLoading(false);
      return;
    } 
    if (verifyPassword !== password) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas.");
      setIsLoading(false);
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert("Erreur de connexion", "Votre email n'est pas valide.");
      setIsLoading(false);
      return;
    }
    try {
      const response = await axios.post("https://kainanewappbackend2024.onrender.com/signup/signup", {
        image: image, // Use the image URL
        name,
        email,
        birthDate,
        password,
        country,
      });
      if (response.status === 201) {
        const newUserData = response.data;
        updateUser(newUserData);
        router.push("(drawer)");
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 400) {
          Alert.alert("Erreur", "L'utilisateur existe déjà.");
        } else {
          Alert.alert("Erreur", "Échec de la soumission du formulaire.");
        }
      } else {
        Alert.alert("Erreur", "Échec de la soumission du formulaire.");
      }
      console.error("Error creating user:", error);
    } finally {
      setIsLoading(false);
    }
  };


  












  const handleTermsPress = () => {
    router.push("terms");
  };

  return (
   
    <ImageBackground
      source={require("../components/Animations/IMAGE.png")}
      style={styles.backgroundImage}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Animatable.View
            animation="fadeIn"
            duration={2000}
            style={[
              styles.logoContainer,
              Platform.select({
                ios: { marginTop: 100 },
                android: { marginTop: 100 },
              }),
            ]}
          >
            <LogoComponent />
          </Animatable.View>
          <Animatable.View animation="fadeIn" style={styles.formContainer}>
            <TouchableOpacity style={styles.photoPicker} onPress={pickImage}>
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{ width: 100, height: 100, borderRadius: 50 }}
                />
              ) : (
                <View style={styles.photoPickerIcon}>
                  <PhotoPink />
                </View>
              )}
            </TouchableOpacity>




            <View style={styles.titleContainer}>
              <Text style={styles.title}>Créer un compte</Text>
            </View>
            
            <TextInput
              style={[
                styles.input,
                focusedInput === "name" && styles.inputFocused,
              ]}
              placeholder="Nom"
              value={formState.name}
              onChangeText={(text) => handleInputChange("name", text)}
              onFocus={() => handleFocus("name")}
              onBlur={handleBlur}
            />
            <TextInput
              style={[
                styles.input,
                focusedInput === "email" && styles.inputFocused,
              ]}
              placeholder="Email"
              autoCapitalize="none" // Ensure email is not auto-capitalized
              value={formState.email}
              onChangeText={(text) => handleInputChange("email", text)}
              keyboardType="email-address"
              onFocus={() => handleFocus("email")}
              onBlur={handleBlur}
            />
            <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
              <TextInput
                style={[
                  styles.input,
                  focusedInput === "birthDate" && styles.inputFocused,
                ]}
                placeholder="Date de naissance"
                value={formState.birthDate}
                editable={false}
                pointerEvents="none"
              />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleDateConfirm}
              onCancel={() => setDatePickerVisibility(false)}
            />
            <TextInput
              style={[
                styles.input,
                focusedInput === "password" && styles.inputFocused,
              ]}
              placeholder="Mot de passe"
              value={formState.password}
              onChangeText={(text) => handleInputChange("password", text)}
              secureTextEntry
              onFocus={() => handleFocus("password")}
              onBlur={handleBlur}
            />
            <TextInput
              style={[
                styles.input,
                focusedInput === "verifyPassword" && styles.inputFocused,
              ]}
              placeholder="Vérifier le mot de passe"
              value={formState.verifyPassword}
              onChangeText={(text) => handleInputChange("verifyPassword", text)}
              secureTextEntry
              onFocus={() => handleFocus("verifyPassword")}
              onBlur={handleBlur}
            />
            <TextInput
              style={[
                styles.input,
                focusedInput === "country" && styles.inputFocused,
              ]}
              placeholder="Pays"
              value={formState.country}
              onChangeText={(text) => handleInputChange("country", text)}
              onFocus={() => handleFocus("country")}
              onBlur={handleBlur}
            />
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={isChecked}
                onValueChange={setChecked}
                style={styles.checkbox}
              />
              <TouchableOpacity onPress={handleTermsPress}>
                <Text style={styles.checkboxText}>
                  J'accepte les{" "}
                  <Text style={styles.linkText}>
                    conditions générales et la politique de confidentialité
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>


      <TouchableOpacity onPress={handleSubmit}>
        <LinearGradient
          colors={["#ff7f7f", "#ff1493"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.buttonGradient}
        >
          <Text style={styles.buttonText}>Continuer</Text>
        </LinearGradient>
      </TouchableOpacity>


        </View>
      </ScrollView>






    </ImageBackground>
  );
};

export default Signup;
