import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
} from "react-native";
const { width, height } = Dimensions.get("screen");
import React, { useState } from "react";
import { stackScreens } from "../../Navigation/RootNavigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import HorizontalLine from "../../components/HorizontalLine";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import AsyncStorage from "@react-native-async-storage/async-storage";
//login screen

type propsType = NativeStackScreenProps<stackScreens, "login">;

const LoginScreen = (props: propsType) => {
  const { navigation } = props;

  //username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const LoginHandler = async () => {
    console.log("login clciked", username, ": ", password);

    if (!username || !password) {
      setErrorMessage("Please fill out all fields");
      return;
    }

    {
      /*dummy user credentials : currently assume username : admin &
       pass : password for logging in*/
    }
    if (username === "admin" && password == "password") {
      navigation.replace("basicDetailFillUp");
      const token = "user_auth_token";
      await AsyncStorage.setItem("authToken", token);

      return;
    }

    //original code for verifying username and password with backend

    try {
      //provide the backend endpoint for validation here
      const response = await fetch("http://192.168.1.7:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();
      console.log("Response:", data);
      if (response.ok) {
        // Handle successful login
        // For example, navigate to the TabNavigation screen
        const token = "user_auth_token";
        await AsyncStorage.setItem("authToken", token);

        navigation.navigate("basicDetailFillUp");
      } else {
        //// Handle login error
        //  console.error("Login failed", data);
        setErrorMessage("Wrong username or password");
      }
    } catch (error) {
      // console.error("Error during login", error);
      setErrorMessage("Error during login. Please try again.");
    }
  };

  return (
    <View style={styles.MainContainer}>
      <ImageBackground
        source={require("../../../assets/AuthScreen.png")}
        style={styles.BgScreen}
      >
        <View style={styles.container}>
          <Text style={styles.headingStyle}>Login</Text>
          <Text style={styles.subLineStyle}>Glad you are back..!</Text>
          {/*login input*/}
          <InputField
            placeholder={"Enter Username"}
            value={username}
            onChangeText={setUsername}
          />

          {/**PAssword input */}
          <InputField
            placeholder={"Enter Password"}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <Text style={styles.TextStyle}>Forgot Password ?</Text>

          {/*Login button*/}
          <Button title="Login" functionHandler={LoginHandler} />
          {/* Display error message if any */}
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}

          <HorizontalLine />

          <View style={styles.iconContainer}>
            <Image source={require("../../../assets/googleIcon.png")}></Image>
            <Text style={styles.SignWithGoogle}>Log in with Google</Text>
          </View>

          {/*button for registering as a  new user, on clicking it'll take to registartion page*/}
          <Text
            style={styles.signUpStyle}
            onPress={() => {
              navigation.replace("Register");
            }}
          >
            Don't have an account? Signup
          </Text>
          {/* <View style={styles.footer}>
            <Text style={styles.termsAndCondition}>Terms & Conditions</Text>
          </View> */}
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

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
    textAlign: "right",
    marginBottom: 14,
  },
  headingStyle: {
    color: "white",
    fontSize: 40,
    marginBottom: 5,
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
  SignWithGoogle: {
    color: "white",
    paddingLeft: 10,
  },
  signUpStyle: {
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
  errorText: {
    color: "red",
    textAlign: "center",
  },
});
