import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Audio } from "expo-av";
import axios from "axios";

// This is the symptom popup screen, which gets displayed when the update symptoms is clicked
type PropsType = {
  visible: boolean;
  dayCount: number;
  symptoms: string;
  setSymptoms: (text: string) => void;
  onSave: () => void;
  onCancel: () => void;
};

const SymptomsPopup = ({
  visible,
  dayCount,
  symptoms,
  setSymptoms,
  onSave,
  onCancel,
}: PropsType) => {
  const [recording, setRecording] = useState<Audio.Recording | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);

  async function startRecording() {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording: newRecording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setRecording(newRecording);
      }
    } catch (err) {
      console.error("Failed to start recording:", err);
    }
  }

  async function stopRecording() {
    try {
      await recording?.stopAndUnloadAsync();
      // const { sound, status } = await recording?.createNewLoadedSoundAsync();

      // Update the transcript using the recorded file
      const fileUri = recording?.getURI();
      if (fileUri) {
        await prepareTranscript(fileUri);
      }
      setRecording(undefined);
    } catch (err) {
      console.error("Failed to stop recording:", err);
    }
  }

  async function prepareTranscript(fileUri: string) {
    setIsLoading(true);
    try {
      const respons = await fetch(fileUri);
      const blob = await respons.blob();

      const formData = new FormData();
      formData.append("audio_file", {
        uri: fileUri,
        type: "audio/wav",
        name: "recording.wav",
      } as any);

      // formData.append("audio_file", {
      //   uri: blob,
      //   type: "audio/wav",
      //   name: "recording.wav",
      // });

      const response = await axios.post(
        "http://192.168.1.7:3000/transcribe",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setSymptoms(response.data.text);
    } catch (error) {
      console.error("Error during transcription API call:", error);
    } finally {
      setIsLoading(false);
    }
  }

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
            placeholder="How are you feeling today?"
            value={symptoms}
            multiline={true}
            numberOfLines={15}
            onChangeText={setSymptoms}
            textAlignVertical="top"
          />

          <TouchableOpacity
            style={styles.microphoneButton}
            onPress={recording ? stopRecording : startRecording}
          >
            {/* <Image
              style={styles.imgIcon}
              source={
                recording
                  ? require("../../../../assets/updateHealthIcons/stop.png")
                  : require("../../../../assets/updateHealthIcons/stop.png")
              }
            /> */}

            {recording ? (
              <Image
                style={styles.imgIcon2}
                source={require("../../../../assets/updateHealthIcons/stop.png")}
              />
            ) : (
              <Image
                style={styles.imgIcon1}
                source={require("../../../../assets/updateHealthIcons/microphone.png")}
              />
            )}
          </TouchableOpacity>

          {isLoading && <ActivityIndicator size="large" color="#0000ff" />}

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
    justifyContent: "space-between",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
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
  },
  microphoneButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F4FF",
    borderRadius: 50,
    width: 60,
    padding: 12,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  imgIcon1: {
    width: 25,
    height: 35,
  },
  imgIcon2: {
    // width: 25,
    // height: 35,
    width: 38,
    height: 39,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
});
