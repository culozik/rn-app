import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, Image, Text, StyleSheet, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import db from "../../../firebase/config";

const DefaultPostsScreen = ({ navigation }) => {
  const { email, nickName } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .onSnapshot((data) =>
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  useEffect(() => {
    getPosts();
    console.log(posts);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image
          source={require("../../../assets/images/blank-profile-picture-g0fd59bf85_1280.png")}
          style={styles.userImage}
        />
        <Text style={styles.userName}>{nickName}</Text>
        <Text style={styles.userEmail}>{email}</Text>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Image source={{ uri: item.imageUri }} style={styles.postImage} />
            <Text style={styles.postTitle}>{item.postData.title}</Text>
            <View style={styles.lowerWrapper}>
              <View style={styles.locationWrapper}>
                <Feather
                  name="message-circle"
                  size={24}
                  color="#BDBDBD"
                  style={styles.commentIcon}
                  onPress={() =>
                    navigation.navigate("Comments", {
                      postId: item.id,
                      imageUri: item.imageUri,
                    })
                  }
                />
                <Text style={styles.commentCount}>0</Text>
              </View>
              <View style={styles.locationWrapper}>
                <Feather
                  name="map-pin"
                  size={24}
                  color="#BDBDBD"
                  style={styles.mapPin}
                  onPress={() =>
                    navigation.navigate("Map", {
                      coordinates: item.location,
                      title: item.postData.title,
                    })
                  }
                />
                <Text style={styles.postLocation}>
                  {item.postData.location}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  userContainer: {
    justifyContent: "center",
    marginHorizontal: 16,
    marginTop: 48,
    marginBottom: 48,
    paddingLeft: 68,
  },

  userImage: {
    position: "absolute",
    width: 60,
    height: 60,
    backgroundColor: "grey",
    borderRadius: 16,
  },
  userName: {
    fontFamily: "Roboto-Medium",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 15,
    color: "rgba(33, 33, 33, 0.8)",
  },
  post: {
    marginBottom: 34,
    marginHorizontal: 16,
  },

  postImage: {
    height: 240,

    marginBottom: 8,
    borderRadius: 8,
  },
  postTitle: {
    marginBottom: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "line",
  },
  lowerWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  locationWrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  commentIcon: {
    marginRight: 6,
    transform: [{ rotateZ: "270deg" }],
  },
  commentCount: {
    marginHorizontal: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  postLocation: {
    marginHorizontal: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
  },
});

export default DefaultPostsScreen;
