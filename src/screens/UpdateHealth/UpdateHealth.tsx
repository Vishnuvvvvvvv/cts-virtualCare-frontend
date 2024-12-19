import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import UpdateComponent from "./components/UpdateComponent";
import { LinearGradient } from "expo-linear-gradient";
import SymptomsPopup from "./components/SymptomsPopup";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { stackScreens } from "../../Navigation/RootNavigation";
// import { stackScreens as stackScreens2 }  from "../../Navigation/RootNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API, getToken, getTokenAndCheckExpiry } from "../../apiConfig";
import { useUser } from "../../UserContext";
import moment from "moment";

type propsType = NativeStackScreenProps<stackScreens, "updateHealth">;

const UpdateHealth = (props: propsType) => {
  const { navigation } = props;

  const [isModalVisible, setModalVisible] = useState(false);
  const [dayCount, setDayCount] = useState(1); // Example day count
  const [symptoms, setSymptoms] = useState("");
  const [symptomsData, setSymptomsData] = useState<
    Record<string, string | null>
  >({});

  const handleUpdateSymptoms = () => {
    setModalVisible(true);
  };

  // Function to get the current date in `dd-mm-yyyy` format
  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const fetchUserId = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem("userId");
      if (storedUserId !== null) {
        console.log("stored user id in async storage ", storedUserId);
        return storedUserId; // Update state with the userId from AsyncStorage
      }
    } catch (error) {
      console.error("Error fetching userId from AsyncStorage:", error);
    }
  };

  const handleSaveSymptoms = async () => {
    const userId = await fetchUserId();

    const currentDate = getCurrentDate(); // Get the current date
    const symptomsText = symptoms; // The symptom text entered by the user
    console.log("preparing to send ....");

    try {
      const token = await getToken();
      if (!token) {
        console.log("update heaklth : no token -");
        return;
      }
      // Set the Authorization header globally
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await axios.post(`${API.STORE_SYMPTOMS}`, {
        // Replace with actual user ID
        description: symptomsText,
        date: currentDate,
      });

      if (response.status === 200 || response.status === 201) {
        console.log("Symptoms saved successfully!");
      }
    } catch (error) {
      console.error("Error saving symptoms:", error);
    }

    // Clear the input field after saving
    setSymptoms(""); // Clear input
    setModalVisible(false);
  };

  const handleCancel = () => {
    // console.log("Updated Symptoms Data:", symptomsData);
    setModalVisible(false);
    setSymptoms("");
  };
  // other options in update health screen
  const handleUpdateMedicationDetails = () => {
    navigation.navigate("UpdateMedicationDetails");
    console.log("Update Medication Details button clicked");
  };

  const handleAddNewTestReport = () => {
    console.log("Add New Test Report button clicked");
  };
  const {
    // userDetails,
    // setIsAuthenticated,
    isPlanActivated,
    setIsPlanActivated,
    isFollowUpDateReached,
    setIsFollowUpDateReached,
  } = useUser();

  const parseDate = (dateString: any) => {
    return moment(dateString, [
      "YYYY-MM-DD",
      "D MMM YYYY",
      "DD-MM-YYYY",
      "DD/MM/YYYY",
      "D MMMM YYYY",
    ]).toDate();
  };
  const truncateTime = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const checkFollowUpDate = async () => {
    try {
      const today = parseDate(new Date().toLocaleString("en-IN").split(",")[0]); // Truncate today's date to remove time

      const today1 = new Date(today);

      const token = await getToken();
      const userId = await AsyncStorage.getItem("userId");

      if (!token || !userId) {
        return;
      }

      getTokenAndCheckExpiry(token, navigation);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await axios.get(`${API.GET_SAVED_DATA}`);

      if (
        response.status === 200 &&
        response?.data?.discharge_details?.follow_up_date
      ) {
        // Parse API date and truncate time
        const fetchedFollowUpDate = parseDate(
          response?.data?.discharge_details?.follow_up_date
        );

        const fetchedFollowUpDate1 = new Date(fetchedFollowUpDate);

        // Compare Date objects
        if (today1.getTime() >= fetchedFollowUpDate1.getTime()) {
          setIsFollowUpDateReached(true);
        } else {
          setIsFollowUpDateReached(false);
        }
      }
    } catch (error) {
      setIsFollowUpDateReached(false);
    }
  };

  useEffect(() => {
    checkFollowUpDate();
  }, [isFollowUpDateReached]);

  useEffect(() => {
    // if (isFollowUpDateReached) return;
    const checkActivationStatus = async () => {
      try {
        const planActivated = await AsyncStorage.getItem("planActivated");

        // If the key doesn't exist, default to `false`
        setIsPlanActivated(planActivated === "true");
      } catch (error) {
        setIsPlanActivated(false); // Fallback to false in case of an error
      }
    };
    checkActivationStatus;
  }, []);

  const handleNotActivatedState = () => {
    //if plan is not activated , display that first
    //if plan activated ,but follow up reached , then display that
    if (!isPlanActivated) {
      Alert.alert(
        "Plan Not Activated",
        "Please upload your medical documents and generate a health plan.",
        [
          {
            text: "OK",
            onPress: () => console.log("Dialog closed"),
          },
        ]
      );
    } else if (isFollowUpDateReached) {
      Alert.alert(
        "Current Plan has Expired!",
        "Please upload new medical documents and generate a health plan.",
        [
          {
            text: "OK",
            onPress: () => console.log("Dialog closed"),
          },
        ]
      );
    }
  };

  return (
    <View style={styles.updateHealth}>
      {/* <Text style={styles.virtualCare}>Virtual Care</Text> */}
      <LinearGradient
        colors={["#E9F5FF", "#FFFFFF"]}
        style={[styles.optionButton, styles.HeadingView]} // Apply gradient to the TouchableOpacity style
        start={[0, 0]} // Optional: adjust the gradient direction
        end={[1, 0]} // Optional: adjust the gradient direction
      >
        {/* <View style={styles.HeadingView}> */}
        <Text style={styles.headingText}>Update Health</Text>
        {/* </View> */}
      </LinearGradient>

      <UpdateComponent
        text={"Update Symptoms"}
        onPress={
          isPlanActivated && !isFollowUpDateReached
            ? handleUpdateSymptoms
            : handleNotActivatedState //either plan is not activated , or follow up has reached
        } // Call console.log() here
      />

      <UpdateComponent
        text={"Update Medication Details"}
        onPress={
          isPlanActivated && !isFollowUpDateReached
            ? handleUpdateMedicationDetails
            : handleNotActivatedState
        } // Call console.log() here
      />
      <UpdateComponent
        text={"Add New Test Report"}
        onPress={handleAddNewTestReport} // Call console.log() here
      />
      {/* Include the new SymptomsModal component */}
      <SymptomsPopup
        visible={isModalVisible}
        dayCount={dayCount}
        symptoms={symptoms}
        setSymptoms={setSymptoms}
        onSave={handleSaveSymptoms}
        onCancel={handleCancel}
      />
    </View>
  );
};

export default UpdateHealth;

const styles = StyleSheet.create({
  optionButton: {
    backgroundColor: "#F0F4FF",
  },
  updateHealth: {
    flex: 1,
    paddingTop: 35,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  virtualCare: {
    // position: "absolute", // Position the element absolutely within its parent
    // top: "6.5%", // Distance from the top of the screen
    // left: 20, // Distance from the left of the screen
    // fontSize: 24, // Adjust font size as needed
    // fontWeight: "bold", // Make the text bold
    // color: "#4B5189", // Optional: Add color to match the design
  },
  HeadingView: {
    marginTop: "20%",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: "10%",
    borderRadius: 10,
    backgroundColor: "#F0F4FF",
    shadowColor: "#3B3DDF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 15,
    marginBottom: "30%",
  },
  headingText: {
    fontSize: 30,
    color: "#4B5189",
    fontWeight: "bold",
  },
});
