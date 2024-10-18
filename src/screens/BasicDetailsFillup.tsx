import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import InputField from "../components/InputField";
import { Picker } from "@react-native-picker/picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { stackScreens } from "../Navigation/RootNavigation";
import { useUser } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

type propsType = NativeStackScreenProps<stackScreens, "basicDetailFillUp">;

const BasicDetailsFillup = (props: propsType) => {
  const { navigation } = props;
  const { userDetails, setUserDetails } = useUser();
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Handlers for updating userDetails context
  const handleNameChange = (newName: string) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      name: newName,
    }));
  };

  const handleDateOfBirthChange = (newDOB: string) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      dateOfBirth: newDOB,
    }));
  };

  const handleAgeChange = (newAge: string) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      age: newAge,
    }));
  };

  const handleGenderChange = (newGender: string) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      gender: newGender,
    }));
  };

  const storeUserData = async () => {
    try {
      // Store userDetails in AsyncStorage as a JSON string

      await AsyncStorage.setItem("userDetails", JSON.stringify(userDetails));
      const storedUserDetails = await AsyncStorage.getItem("userDetails");
      console.log(
        "userDetails :: ",
        storedUserDetails ? JSON.parse(storedUserDetails) : null
      );
    } catch (error) {
      console.error("Error storing user data:", error);
    }
  };

  const ContinueUpHandler = () => {
    const { name, dateOfBirth, age, gender } = userDetails;
    if (!name || !dateOfBirth || !age || !gender) {
      setErrorMessage("Please fill out all fields");
      return;
    }
    storeUserData();
    // Navigate to TabNavigation
    navigation.replace("TabNavigation");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fill Up Details</Text>

      <InputField
        placeholder="Full Name"
        value={userDetails.name || ""}
        onChangeText={handleNameChange}
        placeholderTextColor="black"
        textColor="black"
      />

      <InputField
        placeholder="Date of Birth (YYYY-MM-DD)"
        value={userDetails.dateOfBirth || ""}
        onChangeText={handleDateOfBirthChange}
        placeholderTextColor="black"
        textColor="black"
      />

      <InputField
        placeholder="Age"
        value={userDetails.age || ""}
        onChangeText={handleAgeChange}
        placeholderTextColor="black"
        textColor="black"
      />

      {/* Gender Input */}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Gender</Text>
        <Picker
          selectedValue={userDetails.gender || ""}
          onValueChange={handleGenderChange}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Other" value="other" />
        </Picker>
      </View>

      {errorMessage ? (
        <Text style={{ color: "red" }}>{errorMessage}</Text>
      ) : null}

      {/* TouchableOpacity to trigger ContinueUpHandler */}
      <TouchableOpacity onPress={ContinueUpHandler} style={styles.button}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasicDetailsFillup;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 30,
  },
  label: {
    fontSize: 16,
    marginBottom: 1,
  },
  pickerContainer: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007BFF", // Customize the button color
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF", // Text color
    fontSize: 16,
    fontWeight: "bold",
  },
});
