import React, { useCallback, useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  View,
  Platform,
  ScrollViewComponent,
  ScrollView,
  Modal,
} from "react-native";
import PenComponent from "@/components/icons/Pen";
import YouTube from "react-native-youtube-iframe";
import SearchComponent from "@/components/icons/searchicon";
import * as Animatable from "react-native-animatable";
import LikeIcon from "@/components/icons/likeIcon";
import PlusPink from "@/components/icons/plusPink";
import SkeletonLoader from "@/components/skeletons/skeleton";
import { Icon } from "react-native-elements";
import { router, useRouter } from "expo-router";
import { formatDateToFrench } from "../../format";
import { AnimatePresence, View as MotiView } from "moti";
import LongsFormat from "@/components/pages/longFomat";
import Emissions from "@/components/pages/emissions";
import Captations from "@/components/pages/captations";
import LePailladin from "@/components/pages/lepailladin";
import { LinearGradient } from "expo-linear-gradient";
import ProfilSvg from "@/components/icons/Profil";
import HelpIconSvg from "@/components/icons/Help";



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

const HomeScreen: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [latestPost, setLatestPost] = useState<Post | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [key, setKey] = useState(0);
  const [visible, setVisible] = useState(true);










  
  const router = useRouter();

  useEffect(() => {
    // Increment the key every time the component mounts
    setKey((prevKey) => prevKey + 1);
  }, []);











  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "https://kainanewappbackend2024.onrender.com/post/all"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };




  const fetchLatestPost = async () => {
    try {
      const response = await fetch(
        "https://kainanewappbackend2024.onrender.com/post/last"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setLatestPost(data.length > 0 ? data[0] : null);
    } catch (error) {
      console.error("Error fetching latest post:", error);
    }
  };

  // Refresh posts and latest post periodically
  useEffect(() => {
    fetchPosts(); // Initial fetch for posts
    fetchLatestPost(); // Initial fetch for the latest post
    const intervalId = setInterval(() => {
      fetchLatestPost(); // Refresh the latest post every 1 second
    }, 1000);
    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);

  const filterPosts = (query: string) => {
    return posts.filter(
      (post) =>
        post.titre.toLowerCase().includes(query.toLowerCase()) ||
        post.date_de_publication.toLowerCase().includes(query.toLowerCase())
    );
  };




  const handlePress = (id: number) => {
    router.push({
      pathname: "/list",
      params: {
        id: id,
      },
    });
  };






  const renderPostItem = ({ item }: { item: Post }) => (
    <TouchableOpacity onPress={() => handlePress(item.id)}>
      <Animatable.View
        animation="fadeInLeft"
        duration={3000}
        style={styles.newPostContainer}
      >
        <Image style={styles.imageNewPost} source={{ uri: item.imagepost }} />
        <View style={styles.textContainer}>
          <Text style={styles.newPostTitle}>
            {item.titre}, {item.sous_titre}
          </Text>
          <Text style={styles.newPostCategory}>{item.categories}</Text>
          <View style={styles.dateContainer}>
            <Icon name="clock" type="feather" size={16} style={styles.icon} />
            <Text style={styles.newPostDate}>
              {formatDateToFrench(item.date_de_publication)}
            </Text>
          </View>
        </View>
      </Animatable.View>
    </TouchableOpacity>
  );

  const renderLatestPost = (post: Post) => (
    <TouchableOpacity onPress={() => handlePress(post.id)}>
      <AnimatePresence>
        <View style={styles.postContainer}>
          <Text style={styles.postTitle}>
            {post.titre}, {post.sous_titre}
          </Text>
          <Text style={styles.postDate}>
            {formatDateToFrench(post.date_de_publication)}
          </Text>
          {post.video_url ? (
            <View style={styles.videoWrapper}>
              <YouTube
                videoId={extractYouTubeVideoId(post.video_url)}
                height={300}
                play={false}
                onChangeState={(event) => console.log(event)}
              />
            </View>
          ) : null}
          <View style={styles.bxbxcontainer}>
            <View style={styles.bxbxaddContainer}>
              <PlusPink />
              <Text style={styles.bxbxaddText}>Ajouter à la bibliothèque</Text>
            </View>
            <View style={styles.bxbxlikeContainer}>
              <LikeIcon />
              <Text style={styles.bxbxlikeText}>{post.likes}</Text>
            </View>
          </View>
        </View>
      </AnimatePresence>
    </TouchableOpacity>
  );

  const extractYouTubeVideoId = (url: string): string => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=|.*[?&]v=|.*\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : "";
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const goHelp = () => {
    setModalVisible(!isModalVisible);
    router.push("help");
  };
  const toggleModalTwo = () => {
    setModalVisible(!isModalVisible);
    router.push("profile");
  };

  useEffect(() => {
    // Simulate an async operation to fetch the post
    const fetchData = async () => {
      // Fetch your data here and then set loading to false
      setTimeout(() => {
        setLoading(false);
        setKey((prevKey) => prevKey + 1); // Update key to re-trigger animation
      }, 2000);
    };
    fetchData();
  }, []);

  const goProfile = () => {
    setModalVisible(!isModalVisible);
    router.push("profile");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <FlatList
          ListHeaderComponent={
            <View>
              <Animatable.View
                animation="fadeIn"
                duration={4000}
                style={[
                  styles.searchContainer,
                  isFocused && styles.searchContainerFocused,
                ]}
              >
                <SearchComponent style={styles.searchIcon} />
                <TextInput
                  style={styles.txtsearch}
                  placeholder="Trouvez un article par date ou titre"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholderTextColor="#8899A6"
                />
              </Animatable.View>
              {!searchQuery && latestPost && (
                <Animatable.View
                  animation="fadeIn"
                  duration={2000}
                  key={key}
                  style={styles.latestPostContainer}
                >
                  <Text style={styles.latestPostTitle}>
                    DERNIÈRE PUBLICATION
                  </Text>
                  {renderLatestPost(latestPost)}
                </Animatable.View>
              )}
            </View>
          }
          data={filterPosts(searchQuery)}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPostItem}
          style={styles.postList}
        />
      )}

      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "timing", duration: 300 }}
      >
        <TouchableOpacity style={styles.twitterButton} onPress={toggleModal}>
          <PenComponent />
        </TouchableOpacity>
      </MotiView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Choisissez votre option.</Text>
            <View style={styles.buttonsContainer}>
              <View>
                <TouchableOpacity style={styles.button} onPress={goProfile}>
                  <LinearGradient
                    colors={["#F56398", "#F32872"]}
                    style={styles.gradientButton}
                  >
                    <ProfilSvg />
                    <View
                      style={{
                        margin: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Euclid",
                          color: "#fff",
                        }}
                      >
                        Modifier mon profil
                      </Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.button} onPress={goHelp}>
                <LinearGradient
                  colors={["#F56398", "#F32872"]}
                  style={styles.gradientButton}
                >
                  <HelpIconSvg />
                  <View
                    style={{
                      margin: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Euclid",
                        color: "#fff",
                      }}
                    >
                      Contacter Kaina pour un article ou une idée de projet
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={styles.closeButton}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const Tab = createMaterialTopTabNavigator();

