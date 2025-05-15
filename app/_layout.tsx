import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, GestureResponderEvent } from "react-native";
import { useFonts as useCustomFonts } from "expo-font";
import { useFonts as useGoogleFonts, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import * as SplashScreen from "expo-splash-screen";
import { Stack, useRouter } from "expo-router";
import LogoComponent from "@/components/icons/logo";
import { UserProvider } from "./UserContext";
import "react-native-gesture-handler";

export default function RootLayout() {
  const [customFontsLoaded, customFontError] = useCustomFonts({
    Euclid: require("../assets/fonts/Euclid.ttf"),
    Okta: require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  const [googleFontsLoaded] = useGoogleFonts({
    Poppins_600SemiBold,
  });

  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const prepare = async () => {
      if (customFontsLoaded || customFontError || googleFontsLoaded) {
        await SplashScreen.hideAsync();
        setIsLoading(false);
      }
    };
    prepare();
  }, [customFontsLoaded, customFontError, googleFontsLoaded]);

  if (isLoading) return null;

  function OnPress(event: GestureResponderEvent): void {
    router.push("(drawer)");
  }


  
  return (
    <UserProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#F26196",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          options={{
            title: "Accueil",
            headerShown: false,
          }}
          name="index"
        />
        <Stack.Screen
          options={{
            title: "Se connecter",
            headerShown: false,
          }}
          name="sign"
        />
        <Stack.Screen
          options={{
            title: "S'inscrire",
            headerShown: false,
          }}
          name="signup"
        />
        <Stack.Screen
          options={{
            title: "this",
            headerShown: false,
          }}
          name="this"
        />
        <Stack.Screen
          options={{
            title: "Conditions Générales et Confidentialité",
            headerShown: false,
          }}
          name="terms"
        />
        <Stack.Screen
          options={{
            title: "Se connecter",
            headerShown: false,
          }}
          name="login"
        />
        <Stack.Screen
          options={{
            title: "à propos",
            headerShown: true,
            headerTitleAlign: "center",
            headerStyle: styles.header,
            headerTintColor: "#D6D6D6",
            headerTitle: () => <LogoComponent onPress={OnPress} />,
          }}
          name="about"
        />
        <Stack.Screen
          options={{
            title: "Aide",
            headerShown: true,
            headerTitleAlign: "center",
            headerStyle: styles.header,
            headerTintColor: "#D6D6D6",
            headerTitle: () => <LogoComponent onPress={OnPress} />,
          }}
          name="help"
        />
        <Stack.Screen
          options={{
            title: "Post",
            headerShown: true,
            headerTitleAlign: "center",
            headerStyle: styles.header,
            headerTintColor: "#D6D6D6",
            headerTitle: () => <LogoComponent  onPress={OnPress}/>,
          }}
          name="post"
        />
        <Stack.Screen
          options={{
            title: "list",
            headerShown: true,
            headerTitleAlign: "center",
            headerStyle: styles.header,
            headerTintColor: "#D6D6D6",
            headerTitle: () => <LogoComponent onPress={OnPress} />,
          }}
          name="list"
        />
        <Stack.Screen
          options={{
            title: "profil",
            headerShown: true,
            headerTitleAlign: "center",
            headerStyle: styles.header,
            headerTintColor: "#D6D6D6",
            headerTitle: () => <LogoComponent  onPress={OnPress}/>,
          }}
          name="profile"
        />
        <Stack.Screen
          options={{
            title: "Video",
            headerShown: false,
            headerTitleAlign: "center",
            headerStyle: styles.header,
            headerTintColor: "#D6D6D6",
            headerTitle: () => <LogoComponent onPress={OnPress} />,
          }}
          name="video"
        />
        <Stack.Screen
          options={{
            title: "setting",
            headerShown: true,
            headerTitleAlign: "center",
            headerStyle: styles.header,
            headerTintColor: "#D6D6D6",
            headerTitle: () => <LogoComponent onPress={OnPress} />,
          }}
          name="setting"
        />
          <Stack.Screen
          options={{
            title: "Autorisation",
            headerShown: false,
          }}
          name="autorisation"
        />
        <Stack.Screen
          options={{
            title: "Accueil",
            headerShown: false,
          }}
          name="(drawer)"
        />
      </Stack>
    </UserProvider>
  );
}




const styles = StyleSheet.create({
  header: {
    backgroundColor: "#FFFFFF", // Customize this color as needed
    opacity: 0.5,
    // Add other styles as needed
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  message: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
});
