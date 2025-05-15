import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Swiper from "react-native-swiper";
import * as Animatable from "react-native-animatable";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { useUser } from "./UserContext";
import * as Device from "expo-device";
import { MotiView } from "moti";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Index: React.FC = () => {
  const animation = useRef<LottieView>(null);
  const [isPressed, setIsPressed] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { userData } = useUser();

  useFocusEffect(
    React.useCallback(() => {
      animation.current?.play();
    }, [])
  );

  useEffect(() => {
    const checkOnboarding = async () => {
      const hasSeen = await AsyncStorage.getItem("hasSeenOnboarding");

      if (userData) {
        router.replace("(drawer)");
      } else if (hasSeen === "true") {
        router.replace("/autorisation");
      } else {
        setLoading(false); // show onboarding
      }
    };

    checkOnboarding();
  }, [userData]);

  const handleContinue = async () => {
    await AsyncStorage.setItem("hasSeenOnboarding", "true");
    router.replace("/autorisation");
  };

  if (loading) return null; // Optionally show splash here

  return (
    <Swiper
      style={styles.wrapper}
      autoplay={true}
      autoplayTimeout={3}
      showsButtons={false}
    >
      {/* Slide 1 */}
      <LinearGradient colors={["#FC4890", "#EB0F58"]} style={styles.slide1}>
        <Animatable.View animation="slideInLeft" duration={1000} style={styles.contentContainer}>
          <LottieView
            autoPlay
            ref={animation}
            style={{ width: 200, height: 200 }}
            source={require("../components/Animations/Animation - 1718117223109.json")}
          />
          <Text style={styles.txtbig}>
            Bienvenue ! Votre appareil {Device.manufacturer} est compatible avec nos services.
            Commencez à suivre nos reportages et bien plus encore.
          </Text>
        </Animatable.View>
      </LinearGradient>

      {/* Slide 2 */}
      <LinearGradient colors={["#05F39C", "#00D1F0"]} style={styles.slide1}>
        <Animatable.View animation="slideInLeft" duration={1000} style={styles.contentContainer}>
          <LottieView
            autoPlay
            ref={animation}
            style={{ width: 200, height: 200 }}
            source={require("../components/Animations/Animation - 1718117316413.json")}
          />
          <Text style={styles.txtbig}>
            Tous nos projets audiovisuels sont organisés afin de favoriser la culture,
            de lutter contre les discriminations et de créer du lien social.
          </Text>
        </Animatable.View>
      </LinearGradient>

      {/* Slide 3 with final "Continuer" button */}
      <LinearGradient colors={["#FBCC34", "#FE8AB4"]} style={styles.slide1}>
        <LottieView
          autoPlay
          ref={animation}
          style={{ width: 200, height: 200 }}
          source={require("../components/Animations/animation.json")}
        />
        <Animatable.View animation="slideInLeft" duration={1000} style={styles.contentContainer}>
          <Text style={styles.txtbig}>
            Vous pouvez suivre nos reportages et lire nos articles de chez vous
          </Text>
        </Animatable.View>
        <Animatable.View animation="fadeIn" delay={1200}>
          <MotiView
            from={{ scale: 1, rotate: "0deg", opacity: 1 }}
            animate={{
              scale: isPressed ? 1.5 : 1,
              rotate: isPressed ? "10deg" : "0deg",
              opacity: isPressed ? 0.8 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 5, mass: 1 }}
          >
            <TouchableOpacity
              style={[styles.btnbig, isPressed && styles.btnPressed]}
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
              onPress={handleContinue}
            >
              <Text style={styles.btnText}>Continuer</Text>
            </TouchableOpacity>
          </MotiView>
        </Animatable.View>
      </LinearGradient>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  contentContainer: {
    alignItems: "center",
  },
  txtbig: {
    color: "white",
    fontSize: 20,
    margin: 30,
    textAlign: "center",
    fontFamily: "Euclid",
  },
  btnbig: {
    backgroundColor: "white",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontFamily: "Euclid",
    marginTop: 20,
    shadowColor: Platform.select({ ios: "white", android: "black" }),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: Platform.select({ ios: 0, android: 5 }),
  },
  btnPressed: {
    opacity: 0.5,
    shadowColor: "pink",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  btnText: {
    fontFamily: "Okta",
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Index;
