import React, { useEffect, useState } from 'react';
import { View, Text, Button, Platform , StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { router, useRouter } from 'expo-router';



export default function Autorisation() {
  const route = useRouter();
  const [mediaLibraryPermission, setMediaLibraryPermission] = useState<boolean | null>(null);
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        // Request media library permissions
        const mediaLibraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setMediaLibraryPermission(mediaLibraryStatus.status === 'granted');

        // Request camera permissions
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        setCameraPermission(cameraStatus.status === 'granted');
      }
    })();
  }, []);


  useEffect(() => {
    if (mediaLibraryPermission && cameraPermission) {
      router.push('/sign'); // Ensure 'Sign' is the correct route name
    }
  }, [mediaLibraryPermission, cameraPermission]);





  const handleMediaLibraryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    setMediaLibraryPermission(status === 'granted');
  };

  

  const handleCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    setCameraPermission(status === 'granted');
  };

  if (mediaLibraryPermission === null || cameraPermission === null) {
    return <Text>Demande d'autorisation en cours...</Text>;
  }

  if (mediaLibraryPermission === false) {
    return <Text>Pas d'accès à la bibliothèque d'images</Text>;
  }

  if (cameraPermission === false) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Pas d'accès à la caméra</Text>
        <Button title="Autoriser l'accès à la caméra" onPress={handleCameraPermission} />
      </View>
    );
  }



  return (
    <View style={styles.container}>
      <Text style={styles.text}>Autorisations accordées !</Text>
      <Button title="Autoriser l'accès à la bibliothèque d'images" onPress={handleMediaLibraryPermission} />
      <Button title="Autoriser l'accès à la caméra" onPress={handleCameraPermission} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F56398', // Page background color
  },
  text: {
    color: 'white', // Text color
    marginBottom: 10, // Add margin to separate text and button
  },
});