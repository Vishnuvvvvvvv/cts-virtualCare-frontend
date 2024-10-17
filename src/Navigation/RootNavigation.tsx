import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegistrationScreen from "../screens/Auth/RegistrationScreen";
import BottomTabNavigation from "./BottomTabNavigation";
import BasicDetailsFillup from "../screens/BasicDetailsFillup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UploadDocumentsScreen from "../screens/ProfileScreen/UploadDocumentsScreen";
import AdditionalInfo from "../screens/ProfileScreen/AdditionalInfo/AdditionalInfo";
import ReviewAndSubmit from "../screens/ProfileScreen/ReviewAndSubmit/ReviewAndSubmit";

export type stackScreens = {
  TabNavigation: undefined;
  Register: undefined;
  login: undefined;
  basicDetailFillUp: undefined;
  UploadDocuments: undefined;
  HomeScreen: undefined; // Include this if you want to navigate to it directly
  updateHealth: undefined;
  Profile: undefined;
  AdditionalInfo: undefined;
  ReviewAndSubmit: undefined;
};

const Stack = createNativeStackNavigator<stackScreens>();

const RootNavigation = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        setIsSignedIn(false);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <Stack.Navigator initialRouteName={"Register"}>
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

      <Stack.Screen
        name="UploadDocuments"
        component={UploadDocumentsScreen}
        options={{ headerShown: true }}
      />

      <Stack.Screen
        name="AdditionalInfo"
        component={AdditionalInfo}
        options={{ headerShown: true }}
      />

      <Stack.Screen
        name="ReviewAndSubmit"
        component={ReviewAndSubmit}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({});
