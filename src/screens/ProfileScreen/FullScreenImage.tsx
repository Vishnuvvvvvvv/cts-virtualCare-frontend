import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
} from "react-native";
import React from "react";
//component for viewing the full-screen image, if uploaded document is a image
type FullScreenImageModalProps = {
  fullScreen: boolean;
  setFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
  imageUri: string;
};

const FullScreenImage = ({
  fullScreen,
  setFullScreen,
  imageUri,
}: FullScreenImageModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={fullScreen}
      onRequestClose={() => setFullScreen(false)}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setFullScreen(false)}
        >
          <Image
            source={require("../../../assets/ProfileIcons/Close.png")}
            // Adjust size as needed
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>

        <Image
          source={{ uri: imageUri }}
          style={styles.fullScreenImage}
          resizeMode="contain"
        />
      </View>
    </Modal>
  );
};

export default FullScreenImage;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#000", // Black background for full-screen view
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenImage: {
    // Takes up full screen
    width: "100%",
    height: "100%",
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 10,
    borderRadius: 5,
    zIndex: 10,
  },
});
