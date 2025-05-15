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
import LogoComponent from "../components/icons/logo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useUser } from "./UserContext";
import { isValidEmail } from "../components/hooks/isValid";




const LoginScreen = async () => {  
  const { userData, updateUser } = useUser();
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  

  // 🚀 Check if user is already logged in
  useEffect(() => {
    const checkStoredUser = async () => {
      const storedUser = await AsyncStorage.getItem("userData");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        updateUser(user);
        router.replace("(drawer)");
      }
    };
    checkStoredUser();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormState({ ...formState, [field]: value });
  };

  const handleFocus = (input: any | React.SetStateAction<null>) => setFocusedInput(input);
  const handleBlur = () => setFocusedInput(null);
  const closeModal = () => {
    setErrorModalVisible(false);
    setIsLoading(false);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    const { email, password } = formState;

    if (!email || !password) {
      Alert.alert("Erreur de connexion", "Veuillez fournir email et mot de passe.");
      setIsLoading(false);
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Erreur de connexion", "Votre email n'est pas valide.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("https://backendkainatv.onrender.com/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        const user = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          birth_date: data.user.birth_date,
          country: data.user.country,
          profileimage: data.user.profileimage,
        };

        await AsyncStorage.setItem("userData", JSON.stringify(user));
        updateUser(user);
        router.replace("(drawer)");
      } else if (response.status === 401) {
        Alert.alert("Erreur de connexion", "Mot de passe ou email incorrect.");
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
      <ScrollView contentContainerStyle={styles.scrollViewContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <Animatable.View animation="fadeIn" duration={2000} style={styles.logoContainer}>
            <LogoComponent />
          </Animatable.View>

          <Animatable.View animation="fadeIn" style={styles.formContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Se connecter</Text>
            </View>

            <TextInput
              style={[styles.input, focusedInput === "email" && styles.inputFocused]}
              placeholder="Email"
              autoCapitalize="none"
              value={formState.email}
              onChangeText={(text) => handleInputChange("email", text)}
              onFocus={() => handleFocus("email")}
              keyboardType="email-address"
              onBlur={handleBlur}
            />

            <TextInput
              style={[styles.input, focusedInput === "password" && styles.inputFocused]}
              placeholder="Mot de passe"
              value={formState.password}
              onChangeText={(text) => handleInputChange("password", text)}
              secureTextEntry
              onFocus={() => handleFocus("password")}
              onBlur={handleBlur}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
              <LinearGradient
                colors={["#ff7f7f", "#ff1493"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonGradient}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.buttonText}>C'est parti !</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </ScrollView>

      {/* Error Modal */}
      <Modal animationType="slide" transparent={true} visible={errorModalVisible} onRequestClose={closeModal}>
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
    marginTop: 80, // Adjusted to create more space at the top
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20, // Added padding for responsiveness on different devices
  },
  logoContainer: {
    marginTop: 40, // Reduced space above logo for better balance
    marginBottom: 30, // Increased space below logo
    alignItems: "center", // Ensures logo is centered
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
  },
  titleContainer: {
    marginBottom: 30, // Increased space between title and form
  },
  title: {
    fontSize: 28, // Increased title size for better visibility
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Euclid",
    textAlign: "center", // Centered the title
  },
  input: {
    width: "100%",
    backgroundColor: "#F3F3F3",
    fontFamily: "Euclid",
    height: 45, // Slightly increased height for better touch area
    paddingHorizontal: 12, // Increased padding for better spacing inside input
    marginVertical: 12, // Increased margin for better spacing between inputs
    borderRadius: 8, // Rounded corners for a softer look
    borderColor: "#ccc",
    borderWidth: 1, // Added a border to define the input
    fontSize: 16, // Increased font size for readability
  },
  inputFocused: {
    borderColor: "#ff1493",
    borderWidth: 2,
    backgroundColor: "#fff", // Added white background for better focus visibility
  },
  button: {
    width: "100%",
    marginVertical: 15, // Increased space between button and other elements
    borderRadius: 8, // Rounded corners for button
    overflow: "hidden", // Ensures the button's border radius works correctly
  },
  buttonGradient: {
    width: "100%",
    paddingVertical: 14, // Added vertical padding for a more substantial button
    alignItems: "center",
    borderRadius: Platform.select({
      ios: 25,
      android: 13,
    }),
  },
  buttonText: {
    color: "#fff",
    fontSize: 18, // Slightly increased font size for the button text
    fontFamily: "Euclid",
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Slightly darker overlay for the modal
  },
  modalView: {
    backgroundColor: "#fff",
    borderRadius: 12, // Increased border radius for the modal for a smoother look
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3, // Slightly darker shadow for more depth
    shadowRadius: 6,
    elevation: 6, // Improved elevation for Android devices
  },
  modalText: {
    marginBottom: 25,
    textAlign: "center",
    fontFamily: "Euclid",
    fontSize: 20, // Increased modal text size for better readability
    color: "#333", // Darker text for improved contrast
  },
  openButton: {
    backgroundColor: "#2196F3",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 120,
    elevation: 4, // Increased elevation for better hover effect
  },
  textStyle: {
    fontFamily: "Euclid",
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16, // Slightly larger font for button text
  },
});






export default LoginScreen;
