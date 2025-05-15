import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useUser } from "@/app/UserContext";
import { useRouter } from "expo-router";
import axios from "axios";
import TrashComponent from "@/components/icons/trash";

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

const Home = () => {
  const { userData } = useUser();
  const userId = userData?.id;
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();




  const fetchLibraryPosts = useCallback(async () => {
    try {
      const response = await axios.get(`https://backendkainatv.onrender.com/library/${userId}`);
      if (response.status === 200) {
        setPosts(response.data);
      } else {
        console.log("Erreur", "Impossible de récupérer les publications.");
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 500) {
          console.log("Erreur serveur", "Une erreur est survenue sur le serveur.");
        } else {
          console.log("Erreur", "Une erreur est survenue lors de la récupération des publications.");
        }
      } else {
        console.log("Erreur", "Une erreur inconnue est survenue.");
      }
      console.error("Error fetching library posts:");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);







  // Refresh posts and latest post periodically
  useEffect(() => {
    fetchLibraryPosts(); // Initial fetch for posts
    const intervalId = setInterval(() => {
      fetchLibraryPosts(); // Refresh the latest post every 1 second
    }, 10000); // Adjusted to 10 seconds for more discreet updates
    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, [fetchLibraryPosts]);

  const goToDetails = (id: number) => {
    router.push({
      pathname: `/list`,
      params: {
        id: id,
      },
    });
  };




 


  const handleDelete = async (postId: number) => {
    try {
      const response = await axios.delete(`https://backendkainatv.onrender.com/library/delete/${userId}/${postId}`);
      if (response.status === 200) {
        setPosts(posts.filter(post => post.id !== postId));
      } else {
        console.log("Erreur", "Échec de la suppression du post.");
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 404) {
          console.log("Erreur", "Le post n'a pas été trouvé dans la bibliothèque.");
        } else if (error.response.status === 500) {
          console.log("Erreur serveur", "Une erreur est survenue sur le serveur.");
        } else {
          console.log("Erreur", "Échec de la suppression du post.");
        }
      } else {
        console.log("Erreur", "Une erreur inconnue est survenue.");
      }
      console.error("Error deleting post:", error);
    }
  };











  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.postContainer}>
      <TouchableOpacity
        onPress={() => goToDetails(item.id)}
        style={styles.post}
      >
        <Image source={{ uri: item.imagepost }} style={styles.image} />
        <View style={styles.postContent}>
          <Text style={styles.title}>{item.titre}</Text>
          <Text style={styles.subtitle}>{item.sous_titre}</Text>
          <Text style={styles.date}>
            {new Date(item.date_de_publication).toLocaleDateString()}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleDelete(item.id)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteText}>
          <TrashComponent />
        </Text>
      </TouchableOpacity>
    </View>
  );

  const SkeletonLoader = () => (
    <View style={styles.skeletonContainer}>
      <View style={styles.skeletonPost}>
        <View style={styles.skeletonImage} />
        <View style={styles.skeletonContent}>
          <View style={styles.skeletonTitle} />
          <View style={styles.skeletonSubtitle} />
          <View style={styles.skeletonDate} />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <SkeletonLoader />
      ) : posts.length === 0 ? (
        <Text style={styles.emptyText}>Aucun post dans votre bibliothèque</Text>
      ) : (
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id.toString()}
          refreshing={refreshing}
          onRefresh={fetchLibraryPosts}
        />
      )}
      {refreshing && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9FAFB', // gray-50
  },
  postContainer: {
    margin: 3,
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#FFFFFF', // white
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
  },
  post: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#E5E7EB', // gray-200
  },
  postContent: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151', // gray-700
    fontFamily: "Euclid",
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280', // gray-500
    marginVertical: 4,
    fontFamily: "Euclid",
  },
  date: {
    fontSize: 12,
    color: '#9CA3AF', // gray-400
    fontFamily: "Euclid",
  },
  deleteButton: {
    backgroundColor: '#9CA3AF', // gray-400
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  deleteText: {
    color: '#FFFFFF', // white
    fontSize: 14,
    fontWeight: '600',
    fontFamily: "Euclid",
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#9CA3AF', // gray-400
    fontFamily: "Euclid",
    marginTop: 20,
  },
  skeletonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  skeletonPost: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 12,
    backgroundColor: '#F3F4F6', // gray-100
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
  },
  skeletonImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#E5E7EB', // gray-200
  },
  skeletonContent: {
    marginLeft: 12,
    flex: 1,
  },
  skeletonTitle: {
    width: '60%',
    height: 20,
    backgroundColor: '#D1D5DB', // gray-300
    borderRadius: 4,
    marginBottom: 8,
  },
  skeletonSubtitle: {
    width: '80%',
    height: 16,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 4,
  },
  skeletonDate: {
    width: '40%',
    height: 14,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
});


export default Home;