import { Tabs } from 'expo-router';
import BottomIconSvg from '@/components/icons/bottomhome';
import LibraryIcon from '@/components/icons/LibraryBottom';
import BottomIconSvgTwo from '@/components/icons/bottomhomeduex';
import LibraryBottomActivate from '@/components/icons/LibraryBottomActivate';
import { Text } from 'react-native';
import VideoIcon from '@/components/icons/Video';
import VideoBlack from '@/components/icons/videoIconBottom';
import LiveIcon from '@/components/icons/liveIcon';
import LiveIconPink from '@/components/icons/liveactivitypink';
import LiveIconSecond from '@/components/icons/liveactivity';

























export default function TabsLayout() {


  
  return (
    <Tabs
    >
    <Tabs.Screen 
      name="index"
      options={{
        tabBarIcon: ({ focused, color }) => 
          focused ? <BottomIconSvgTwo color={'#F32773'} /> : <BottomIconSvg />,
    
        tabBarLabel: ({ focused }) => (
          <Text style={{ 
            color: focused ? '#F32773' : '#000', 
            fontSize: 10, 
            fontFamily: 'Euclid' 
          }}>
            Accueil
          </Text>
        ),
        headerShown: false,
        tabBarShowLabel: true,
      }}
    />
  









    <Tabs.Screen 
      name="home"
      options={{
        tabBarIcon: ({ focused, color }) => 
          focused ? <LibraryBottomActivate color={'#F32773'} /> : <LibraryIcon />,
        tabBarLabel: ({ focused }) => (
          <Text style={{ 
            color: focused ? '#F32773' : '#000', 
            fontSize: 10, 
            fontFamily: 'Euclid' 
          }}>
            Ma Bibliothèque
          </Text>
        ),
        tabBarLabelStyle: {
          // Any additional styling if needed
        },
        headerShown: false,
        tabBarShowLabel: true,
      }}
    />












<Tabs.Screen 
      name="live"
      options={{
        tabBarIcon: ({ focused, color }) => 
          focused ? <LiveIconPink color={'#F32773'} /> : <LiveIconSecond/>,
        tabBarLabel: ({ focused }) => (
          <Text style={{ 
            color: focused ? '#F32773' : '#000', 
            fontSize: 10, 
            fontFamily: 'Euclid' 
          }}>
            Lives 
          </Text>
        ),
        tabBarLabelStyle: {
          // Any additional styling if needed
        },
        headerShown: false,
        tabBarShowLabel: true,
      }}
    />
















  </Tabs>








 










     
  
  );
}