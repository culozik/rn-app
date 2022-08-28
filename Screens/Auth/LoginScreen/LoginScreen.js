import { useState, useEffect } from "react";
import {
  TouchableWithoutFeedback,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  Dimensions,
} from "react-native";
import { useDispatch } from "react-redux";

import { authSignInUser } from "../../../redux/auth/authOperations";

import MyButton from "../../../components/Button/MyButton";

import styles from "../styles";

const initialState = {
  email: "",
  password: "",
};

export default LoginScreen = ({ navigation }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [state, setState] = useState(initialState);
  const [elOnFocus, setElOnFocus] = useState("");
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;
      setDimensions(width);
    };
    const subscription = Dimensions.addEventListener("change", onChange);
    return () => {
      subscription?.remove();
    };
  });

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleStateValue = (value, name) => {
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const keyboardHide = () => {
    setElOnFocus("");
    Keyboard.dismiss();
  };

  const onSubmit = () => {
    console.log(state);
    dispatch(authSignInUser(state));
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ImageBackground
        source={require("../../../assets/images/backgroundImage.jpg")}
        style={styles.background}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? -241 : 0}
        >
          <View
            style={{
              ...styles.formWrapper,
              paddingTop: 32,
              paddingBottom: 144,
            }}
          >
            <Text style={styles.headline}>Войти</Text>
            <View style={{ ...styles.innerFormWrapper, width: dimensions }}>
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: elOnFocus === "email" ? "#FF6C00" : "#E8E8E8",
                }}
                placeholder="Адрес электронной почты"
                onFocus={() => {
                  setElOnFocus("email");
                }}
                onBlur={() => {
                  setElOnFocus("");
                }}
                value={state.email}
                onChangeText={(value) => handleStateValue(value, "email")}
              />
              <View>
                <TextInput
                  style={{
                    ...styles.input,
                    marginBottom: 0,
                    borderColor:
                      elOnFocus === "password" ? "#FF6C00" : "#E8E8E8",
                  }}
                  placeholder="Пароль"
                  secureTextEntry={isPasswordVisible}
                  onFocus={() => {
                    setElOnFocus("password");
                  }}
                  onBlur={() => {
                    setElOnFocus("");
                  }}
                  value={state.password}
                  onChangeText={(value) => handleStateValue(value, "password")}
                />
                <TouchableOpacity
                  style={styles.passBtn}
                  onPress={handlePasswordVisibility}
                >
                  <Text style={styles.passBtnText}>Показать</Text>
                </TouchableOpacity>
              </View>
              <View>
                <MyButton
                  mainStyle={styles.button}
                  opacity={0.8}
                  func={onSubmit}
                  textStyle={styles.buttonText}
                  text={"Войти"}
                />
                <MyButton
                  mainStyle={styles.link}
                  opacity={0.3}
                  func={() => navigation.navigate("Registration")}
                  textStyle={styles.linkText}
                  text={"Нет аккаунта? Зарегистрироваться"}
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};
