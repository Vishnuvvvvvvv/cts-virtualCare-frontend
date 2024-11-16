import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import UpdateComponent from "./components/UpdateComponent";
import { LinearGradient } from "expo-linear-gradient";
import SymptomsPopup from "./components/SymptomsPopup";

const UpdateHealth = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [dayCount, setDayCount] = useState(1); // Example day count
  const [symptoms, setSymptoms] = useState("");
  const [symptomsData, setSymptomsData] = useState<Record<string, string>>({});

  const handleUpdateSymptoms = () => {
    setModalVisible(true);
  };

  const handleSaveSymptoms = () => {
    setSymptomsData((prevData) => ({
      ...prevData,
      [`day${dayCount}`]: prevData[`day${dayCount}`]
        ? `${prevData[`day${dayCount}`]}\n${symptoms}` // Append new symptoms
        : symptoms, // Add as new if no existing data
    }));
    console.log(`Symptoms for Day ${dayCount}: ${symptoms}`);
    // console.log("Updated Symptoms Data:", symptomsData);
    setModalVisible(false);
    setSymptoms(""); // Clear input
  };

  useEffect(() => {
    console.log("Updated Symptoms Data:", symptomsData);
  }, [symptomsData]);
  const handleCancel = () => {
    // console.log("Updated Symptoms Data:", symptomsData);
    setModalVisible(false);
    setSymptoms("");
  };
  // other options in update health screen
  const handleUpdateMedicationDetails = () => {
    console.log("Update Medication Details button clicked");
  };

  const handleAddNewTestReport = () => {
    console.log("Add New Test Report button clicked");
  };

  return (
    <View style={styles.updateHealth}>
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
        onPress={handleUpdateSymptoms} // Call console.log() here
      />
      <UpdateComponent
        text={"Update Medication Details"}
        onPress={handleUpdateMedicationDetails} // Call console.log() here
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
  HeadingView: {
    marginTop: 30,
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
