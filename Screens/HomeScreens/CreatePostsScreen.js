import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  TouchableWithoutFeedback,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  TextInput,
  Keyboard,
  Image,
} from "react-native";
import * as Location from "expo-location";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { Camera } from "expo-camera";
import shortid from "shortid";

import db from "../../firebase/config";

import MyButton from "../../components/Button/MyButton";

const initialState = {
  title: "",
  location: "",
};

const CreatePostsScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [elOnFocus, setElOnFocus] = useState("");
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState("");
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [postSandStatus, setPostSandStatus] = useState(false);
  const { userId, nickName } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const handleStateValue = (value, name) => {
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setImage(photo.uri);
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(image);
    const file = await response.blob();

    const uniquePostId = shortid.generate().toString();
    await db.storage().ref(`postsImages/${uniquePostId}`).put(file);
    const processImage = await db
      .storage()
      .ref("postsImages")
      .child(uniquePostId)
      .getDownloadURL();

    return processImage;
  };

  const uploadPostToServer = async (location) => {
    const photo = await uploadPhotoToServer();
    await db.firestore().collection("posts").add({
      imageUri: photo,
      postData: state,
      location,
      userId,
      author: nickName,
      comments: [],
    });
  };

  const publishPost = async () => {
    let location;
    try {
      setPostSandStatus(true);
      location = await Location.getCurrentPositionAsync();
      uploadPostToServer(location.coords);
      setPostSandStatus(false);
      navigation.navigate("DefaultScreen");
      setImage("");
      setState(initialState);
    } catch (error) {
      console.log(error);
    }
  };

  const keyboardHide = () => {
    setElOnFocus("");
    Keyboard.dismiss();
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        {image ? (
          <View>
            <Image source={{ uri: image }} style={styles.previewImage} />
          </View>
        ) : (
          <Camera
            style={{
              ...styles.camera,
              height: elOnFocus.length > 0 ? 200 : 240,
            }}
            ref={setCamera}
          >
            <TouchableOpacity style={styles.button} onPress={takePhoto}>
              <MaterialIcons name="camera-alt" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </Camera>
        )}

        {elOnFocus.length > 0 ? null : (
          <TouchableOpacity onPress={() => setImage("")}>
            <Text style={styles.text}>Редактировать фото</Text>
          </TouchableOpacity>
        )}

        <View style={styles.formWrapper}>
          <TextInput
            style={{
              ...styles.input,
              marginTop: 33,
              borderBottomColor: elOnFocus === "title" ? "#FF6C00" : "#E8E8E8",
            }}
            placeholder="Название..."
            onChangeText={(value) => handleStateValue(value, "title")}
            value={state.title}
            onFocus={() => {
              setElOnFocus("title");
            }}
            onBlur={() => {
              setElOnFocus("");
            }}
          />
          <View>
            <TextInput
              style={{
                ...styles.input,
                paddingLeft: 28,
                borderBottomColor:
                  elOnFocus === "location" ? "#FF6C00" : "#E8E8E8",
              }}
              placeholder="Местность..."
              onChangeText={(value) => handleStateValue(value, "location")}
              value={state.location}
              onFocus={() => {
                setElOnFocus("location");
              }}
              onBlur={() => {
                setElOnFocus("");
              }}
            />
            <Feather
              name="map-pin"
              size={24}
              color="#BDBDBD"
              style={styles.mapPin}
            />
          </View>
          <MyButton
            mainStyle={styles.publishBtn}
            opacity={0.3}
            func={publishPost}
            textStyle={styles.publishText}
            text={!postSandStatus ? "Опубликовать" : "Публикуем"}
            disabled={!postSandStatus ? false : true}
          />
        </View>
        <View style={styles.trashWrapper}>
          <TouchableOpacity
            style={styles.trash}
            onPress={() => {
              setImage(""), setState(initialState);
            }}
          >
            <Feather name="trash-2" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  camera: {
    justifyContent: "center",
    alignItems: "center",
    height: 240,
    marginTop: 32,
    marginHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    overflow: "hidden",
  },
  previewImage: {
    height: 240,
    marginTop: 32,
    marginHorizontal: 16,
    borderRadius: 8,
  },

  button: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 6,
    marginHorizontal: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  formWrapper: {
    marginHorizontal: 16,
  },
  input: {
    height: 50,
    marginBottom: 16,
    paddingTop: 15,
    borderBottomWidth: 1,
    paddingBottom: 15,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  mapPin: {
    position: "absolute",
    bottom: 13,
    width: 24,
    height: 24,
    transform: [{ translateY: -16 }],
  },
  publishBtn: {
    marginTop: 32,
    height: 51,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  publishText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#fff",
  },
  trashWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  trash: {
    width: 70,
    height: 40,
    marginBottom: 34,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
  },
});

export default CreatePostsScreen;
