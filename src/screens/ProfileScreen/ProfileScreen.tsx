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
    userDetails,
    setIsAuthenticated,
    isPlanActivated,
    setIsPlanActivated,
  } = useUser();
  console.log("username : ", userDetails.name);
  const { navigation } = props;
  const handleSignOut = async () => {
    await AsyncStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigation.reset({
      index: 0,
      routes: [{ name: "Register" }], // Navigate back to login screen in stack navigation
    });
  };
  const [name, setName] = useState();
  //const [step, setStep] = useState(0); //for updating the step taken, [ie.., upload doc, more info ,submit]
  useEffect(() => {
    // Define the async function inside the useEffect
    const checkPlanActivation = async () => {
      try {
        let value = (await AsyncStorage.getItem("SavedData")) as any;

        if (value) {
          value = JSON.parse(value) as any;
          console.log("v ", value?.userDetails);
          console.log("there is a value");
          setIsPlanActivated(true);
          const firstName = value?.userDetails?.name?.split(" ")[0]; // Extract the first name
          setName(firstName);
        } else {
          setIsPlanActivated(false);
        }
      } catch (error) {
        console.error("Error checking SavedData in AsyncStorage:", error);
      }
    };

    checkPlanActivation(); // Call the async function
    console.log("value :", isPlanActivated);
    console.log("value of name :", name);
  }, []);
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
            <Text style={styles.JohnTitle}> {name && `Hi ${name},`}</Text>
            <Text style={styles.textStyle}>
              Welcome to Virtual Care App.{"\n"}
              Update your medical docs and generate a health plan
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
    top: "61%",
    height: "40%",
  },
  JohnTitle: {
    top: "60%",
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
