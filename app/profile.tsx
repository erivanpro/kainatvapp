import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";
import { useUser } from "./UserContext";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import UpdateUserModal from "./updateProfile";
import SkeletonLoader from "../components/skeletons/skeleton";
import * as Animatable from "react-native-animatable";

const { width } = Dimensions.get("window");

const Profile = () => {
  const { userData } = useUser();
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const { name, email, birth_date, country, profileimage } = userData || {};
  const formattedDate = birth_date ? format(parseISO(birth_date), "dd MMMM yyyy", { locale: fr }) : "";

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const handleUpdateUser = (updatedUser: any) => {
    console.log(updatedUser);
    hideModal();
  };

  if (loading) return <SkeletonLoader />;

  return (
    <Animatable.View animation="fadeIn" duration={1000} style={styles.container}>
      <Image
        source={{ uri: "https://images.unsplash.com/photo-1665340826159-2456e3ad6b19?q=80&w=3270&auto=format&fit=crop" }}
        style={styles.coverPhoto}
      />
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: profileimage || "https://via.placeholder.com/100.png?text=Photo+de+Profil" }}
          style={styles.profilePic}
        />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>

      <View style={styles.profileDetails}>
        <ProfileInfo label="Date de naissance" value={formattedDate} />
        <ProfileInfo label="Pays" value={country} />
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

const ProfileInfo = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.profileInfo}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  coverPhoto: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  profileHeader: {
    alignItems: "center",
    marginTop: -50,
    padding: 16,
  },
  profilePic: {
    width: 96,
    height: 96,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: "#fff",
    backgroundColor: "#e5e7eb",
  },
  name: {
    marginTop: 8,
    fontSize: 22,
    fontWeight: "600",
    color: "#111827",
  },
  email: {
    fontSize: 14,
    color: "#6b7280",
  },
  profileDetails: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  profileInfo: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    color: "#4b5563",
  },
  updateButton: {
    marginTop: 24,
    marginHorizontal: 20,
    backgroundColor: "#000",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});

export default Profile;
// import React, { useState, useEffect } from "react";