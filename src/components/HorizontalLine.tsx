import { StyleSheet, Text, View } from "react-native";
import React from "react";

const HorizontalLine = () => {
  return (
    <View style={styles.lineContainer}>
      <View style={styles.horizontalLine} />
      <Text style={styles.orText}>or</Text>
      <View style={styles.horizontalLine} />
    </View>
  );
};

export default HorizontalLine;

const styles = StyleSheet.create({
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%", // Adjust width as needed
    marginTop: 15,
  },
  horizontalLine: {
    flex: 1,
    borderBottomColor: "#4D4D4D", // Change color here
    borderBottomWidth: 1, // Change thickness here
    marginHorizontal: 5, // Space between the line and the text
  },
  orText: {
    color: "white",
    paddingHorizontal: 10, // Space around the text
  },
});
