import { Provider } from "react-redux";
import { useState, useEffect, useCallback, createContext } from "react";
import { StyleSheet, View } from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import store from "./redux/store";

import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";

import AuthContext from "./helpers/context/authContext";
import { useRoute } from "./router";

export default function App() {
  const navigationRef = useNavigationContainerRef();
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

  const routing = useRoute(isAuth, navigationRef);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <AuthContext.Provider value={setIsAuth}>
        <View style={styles.container} onLayout={onLayoutRootView}>
          <NavigationContainer ref={navigationRef}>
            {routing}
          </NavigationContainer>
        </View>
      </AuthContext.Provider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
