// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import HomeScreen from "../screens/HomeScreen/HomeScreen";
// import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
// import UpdateHealth from "../screens/UpdateHealth/UpdateHealth";
// import { ActivityIndicator, Image, View } from "react-native";
// import { useEffect, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import { API, getToken } from "../apiConfig";

// export type stackScreens = {
//   HomeScreen: undefined;
//   updateHealth: undefined;
//   Profile: undefined;
// };

// const Tab = createBottomTabNavigator<stackScreens>();

// export default function BottomTabNavigation() {
//   const [isHomeScreen, setIsHomeScreen] = useState<boolean | null>(null);

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkPlanActivation = async () => {
//       try {
//         //delay sometime,  so that the userId gets assigned to correct value.instead of null

//         const delay = (ms: any) =>
//           new Promise((resolve) => setTimeout(resolve, ms)); // Function to delay for ms milliseconds
//         await delay(1000);

//         const userId = await AsyncStorage.getItem("userId");

//         if (!userId) {
//           console.warn("No userId found in AsyncStorage.");
//           // setIsHomeScreen(false); // Default state if userId is not found
//           // setLoading(false); // Set loading to false

//           return;
//         }

//         const token = await getToken();
//         if (!token) {
//           console.log("no token -bottom tab navgn");
//           return;
//         }
//         // Set the Authorization header globally
//         axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

//         console.log("checking user plan exists or not (from bottom tab)");
//         const response = await axios.get(`${API.GET_SAVED_DATA}/${userId}`);
//         if (response.status === 200) {
//           setIsHomeScreen(true);
//           await AsyncStorage.setItem("planActivated", "true");
//         } else {
//           setIsHomeScreen(false);
//           await AsyncStorage.setItem("planActivated", "false");
//         }
//       } catch (error) {
//         console.error("Error in checkPlanActivation:", error);
//         setIsHomeScreen(false); // Fail-safe default
//       } finally {
//         setLoading(false); // Ensure loading is set to false after async operation
//       }
//     };

//     checkPlanActivation();
//   }, []);

//   useEffect(() => {
//     const getUserName = async () => {
//       try {
//         const userId = await AsyncStorage.getItem("userId");
//         if (!userId) {
//           console.error("User ID not found in AsyncStorage");
//           return;
//         }

//         const token = await getToken();
//         if (!token) {
//           console.log("profile 1 ,no token -");
//           return;
//         }
//         // Set the Authorization header globally
//         axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

//         const response = await axios.get(`${API.GET_USER_DETAILS}/${userId}`);
//         if (response.status === 200) {
//           let userDetails = response.data;
//           console.log(
//             "user details fetched from backend (loding profile page)",
//             userDetails
//           );
//           // setLoading(false);
//           // await AsyncStorage.setItem(
//           //   "userDetails",
//           //   JSON.stringify(userDetails)
//           // );
//         } else {
//           return;
//           console.error("Unexpected response status:", response.status);
//         }
//       } catch (error) {
//         return;
//         console.error(
//           "Eror occcured in loading data from async storage or use deatails api call"
//         );
//       }
//     };
//     getUserName();
//   }, []);

//   console.log("status of is home screen ", isHomeScreen);

//   if (loading) {
//     // Show a loading indicator while checking the plan status
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <Tab.Navigator initialRouteName={!isHomeScreen ? "Profile" : "HomeScreen"}>
//       <Tab.Screen
//         name="HomeScreen"
//         component={HomeScreen}
//         options={{
//           headerShown: false,
//           tabBarIcon: ({ color, size }) => (
//             <Image
//               style={[
//                 styles.icon,
//                 { tintColor: color, width: size, height: size },
//               ]}
//               source={require("../../assets/tabs/Home.png")}
//             ></Image> // Home icon
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="updateHealth"
//         component={UpdateHealth}
//         options={{
//           headerShown: false,
//           tabBarIcon: ({ color, size }) => (
//             <Image
//               style={[
//                 styles.icon,
//                 { tintColor: color, width: size, height: size },
//               ]}
//               source={require("../../assets/tabs/Plus.png")}
//             ></Image> // Home icon
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{
//           headerShown: false,
//           tabBarIcon: ({ color, size }) => (
//             <Image
//               style={[
//                 styles.icon,
//                 { tintColor: color, width: size, height: size },
//               ]}
//               source={require("../../assets/tabs/profile.png")}
//             ></Image> // Home icon
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

// export const styles = {
//   icon: {
//     // resizeMode: "contain", // Ensures the image is scaled to fit the tab icon area
//   },
// };

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import UpdateHealth from "../screens/UpdateHealth/UpdateHealth";
import { ActivityIndicator, Image, View, Text } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API, getToken, getTokenAndCheckExpiry } from "../apiConfig";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import { useUser } from "../UserContext";

export type stackScreens = {
  HomeScreen: undefined;
  updateHealth: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<stackScreens>();

export default function BottomTabNavigation() {
  const [isHomeScreen, setIsHomeScreen] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [userDetailsFetched, setUserDetailsFetched] = useState(false); // Track if user details are fetched
  const navigation = useNavigation<any>(); // Hook to access navigation
  const { isAuthenticated, setIsAuthenticated, setIsPlanActivated } = useUser();

  useEffect(() => {
    const checkPlanActivation = async () => {
      try {
        const delay = (ms: any) =>
          new Promise((resolve) => setTimeout(resolve, ms));
        await delay(1000);

        const userId = await AsyncStorage.getItem("userId");

        if (!userId) {
          console.warn("No userId found in AsyncStorage.");
          setLoading(false);
          return;
        }

        const token = await getToken();
        if (!token) {
          console.log("No token found");
          setLoading(false);
          return;
        }
        getTokenAndCheckExpiry(token, navigation);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        console.log("Checking if user plan exists (from bottom tab)");
        const response = await axios.get(`${API.GET_SAVED_DATA}`);
        if (response.status === 200) {
          setIsHomeScreen(true);
          await AsyncStorage.setItem("planActivated", "true");
        } else {
          setIsHomeScreen(false);
          await AsyncStorage.setItem("planActivated", "false");
        }
      } catch (error: any) {
        if (error?.response?.status === 403) {
          if (error?.response?.data?.message === "Invalid or Expired Token") {
            // setIsAuthenticated(false);
            // alert("Your session has expired. Please log in again.");
            // // await AsyncStorage.clear(); // Clear the token
            // // Redirect to login page
            // // handleSignOut();
            // // navigation.navigate("login");
            // return null;
          }
        }
        console.log("Error in checkPlanActivation:", error);
        setIsHomeScreen(false);
      } finally {
        setLoading(false);
      }
    };

    checkPlanActivation();
  }, []);

  // useEffect(()=>{

  // const checkUserdetails = async()=>{

  //   try{
  //     const userId = await AsyncStorage.getItem("userId");

  //     if (!userId) {
  //       console.warn("No userId found in AsyncStorage.");
  //       setLoading(false);
  //       return;
  //     }

  //     const token = await getToken();
  //     if (!token) {
  //       console.log("No token found");
  //       setLoading(false);
  //       return;
  //     }
  //     getTokenAndCheckExpiry(token);
  //     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //         // await delay(1000);
  //         console.log("userID", userId);
  //         const userDetailsResponse = await axios.get(
  //           `${API.GET_USER_DETAILS}/${userId}`
  //         );
  //         if (userDetailsResponse.status === 200) {
  //           setUserDetailsFetched(true);
  //         } else {
  //           console.error("Failed to fetch user details");
  //           setUserDetailsFetched(false);
  //         }
  //       } catch (error: any) {
  //         if (error?.response?.status === 403) {
  //           if (error?.response?.data?.message === "Invalid or Expired Token") {
  //             // setIsAuthenticated(false);
  //             // alert("Your session has expired. Please log in again.");
  //             // // await AsyncStorage.clear(); // Clear the token
  //             // // Redirect to login page
  //             // // handleSignOut();
  //             // // navigation.navigate("login");
  //             // return null;
  //           }
  //         }
  //         console.log("Error in checkPlanActivation:", error);
  //         setIsHomeScreen(false);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     checkUserdetails();
  //   }, []);

  // if (loading) {

  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }
  /** 
  // If user details are not available, navigate to the "BasicDetailsFillupScreen"
  if (!userDetailsFetched) {

    //if the userdetails are not filled due to expired token , then go to login page itself
    if(tokenExpired())


    navigation.navigate("basicDetailFillUp"); // Navigate to Basic Details Fillup Screen
    return null; // Return null to prevent rendering anything further
  }
**/

  return (
    <Tab.Navigator initialRouteName={"Profile"}>
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
            />
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
            />
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
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export const styles = {
  icon: {
    // resizeMode: "contain",
  },
};
