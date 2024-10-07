import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegistrationScreen from "../screens/Auth/RegistrationScreen";
import BottomTabNavigation from "./BottomTabNavigation";
import BasicDetailsFillup from "../screens/BasicDetailsFillup";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type stackScreens = {
  TabNavigation: undefined;
  Register: undefined;
  login: undefined;
  basicDetailFillUp: undefined;
};

const Stack = createNativeStackNavigator<stackScreens>();

const RootNavigation = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        setIsSignedIn(true);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={isSignedIn ? "Register" : "TabNavigation"}
    >
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegistrationScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="basicDetailFillUp"
        component={BasicDetailsFillup}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="TabNavigation"
        component={BottomTabNavigation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({});
