import { Image, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";

const tabBarIconFunc = (type, focused) => {
  if (type === "create") {
    return (
      <Image
        source={
          Platform.OS === "ios"
            ? require("../../assets/icons/addPost-2x.png")
            : require("../../assets/icons/addPost.png")
        }
        style={{ width: 70, height: 40 }}
      />
    );
  }

  if (focused) {
    return <Feather name={`${type}`} size={24} color="#FF6C00" />;
  }
  return <Feather name={`${type}`} size={24} color="#212121" />;
};

export default tabBarIconFunc;
