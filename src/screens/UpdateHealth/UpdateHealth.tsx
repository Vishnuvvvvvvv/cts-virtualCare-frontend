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
        userId: userId, // Replace with actual user ID
        symptomsText,
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

  // Fetch and Check Follow-up Date
  const checkFollowUpDate = async () => {
    try {
      // Step 1: Check if follow-up date is already in AsyncStorage
      let storedFollowUpDate = await AsyncStorage.getItem("followUp");
      const today = new Date().toISOString().split("T")[0];

      if (storedFollowUpDate) {
        console.log("there is storedFollowUpDate : UH ", storedFollowUpDate);
        storedFollowUpDate = parseDate(storedFollowUpDate)
          .toISOString()
          .split("T")[0];
        console.log(
          "after parsing storedFollowUpDate :UH ",
          storedFollowUpDate
        );
        // Step 2: If present, check if today's date is past the follow-up date
        if (today >= storedFollowUpDate) {
          console.log("Follow-up date has been reached. Skipping API calls.");
          setIsFollowUpDateReached(true);
        }
      } else {
        // Step 3: If not present, fetch follow-up date from API
        const token = await getToken();
        const userId = await AsyncStorage.getItem("userId");
        if (!token || !userId) return;
        getTokenAndCheckExpiry(token, navigation);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.get(`${API.GET_SAVED_DATA}/${userId}`);

        if (
          response.status === 200 &&
          response?.data?.discharge_details?.follow_up_date
        ) {
          // const fetchedFollowUpDate = new Date(
          //   response?.data?.discharge_details?.follow_up_date
          // )
          //   .toISOString()
          //   .split("T")[0];
          const fetchedFollowUpDate = parseDate(
            response?.data?.discharge_details?.follow_up_date
          )
            .toISOString()
            .split("T")[0];

          // Store the fetched follow-up date in AsyncStorage
          await AsyncStorage.setItem("followUp", fetchedFollowUpDate);

          // Check if today's date is past the fetched follow-up date
          if (today >= fetchedFollowUpDate) {
            console.error(
              "Follow-up date has been reached. Skipping API calls."
            );
            setIsFollowUpDateReached(true);
          }
        }
      }
    } catch (error) {
      console.log("Error checking follow-up date: ", error);
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
        console.error("Error checking plan activation status:", error);
        setIsPlanActivated(false); // Fallback to false in case of an error
      }
    };
    checkActivationStatus;
    console.log("Activation plan status ", isPlanActivated);
  }, []);

  const handleNotActivatedState = () => {
    //if plan is not activated , display that first
    //if plan activated ,but follow up reached , then display that
    if (!isPlanActivated) {
      console.log("plan is not activated");
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
      console.log("follow up reached");
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
