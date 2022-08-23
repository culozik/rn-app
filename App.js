import { useState, useEffect, useCallback, createContext } from "react";
import { StyleSheet, View } from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from "@react-navigation/native";

import AuthContext from "./helpers/context/authContext";
import { useRoute } from "./router";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/roboto/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/roboto/Roboto-Medium.ttf"),
  });
  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();
    };
    prepare();
  }, []);
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const routing = useRoute(isAuth);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthContext.Provider value={setIsAuth}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <NavigationContainer>{routing}</NavigationContainer>
      </View>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
