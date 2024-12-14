import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import UpdateHealth from "../screens/UpdateHealth/UpdateHealth";
import { ActivityIndicator, Image, View } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type stackScreens = {
  HomeScreen: undefined;
  updateHealth: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<stackScreens>();

export default function BottomTabNavigation() {
  const [isHomeScreen, setIsHomeScreen] = useState<boolean | null>(null);

  // const ActivePlanStatus = async () => {
  //   try {
  //     const planActivated = await AsyncStorage.getItem("planActivated");
  //     if (planActivated != null)
  //       if (planActivated === "true") {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //   } catch (error) {
  //     return false;
  //     console.error("Error fetching userId from AsyncStorage:", error);
  //   }
  // };

  const ActivePlanStatus = async () => {
    try {
      const planActivated = await AsyncStorage.getItem("planActivated");
      if (planActivated === null) {
        // Key is missing, set default value
        await AsyncStorage.setItem("planActivated", "false");
        return false;
      }
      return planActivated === "true";
    } catch (error) {
      console.error("Error fetching planActivated from AsyncStorage:", error);
      return false; // Default to false in case of an error
    }
  };

  useEffect(() => {
    const check = async () => {
      const res = await ActivePlanStatus();
      setIsHomeScreen(res);
    };
    check();
    console.log("inside botttomTab navogation status ,", isHomeScreen);
  }, []);

  if (isHomeScreen === null) {
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
