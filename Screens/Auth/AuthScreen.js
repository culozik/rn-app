import { createStackNavigator } from "@react-navigation/stack";

import RegistrationScreen from "./RegistrationScreen";
import LoginScreen from "./LoginScreen";

const AuthStack = createStackNavigator();

const AuthScreen = () => {
  return (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthScreen;
