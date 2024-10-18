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
import { useUser } from "../../src/UserContext";

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
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { isAuthenticated, setIsAuthenticated } = useUser();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await AsyncStorage.getItem("authToken");
      setIsAuthenticated(!!token); // If token exists, set to true; else false
    };
    console.log("status : ", isAuthenticated);
    checkAuthStatus();
  }, [isAuthenticated]);

  if (isAuthenticated === null) {
    // Return null or a loading spinner while checking the auth status
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? "TabNavigation" : "login"} // Start based on auth status
    >
      {isAuthenticated ? (
        <>
          {/* Authenticated users' screens */}
          <Stack.Screen
            name="TabNavigation"
            component={BottomTabNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="basicDetailFillUp"
            component={BasicDetailsFillup}
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
        </>
      ) : (
        <>
          {/* Non-authenticated users' screens */}
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
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({});
