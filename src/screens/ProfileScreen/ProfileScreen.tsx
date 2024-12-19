import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, NavigationProp } from "@react-navigation/native"; // Import useNavigation hook
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { stackScreens } from "../../Navigation/RootNavigation"; // Ensure this path is correct
import GetStartedContainer from "./GetStartedContainer";
import ActionItemsContainer from "./ActionItemsContainer";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useUser } from "../../UserContext";
import ActiveHealthPlan from "./comp/ActiveHealthPlan";
import { API, getToken, getTokenAndCheckExpiry } from "../../apiConfig";
import axios from "axios";

// import { stackScreens } from "../../Navigation/BottomTabNavigation"; // Make sure this path is correct

//Main page

// This is the Profile screen
/** 
In the profile screen ,there are 3 container
1.Top container
2.Bottom Main container:
    -Get started container
    -ActionItems container
*/
type ProfileScreenProps = NativeStackScreenProps<stackScreens, "Profile">;
// Define the prop type for ProfileScreen

const ProfileScreen = (props: ProfileScreenProps) => {
  const {
    // userDetails,
    setIsAuthenticated,
    isPlanActivated,
    setIsPlanActivated,
    setIsFollowUpDateReached,
  } = useUser();

  // console.log("username : ", userDetails.name);
  const { navigation } = props;

  const handleSignOut = async () => {
    await AsyncStorage.clear();
    // await AsyncStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setIsPlanActivated(false);
    // await AsyncStorage.setItem("planActivated", "false");
    navigation.reset({
      index: 0,
      routes: [{ name: "Register" }], // Navigate back to login screen in stack navigation
    });
  };

  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const getUserName = async () => {
      const delay = (ms: any) =>
        new Promise((resolve) => setTimeout(resolve, ms));
      await delay(1000);
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (!userId) {
          console.error("User ID not found in AsyncStorage");
          return;
        }

        const token = await getToken();
        if (!token) {
          console.log("profile 1 ,no token -");
          return;
        }

        getTokenAndCheckExpiry(token, navigation);
        // Set the Authorization header globally
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        console.log(
          "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ get user details called(profile screen) $$$$$$$$$$"
        );
        const response = await axios.get(`${API.GET_USER_DETAILS}`);
        if (response.status === 200) {
          let userDetails = response.data;
          console.log(
            "user details fetched from backend (loding profile page)",
            userDetails
          );
          setName(userDetails?.name);
          await AsyncStorage.setItem(
            "userDetails",
            JSON.stringify(userDetails)
          );
        } else {
          navigation.navigate("login");
          console.error("Unexpected response status:", response.status);
        }
      } catch (error) {
        navigation.navigate("login");
        console.error(
          "Eror occcured in loading data from async storage or use deatails api call"
        );
      }

      console.log(
        "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ get user details finsihed calling (profile screen) $$$$$$$$$$"
      );
    };
    getUserName();
  }, [isPlanActivated]);

  // const [userId, setUserId] = useState("John David");

  //const [step, setStep] = useState(0); //for updating the step taken, [ie.., upload doc, more info ,submit]
  useEffect(() => {
    // Define the async function inside the useEffect
    const checkPlanActivation = async () => {
      try {
        // let value = (await AsyncStorage.getItem("SavedData")) as any;

        //get the unique userId[username] entered during login/signup...
        const token = await getToken();
        if (!token) {
          console.log("profile no token -");
          return;
        }
        // Set the Authorization header globally
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const userId = await AsyncStorage.getItem("userId");

        const response = await axios.get(`${API.GET_SAVED_DATA}`);
        if (response.status === 200) {
          console.log(`the plan for ${userId} is activated already`);
          setIsPlanActivated(true);
          await AsyncStorage.setItem("planActivated", "true");
          // console.log(
          //   "follow up ",
          //   response?.data?.discharge_details?.follow_up_date
          // );
          // await AsyncStorage.setItem(
          //   "followUp",
          //   response?.data?.discharge_details?.follow_up_date
          // );
          // setIsFollowUpDateReached(null);
          // console.log("resplo ", response.data.userDetails.name);
          // const firstName = response?.userDetails?.name?.split(" ")[0]; // Extract the first name
          // setName(response.data.userDetails.name.split(" ")[0]);
        } else {
          console.log(`the plan for ${userId} is not activated `);
          await AsyncStorage.setItem("planActivated", "false");
          setIsPlanActivated(false);
        }

        // if (value) {
        //   value = JSON.parse(value) as any;
        //   console.log("v ", value?.userDetails);
        //   console.log("there is a value");
        //   setIsPlanActivated(true);
        // } else {
        //   setIsPlanActivated(false);
        // }
      } catch (error) {
        console.error("Error checking SavedData in AsyncStorage:", error);
      }
    };

    checkPlanActivation(); // Call the async function
    console.log("value :", isPlanActivated);
    console.log("value of name :", name);
  }, [isPlanActivated]);
  console.log("value of name :", name);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/ProfileIcons/backGroundImage.png")} // Change to your background image path
        style={styles.backgroundImage}
      >
        <View style={styles.topContainer}>
          <View style={styles.topLogoContainer}>
            <Text style={styles.title}>Virtual Care</Text>

            <TouchableOpacity onPress={handleSignOut}>
              <Image
                style={styles.logoutIcon}
                source={require("../../../assets/Logout Rounded.png")}
              ></Image>
            </TouchableOpacity>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.JohnTitle}> {name && ` Hi ${name},`}</Text>
            <Text style={styles.textStyle}>
              {"\n"}Welcome to Virtual Care App.{"\n"}
              {!isPlanActivated
                ? `Update your medical docs and generate a health plan`
                : "Your health plan is now active! Have a great day.."}
            </Text>
          </View>
        </View>
      </ImageBackground>
      {/* Bottom Main Container */}
      <View style={styles.bottomMainContainer}>
        {/* Icon Container */}
        {isPlanActivated ? (
          <>
            <ActiveHealthPlan />
          </>
        ) : (
          <>
            <GetStartedContainer />
            <ActionItemsContainer navigation={navigation} route={props.route} />
          </>
        )}
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
    backgroundColor: "#ffffff",
  },
  topLogoContainer: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 20,
    justifyContent: "space-between", // Space between text and icon
    alignItems: "center",
    height: "20%",
  },
  logoutIcon: {
    height: 35,
    width: 40,
    marginTop: 10,
  },
  title: {
    fontSize: 24, // Adjust font size as needed
    fontWeight: "bold", // Make it bold
    color: "white",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  topContainer: {
    flex: 1,
    width: "100%",
    height: "40%",
    // backgroundColor: "#B2B2B2",
  },
  textContainer: {
    height: "80%",
  },
  textStyle: {
    color: "white",
    paddingLeft: 10,
    paddingRight: 20,
    top: "60%",
    height: "40%",
  },
  JohnTitle: {
    top: "68%",
    fontSize: 24, // Adjust font size as needed
    fontWeight: "bold", // Make it bold
    color: "white",
  },
  bottomMainContainer: {
    // borderWidth: 2,
    // borderColor: "red",
    height: "60%",
  },
  line: {
    width: "92%",
    height: 2,
    marginTop: "3%",
    textAlign: "center",
    alignSelf: "center",
    backgroundColor: "#ccc",
  },
});
