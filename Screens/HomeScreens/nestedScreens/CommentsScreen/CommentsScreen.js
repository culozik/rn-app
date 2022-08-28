import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import db from "../../../../firebase/config";

import styles from "./styles";

const initialState = "";

const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState(initialState);
  const [allComments, setAllComments] = useState([]);
  const { postId, imageUri } = route.params;
  const { nickName } = useSelector((state) => state.auth);

  console.log(imageUri);

  useEffect(() => {
    getAllComments();
  }, []);

  const createPost = async () => {
    db.firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .doc(Date.now().toString())
      .set({ comment, nickName });

    setComment(initialState);
  };

  const getAllComments = async () => {
    await db
      .firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .onSnapshot((data) =>
        setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.postImage} />
      <SafeAreaView style={styles.postsContainer}>
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View style={styles.comment}>
              <Text style={{ ...styles.commentText, marginBottom: 8 }}>
                {item.nickName}
              </Text>
              <Text style={styles.commentText}>{item.comment}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 95 : 0}
      >
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder={"Комментировать..."}
            value={comment}
            onChangeText={setComment}
          />
          <TouchableOpacity style={styles.btn} onPress={createPost}>
            <Ionicons name="arrow-up-circle" size={38} color="#FF6C00" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CommentsScreen;
