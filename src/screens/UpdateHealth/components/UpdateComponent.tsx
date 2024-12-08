import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

type propType = { text: string; onPress?: () => void };

const UpdateComponent = ({ text, onPress }: propType) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.btnContainer,
        pressed && styles.pressedEffect, // Apply a different style when pressed
      ]}
    >
      <LinearGradient
        colors={["#E9F5FF", "#FFFFFF"]}
        style={styles.optionButton}
        start={[0, 0]}
        end={[1, 0]}
      >
        <Text style={styles.optionText}>{text}</Text>
      </LinearGradient>
    </Pressable>
  );
};

export default UpdateComponent;

const styles = StyleSheet.create({
  btnContainer: {
    width: "80%",
    borderRadius: 14,
  },
  pressedEffect: {
    transform: [{ scale: 0.96 }], // Slightly shrink the button
    opacity: 0.9, // Slightly dim the button
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 25,
    borderRadius: 14,
    marginBottom: "15%",
    backgroundColor: "#F0F4FF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 7,
  },
  optionText: {
    fontSize: 20,
    color: "#4B5189",
  },
});
