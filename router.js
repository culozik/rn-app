import HomeScreen from "./screens/HomeScreens";
import AuthScreen from "./screens/Auth";

export const useRoute = (isAuth, navigationRef) => {
  if (!isAuth) {
    return <AuthScreen />;
  }
  return <HomeScreen navigationRef={navigationRef} />;
};
