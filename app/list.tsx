import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import YouTube from "react-native-youtube-iframe";
import LoveButtonComplete from "@/components/icons/loveButton";
import LikeIcon from "@/components/icons/likeIcon";
import SkeletonLoader from "@/components/skeletons/skeleton";
import { useUser } from "@/app/UserContext";
import PlusPink from "@/components/icons/plusPink";
import * as Animatable from "react-native-animatable";
import ConfirmationModal from "./confirmationModal"; // Adjust the path as needed
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Post {
  id: number;
  titre: string;
  sous_titre: string;
  date_de_publication: string;
  imagepost: any;
  video_url: string;
  likes: number;
  author: string;
  categories: string;
  description: string;
}

const extractYouTubeVideoId = (url: string): string => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=|.*[?&]v=|.*\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : "";
};

const formatDateToFrench = (dateString: string): string => {
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

const List: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { userData } = useUser();
  const userId = userData?.id;
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [liked, setLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false); // State for the modal visibility














  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`https://kainanewappbackend2024.onrender.com/post/${id}`);
          if (response.status === 200) {
            console.log(response.data);
            setPost(response.data.data); // Access the post data from the response
          } else {
            console.error("Unexpected response status:", response.status, response.data);
          }
        } catch (err) {
          console.error("Error fetching the post:", err);
          setError("Error fetching the post");
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
    }
  }, [id]);

  





















  const handleLike = async () => {
    const userId = userData?.id;
    if (post && userId) {
      try {
        const response = await axios.post(
          `https://kainanewappbackend2024.onrender.com/post/${post.id}/like`,
          { userId } // Pass userId to the backend
        );
        if (response.status === 200) {
          alert("Merci pour le soutien");
          setLiked(true);
          // Update the post with the new like count
          const updatedPost = {
            ...post,
            likes: response.data.likes,
          };
          setPost(updatedPost);
        } else {
          console.error(
            "Unexpected response status:",
            response.status,
            response.data
          );
        }
      } catch (error) {
        console.error("Technical issue with the like button:", error);
        Alert.alert(
          "Vous avez déjà aimé ce post."
        );
      }
    }
  };
  






  













  const addToLibrary = async () => {
    if (post && userId) {
      try {
        const response = await axios.post("https://kainanewappbackend2024.onrender.com/library/add", {
          userId,
          postId: post.id,
        });
        if (response.status === 200) {
          // Show success modal
          setModalVisible(true);
        } else {
          // Handle unexpected statuses
          console.error("Unexpected response status:", response.status, response.data);
          Alert.alert("Erreur", response.data.message || "Échec de l'ajout du post à la bibliothèque.");
        }
      } catch (err) {
        // Handle errors from the request
        console.error("Error adding to library:", err);
        Alert.alert("Erreur technique", "Il y a un problème technique avec l'ajout à la bibliothèque.");
      }
    } else {
      Alert.alert("Erreur", "Le post ou l'utilisateur est introuvable.");
    }
  };

  






  const closeModal = () => {
    setModalVisible(false);
  };













  return (
    <ScrollView contentContainerStyle={styles.container}>
      {error && <Text style={styles.error}>{error}</Text>}
      {loading ? (
        <SkeletonLoader />
      ) : post ? (
        <Animatable.View
          animation="fadeIn"
          duration={2000}
          style={styles.postContainer}
        >
          <Animatable.View
            animation="fadeIn"
            duration={2000}
            style={styles.headerSection}
          >
            <Text style={styles.title}>{post.titre}</Text>
            <Text style={styles.subtitle}>{post.sous_titre}</Text>
          </Animatable.View>
          <Animatable.View
            animation="fadeIn"
            duration={2000}
            style={styles.infoSection}
          >
            <Text style={styles.author}>Auteur: {post.author}</Text>
            <Text style={styles.date}>
              date de publication :
              {formatDateToFrench(post.date_de_publication)}
            </Text>
            <Text style={styles.categories}>
              Catégories : {post.categories}
            </Text>
          </Animatable.View>
          {post.video_url && (
            <Animatable.View
              animation="fadeIn"
              duration={2000}
              style={styles.mediaSection}
            >
              <YouTube
                videoId={extractYouTubeVideoId(post.video_url)}
                height={300}
                play={false}
                onChangeState={(event) => console.log(event)}
              />
            </Animatable.View>
          )}
          <Animatable.View
            animation="fadeIn"
            duration={2000}
            style={styles.contentSection}
          >
            <Animatable.View
              animation="fadeIn"
              duration={2000}
              style={styles.actionsSection}
            >
              <TouchableOpacity onPress={addToLibrary} style={styles.addButton}>
                <Text style={styles.addButtonText}>
                  Ajouter à la bibliothèque
                </Text>
                <PlusPink />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.likeButton, liked ? styles.liked : {}]}
                onPress={handleLike}
                disabled={liked}
              >
                {liked ? <LoveButtonComplete /> : <LikeIcon />}
                <Text style={styles.likes}>{post.likes}</Text>
              </TouchableOpacity>
            </Animatable.View>

            <Text style={styles.description}>{post.description}</Text>
          </Animatable.View>
        </Animatable.View>
      ) : (
        <ActivityIndicator size="large" color="#1DA1F2" />
      )}
      <ConfirmationModal visible={modalVisible} onClose={closeModal} />
    </ScrollView>
  );
};
















const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  error: {
    color: "red",
    fontSize: 16,
    marginVertical: 10,
    textAlign: "center",
  },
  postContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.2,
    shadowRadius: 0.5,
    elevation: 3,
    marginBottom: 15,
  },
  headerSection: {
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Okta",
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "Euclid",
    fontStyle: "italic",
    color: "#657786",
  },
  infoSection: {
    marginBottom: 15,
  },
  author: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1DA1F2",
  },
  date: {
    fontSize: 14,
    color: "#657786",
    fontFamily: "Okta",
  },
  categories: {
    fontSize: 12,
    fontFamily: "Okta",
    fontStyle: "italic",
    color: "#AAB8C2",
  },
  mediaSection: {
    marginBottom: 0,
  },
  contentSection: {
    marginBottom: 15,
  },
  description: {
    marginTop:14,
    fontSize: 14,
    color: "#14171A",
    fontFamily: "Euclid",
  },
  actionsSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E1E6E9",
    padding: 10,
    borderRadius: 20,
  },
  addButtonText: {
    fontSize: 10,
    color: "#000000",
    fontFamily: "Okta",
    marginRight: 10,
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E1E8ED",
    padding: 10,
    borderRadius: 20,
  },
  liked: {
    backgroundColor: "#FFAD1F",
  },
  likes: {
    fontSize: 10,
    color: "#14171A",
    fontFamily: "Okta",
    marginLeft: 10,
  },
});

export default List;
