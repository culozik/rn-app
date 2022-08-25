import { useContext } from "react";

import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import AuthContext from "../../helpers/context/authContext";

import CreatePostsScreen from "./CreatePostsScreen";
import PostsScreen from "./PostsScreen";
import ProfileScreen from "./ProfileScreen";

import LogOutBtn from "../../components/LogOutBtn";
import tabBarIconFunc from "../../helpers/tabBarIcon/tabBarIconFunc";

const MainTabNavigation = createBottomTabNavigator();

const HomeScreen = ({ navigationRef }) => {
  const handleLogOutSubmit = useContext(AuthContext);
  return (
    <MainTabNavigation.Navigator
      initialRouteName="Post"
      screenOptions={{
        headerTitleAlign: "center",
        tabBarShowLabel: false,
      }}
    >
      <MainTabNavigation.Screen
        name="Post"
        component={PostsScreen}
        options={{
          headerShown: false,

          tabBarIcon: ({ focused }) => {
            return tabBarIconFunc("grid", focused);
          },
          headerRight: () => {
            return <LogOutBtn onLogout={handleLogOutSubmit} />;
          },
        }}
      />
      <MainTabNavigation.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          headerTitle: "Создать публикацию",
          tabBarIcon: ({}) => {
            return tabBarIconFunc("create");
          },
          headerLeft: () => {
            return (
              <TouchableOpacity
                style={{ marginLeft: 16 }}
                onPress={() => navigationRef.goBack()}
              >
                <Feather name="arrow-left" size={24} color="#212121CC" />
              </TouchableOpacity>
            );
          },
          tabBarStyle: { display: "none" },
        }}
      />
      <MainTabNavigation.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return tabBarIconFunc("user", focused);
          },
        }}
      />
    </MainTabNavigation.Navigator>
  );
};

export default HomeScreen;
