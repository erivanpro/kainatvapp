import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert,
  Modal,
  TouchableHighlight,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import LogoComponent from "../components/icons/logo"; // Adjust the path as per your project structure
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useNavigation } from "expo-router"; // Adjust import as per your router library
import { useUser } from "./UserContext"; // Import useUser hook
import { isValidEmail } from '../components/hooks/isValid'; // Adjust the path as necessary




const LoginScreen = () => {
  const { userData } = useUser();
  useEffect(() => {
    if (userData) {
      router.push("(drawer)");
    }
  }, [userData]);
  const { updateUser } = useUser(); // Use updateUser method from context
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [focusedInput, setFocusedInput] = useState(null);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (field, value) => {
    setFormState({ ...formState, [field]: value });
  };
  const handleFocus = (input) => {
    setFocusedInput(input);
  };
  const handleBlur = () => {
    setFocusedInput(null);
  };
  const closeModal = () => {
    setErrorModalVisible(false);
    setIsLoading(false);
  };
  const navigation = useNavigation();











  const handleLogin = async () => {
    setIsLoading(true);
    const { email, password } = formState;
    // Check if email and password are provided
    if (!email || !password) {
      Alert.alert(
        "Erreur de connexion",
        "Veuillez fournir à la fois un email et un mot de passe."
      );
      setIsLoading(false);
      return;
    }
    // Validate email format
    if (!isValidEmail(email)) {
      Alert.alert(
        "Erreur de connexion",
        "Votre email n'est pas valide."
      );
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch("https://kainanewappbackend2024.onrender.com/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.status === 200) {
        console.log("Connexion réussie :", data.user);
        await AsyncStorage.setItem("userData", JSON.stringify(data.user));
        const {
          id,
          name,
          email: userEmail,
          birth_date,
          country,
          profileimage,
        } = data.user;
        // Update user data in context
        updateUser({
          id,
          name,
          email: userEmail,
          birth_date,
          country,
          profileimage,
        });
        navigation.navigate("(drawer)", {
          id,
          name,
          email: userEmail,
          birth_date,
          profileimage,
          country,
        });
      } else if (response.status === 401) {
        Alert.alert("Erreur de connexion", "Votre mot de passe ou email est incorrect");
      } else {
        Alert.alert("Erreur", "Échec de la connexion. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
      Alert.alert("Erreur", "Une erreur est survenue lors de la connexion.");
    } finally {
      setIsLoading(false);
    }
  };
  












  










  
   




























  return (
    <ImageBackground
      source={require("../components/Animations/IMAGE.png")}
      style={styles.backgroundImage}
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Animatable.View
            animation="fadeIn"
            duration={2000}
            style={styles.logoContainer}
          >
            {/* Replace LogoComponent with your actual component */}
            <LogoComponent />
          </Animatable.View>
          <Animatable.View animation="fadeIn" style={styles.formContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Se connecter</Text>
            </View>
            <TextInput
              style={[
                styles.input,
                focusedInput === "email" && styles.inputFocused,
              ]}
              placeholder="Email"
              autoCapitalize="none" // Ensure email is not auto-capitalized
              value={formState.email}
              onChangeText={(text) => handleInputChange("email", text)}
              onFocus={() => handleFocus("email")}
              keyboardType="email-address"
              onBlur={handleBlur}
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
              keyboardType="visible-password"
              onBlur={handleBlur}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <LinearGradient
                colors={["#ff7f7f", "#ff1493"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonGradient}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.buttonText}>Continuer</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={errorModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{errorMessage}</Text>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={closeModal}
            >
              <Text style={styles.textStyle}>Fermer</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  scrollViewContainer: {
    marginTop: 100,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    marginTop: 50,
    marginBottom: 20,
  },
  formContainer: {
    width: "90%",
    alignItems: "center",
    fontFamily: "Euclid",
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Euclid",
  },
  input: {
    width: "100%",
    backgroundColor: "#F3F3F3",
    fontFamily: "Euclid",
    height: 40,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
    borderColor: "#ccc",
  },
  inputFocused: {
    borderColor: "#ff1493",
    borderWidth: 2,
    backgroundColor: "white",
  },
  button: {
    width: "100%",
    marginVertical: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  buttonGradient: {
    width: "100%",
    padding: 12,
    alignItems: "center",
    borderRadius: Platform.select({
      ios: 25,
      android: 13,
    }),
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Euclid",
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Euclid",
    fontSize: 18,
  },
  openButton: {
    backgroundColor: "#2196F3",
    borderRadius: Platform.select({
      ios: 25,
      android: 13,
    }),
    padding: 10,
    paddingHorizontal: 100,
    elevation: 2,
  },
  textStyle: {
    fontFamily: "Euclid",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default LoginScreen;
