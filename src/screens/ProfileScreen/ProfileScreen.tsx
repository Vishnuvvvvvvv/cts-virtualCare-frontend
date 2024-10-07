import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, NavigationProp } from "@react-navigation/native"; // Import useNavigation hook
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { stackScreens } from "../../Navigation/BottomTabNavigation"; // Ensure this path is correct

type ProfileScreenProps = NativeStackScreenProps<stackScreens, "Profile">;

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const navigation = useNavigation<NavigationProp<stackScreens>>(); // Use the useNavigation hook

  const handleSignOut = async () => {
    await AsyncStorage.removeItem("authToken");
    navigation.reset({
      index: 0,
      routes: [{ name: "Register" as keyof stackScreens }], // Navigate back to login screen in stack navigation
    });
  };

  return (
    <View style={styles.container}>
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
          <Text style={styles.JohnTitle}> Hi John,</Text>
          <Text style={styles.textStyle}>
            Welcome to Virtual Care App.{"\n"}
            Update your medical docs and generate a health plan
          </Text>
        </View>
      </View>

      <View></View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
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
  topContainer: {
    width: "100%",
    height: "40%",
    backgroundColor: "#B2B2B2",
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
});
