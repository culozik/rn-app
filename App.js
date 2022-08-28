import { Provider } from "react-redux";
import { useEffect, useCallback } from "react";
import { View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import store from "./redux/store";
import Main from "./components/Main.js/Main";

export default function App() {
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

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <View
        style={{ flex: 1, backgroundColor: "#fff" }}
        onLayout={onLayoutRootView}
      >
        <Main />
      </View>
    </Provider>
  );
}
