import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

type propType = { text: string; onPress?: () => void };

const UpdateComponent = ({ text, onPress }: propType) => {
  return (
    <LinearGradient
      colors={["#E9F5FF", "#FFFFFF"]}
      style={styles.optionButton} // Apply gradient to the TouchableOpacity style
      start={[0, 0]} // Optional: adjust the gradient direction
      end={[1, 0]} // Optional: adjust the gradient direction
    >
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.optionText}>{text}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default UpdateComponent;

const styles = StyleSheet.create({
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    paddingVertical: 25,
    borderRadius: 14,
    marginBottom: "15%",
    backgroundColor: "#F0F4FF", // Optional: set a background color
    // iOS shadow properties
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 10 }, // Horizontal and vertical offset
    shadowOpacity: 0.2, // Transparency of the shadow
    shadowRadius: 10, // Radius of the shadow
    // Android shadow properties (using elevation)
    elevation: 7, // Elevation value to simulate shadow on Android
  },
  optionText: {
    fontSize: 20,
    color: "#4B5189",
  },
});
