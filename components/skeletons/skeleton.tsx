import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

const SkeletonLoader: React.FC = () => {
  return (
    <View style={styles.skeletonContainer}>
      <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" style={styles.skeletonHeader}>
        <View style={styles.skeletonAvatar} />
        <View style={styles.skeletonHeaderTextContainer}>
          <View style={styles.skeletonHeaderText} />
          <View style={styles.skeletonSubHeaderText} />
        </View>
      </Animatable.View>
      <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" style={styles.skeletonBox} />
      <View style={styles.skeletonContent}>
        <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" style={styles.skeletonText} />
        <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" style={styles.skeletonText} />
        <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" style={styles.skeletonText} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonContainer: {
    padding: 16,
    backgroundColor: '#FFF',
    flex: 1,
  },
  skeletonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  skeletonAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E1E9EE',
    marginRight: 16,
  },
  skeletonHeaderTextContainer: {
    flex: 1,
  },
  skeletonHeaderText: {
    width: '80%',
    height: 15,
    backgroundColor: '#E1E9EE',
    borderRadius: 4,
    marginBottom: 6,
  },
  skeletonSubHeaderText: {
    width: '50%',
    height: 15,
    backgroundColor: '#E1E9EE',
    borderRadius: 4,
  },
  skeletonBox: {
    width: '100%',
    height: 200,
    backgroundColor: '#E1E9EE',
    borderRadius: 4,
    marginBottom: 16,
  },
  skeletonContent: {
    paddingVertical: 8,
  },
  skeletonText: {
    width: '100%',
    height: 20,
    backgroundColor: '#E1E9EE',
    borderRadius: 4,
    marginBottom: 10,
  },
});

export default SkeletonLoader;
