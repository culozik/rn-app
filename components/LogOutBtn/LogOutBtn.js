import { useDispatch } from "react-redux";

import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "./styles";

import { authLogOutUser } from "../../redux/auth/authOperations";

const LogOutBtn = () => {
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(authLogOutUser());
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={logOut}
      style={styles.button}
    >
      <Feather name="log-out" size={24} color="#BDBDBD" />
    </TouchableOpacity>
  );
};

export default LogOutBtn;
