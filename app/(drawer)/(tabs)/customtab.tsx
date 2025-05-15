import React from 'react';
import { BlurView } from 'expo-blur';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const ALLOWED_ROUTES = ['index', 'home', 'live']; // ← NE GARDER QUE LES TABS DÉSIRÉS

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.tabBarContainer}>
      <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill} />
      <View style={styles.tabBarInner}>
        {state.routes
          .filter(route => ALLOWED_ROUTES.includes(route.name))
          .map((route, index) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel ?? options.title ?? route.name;
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const Icon = options.tabBarIcon?.({
              focused: isFocused,
              color: isFocused ? '#F32773' : '#000',
              size: 0,
            });

            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                style={styles.tabItem}
                activeOpacity={0.7}
              >
                {Icon}
                {typeof label === 'function' ? (
                  label({
                    focused: isFocused,
                    color: isFocused ? '#F32773' : '#000',
                    position: 'beside-icon',
                    children: '',
                  })
                ) : (
                  <Text style={{ color: isFocused ? '#F32773' : '#000', fontSize: 10 }}>
                    {label}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  tabBarInner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 33,
    backgroundColor: 'transparent',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
