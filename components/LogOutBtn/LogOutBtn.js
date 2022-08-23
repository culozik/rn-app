import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "./styles";

const LogOutBtn = (props) => {
  const { onLogout } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        onLogout(false);
        console.log("Log Out");
      }}
      style={styles.button}
    >
      <Feather name="log-out" size={24} color="#BDBDBD" />
    </TouchableOpacity>
  );
};

export default LogOutBtn;
