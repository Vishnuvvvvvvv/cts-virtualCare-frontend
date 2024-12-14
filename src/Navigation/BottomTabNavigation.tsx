import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import UpdateHealth from "../screens/UpdateHealth/UpdateHealth";
import { ActivityIndicator, Image, View } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API } from "../apiConfig";

export type stackScreens = {
  HomeScreen: undefined;
  updateHealth: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<stackScreens>();

export default function BottomTabNavigation() {
  const [isHomeScreen, setIsHomeScreen] = useState<boolean | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPlanActivation = async () => {
      try {
        //delay sometime,  so that the userId gets assigned to correct value.instead of null

        const delay = (ms: any) =>
          new Promise((resolve) => setTimeout(resolve, ms)); // Function to delay for ms milliseconds
        await delay(1000);

        const userId = await AsyncStorage.getItem("userId");

        if (!userId) {
          console.warn("No userId found in AsyncStorage.");
          // setIsHomeScreen(false); // Default state if userId is not found
          // setLoading(false); // Set loading to false

          return;
        }
        console.log("checking user plan exists or not (from bottom tab)");
        const response = await axios.get(`${API.GET_SAVED_DATA}/${userId}`);
        if (response.status === 200) {
          setIsHomeScreen(true);
          await AsyncStorage.setItem("planActivated", "true");
        } else {
          setIsHomeScreen(false);
          await AsyncStorage.setItem("planActivated", "false");
        }
      } catch (error) {
        console.error("Error in checkPlanActivation:", error);
        setIsHomeScreen(false); // Fail-safe default
      } finally {
        setLoading(false); // Ensure loading is set to false after async operation
      }
    };

    checkPlanActivation();
  }, []);

  // useEffect(() => {
  //   const check = async () => {
  //     const res = await ActivePlanStatus();
  //     setIsHomeScreen(res);
  //   };
  //   check();
  //   console.log("inside botttomTab navogation status ,", isHomeScreen);
  // }, []);
  console.log("status of is home screen ", isHomeScreen);

  if (loading) {
    // Show a loading indicator while checking the plan status
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Tab.Navigator initialRouteName={!isHomeScreen ? "Profile" : "HomeScreen"}>
      <Tab.Screen
        name="HomeScreen"
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
        name="updateHealth"
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
