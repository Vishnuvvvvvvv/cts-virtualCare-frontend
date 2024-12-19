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
import { API, getToken, getTokenAndCheckExpiry } from "../apiConfig";
import axios from "axios";
import { ActivityIndicator, Text } from "react-native-paper";
import { StackActions, useNavigation } from "@react-navigation/native";

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
  const navigation = useNavigation();
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const {
    isAuthenticated,
    setIsAuthenticated,
    isPlanActivated,
    setIsPlanActivated,
  } = useUser();
  // const [initialRoute, setInitialRoute] = useState("login");

  const checkAuthStatus = async () => {
    const token = await AsyncStorage.getItem("authToken");
    setIsAuthenticated(!!token); // If token exists, set to true; else false
  };

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

  const [isUserDetails, setIsUserDetails] = useState<any>();

  const checkIfBasicDetailsFilled = async () => {
    //get the user id
    const userId = await AsyncStorage.getItem("userId");

    //get the token
    const token = await AsyncStorage.getItem("authToken");

    if (!userId || !token) {
      setIsUserDetails(false);
      // navigation.dispatch(StackActions.replace("login"));
      return;
    }
    //verify the token
    getTokenAndCheckExpiry(token, navigation);

    //invoke api.get_user_details

    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.get(`${API.GET_USER_DETAILS}`);

      if (res.status === 200) {
        console.log(
          "got user details from server {root navigation screen} ",
          res.data
        );
        setIsUserDetails(true);
      } else {
        console.log("No data found", res.data);
        setIsUserDetails(false);
        setIsAuthenticated(false);
        // AsyncStorage.clear();
        // navigation.dispatch(StackActions.replace("login"));
      }
    } catch (err) {
      setIsUserDetails(false);
      setIsAuthenticated(false);
      // AsyncStorage.clear();
      // navigation.dispatch(StackActions.replace("login"));
      console.log("error in root navigation when fetching user details", err);
    }
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Inside root navigation...");
    const initialize = async () => {
      await checkAuthStatus();
      await checkIfBasicDetailsFilled();
      setLoading(false);

      console.log(
        "auth state ",
        isAuthenticated,
        " basic detail state ",
        isUserDetails
      );
    };
    initialize();
  }, []);

  // if (loading) {
  //   return (
  //     <View style={styles.loaderContainer}>
  //       <ActivityIndicator size="large" color="#007bff" />
  //       <Text style={styles.loaderText}>Loading, please wait...</Text>
  //     </View>
  //   ); // Replace with your actual loader or splash screen
  // }

  {
    /*check if the userDetails are collected or not
          =>yes :{any screen} , 
          =>no : {basicDetFillup} */
  }

  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <>
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
          <Stack.Screen
            name="UpdateMedicationDetails"
            component={UpdateMedicationDetails}
            options={{
              headerShown: true,
              title: "Update Medication Details",
            }}
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

          <Stack.Screen
            name="basicDetailFillUp"
            component={BasicDetailsFillup}
            options={{ headerShown: false }}
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

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
});

/**
 * 
 * 
 * 
original 2nd code:

 */

// import { StyleSheet, View } from "react-native";
// import React, { useEffect, useState } from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import LoginScreen from "../screens/Auth/LoginScreen";
// import RegistrationScreen from "../screens/Auth/RegistrationScreen";
// import BottomTabNavigation from "./BottomTabNavigation";
// import BasicDetailsFillup from "../screens/BasicDetailsFillup";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import UploadDocumentsScreen from "../screens/ProfileScreen/UploadDocumentsScreen";
// import AdditionalInfo from "../screens/ProfileScreen/AdditionalInfo/AdditionalInfo";
// import ReviewAndSubmit from "../screens/ProfileScreen/ReviewAndSubmit/ReviewAndSubmit";
// import { useUser } from "../../src/UserContext";
// import UpdateMedicationDetails from "../screens/UpdateHealth/components/UpdateMedicationDetails";
// import DailyMedication from "../screens/HomeScreen/DailyMedication/DailyMedication";
// import HealthReport from "../screens/HomeScreen/HealthReport/HealthReport";
// import Medications from "../screens/HomeScreen/Medications/Medications";
// import { API, getToken, getTokenAndCheckExpiry } from "../apiConfig";
// import axios from "axios";
// import { ActivityIndicator } from "react-native-paper";
// import { useNavigation } from "@react-navigation/native";