export default function Index() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true, // Enable scrollable tabs
        tabBarActiveTintColor: "#F32872", // Active tab label color
        tabBarInactiveTintColor: "#555", // Inactive tab label color
        tabBarIndicatorStyle: styles.tabIndicator, // Style for the indicator
        tabBarItemStyle: styles.tabItem, // Style for each tab item
        tabBarLabelStyle: styles.tabLabel, // Style for tab labels
        tabBarStyle: styles.tabBar, // Style for the tab bar container
        tabBarPressColor: "rgba(255, 182, 193, 0.5)", // Ripple effect color (light pink)
        tabBarPressOpacity: 0.5, // Opacity for pressed tab
      }}
    >
      <Tab.Screen name="Reportages" component={HomeScreen} />
      <Tab.Screen name="Longs Formats" component={LongsFormat} />
      <Tab.Screen name="Émissions" component={Emissions} />
      <Tab.Screen name="Captations" component={Captations} />
      <Tab.Screen name="Le Pailladin" component={LePailladin} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
    fontFamily: "Euclid",
  },

  imagePost: {
    height: 70,
    width: 70,
    borderRadius: 8,
    marginVertical: 10,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF3F4",
    borderRadius: Platform.select({
      ios: 20,
      android: 8,
    }),
    paddingHorizontal: 20,
    marginHorizontal: 30,
    height: 40,
    marginVertical: 10,
  },

  gradientButton: {
    height: 120,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  closeButton: {
    color: "blue",
    textAlign: "center",
    marginTop: 10,
  },

  button: {
    flex: 1,
    marginHorizontal: 12,
  },

  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "Euclid",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  searchContainerFocused: {
    borderWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: Platform.select({
      ios: 20,
      android: 8,
    }),
    paddingHorizontal: 20,
    marginHorizontal: 30,
    height: 40,
    borderColor: "#F32872",
    marginVertical: 10,
  },
  txtsearch: {
    fontFamily: "Euclid",
    marginLeft: 12,
    fontSize: 10,
    flex: 1, // Make the TextInput take up available space
  },
  searchIcon: {
    marginRight: 10,
  },
  postContainer: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
  },
  postTitle: {
    fontSize: 18,
    color: "#F32872",
    fontFamily: "Euclid",
    fontWeight: "bold",
    marginBottom: 10,
  },

  postSubtitle: {
    fontSize: 16,
    color: "#666",
  },

  bxbxcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 0,
    paddingVertical: 5,
  },
  bxbxaddContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  bxbxaddText: {
    marginLeft: 5, // Adjust spacing between icon and text
    fontSize: 10, // Adjust font size as needed
    fontFamily: "Euclid",
  },
  bxbxlikeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  bxbxlikeText: {
    fontFamily: "Euclid",
    marginLeft: 5, // Adjust spacing between icon and text
    fontSize: 10, // Adjust font size as needed
  },

  latestPostContainer: {
    marginHorizontal: 30,
    backgroundColor: "white",
    padding: 20,
    paddingBottom: 0,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 20,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 5,
  },

  latestPostTitle: {
    fontFamily: "Euclid",
    color: "#707070",
    fontWeight: "bold",
    fontSize: 16,
  },
  postDate: {
    fontSize: 12,
    fontFamily: "Euclid",
    color: "#999",
    marginBottom: 20,
  },
  postCategory: {
    fontSize: 14,
    color: "#999",
  },
  postDescription: {
    fontSize: 14,
    color: "#333",
  },
  screenText: {
    fontSize: 18,
    fontFamily: "Okta",
  },

  postList: {
    backgroundColor: "white",
    paddingBottom: 10,
  },

  twitterButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#F15A90",
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },

  videoWrapper: {
    height: 200,
    width: "100%",
    marginBottom: 0,
  },

  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },

  newPostContainer: {
    flexDirection: "row",
    padding: 10,
    marginHorizontal: 20,
    marginTop: 10,
    shadowColor: "#85DBFD",
    shadowOffset: { width: 0, height: 0.2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,

    // Elevation for Android
    elevation: 3,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10, // Optional: to make the container corners rounded
  },

  imageNewPost: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  newPostTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    fontFamily: "Okta",
  },
  newPostCategory: {
    fontSize: 12,
    fontFamily: "Okta",
    color: "#666",
    marginBottom: 5,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 5,
  },
  newPostDate: {
    fontFamily: "Okta",
    fontSize: 12,
    color: "#999",
  },

  tabLabel: {
    fontSize: 10, // Adjust font size if needed
    fontWeight: "bold",
    fontFamily: "Okta",
  },
  tabIndicator: {
    backgroundColor: "#F15A90", // Adjust indicator color if needed
    fontFamily: "Okta",
  },
  tabBar: {
    backgroundColor: "#fff", // Adjust tab bar color if needed
    fontFamily: "Okta",
  },
  tabItem: {
    paddingHorizontal: 0, // Adjust padding to control space around tab items
  },
});
