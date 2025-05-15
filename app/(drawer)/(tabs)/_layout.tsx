// app/_layout.tsx ou app/(tabs)/_layout.tsx selon ta structure
import React from 'react';
import { Tabs } from 'expo-router';
import BottomIconSvg from '@/components/icons/bottomhome';
import LibraryIcon from '@/components/icons/LibraryBottom';
import BottomIconSvgTwo from '@/components/icons/bottomhomeduex';
import LibraryBottomActivate from '@/components/icons/LibraryBottomActivate';
import { Text } from 'react-native';
import LiveIconPink from '@/components/icons/liveactivitypink';
import LiveIconSecond from '@/components/icons/liveactivity';
import CustomTabBar from './customtab';

export default function TabsLayout() {
  return (
    <Tabs tabBar={props => <CustomTabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <BottomIconSvgTwo color="#F32773" /> : <BottomIconSvg />,
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#F32773' : '#000', fontSize: 10, fontFamily: 'Euclid' }}>
              Accueil
            </Text>
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <LibraryBottomActivate color="#F32773" /> : <LibraryIcon />,
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#F32773' : '#000', fontSize: 10, fontFamily: 'Euclid' }}>
              Ma Bibliothèque
            </Text>
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="live"
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <LiveIconPink color="#F32773" /> : <LiveIconSecond />,
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? '#F32773' : '#000', fontSize: 10, fontFamily: 'Euclid' }}>
              Lives
            </Text>
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