// export type stackScreens = {
//   TabNavigation: undefined;
//   Register: undefined;
//   login: undefined;
//   basicDetailFillUp: undefined;
//   UploadDocuments: undefined;
//   HomeScreen: undefined; // Include this if you want to navigate to it directly
//   updateHealth: undefined;
//   Profile: undefined;
//   AdditionalInfo: undefined;
//   ReviewAndSubmit: undefined;
//   UpdateMedicationDetails: undefined;
//   DailyMedication: undefined;
//   HealthReport: undefined;
//   Medications: undefined;
// };

// const Stack = createNativeStackNavigator<stackScreens>();

// const RootNavigation = () => {
//   const navigation = useNavigation<any>();
//   // const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
//   const {
//     isAuthenticated,
//     setIsAuthenticated,
//     isPlanActivated,
//     setIsPlanActivated,
//   } = useUser();
//   // const [initialRoute, setInitialRoute] = useState("login");

//   useEffect(() => {
//     console.log("Inside root navigation...");

//     const checkAuthStatus = async () => {
//       const token = await AsyncStorage.getItem("authToken");
//       setIsAuthenticated(!!token); // If token exists, set to true; else false
//     };

//     console.log("status : ", isAuthenticated);
//     checkAuthStatus();
//   }, [isAuthenticated]);

//   // const [userExisting, setUserExisting] = useState<boolean>(false);

//   // useEffect(() => {
//   //   const ifSavedDataPresent = async () => {
//   //     const userId = await AsyncStorage.getItem("userId");
//   //     try {
//   //       const response = await axios.get(`${API.GET_SAVED_DATA}/${userId}`);
//   //       if (response.status === 200 && response.data) {
//   //         console.log("Person exists");
//   //         setUserExisting(true); // Data already exists, so no need for BasicDetailFillup screen
//   //       }
//   //     } catch (error) {
//   //       console.error("Error checking SavedData:", error);
//   //     }
//   //   };

//   //   if (isAuthenticated) {
//   //     ifSavedDataPresent();
//   //   }
//   // }, [isAuthenticated]);

//   const [isUserDetails, setIsUserDetails] = useState<any>();

//   const checkIfBasicDetailsFilled = async () => {
//     //get the user id
//     const userId = await AsyncStorage.getItem("userId");

//     //get the token
//     const token = await AsyncStorage.getItem("authToken");

//     //verify the token
//     getTokenAndCheckExpiry(token, navigation);

//     //invoke api.get_user_details

//     try {
//       const res = await axios.get(`${API.GET_USER_DETAILS}/${userId}`);

//       if (res.status === 200) {
//         console.log(
//           "got user details from server {root navigation screen} ",
//           res.data
//         );
//         setIsUserDetails(true);
//       } else {
//         console.log("No data found", res.data);
//         setIsUserDetails(false);
//       }
//     } catch (err) {
//       setIsUserDetails(false);
//       console.error("error in root navigation when fetching user details", err);
//     }
//   };

//   useEffect(() => {
//     checkIfBasicDetailsFilled();
//   }, []);

//   return (
//     <Stack.Navigator
//       initialRouteName={ isAuthenticated && isUserDetails ? "TabNavigation" : "login"} // Start based on auth status
//     >
//       {isAuthenticated ? (
//         <>
//           {/* Authenticated users' screens */}
//           <Stack.Screen
//             name="TabNavigation"
//             component={BottomTabNavigation}
//             options={{ headerShown: false }}
//           />

//           <Stack.Screen
//             name="basicDetailFillUp"
//             component={BasicDetailsFillup}
//             options={{ headerShown: false }}
//           />

