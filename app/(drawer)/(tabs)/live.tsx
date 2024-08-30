import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MotiView, MotiText } from 'moti';

export default function Live() {
  return (
    <View style={styles.container}>
      <MotiView
        from={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'timing', duration: 600 }}
        style={styles.box}
      >
        <MotiText
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 600 }}
          style={styles.text}
        >
          This functionality will be implemented in version 8.2.
        </MotiText>
      </MotiView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Background color for the entire screen
  },
  box: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f0f0f0', // Box background color
    borderColor: '#cccccc', // Box border color
    borderWidth: 1, // Box border width
    shadowColor: '#000000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 5, // Shadow radius
  },
  text: {
    fontSize: 16,
    color: 'black', // Text color
    textAlign: 'center', // Center the text inside the box
  },
});
