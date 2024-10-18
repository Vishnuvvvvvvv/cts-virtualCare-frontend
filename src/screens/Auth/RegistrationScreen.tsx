import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  View,
  Image,
} from "react-native";
const { width, height } = Dimensions.get("screen");

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { stackScreens } from "../../Navigation/RootNavigation";
import Button from "../../components/Button";
import HorizontalLine from "../../components/HorizontalLine";
import InputField from "../../components/InputField";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../../apiConfig";
import { useUser } from "../../UserContext";
type propsType = NativeStackScreenProps<stackScreens, "Register">;

const RegistrationScreen = (props: propsType) => {
  const { navigation } = props;
  const { isAuthenticated, setIsAuthenticated } = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isValidEmail = (email: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const signUpHandler = async () => {
    console.log("register clciked");

    if (!username || !password || !email) {
      setErrorMessage("Please fill out all fields");
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage("Please enter a valid email");
      return;
    }
    try {
      const response = await fetch(API.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
        }),
      });

      const data = await response.json();
      console.log("Response:", data);
      if (response.ok) {
        // Handle successful login
        // For example, navigate to the HomeTabs screen
        setIsAuthenticated(true);
        const token = data.token;
        await AsyncStorage.setItem("authToken", token);

        navigation.replace("basicDetailFillUp");
      } else {
        setIsAuthenticated(false);
        // Handle reg error
        // console.error("Registration failed", data);
        setErrorMessage("Error during Signup. Please try again.");
      }
    } catch (error) {
      setIsAuthenticated(false);
      // console.error("Error during registration", error);
      setErrorMessage("Error during Signup. Please try again.");
    }
  };

  return (
    <View style={styles.MainContainer}>
      <ImageBackground
        source={require("../../../assets/AuthScreen.png")}
        style={styles.BgScreen}
      >
        <View style={styles.container}>
          <Text style={styles.headingStyle}>Sign Up</Text>
          {/* <Text style={styles.subLineStyle}>..!</Text> */}

          <InputField
            placeholder={"Enter Username"}
            value={username}
            onChangeText={setUsername}
          />

          {/** input for email */}
          <InputField
            placeholder={"Enter Email"}
            value={email}
            onChangeText={setEmail}
          />

          {/**input for password field */}
          <InputField
            placeholder={"Enter Password"}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          {/**Signup handler */}
          <Button title="Register" functionHandler={signUpHandler} />

          {/* Display error message if any */}
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}

          <HorizontalLine />

          <View style={styles.iconContainer}>
            <Image source={require("../../../assets/googleIcon.png")}></Image>
            <Text style={styles.SignWithGoogle}>Sign Up with Google</Text>
          </View>

          {/**button for Allready have an account , when clicked takes to login page */}
          <Text
            style={styles.LoginStyle}
            onPress={() => {
              navigation.navigate("login");
            }}
          >
            Already have an account? Login
          </Text>

          {/* <View style={styles.footer}>
            <Text style={styles.termsAndCondition}>copyright@2024</Text>
          </View> */}
        </View>
      </ImageBackground>
    </View>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  container: {
    // alignItems: "center",
    // justifyContent: "center", // Center items vertically too
    flex: 1, // Allow the container to take full height and width
    // width: "100%",
    // height: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: "35%",
  },
  BgScreen: {
    width: width,
    height: height - 40,
  },
  TextStyle: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 14,
  },
  headingStyle: {
    color: "white",
    fontSize: 40,
    marginBottom: 10,
    fontWeight: "bold",
  },
  subLineStyle: {
    color: "white",
    marginBottom: 40,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  LoginStyle: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
    marginTop: 25,
  },

  footer: {
    position: "absolute",
    bottom: 10, // Position near the bottom
    left: 20, // Ensure it starts from the left edge of the screen
    right: 20, // Ensure it ends at the right edge of the screen
    justifyContent: "center",
    alignItems: "center", // Center the content horizontally
    width: "100%", // Stretch to fill full width of the screen
  },
  termsAndCondition: {
    color: "white",
    fontSize: 10,
    textAlign: "center",
  },
  SignWithGoogle: {
    color: "white",
    paddingLeft: 10,
  },
  errorText: {
    paddingTop: 3,
    color: "red",
    textAlign: "center",
  },
});
