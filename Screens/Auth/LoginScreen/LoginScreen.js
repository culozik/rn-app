import React, { useState, useEffect, useCallback } from "react";
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

import styles from "../styles";

const initialState = {
  email: "",
  password: "",
};

export default LoginScreen = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [state, setState] = useState(initialState);
  const [elOnFocus, setElOnFocus] = useState("");
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

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

  useEffect(() => {
    const hideSubscription = Keyboard.addListener("keyboardWillHide", () => {
      setIsKeyboardShown(false);
    });

    return () => {
      hideSubscription.remove();
    };
  }, []);

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleStateValue = (value, name) => {
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const keyboardHide = () => {
    setIsKeyboardShown(false);
    setElOnFocus("");
    Keyboard.dismiss();
  };

  const handleRegistration = () => {
    console.log(state);
    setState(initialState);
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
                  setIsKeyboardShown(true);
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
                    setIsKeyboardShown(true);
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
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.8}
                  onPress={handleRegistration}
                >
                  <Text style={styles.buttonText}>Войти</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.link} activeOpacity={0.8}>
                  <Text style={styles.linkText}>
                    Нет аккаунта? Зарегистрироваться
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};
