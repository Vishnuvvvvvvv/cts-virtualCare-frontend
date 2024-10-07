import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

type ButtonProps = {
  title: string;
  functionHandler: any;
};

const Button = ({ title, functionHandler }: ButtonProps) => {
  return (
    <LinearGradient
      colors={["#628EFF", "#8740CD", "#580475"]} // Gradient colors from the image
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.button}
    >
      <TouchableOpacity style={styles.buttonContent} onPress={functionHandler}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 5, // Make the button have rounded corners
    padding: 2, // Padding to keep content inside the gradient
  },
  buttonContent: {
    backgroundColor: "transparent", // Ensures the content does not affect the gradient
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
