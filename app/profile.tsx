import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";
import { useUser } from "./UserContext";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import UpdateUserModal from "./updateProfile";
import SkeletonLoader from "../components/skeletons/skeleton"; // Import the SkeletonLoader component
import * as Animatable from 'react-native-animatable';




const { width } = Dimensions.get("window");

const Profile = () => {
  const { userData } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Simulated loading time of 2 seconds

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  const { name, email, birth_date, country, profileimage } = userData || {};

  const formattedDate = birth_date ? format(parseISO(birth_date), "dd MMMM yyyy", { locale: fr }) : "";

  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const handleUpdateUser = (updatedUser:any) => {
    console.log(updatedUser);
    hideModal();
  };

  if (loading) {
    return <SkeletonLoader />; // Show SkeletonLoader while loading
  }

  return (
    <Animatable.View animation="fadeIn" duration={1500} style={styles.container}>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1665340826159-2456e3ad6b19?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }}
        style={styles.coverPhoto}
      />
      <View style={styles.profileHeader}>
        <Image
          source={{
            uri: profileimage || "https://via.placeholder.com/100.png?text=Photo+de+Profil",
          }}
          style={styles.profilePic}
        />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
      <View style={styles.profileDetails}>
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Date de Naissance:</Text>
          <Text style={styles.value}>{formattedDate}</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Pays:</Text>
          <Text style={styles.value}>{country}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.updateButton} onPress={showModal}>
        <Text style={styles.updateButtonText}>Mettre à jour mes informations</Text>
      </TouchableOpacity>

      <UpdateUserModal
        modalVisible={modalVisible}
        hideModal={hideModal}
        onUpdateUser={handleUpdateUser}
      />
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    fontFamily: "Okta",
  },
  coverPhoto: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  profileHeader: {
    alignItems: "center",
    marginTop: -50,
    padding: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#ffffff",
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Okta",
    color: "#333333",
  },
  email: {
    fontSize: 16,
    color: "#666666",
    fontFamily: "Okta",
  },
  profileDetails: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  profileInfo: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
    fontFamily: "Okta",
  },
  value: {
    fontSize: 16,
    color: "#666666",
  },
  updateButton: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  updateButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "Euclid",
    fontWeight: "bold",
  },
});

export default Profile;
