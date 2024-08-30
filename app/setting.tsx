import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Switch, Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as Animatable from 'react-native-animatable';

const Setting = () => {
  const [mediaLibraryEnabled, setMediaLibraryEnabled] = useState(false);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    try {
      // Check media library permission
      const { status: mediaLibraryStatus } = await MediaLibrary.getPermissionsAsync();
      setMediaLibraryEnabled(mediaLibraryStatus === 'granted');
    } catch (error) {
      console.error('Error checking media library permissions:', error);
    }
  };

  const togglePermission = async () => {
    let response;
    let isGranted;

    try {
      if (mediaLibraryEnabled) {
        Alert.alert('Permission', 'Media Library permission is already granted.');
        return;
      }
      response = await MediaLibrary.requestPermissionsAsync();
      isGranted = response.status === 'granted';
      setMediaLibraryEnabled(isGranted);
      Alert.alert('Permission Status', isGranted ? 'Granted' : 'Denied');
    } catch (error) {
      console.error('Error requesting media library permissions:', error);
    }
  };

  return (
    <Animatable.View animation="fadeIn" duration={1500} style={styles.container}>
      <Text style={styles.title}>Paramètres</Text>
      <View style={styles.settingsList}>
        <SettingRow
          label="Média"
          value={mediaLibraryEnabled}
          onToggle={togglePermission}
        />
      </View>
    </Animatable.View>
  );
};

const SettingRow = ({ label, value, onToggle }: { label: string; value: boolean; onToggle: () => void }) => (
  <View style={styles.settingRow}>
    <Text style={styles.label}>{label}</Text>
    <Switch
      value={value}
      onValueChange={onToggle}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    fontFamily: 'Euclid', // Ensure the font is loaded and available
    marginBottom: 20,
  },
  settingsList: {
    flex: 1,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  label: {
    fontSize: 18,
    fontFamily: 'Euclid', // Ensure the font is loaded and available
    color: '#333333',
    flex: 1,
  },
});

export default Setting;