//           <Stack.Screen
//             name="UploadDocuments"
//             component={UploadDocumentsScreen}
//             options={{ headerShown: true }}
//           />
//           <Stack.Screen
//             name="AdditionalInfo"
//             component={AdditionalInfo}
//             options={{ headerShown: true }}
//           />
//           <Stack.Screen
//             name="ReviewAndSubmit"
//             component={ReviewAndSubmit}
//             options={{ headerShown: true }}
//           />
//           <Stack.Screen
//             name="UpdateMedicationDetails"
//             component={UpdateMedicationDetails}
//             options={{ headerShown: true, title: "Update Medication Details" }}
//           />
//           <Stack.Screen
//             name="DailyMedication"
//             component={DailyMedication}
//             options={{ headerShown: true, title: "Daily Medication" }}
//           />
//           <Stack.Screen
//             name="HealthReport"
//             component={HealthReport}
//             options={{ headerShown: true, title: "Health Report" }}
//           />
//           <Stack.Screen
//             name="Medications"
//             component={Medications}
//             options={{ headerShown: true, title: "Medications" }}
//           />
//         </>
//       ) : (
//         <>
//           {/* Non-authenticated users' screens */}
//           <Stack.Screen
//             name="login"
//             component={LoginScreen}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="Register"
//             component={RegistrationScreen}
//             options={{ headerShown: false }}
//           />
//         </>
//       )}
//     </Stack.Navigator>
//   );
// };

// export default RootNavigation;

// const styles = StyleSheet.create({});

/****
 *
 *
 *
 *
 *
 *
 *
 */

// import { StyleSheet, View } from "react-native";
// import React, { useEffect, useState } from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import LoginScreen from "../screens/Auth/LoginScreen";
// import RegistrationScreen from "../screens/Auth/RegistrationScreen";
// import BottomTabNavigation from "./BottomTabNavigation";
// import BasicDetailsFillup from "../screens/BasicDetailsFillup";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import UploadDocumentsScreen from "../screens/ProfileScreen/UploadDocumentsScreen";
// import AdditionalInfo from "../screens/ProfileScreen/AdditionalInfo/AdditionalInfo";
// import ReviewAndSubmit from "../screens/ProfileScreen/ReviewAndSubmit/ReviewAndSubmit";
// import { useUser } from "../../src/UserContext";
// import UpdateMedicationDetails from "../screens/UpdateHealth/components/UpdateMedicationDetails";
// import DailyMedication from "../screens/HomeScreen/DailyMedication/DailyMedication";
// import HealthReport from "../screens/HomeScreen/HealthReport/HealthReport";
// import Medications from "../screens/HomeScreen/Medications/Medications";
// import { API, getToken, getTokenAndCheckExpiry } from "../apiConfig";
// import axios from "axios";
// import { ActivityIndicator } from "react-native-paper";
// import { useNavigation } from "@react-navigation/native";

// export type stackScreens = {
//   TabNavigation: undefined;
//   Register: undefined;
//   login: undefined;
//   basicDetailFillUp: undefined;
//   UploadDocuments: undefined;
//   HomeScreen: undefined; // Include this if you want to navigate to it directly
//   updateHealth: undefined;
//   Profile: undefined;
//   AdditionalInfo: undefined;
//   ReviewAndSubmit: undefined;
//   UpdateMedicationDetails: undefined;
//   DailyMedication: undefined;
//   HealthReport: undefined;
//   Medications: undefined;
// };

// const Stack = createNativeStackNavigator<stackScreens>();

// const RootNavigation = () => {
//   const { navigation } = useNavigation<any>(); //new line
//   // const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
//   const {
//     isAuthenticated,
//     setIsAuthenticated,
//     isPlanActivated,
//     setIsPlanActivated,
//   } = useUser();
//   const [initialRoute, setInitialRoute] = useState<
//     keyof stackScreens | undefined
//   >();

//   useEffect(() => {
//     console.log("Inside root navigation...");

//     const checkAuthStatus = async () => {
//       const token = await AsyncStorage.getItem("authToken");
//       setIsAuthenticated(!!token); // If token exists, set to true; else false

//       // now we want to determine what is the initial route
//       //if a user doesnt fills basic details, and exits
//       //when that user opens app again, he should be presented with login sccreen again , instead of tab Navigation screens

