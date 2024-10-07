import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import InputField from "../components/InputField";
import { Picker } from "@react-native-picker/picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { stackScreens } from "../Navigation/RootNavigation";

type propsType = NativeStackScreenProps<stackScreens, "basicDetailFillUp">;

const BasicDetailsFillup = (props: propsType) => {
  const { navigation } = props;

  const [fullName, setFullName] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const ContinueUpHandler = () => {
    // You can add validation logic here
    if (!fullName || !dateOfBirth || !age || !gender) {
      setErrorMessage("Please fill out all fields");
      return;
    }

    // Navigate to TabNavigation
    navigation.replace("TabNavigation");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fill Up Details</Text>

      <InputField
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
        placeholderTextColor="black"
        textColor="black"
      />

      <InputField
        placeholder="Date of Birth (YYYY-MM-DD)"
        value={dateOfBirth}
        onChangeText={setDateOfBirth}
        placeholderTextColor="black"
        textColor="black"
      />

      <InputField
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        placeholderTextColor="black"
        textColor="black"
      />

      {/* Gender Input */}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Gender</Text>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
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
