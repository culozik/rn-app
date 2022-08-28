import { useEffect } from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";

import db from "../../firebase/config";

const ProfileScreen = () => {
  const { userId } = useSelector((state) => state.auth);
  console.log(userId);

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((data) => {
        console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
  };

  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