//       if (token) {
//         const rslt = await getTokenAndCheckExpiry(token, navigation);
//         if (!rslt) {
//           //if false returned in above call,means expired token

//           await AsyncStorage.clear();
//           setInitialRoute("login");
//           console.log("initial route is login");
//         }

//         try {
//           console.log("getting the user id from Roto navigation");
//           const userId = await AsyncStorage.getItem("userId");
//           console.log(" user id from Roto navigation", userId);

//           console.log(
//             "invoking api call to fetch userDetials from root navigation"
//           );
//           const response = await fetch(`${API.GET_USER_DETAILS}/${userId}`, {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           });
//           console.log("api call fetching finsihed in root navigation");
//           if (response.ok) {
//             console.log("response ok  ! (root navigation)");
//             // const userDetails = await response.json();
//             // console.log("resposne .json got");
//             console.log("userDet (root navigation)", response);
//             // if (userDetails) {
//             console.log("user details present (root navigation)");
//             // setUserDetails(userDetails);
//             // setIsAuthenticated(true);
//             setInitialRoute("TabNavigation");
//             console.log("initial route is tab navigation");
//             // }
//             setIsAuthenticated(false);
//             //  else {
//             //   throw new Error("User details not found.");
//             // }
//           } else {
//             // setIsAuthenticated(false);

//             console.log("user details not there ,initial route is login");
//             await AsyncStorage.clear();
//             setInitialRoute("login");
//           }
//         } catch (err: any) {
//           console.log("initial route is login");
//           await AsyncStorage.clear();
//           setInitialRoute("login");
//           setIsAuthenticated(false);
//           console.error("Error checking authentication status:", err);
//         }
//       }
//     };

//     //ok now

//     console.log("status : ", isAuthenticated);
//     checkAuthStatus();
//     console.log("initial route name : ", initialRoute);
//   }, []);
//   console.log("initial route name : ", initialRoute);
//   if (!initialRoute) {
//     console.log("spinning from root navigation on!");
//     // Show a loading spinner while determining the initial route
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <Stack.Navigator
//       initialRouteName={initialRoute} // Start based on auth status
//     >
//       {isAuthenticated ? (
//         <>
//           {/* Authenticated users' screens */}
//           <Stack.Screen
//             name="TabNavigation"
//             component={BottomTabNavigation}
//             options={{ headerShown: false }}
//           />

//           <Stack.Screen
//             name="basicDetailFillUp"
//             component={BasicDetailsFillup}
//             options={{ headerShown: false }}
//           />

//           <Stack.Screen
//             name="UploadDocuments"
//             component={UploadDocumentsScreen}
//             options={{ headerShown: true }}
//           />
//           <Stack.Screen
//             name="AdditionalInfo"
//             component={AdditionalInfo}
//             options={{ headerShown: true }}
//           />
//           <Stack.Screen
//             name="ReviewAndSubmit"
//             component={ReviewAndSubmit}
//             options={{ headerShown: true }}
//           />
//           <Stack.Screen
//             name="UpdateMedicationDetails"
//             component={UpdateMedicationDetails}
//             options={{ headerShown: true, title: "Update Medication Details" }}
//           />
//           <Stack.Screen
//             name="DailyMedication"
//             component={DailyMedication}
//             options={{ headerShown: true, title: "Daily Medication" }}
//           />
//           <Stack.Screen
//             name="HealthReport"
//             component={HealthReport}
//             options={{ headerShown: true, title: "Health Report" }}
//           />
//           <Stack.Screen
//             name="Medications"
//             component={Medications}
//             options={{ headerShown: true, title: "Medications" }}
//           />
//         </>
//       ) : (
//         <>
//           {/* Non-authenticated users' screens */}
//           <Stack.Screen
//             name="login"
//             component={LoginScreen}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="Register"
//             component={RegistrationScreen}
//             options={{ headerShown: false }}
//           />
//         </>
//       )}
//     </Stack.Navigator>
//   );
// };

// export default RootNavigation;

// const styles = StyleSheet.create({});
