import React, { useRef } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Linking,
} from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import HelpIconSvg from "@/components/icons/Help";
import SettingIconSvg from "@/components/icons/Setting";
import SettingIconTwo from "@/components/icons/SettingIconTwo";
import ProfilSvg from "@/components/icons/Profil";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { Drawer, Drawer as DrawerNavigator } from "expo-router/drawer";
import LogoComponent from "@/components/icons/logo";
import MenuIconSVG from "@/components/icons/MenuIcon";
import { useUser } from "../UserContext";
import PenTwoComponent from "@/components/icons/pendeux";
import OnlineComponent from "@/components/icons/online";
import { router, useRouter } from "expo-router";
import XComponent from "@/components/icons/kainatv";
import KainaTvIcon from "@/components/icons/tvIcon";
import * as Animatable from 'react-native-animatable';
import LiveIcon from "@/components/icons/liveIcon";
import WebsiteIcon from "@/components/icons/website";
import { color } from "react-native-elements/dist/helpers";











// Define a type for the root stack parameters in the navigation
type RootStackParamList = {
  Profile: undefined; // The 'Profile' screen doesn't require any parameters
  Settings: undefined; // The 'Settings' screen doesn't require any parameters
  About: undefined; // The 'About' screen doesn't require any parameters
  Help: undefined; // The 'Help' screen doesn't require any parameters
};

// Define a type for the route prop in a drawer layout
// It uses the RootStackParamList type and allows any key from it
type DrawerLayoutRouteProp = RouteProp<
  RootStackParamList,
  keyof RootStackParamList
>;

// Define an interface for the drawer layout props
interface DrawerLayoutProps {
  route: DrawerLayoutRouteProp; // The route prop for the drawer layout
}

// Create a ref for the drawer navigation
const drawerRef = React.createRef<any>();



const goto = () => {
  router.push("profile");
};




const CustomDrawerContent: React.FC<{ navigation: any; drawerRef: any }> = (
  props
) => {
  const openURL = (url: any) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL", err)
    );
  };




  
  const { userData } = useUser(); // Access userData from context
  console.log("Profile Image URL:", userData?.profileimage);





  return (
    <LinearGradient
      colors={["#F36C9D", "#F36C9D", "#F24987", "#F24987"]}
      style={{ flex: 1 }}
    >
      <DrawerContentScrollView
        contentContainerStyle={styles.drawerContent}
        {...props}
      >
        <View>
          <TouchableOpacity onPress={goto} style={styles.images}>
            {userData && userData.profileimage ? (
              <Image
                source={{ uri: userData.profileimage }}
                style={styles.profileImage}
                onError={() => console.log("Error loading image")}
              />
            ) : (
              <Text>Aucune photo de profil</Text>
            )}



            <Text style={styles.txts}>
              {userData && userData.name ? userData.name : "Sans nom "}
            </Text>

            <PenTwoComponent style={styles.pens} />
            <OnlineComponent style={styles.online} />
          </TouchableOpacity>

          <View style={styles.linkContainer}>
            <View style={styles.boxwhite}>
              <Text style={styles.boxwhitetxt}>Version 7.2</Text>
            </View>

            <DrawerItem
              label="Profil"
              labelStyle={styles.drawerLabel}
              icon={({ color, size }) => <ProfilSvg />}
              onPress={() => props.navigation.navigate("profile")}
            />

            <DrawerItem
              label="Paramètres"
              labelStyle={styles.drawerLabel}
              icon={({ color, size }) => <SettingIconTwo />}
              onPress={() => props.navigation.navigate("setting")}
            />
            <DrawerItem
              label="A propos"
              labelStyle={styles.drawerLabel}
              icon={({ color, size }) => <SettingIconSvg />}
              onPress={() => props.navigation.navigate("about")}
            />


            <DrawerItem
              label="Aide"
              labelStyle={styles.drawerLabel}
              icon={({ color, size }) => <HelpIconSvg />}
              onPress={() => props.navigation.navigate("help")}
            />


<DrawerItem
              label="website "
              labelStyle={styles.drawerLabel}
              icon={({ color, size }) => <WebsiteIcon />}
              onPress={() => Linking.openURL('https://kaina.tv/')} // Replace with your URL
             
            />





          </View>
        </View>
      </DrawerContentScrollView>





      <Animatable.View animation="fadeIn" style={styles.iconRow}>
        <TouchableOpacity
          onPress={() => openURL("https://www.instagram.com/kaina_tv/")}
        >
          <FontAwesome name="instagram" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openURL("https://www.facebook.com/kainatv/")}
        >
          <FontAwesome name="facebook" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            openURL("https://www.youtube.com/channel/UCVaf4lWHLTn1na11DdhcUuQ")
          }
        >
          <FontAwesome name="youtube" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openURL("https://x.com/kainatv")}>
          <XComponent />
        </TouchableOpacity>
      </Animatable.View>







    </LinearGradient>
  );
};







