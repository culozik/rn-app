import { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";

import AuthContext from "../../helpers/context/authContext";

import DefaultPostsScreen from "./nestedScreens/DefaultPostsScreen";
import CommentsScreen from "./nestedScreens/CommentsScreen";
import MapScreen from "./nestedScreens/MapScreen";
import LogOutBtn from "../../components/LogOutBtn";

const NestedScreen = createStackNavigator();

const PostsScreen = ({ navigation }) => {
  const handleLogOutSubmit = useContext(AuthContext);
  return (
    <NestedScreen.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerMode: "screen",
      }}
    >
      <NestedScreen.Screen
        options={{
          headerTitle: "Публикации",
          headerRight: () => {
            return <LogOutBtn onLogout={handleLogOutSubmit} />;
          },
        }}
        name="DefaultScreen"
        component={DefaultPostsScreen}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          headerShown: true,
          headerTitle: "Комментарии",
          headerLeft: () => {
            return (
              <TouchableOpacity
                style={{ marginLeft: 16 }}
                onPress={() => navigation.goBack()}
              >
                <Feather name="arrow-left" size={24} color="#212121CC" />
              </TouchableOpacity>
            );
          },
        }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerShown: true,
          headerTitle: "Карта",
          headerLeft: () => {
            return (
              <TouchableOpacity
                style={{ marginLeft: 16 }}
                onPress={() => navigation.goBack()}
              >
                <Feather name="arrow-left" size={24} color="#212121CC" />
              </TouchableOpacity>
            );
          },
        }}
      />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
