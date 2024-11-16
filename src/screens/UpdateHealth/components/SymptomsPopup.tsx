import React from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Use Ionicons or any other icon library

type PropsType = {
  visible: boolean;
  dayCount: number;
  symptoms: string;
  setSymptoms: (text: string) => void;
  onSave: () => void;
  onCancel: () => void;
  // Function for microphone action
};

const SymptomsPopup = ({
  visible,
  dayCount,
  symptoms,
  setSymptoms,
  onSave,
  onCancel,
}: PropsType) => {
  const onMicrophonePress = () => {
    console.log("microphoen pressed ..");
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            What are your symptoms for day {dayCount}?
          </Text>
          <TextInput
            style={styles.input}
            placeholder="How are you feeling Today?..."
            value={symptoms}
            multiline={true} // Enable multiple lines
            numberOfLines={15}
            onChangeText={setSymptoms}
            textAlignVertical="top"
          />
          <TouchableOpacity
            style={styles.microphoneButton}
            onPress={onMicrophonePress}
          >
            <Ionicons name="mic" size={30} color="#4B5189" />
            {/* <Text style={styles.microphoneText}>Speak </Text> */}
          </TouchableOpacity>
          <View style={styles.modalButtons}>
            <Button title="Save" onPress={onSave} />
            <Button title="Cancel" onPress={onCancel} color="red" />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SymptomsPopup;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    height: "70%",
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
    justifyContent: "space-between", // Distribute content evenly
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    // textAlign: "center",
    marginTop: 20,
  },
  input: {
    height: "50%",
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingTop: 20,
    // marginVertical: 20,
  },
  microphoneButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F4FF",
    borderRadius: 50,
    padding: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  microphoneText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#4B5189",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10, // Add some space to the bottom
  },
});
