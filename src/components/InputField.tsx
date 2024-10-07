import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

type InputFieldProps = {
  placeholder: string;
  secureTextEntry?: boolean;
  onChangeText: any;
  value: string;
  placeholderTextColor?: string;
  textColor?: string;
};

const InputField = ({
  placeholder,
  secureTextEntry,
  onChangeText,
  value,
  placeholderTextColor = "white",
  textColor = "white", // Default text color is white
}: InputFieldProps) => {
  return (
    <TextInput
      style={[styles.input, { color: textColor }]}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

export default InputField;

const styles = StyleSheet.create({
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 0.7,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
  },
});
