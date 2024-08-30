import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Dimensions,
  ActivityIndicator,
  Platform,
} from "react-native";
import axios from "axios";
import { WebView } from "react-native-webview";
import HeartWhite from "@/components/icons/heartwhite";
import { ViewToken } from "react-native";
import LibraryIconWhite from "@/components/icons/LibraryIcon";
import * as Animatable from "react-native-animatable";
import CloseIcon from "@/components/icons/closeIcon";
import { router, useRouter } from "expo-router";
import { useUser } from "./UserContext";

const { width, height } = Dimensions.get("window");
const extractYouTubeVideoId = (url: string): string => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=|.*[?&]v=|.*\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : "";
};
interface Post {
  id: number;
  video_url: string;
  likes: number;
}
interface VideoPostProps {
  post: Post;
  isActive: boolean;
}
const VideoPost: React.FC<VideoPostProps> = ({ post, isActive }) => {
  const [liked, setLiked] = useState(false);
  const videoId = extractYouTubeVideoId(post.video_url);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { userData } = useUser();
  const userId = userData?.id;

  // Simulate loading time for 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);


  const videoUri = `https://www.youtube.com/embed/${videoId}?autoplay=${
    isActive ? 1 : 0
  }&playsinline=1`;




  

 
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
        } else {
          console.error(
            "Unexpected response status:",
            response.status,
            response.data
          );
        }
      }catch (err) {
        
      }
    }
  };
  







  const addToLibrary = async () => {
    if (post && userId) {
      try {
        const response = await axios.post(
          "https://kainanewappbackend2024.onrender.com/library/add",
          {
            userId,
            postId: post.id,
          }
        );
        if (response.status === 200) {
          alert("Vous avez ajouter à votre bibluiwue ");
        } else {
          // Handle unexpected statuses
          console.error(
            "Unexpected response status:",
            response.status,
            response.data
          );
          Alert.alert(
            "Erreur",
            response.data.message ||
              "Échec de l'ajout du post à la bibliothèque."
          );
        }
      } catch (err) {
        // Handle errors from the request
        console.error("Error adding to library:", err);
        Alert.alert(
          "Erreur technique",
          "Il y a un problème technique avec l'ajout à la bibliothèque."
        );
      }
    } else {
      Alert.alert("Erreur", "Le post ou l'utilisateur est introuvable.");
    }
  };






  if (loading) {
    return (
      <Animatable.View
        animation="fadeIn"
        duration={2000}
        style={styles.skeletonContainer}
      >
        <View style={styles.skeletonVideo} />
        <View style={styles.skeletonOverlay}>
          <View style={styles.skeletonButton} />
          <View style={styles.skeletonButton} />
        </View>
      </Animatable.View>
    );
  }









  return (
    <View style={{ marginTop: 30, backgroundColor: "black" }}>
      <View style={styles.postContainer}>
        <WebView
          style={styles.video}
          source={{ uri: videoUri }}
          allowsInlineMediaPlayback
        />
        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.likeButton}
            onPress={handleLike}
            disabled={liked}
          >
            <Text style={styles.likeButtonText}>
              {liked ? "" : ""}
              <HeartWhite />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.libraryButton} onPress={addToLibrary}>
            <Text style={styles.libraryButtonText}>
              <LibraryIconWhite />
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.libraryButton}
            onPress={() => router.push("(drawer)")} // Corrected navigation
          >
            <Text style={styles.libraryButtonText}>
              <CloseIcon />{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

interface VideoListProps {
  posts: Post[];
}

const VideoList: React.FC<VideoListProps> = ({ posts }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 80,
  };

  const onViewableItemsChanged = useRef(
    ({
      viewableItems,
    }: {
      viewableItems: ViewToken<Post>[];
      changed: ViewToken<Post>[];
    }) => {
      if (viewableItems.length > 0) {
        setActiveIndex(viewableItems[0].index ?? 0); // Use nullish coalescing to default to 0 if index is null
      }
    }
  ).current;

  return (
    <FlatList
      data={posts}
      renderItem={({ item, index }) => (
        <View style={styles.postWrapper}>
          <VideoPost post={item} isActive={index === activeIndex} />
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      viewabilityConfig={viewabilityConfig}
      onViewableItemsChanged={onViewableItemsChanged}
      getItemLayout={(data, index) => ({
        length: height,
        offset: height * index,
        index,
      })}
    />
  );
};

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://kainanewappbackend2024.onrender.com/post/post"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="small" color="#1DA1F2"  />
      </View>
    );
  }

  return <VideoList posts={posts} />;
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  postWrapper: {
    width: width,
    height: height,
  },
  postContainer: {
    paddingTop: Platform.select({
      ios: 0,
      android: 0,
    }),
    width: width,
    height: height,
    position: "relative",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    right: 20,
    top: 80,
    alignItems: "center",
  },
  likeButton: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 10,
    marginTop: "50%",
    borderRadius: 10,
    marginBottom: 10,
  },
  likeButtonText: {
    fontSize: 16,
    color: "#000",
  },
  libraryButton: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    opacity: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  libraryButtonText: {
    fontSize: 16,
    color: "#000",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  skeletonContainer: {
    width: width,
    height: height,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  skeletonVideo: {
    width: "100%",
    height: "100%",
    backgroundColor: "#c0c0c0",
    borderRadius: 8,
  },
  skeletonOverlay: {
    position: "absolute",
    right: 20,
    top: 100,
    alignItems: "center",
  },
  skeletonButton: {
    width: 120,
    height: 40,
    backgroundColor: "#d0d0d0",
    borderRadius: 8,
    marginVertical: 10,
  },
});

export default App;
