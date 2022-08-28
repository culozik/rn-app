import React, { useState, useEffect } from "react";
import {
  TouchableWithoutFeedback,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  Dimensions,
} from "react-native";
import { useDispatch } from "react-redux";

import { authSignUpUser } from "../../../redux/auth/authOperations";

import MyButton from "../../../components/Button/MyButton";

import styles from "../styles";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default RegistrationPage = ({ navigation }) => {
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

  const handleRegistration = () => {
    console.log(state);
    dispatch(authSignUpUser(state));
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ImageBackground
        source={require("../../../assets/images/backgroundImage.jpg")}
        style={styles.background}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? -175 : -78}
        >
          <View
            style={{
              ...styles.formWrapper,
              paddingBottom: 78,
            }}
          >
            <View style={styles.userImage}>
              <TouchableOpacity style={styles.addBtn} activeOpacity={0.8}>
                <Image
                  source={require("../../../assets/images/add.png")}
                  style={styles.add}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.headline}>Регистрация</Text>
            <View style={{ ...styles.innerFormWrapper, width: dimensions }}>
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: elOnFocus === "login" ? "#FF6C00" : "#E8E8E8",
                }}
                placeholder="Логин"
                onFocus={() => {
                  setElOnFocus("login");
                }}
                onBlur={() => {
                  setElOnFocus("");
                }}
                value={state.login}
                onChangeText={(value) => handleStateValue(value, "login")}
                selectionColor={"#212121"}
              />
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
                selectionColor={"#212121"}
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
                  selectionColor={"#212121"}
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
                  func={handleRegistration}
                  textStyle={styles.buttonText}
                  text={"Зарегистрироваться"}
                />
                <MyButton
                  mainStyle={styles.link}
                  opacity={0.3}
                  func={() => navigation.navigate("Login")}
                  textStyle={styles.linkText}
                  text={"Уже есть аккаунт? Войти"}
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};