const CustomHeaderRight: React.FC = () => {
  const { userData } = useUser(); // Access userData from context
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.push("video")}>
      <View style={styles.headerRightContainer}>
        <View style={{
          marginRight:10,
        }}>
        <KainaTvIcon style={styles.icon} />
      </View>   
       
       <View>
       <LiveIcon style={styles.icon}  />
       </View>
      </View>
    </TouchableOpacity>
  );
};







const DrawerLayout: React.FC<DrawerLayoutProps> = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const gotoButton = ()=>{
    router.push('(drawer)');
  }
  const { id, name, email, birthday, country } = route.params as {
    id: number;
    name: string;
    email: string;
    birthday: Date;
    country: string;
  };
  return (
    // Return the Drawer component
    <Drawer
      // Set options for the screens in the drawer
      screenOptions={{
        headerShown: true, // Show the header
        headerTitle: () => <LogoComponent onPress={gotoButton}/>,
        headerTitleAlign: "center", // Center align the title
        headerStyle: {
          backgroundColor: "#fff", // Set the header background color to white
          borderBottomWidth: 0, // Ensure no bottom border
          elevation: 0, // Remove shadow on Android
          shadowOpacity: 0, // Remove shadow on iOS
        },
        headerTintColor: "#000", // Set the header text color to black
        headerRight: () => <CustomHeaderRight />, // Use CustomHeaderRight component as the right header
        drawerStyle: styles.drawerStyle, // Apply custom styles to the drawer
      }}
      // Render custom content in the drawer
      drawerContent={(props) => (
        <CustomDrawerContent drawerRef={drawerRef} {...props} /> // Pass the drawerRef and other props to CustomDrawerContent
      )}
    >
      {/* Define a screen named "(tabs)" */}
      <Drawer.Screen
        name="(tabs)"
        initialParams={{ id, name, email, birthday, country }} // Pass the parameters to the screen
      />
    </Drawer>
  );
};














// Create a StyleSheet for the component styles
const styles = StyleSheet.create({
  images: {
    marginHorizontal: 20,
    marginVertical: 35,
    justifyContent: "flex-start", // Align the content at the start vertically

    position: "relative", // Make sure the container can contain absolutely positioned elements
  },

  profileImageDeux: {
    width: 22,
    height: 22,
    borderRadius: 45, // Half of the width/height for a circle
  },

  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 45, // Half of the width/height for a circle
    marginTop: 10, // Add some space between text and image
  },
  pens: {
    position: "absolute",
    top: 10,
    right: 100,
    zIndex: 1, // Ensure the pen icon is above the image
  },
  online: {
    position: "absolute",
    bottom: 30,
    left: 40,
    zIndex: 1, // Ensure the online indicator is above the image
  },
  txts: {
    fontFamily: "Euclid",
    color: "#fff",
    fontSize: 20,
    paddingTop: 10,
  },
  // Style for the drawer content container
  drawerContent: {
    justifyContent: "center", // Center the content vertically
  },
  // Style for the link container
  linkContainer: {
    marginTop: 100, // Add a top margin of 100 units
  },
  // Style for the drawer
  drawerStyle: {
    borderBottomWidth: 0, // Remove the bottom border
    elevation: 0, // Remove shadow on Android
    shadowOpacity: 0, // Remove shadow on iOS
    // Other custom styles if needed
  },
  // Style for the drawer labels
  drawerLabel: {
    color: "#fff", // Set the text color to white
    fontFamily: "Euclid", // Use the 'Euclid' font family
    fontSize: 17, // Set the font size to 17 units
  },

  // Style for a white box
  boxwhite: {
    marginHorizontal: 20, // Add horizontal margin of 20 units
    backgroundColor: "transparent", // Set background color to transparent
    borderWidth: 1, // Set border width to 1 unit
    borderColor: "white", // Set border color to white
    padding: 12, // Add padding of 12 units
    borderRadius: 12, // Set border radius to 12 units
    bottom: 10, // Move the box 10 units up
  },
  // Style for text inside the white box
  boxwhitetxt: {
    color: "#fff", // Set text color to white
    fontFamily: "Euclid", // Use the 'Euclid' font family
  },
  // Style for the container of the right header
  headerRightContainer: {
    flexDirection: "row", // Arrange children in a row
    marginRight: 5, // Add right margin of 10 units
    padding:10,
  },
  icon:{
    marginRight: 10, // Adjust this value to control spacing
  },
  // Style for the icon button
  iconButton: {
    marginLeft: 0, // Add left margin of 10 units
  },
  // Style for a row of icons
  iconRow: {
    flexDirection: "row", // Arrange icons in a row
    justifyContent: "space-around", // Distribute icons evenly with space around them
    marginHorizontal: 20, // Add horizontal margin of 20 units
    marginBottom: 90, // Add bottom margin of 90 units
  },
});

export default DrawerLayout;
export { CustomDrawerContent, CustomHeaderRight };
