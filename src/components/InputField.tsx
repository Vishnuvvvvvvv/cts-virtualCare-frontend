import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

type InputFieldProps = {
  placeholder: string;
  secureTextEntry?: boolean;
  onChangeText: any;
  value: string;
};

const InputField = ({
  placeholder,
  secureTextEntry,
  onChangeText,
  value,
}: InputFieldProps) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="white"
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
    color: "white",
  },
});
