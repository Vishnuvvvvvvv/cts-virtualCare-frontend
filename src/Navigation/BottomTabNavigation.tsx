import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import UpdateHealth from "../screens/UpdateHealth/UpdateHealth";

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
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="updateHealth"
        component={UpdateHealth}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
