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
import UpdateMedicationDetails from "../screens/UpdateHealth/components/UpdateMedicationDetails";
import DailyMedication from "../screens/HomeScreen/DailyMedication/DailyMedication";
import HealthReport from "../screens/HomeScreen/HealthReport/HealthReport";
import Medications from "../screens/HomeScreen/Medications/Medications";
import { API } from "../apiConfig";
import axios from "axios";

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
  UpdateMedicationDetails: undefined;
  DailyMedication: undefined;
  HealthReport: undefined;
  Medications: undefined;
};

const Stack = createNativeStackNavigator<stackScreens>();

const RootNavigation = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const {
    isAuthenticated,
    setIsAuthenticated,
    isPlanActivated,
    setIsPlanActivated,
  } = useUser();

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

  // const [userExisting, setUserExisting] = useState<boolean>(false);

  // useEffect(() => {
  //   const ifSavedDataPresent = async () => {
  //     const userId = await AsyncStorage.getItem("userId");
  //     try {
  //       const response = await axios.get(`${API.GET_SAVED_DATA}/${userId}`);
  //       if (response.status === 200 && response.data) {
  //         console.log("Person exists");
  //         setUserExisting(true); // Data already exists, so no need for BasicDetailFillup screen
  //       }
  //     } catch (error) {
  //       console.error("Error checking SavedData:", error);
  //     }
  //   };

  //   if (isAuthenticated) {
  //     ifSavedDataPresent();
  //   }
  // }, [isAuthenticated]);

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
          <Stack.Screen
            name="UpdateMedicationDetails"
            component={UpdateMedicationDetails}
            options={{ headerShown: true, title: "Update Medication Details" }}
          />
          <Stack.Screen
            name="DailyMedication"
            component={DailyMedication}
            options={{ headerShown: true, title: "Daily Medication" }}
          />
          <Stack.Screen
            name="HealthReport"
            component={HealthReport}
            options={{ headerShown: true, title: "Health Report" }}
          />
          <Stack.Screen
            name="Medications"
            component={Medications}
            options={{ headerShown: true, title: "Medications" }}
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
