import { StyleSheet, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegistrationScreen from "../screens/Auth/RegistrationScreen";
import BottomTabNavigation from "./BottomTabNavigation";

export type stackScreens = {
  TabNavigation: undefined;
  Register: undefined;
  login: undefined;
};

const Stack = createNativeStackNavigator<stackScreens>();

const RootNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Register">
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
      <Stack.Screen name="TabNavigation" component={BottomTabNavigation} />
    </Stack.Navigator>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({});
