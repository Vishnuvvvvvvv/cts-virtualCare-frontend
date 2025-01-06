const backendIPaddress = "192.168.1.3";
const port = "3000";

const URL = `http://${backendIPaddress}:${port}`;
//Ex: backendIPaddress = 192.168.1.2

export const API = {
  LOGIN: `${URL}/api/login`,
  REGISTER: `${URL}/api/signup`,

  SAVE_USER_DETAILS: `${URL}/api/profile`,
  GET_USER_DETAILS: `${URL}/api/profile`,

  UPLOAD_DOC: `${URL}/api/upload`,
  SUMMARIZE: `${URL}/api/summarize`,
  TRANSCRIBE: `${URL}/api/transcribe`,

  SAVE_EXTRACTED_DATA: `${URL}/api/user-data`, //to store the final json on reviewand Submit stage
  GET_SAVED_DATA: `${URL}/api/user-data`, //to get the saved Doc, done on the above step

  GET_DAILY_MEDICINE_STATUS: `${URL}/api/medicine`,
  STORE_DAILY_MEDICINE: `${URL}/api/medicine`,
  GET_FULL_MEDICINE_STATUS: `${URL}/api/medicine`,

  STORE_SYMPTOMS: `${URL}/api/symptoms`,
  GET_SYMPTOMS: `${URL}/api/symptoms`,

  DELETE_DATA: `${URL}/deleteData`,

  SCHEDULE_NOTIFICATION: `${URL}/api/notification`,
};

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "./UserContext";

// utils for handling token authentication
// =================================

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    console.log("toaken", token);
    if (!token) {
      console.log("No JWT token found in the token object");
      return;
    }
    return token;
  } catch (error) {
    console.error("Error fetching token from AsyncStorage", error);
    return null;
  }
};

import { jwtDecode } from "jwt-decode";
import { useNavigation } from "@react-navigation/native";

type DecodedToken = {
  exp: number; // The expiration time in seconds since the epoch
  iat?: number; // The issued-at time (optional)
  // Add any other fields your token contains
};

const isTokenExpired = (token: any): boolean => {
  console.log("cehcking token expired or not");
  if (!token) return true;
  try {
    const decodedToken = jwtDecode<DecodedToken>(token); // Explicitly provide the type
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};

export const getTokenAndCheckExpiry = async (token: any, navigation: any) => {
  console.log("checking the token with expiry date ! tkn ", token);
  console.log("fetching useUser hooks");
  // const { setIsAuthenticated, setIsPlanActivated } = useUser();
  // const token = await AsyncStorage.getItem("token");
  console.log("moving to next step..");

  if (token) {
    console.log("token is present");
  }
  if (!isTokenExpired(token)) {
    console.log("Toekn is not expired");
  } else if (token) {
    console.log("token is expired");
  }

  if (token && !isTokenExpired(token)) {
    console.log("Token is valid");
    return true;
  } else {
    // const navigation = useNavigation<any>();
    // navigation.navigate("login");

    await AsyncStorage.clear();
    // await AsyncStorage.removeItem("authToken");
    // setIsAuthenticated(false);
    // setIsPlanActivated(false);
    // await AsyncStorage.setItem("planActivated", "false");
    console.log("redirecting to login page");
    navigation.reset({
      index: 0,
      routes: [{ name: "login" }], // Navigate back to login screen in stack navigation
    });
    console.log("Token is expired or not found");
    return false;
  }
};
