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
import { Link, useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { useUser } from "./UserContext";
import * as Device from "expo-device";
import Animated, { useSharedValue } from "react-native-reanimated";
import "react-native-gesture-handler";
import { MotiView } from "moti";

const Index: React.FC = () => {
  const animation = useRef<LottieView>(null);
  const [isPressed, setIsPressed] = useState(false);
  const router = useRouter();
  const [deviceType, setDeviceType] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      animation.current?.play();
    }, [])
  );

  const { userData } = useUser();

  useEffect(() => {
    if (userData) {
      router.push("(drawer)");
    }
  }, [userData]);

  console.log(userData);

  const handlePress = () => {
    router.push("(sign)");
  };

  return (
    <Swiper
      style={styles.wrapper}
      autoplay={true}
      autoplayTimeout={3}
      showsButtons={false}
    >
      <LinearGradient colors={["#FC4890", "#EB0F58"]} style={styles.slide1}>
        <Animatable.View
          animation="slideInLeft"
          duration={1000}
          style={styles.contentContainer}
        >
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: 200,
              height: 200,
            }}
            source={require("../components/Animations/Animation - 1718117223109.json")}
          />
          <Text style={styles.txtbig}>
            Bienvenue ! Votre appareil {Device.manufacturer} est compatible avec
            nos services . Commencez à suivre nos reportages et bien plus
            encore.
          </Text>
        </Animatable.View>
        <Animatable.View animation="fadeIn" delay={1200}>
          <MotiView
            from={{ scale: 1 }}
            animate={{ scale: isPressed ? 1.2 : 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 10,
            }}
          >
            <TouchableOpacity
              style={[styles.btnbig, isPressed && styles.btnPressed]}
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
              onPress={() => router.push("/autorisation")}
            >
              <Text style={styles.btnText}>Continuer</Text>
            </TouchableOpacity>
          </MotiView>
        </Animatable.View>
      </LinearGradient>

      <LinearGradient colors={["#05F39C", "#00D1F0"]} style={styles.slide1}>
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "timing" }}
        ></MotiView>

        <Animatable.View
          animation="slideInLeft"
          duration={1000}
          style={styles.contentContainer}
        >
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: 200,
              height: 200,
            }}
            // Find more Lottie files at https://lottiefiles.com/featured
            source={require("../components/Animations/Animation - 1718117316413.json")}
          />
          <Text style={styles.txtbig}>
            Tous nos projets audiovisuels sont organisés afin de favoriser la
            culture, de lutter contre les discriminations et de créer du lien
            social.
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
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 5,
              mass: 1,
            }}
          >
            <TouchableOpacity
              style={[styles.btnbig, isPressed && styles.btnPressed]}
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
              onPress={() => router.push("/autorisation")}
            >
              <Text style={styles.btnText}>Continuer</Text>
            </TouchableOpacity>
          </MotiView>
        </Animatable.View>
      </LinearGradient>

      <LinearGradient colors={["#FBCC34", "#FE8AB4"]} style={styles.slide1}>
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: 200,
            height: 200,
          }}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={require("../components/Animations/animation.json")}
        />
        <Animatable.View
          animation="slideInLeft"
          duration={1000}
          style={styles.contentContainer}
        >
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
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 5,
              mass: 1,
            }}
          >
            <TouchableOpacity
              style={[styles.btnbig, isPressed && styles.btnPressed]}
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
              onPress={() => router.push("/autorisation")}
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
    borderRadius: Platform.select({
      ios: 25,
      android: 25,
    }),
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontFamily: "Euclid",
    marginTop: 20,
    shadowColor: Platform.select({
      ios: "white",
      android: "black",
    }),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: Platform.select({
      ios: 0,
      android: 5,
    }),
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
