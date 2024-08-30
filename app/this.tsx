import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";


export default function ThisScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id, name, email, birthday, country, password, verifyPassword } = params;

  useEffect(() => {
    // Define a function to save data to AsyncStorage
    const saveData = async () => {
      try {
        // Create a data object with the values you want to store
        const data = {
          id,
          name,
          email,
          birthday,
          country,
          // Exclude sensitive data like password and verifyPassword from storage
        };
        // Convert data object to JSON string
        const jsonData = JSON.stringify(data);
        // Save data to AsyncStorage under a key 'userData'
        await AsyncStorage.setItem('userData', jsonData);
        console.log('Data saved successfully');
      } catch (error) {
        console.error('Error saving data:', error);
      }
    };
    router.push({
      pathname: '(drawer)',
    });
    // Call the saveData function
    saveData();
  }, [id, name, email, birthday, country]); // Include dependencies to trigger the effect when they change
}
