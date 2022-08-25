import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";

import DefaultPostsScreen from "./nestedScreens/DefaultPostsScreen";
import CommentsScreen from "./nestedScreens/CommentsScreen";
import MapScreen from "./nestedScreens/MapScreen";

const NestedScreen = createStackNavigator();

const PostsScreen = ({ navigation }) => {
  return (
    <NestedScreen.Navigator
      screenOptions={{
        // headerShown: false,
        headerMode: "screen",
      }}
    >
      <NestedScreen.Screen
        options={{ headerTitle: "Публикации" }}
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
