// src/apiConfig.ts
// const BASE_URL = "http://192.168.1.2:3003"; // Replace with your backend base URL
// const BASE_URL2 = "http://172.18.116.122:6000";

// export const API = {
//   LOGIN: `${BASE_URL}/api/login`,
//   REGISTER: `${BASE_URL}/api/signup`,
//   // Add more endpoints as needed
//   UPLOAD_DOC: `http://172.18.116.122:3001/upload-doc`,
//   SUMMARIZE: `http://172.18.116.122:3001/summarize`,
//   TRANSCRIBE: `http://172.18.116.122:3000/transcribe`,
//   SAVE_EXTRACTED_DATA: `${BASE_URL2}/saveData`, //to store the final document on reviewand Submit stage
//   GET_SAVED_DATA: `${BASE_URL2}/getSavedData`, //to get the saved Doc, done on the above step
//   GET_DAILY_MEDICINE_STATUS: `${BASE_URL2}/api/dailyMedicineStatus`,
//   STORE_DAILY_MEDICINE: `${BASE_URL2}/api/storeDailyMedicine`,
//   STORE_SYMPTOMS: `${BASE_URL2}/api/saveSymptoms`,
//   GET_SYMPTOMS: `${BASE_URL2}/api/getSymptoms`,
// };

// const newURL = "http://192.168.1.217:7000";

// export const API = {
//   LOGIN: `${newURL}/login`,
//   REGISTER: `${newURL}/signup`,
//   // Add more endpoints as needed
//   SAVE_USER_DETAILS: `${newURL}/UserDetails`,
//   GET_USER_DETAILS: `${newURL}/UserDetails`,

//   UPLOAD_DOC: `${newURL}/upload-doc`,
//   SUMMARIZE: `${newURL}/summarize`,
//   TRANSCRIBE: `${newURL}/transcribe`,

//   SAVE_EXTRACTED_DATA: `${newURL}/saveData`, //to store the final json on reviewand Submit stage
//   GET_SAVED_DATA: `${newURL}/getSavedData`, //to get the saved Doc, done on the above step

//   GET_DAILY_MEDICINE_STATUS: `${newURL}/api/dailyMedicineStatus`,
//   STORE_DAILY_MEDICINE: `${newURL}/api/storeDailyMedicine`,
//   GET_FULL_MEDICINE_STATUS: `${newURL}/api/getFullMedicineStatus`,

//   STORE_SYMPTOMS: `${newURL}/api/saveSymptoms`,
//   GET_SYMPTOMS: `${newURL}/api/getSymptoms`,

//   DELETE_DATA: `${newURL}/deleteData`,
// };

const newURL = "http://192.168.1.217:8000";

export const API = {
  LOGIN: `${newURL}/login`,
  REGISTER: `${newURL}/signup`,
  // Add more endpoints as needed
  SAVE_USER_DETAILS: `${newURL}/UserDetails`,
  GET_USER_DETAILS: `${newURL}/UserDetails`,

  UPLOAD_DOC: `${newURL}/upload-doc`,
  SUMMARIZE: `${newURL}/summarize`,
  TRANSCRIBE: `${newURL}/transcribe`,

  SAVE_EXTRACTED_DATA: `${newURL}/saveData`, //to store the final json on reviewand Submit stage
  GET_SAVED_DATA: `${newURL}/saveData`, //to get the saved Doc, done on the above step

  GET_DAILY_MEDICINE_STATUS: `${newURL}/api/dailyMedicineStatus`,
  STORE_DAILY_MEDICINE: `${newURL}/api/dailyMedicineStatus`,
  GET_FULL_MEDICINE_STATUS: `${newURL}/api/getFullMedicineStatus`,

  STORE_SYMPTOMS: `${newURL}/api/saveSymptoms`,
  GET_SYMPTOMS: `${newURL}/api/saveSymptoms`,

  DELETE_DATA: `${newURL}/deleteData`,
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
    console.log("inside inner logic , fetching navigation obj");
    // const navigation = useNavigation<any>();
    // navigation.navigate("login");
    console.log("fetching finished , next");
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
  console.log("token cehcking finished.....");
};
