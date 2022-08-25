import { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";

const DefaultPostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const { params } = route;

  useEffect(() => {
    if (params) {
      setPosts((prevState) => [...prevState, params]);
    }
  }, [params]);

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image
          source={require("../../../assets/images/blank-profile-picture-g0fd59bf85_1280.png")}
          style={styles.userImage}
        />
        <Text style={styles.userName}>User Name</Text>
        <Text style={styles.userEmail}>User Email</Text>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Image source={{ uri: item.image }} style={styles.postImage} />
            <Text style={styles.postTitle}>{item.imageTitle}</Text>
            <View style={styles.lowerWrapper}>
              <View style={styles.locationWrapper}>
                <Feather
                  name="message-circle"
                  size={24}
                  color="#BDBDBD"
                  style={styles.commentIcon}
                  onPress={() => navigation.navigate("Comments")}
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
                      title: item.imageTitle,
                    })
                  }
                />
                <Text style={styles.postLocation}>{item.imageLocation}</Text>
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
