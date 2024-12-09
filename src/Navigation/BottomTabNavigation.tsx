import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import UpdateHealth from "../screens/UpdateHealth/UpdateHealth";
import { Image } from "react-native";

export type stackScreens = {
  HomeScreen: undefined;
  updateHealth: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<stackScreens>();

export default function BottomTabNavigation() {
  return (
    <Tab.Navigator initialRouteName="Profile">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              style={[
                styles.icon,
                { tintColor: color, width: size, height: size },
              ]}
              source={require("../../assets/tabs/Home.png")}
            ></Image> // Home icon
          ),
        }}
      />
      <Tab.Screen
        name="Update Health"
        component={UpdateHealth}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              style={[
                styles.icon,
                { tintColor: color, width: size, height: size },
              ]}
              source={require("../../assets/tabs/Plus.png")}
            ></Image> // Home icon
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              style={[
                styles.icon,
                { tintColor: color, width: size, height: size },
              ]}
              source={require("../../assets/tabs/profile.png")}
            ></Image> // Home icon
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export const styles = {
  icon: {
    // resizeMode: "contain", // Ensures the image is scaled to fit the tab icon area
  },
};
