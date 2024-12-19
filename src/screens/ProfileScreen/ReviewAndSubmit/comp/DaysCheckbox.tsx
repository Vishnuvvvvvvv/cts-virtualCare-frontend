import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

interface DaysCheckboxProps {
  selectedDays: string; // Change to string
  onChange: (updatedDays: string) => void; // Ensure this matches the `selectedDays` type
}

const DaysCheckbox = ({ selectedDays, onChange }: DaysCheckboxProps) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  console.log("selected days are :", selectedDays);
  // Convert the selectedDays string ('1'/'0') to an array of day states
  const selectedState = selectedDays.split("").map((day) => day === "1");

  // Toggle the state of each day
  const handleDayToggle = (index: number) => {
    const updatedState = [...selectedState];
    updatedState[index] = !updatedState[index];
    onChange(
      updatedState.map((isSelected) => (isSelected ? "1" : "0")).join("")
    );
  };

  return (
    <View style={styles.checkboxContainer}>
      {days.map((day, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleDayToggle(index)}
          style={[
            styles.dayButton,
            selectedState[index] ? styles.selected : styles.notSelected,
          ]}
        >
          <Text>{day}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    // flexWrap: "wrap",
    marginTop: 5,
    // backgroundColor: "red",
    width: "100%",
    justifyContent: "space-evenly",
  },
  dayButton: {
    padding: 5,
    margin: 2,
    borderRadius: 5,
    width: "12%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  selected: {
    backgroundColor: "green",
  },
  notSelected: {
    backgroundColor: "red",
  },
});

export default DaysCheckbox;
