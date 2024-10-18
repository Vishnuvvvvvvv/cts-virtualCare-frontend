import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

// Get screen dimensions
const { width, height } = Dimensions.get("window");

type OverlayProps = {
  message: string;
};

const OverlayComponent: React.FC<OverlayProps> = ({ message }) => {
  return (
    <View style={styles.overlay}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default OverlayComponent;

const styles = StyleSheet.create({
  overlay: {
    position: "absolute", // Ensure the component is positioned absolutely over other components
    width: width, // Full width
    height: height, // Full height
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    zIndex: 1, // Ensure the overlay appears above other components
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});
