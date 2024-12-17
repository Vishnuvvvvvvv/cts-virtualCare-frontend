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
import React, { useEffect, useState } from "react";
import { stackScreens } from "../../Navigation/RootNavigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import HorizontalLine from "../../components/HorizontalLine";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../../apiConfig";
import { useUser } from "../../UserContext";
import axios from "axios";
//login screenhhh

type propsType = NativeStackScreenProps<stackScreens, "login">;

const LoginScreen = (props: propsType) => {
  const { navigation } = props;
  const { setIsAuthenticated } = useUser();
  //username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const checkSavedDataExists = async (userId: string) => {
    console.log("checking ");

    try {
      const response = await axios.get(`${API.GET_USER_DETAILS}/${userId}`);

      console.log("response is generated");
      if (response.status === 200) {
        await AsyncStorage.setItem(
          "userDetails",
          JSON.stringify(response.data)
        );
        return true;
      }
      return false;
    } catch (err) {
      console.log("error in finding user details", err);
      return false;
    }
  };

  useEffect(() => {
    const fn = async () => {
      const keys = await AsyncStorage.getAllKeys();
      console.log("all keys are : ", keys);
    };
    fn();
  }, []);

  const LoginHandler = async () => {
    console.log("login clciked", username, ": ", password);

    if (!username || !password) {
      setErrorMessage("Please fill out all fields");
      setIsAuthenticated(false);
      return;
    }

    {
      /*dummy user credentials : currently assume username : admin &
       pass : password for logging in*/
    }

    // if (username && password) {
    //   setIsAuthenticated(true);

    //   const token = "user_auth_token";
    //   await AsyncStorage.setItem("authToken", token);
    //   await AsyncStorage.setItem("userId", username);

    //   navigation.replace("TabNavigation");
    //   return;
    // }

    // if (username === "admin" && password == "password") {
    //   setIsAuthenticated(true);

    //   const token = "user_auth_token";
    //   await AsyncStorage.setItem("authToken", token);
    //   await AsyncStorage.setItem("userId", username);

    //   navigation.replace("basicDetailFillUp");
    //   return;
    // }

    //original code for verifying username and password with backend

    try {
      console.log("loign route called..");
      //provide the backend endpoint for validation here
      const response = await fetch(API.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      console.log("loign route called finihd..");
      const data = await response.json();
      console.log("Response:", data);
      if (response.ok) {
        // Handle successful login
        console.log("response from login endpoint is ok!");
        setIsAuthenticated(true);
        const token = data.token;
        // console.log("recieved toekn", token);

        await AsyncStorage.setItem("authToken", token);
        // console.log(
        //   "stored authentication token ",
        //   await AsyncStorage.getItem("authToken")
        // );
        await AsyncStorage.setItem("userId", username);

        const userId = await AsyncStorage.getItem("userId");
        console.log("userId from async on login screen ", userId);

        console.log("waiting for checking whether saveddata generated or not");
        const rslt = await checkSavedDataExists(username);
        console.log("value of checking saved data in login screen", rslt);

        if (rslt) {
          console.log(
            "user details data exists in backend.so no need to showbasicDetailFillup"
          );
          navigation.navigate("TabNavigation");
        } else navigation.navigate("basicDetailFillUp");
      } else {
        //// Handle login error
        //  console.error("Login failed", data);
        setIsAuthenticated(false);
        setErrorMessage("Wrong username or password");
      }
    } catch (error) {
      // console.error("Error during login", error);
      setIsAuthenticated(false);
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
