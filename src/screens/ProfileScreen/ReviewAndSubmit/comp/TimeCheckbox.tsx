import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type TimeCheckboxProps = {
  selectedTime: string | string[]; // Allow both string and array for flexibility
  onChange: (updatedTime: string | string[]) => void;
};

const TimeCheckbox: React.FC<TimeCheckboxProps> = ({
  selectedTime,
  onChange,
}) => {
  // Ensure selectedTime is an array (if it's a string, convert it into an array)
  const timeArray = Array.isArray(selectedTime)
    ? selectedTime
    : selectedTime.split("").map((char) => (char === "1" ? "1" : "0")); // Convert string to array of "1" and "0"

  // Time slots mapping
  const timeLabels = ["Morning", "Noon", "Evening", "Night"];

  const handleToggle = (index: number) => {
    const updatedTime = [...timeArray];
    updatedTime[index] = updatedTime[index] === "1" ? "0" : "1"; // Toggle between '1' and '0'

    // Pass the updated time state back to the parent component
    // Update the state in the parent correctly (either as a string or an array)
    if (typeof selectedTime === "string") {
      onChange(updatedTime.join("")); // If it's a string, join the array back to a string
    } else {
      onChange(updatedTime); // If it's an array, pass the array directly
    }
  };

  return (
    <View style={styles.container}>
      {timeArray.map((time, index) => (
        <View key={index} style={styles.timeItem}>
          <Text style={styles.label}>{timeLabels[index]}</Text>
          <TouchableOpacity
            style={[styles.checkbox, time === "1" && styles.selected]}
            onPress={() => handleToggle(index)}
          >
            <Text style={styles.checkboxText}>
              {time === "1" ? "Active" : "Inactive"}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeItem: {
    alignItems: "center",
    flex: 1,
  },
  checkbox: {
    width: 60,
    height: 30,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginTop: 5,
  },
  selected: {
    backgroundColor: "green", // Green for active status
  },
  checkboxText: {
    color: "white",
    fontWeight: "bold",
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default TimeCheckbox;
