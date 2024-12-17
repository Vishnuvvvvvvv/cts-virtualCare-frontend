import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Button,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";
import { WebView } from "react-native-webview";
import DocComponent from "./DocComponent";
import FullScreenImageModal from "./FullScreenImage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../../../src/UserContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { stackScreens } from "../../Navigation/RootNavigation";
import { API, getToken, getTokenAndCheckExpiry } from "../../apiConfig";
import { ActivityIndicator } from "react-native-paper";

// Define the type for the file
type FileType = {
  name: string;
  uri: string;
  type: string | undefined;
  size: number | undefined;
};

type propsType = NativeStackScreenProps<stackScreens, "UploadDocuments">;

export default function UploadDocumentsScreen({ navigation }: propsType) {
  const STORAGE_KEY = "uploadedFile";

  const [selectedFile, setSelectedFile] = useState<FileType | null>(null);
  const [pdfUri, setPdfUri] = useState<string | null>(null); // State for storing the PDF URI
  const [fileUri, setFileUri] = useState<string | null>(null);
  // const [prescription,setPrescription] = useState({})
  const { step, setStep, setPrescription } = useUser(); //use the globalContext
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadStoredFile = async () => {
      try {
        const storedFile = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedFile) {
          setSelectedFile(JSON.parse(storedFile)); // Parse the stored file data
        }
      } catch (error) {
        console.log("Error loading stored file: ", error);
      }
    };

    loadStoredFile();
  }, []);

  const pickSomething = async () => {
    try {
      const docRes = await DocumentPicker.getDocumentAsync({
        type: [
          "application/pdf",
          "text/plain",
          "image/jpeg",
          "image/png",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ],
      });

      // console.log("result : ", docRes);

      //  const formData = new FormData();
      const assets = docRes.assets;
      if (!assets) return;

      const file = assets[0];

      const doc: FileType = {
        name: file.name,
        uri: file.uri,
        type: file.mimeType,
        size: file.size,
      };
      // console.log("doc", doc);
      //  formData.append("audioFile", audioFile as any);
      // console.log("form Data: ", formData);

      // Store the selected file in AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(doc));

      setSelectedFile(doc);
      // console.log("prev. Step state is", step);

      // console.log("step State is ", step);
    } catch (error) {
      console.log("Error while selecting file: ", error);
    }
  };
  const removeFile = async () => {
    try {
      console.log("reset");
      await AsyncStorage.removeItem(STORAGE_KEY); // Await the removal of the file
      setSelectedFile(null); // Reset the selectedFile state after removal
      setStep(0);
      await AsyncStorage.removeItem("Extractedjson");
    } catch (error) {
      console.error("Error removing the file:", error);
    }
  };

  const viewDocument = async () => {
    if (
      selectedFile &&
      (selectedFile.type === "application/pdf" ||
        selectedFile.type === "text/plain" ||
        selectedFile.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      try {
        if (Platform.OS === "android") {
          const contentUri = await FileSystem.getContentUriAsync(
            selectedFile.uri
          );
          await IntentLauncher.startActivityAsync(
            "android.intent.action.VIEW",
            {
              data: contentUri, // Use contentUri directly here
              flags: 1,
              type: "application/pdf",
            }
          );
        } else if (Platform.OS === "ios") {
          // Set the pdfUri to the selected file's uri for WebView
          setPdfUri(selectedFile.uri);
        }
      } catch (error) {
        console.log("Error while viewing PDF: ", error);
      }
    } else {
      console.log("Selected file is not a PDF");
    }
  };
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  // console.log("fullscreen ", fullScreen);

  //   const handleNext = () => {
  //     navigation.goBack();
  //     setStep(1); // Increment the step by 1
  //     console.log("Current step:", step + 1); // Log the new step value
  //   };

  const handleNext = async () => {
    setLoading(true);
    console.log("clicked");
    if (!selectedFile) {
      console.error("No file selected to upload");
      return;
    }

    // Log the selected file to confirm its structure
    console.log("Selected file:", selectedFile);

    // Create FormData and append the file
    const formData = new FormData();
    formData.append("medicalDocument", {
      uri: selectedFile.uri, // URI to the file
      name: selectedFile.name, // Ensure it has the proper file extension
      type: selectedFile.type, // Specify the correct MIME type
    } as any);

    // console.log("FormData  :", formData._parts as any);

    try {
      const token = await getToken();
      if (!token) {
        console.log("Token ont available in Upload doc", token);
        return;
      }

      getTokenAndCheckExpiry(token, navigation);
      console.log("sending the file to backend with toakne ", token);

      const response = await fetch(API.UPLOAD_DOC, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data", // Let the browser/mobile handle the Content-Type
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("got response from backend");
      const result = await response.json();
      // console.log("res: ", result);

      if (response.ok) {
        navigation.goBack();
        const cleanResponse = result.replace(/```json\n|```/g, "");
        const parsedResponse = JSON.parse(cleanResponse);
        console.log("got json data from backend:", parsedResponse);

        setPrescription(parsedResponse);
        setStep(1);
        await AsyncStorage.setItem(
          "Extractedjson",
          JSON.stringify(parsedResponse)
        );
      } else {
        console.error("Upload failed:", result);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* When any file is selected , hide  the choose file button and display the chosen file */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Processing your document...</Text>
        </View>
      ) : (
        <>
          {selectedFile && (
            <>
              {selectedFile.type && selectedFile.type.startsWith("image/") && (
                //  Displaying image[png/jpeg]
                <>
                  <TouchableOpacity
                    style={styles.viewPdfScreen}
                    onPress={() => {
                      setFullScreen(true);
                      console.log("clicked fullscreen");
                    }}
                  >
                    <DocComponent
                      title={selectedFile.name}
                      source={selectedFile.uri}
                      onPress={removeFile}
                    />
                  </TouchableOpacity>

                  <FullScreenImageModal
                    fullScreen={fullScreen}
                    setFullScreen={setFullScreen}
                    imageUri={selectedFile.uri}
                  />
                </>
              )}

              {/* Displaying all other formats other than image type  */}
              {(selectedFile.type === "application/pdf" ||
                selectedFile.type === "text/plain" ||
                selectedFile.type ===
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document") && (
                <>
                  {/* For android device */}
                  <TouchableOpacity
                    style={styles.viewPdfScreen}
                    onPress={viewDocument}
                  >
                    <DocComponent
                      title={selectedFile.name}
                      type={selectedFile.type}
                      onPress={removeFile}
                    />
                  </TouchableOpacity>

                  {/* For ios device : implementation not finished */}
                  {pdfUri && (
                    <WebView
                      source={{ uri: pdfUri }}
                      style={{ width: "100%", height: 400 }}
                    />
                  )}
                </>
              )}
            </>
          )}
          {/* When no file is selected , display the choose File button */}
          {!selectedFile && (
            <View style={styles.center}>
              <TouchableOpacity style={styles.PickBtn} onPress={pickSomething}>
                <Image
                  style={styles.uploadBtn}
                  source={require("../../../assets/ProfileIcons/Upload.png")}
                ></Image>
                <Text>Choose File</Text>
              </TouchableOpacity>
            </View>
          )}
          {/* continue to next step */}
          {selectedFile && (
            <TouchableOpacity style={styles.Btn} onPress={handleNext}>
              <Text style={styles.BtnTxt}>Continue</Text>
              <Image
                style={styles.btnIcon}
                source={require("../../../assets/RightChevron.png")}
              ></Image>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fileName: {
    fontSize: 16,
    marginBottom: 10,
    width: "80%",
  },
  PickBtn: {
    // position: "absolute", // Use absolute positioning
    // top: "50%", // Move to the middle vertically
    // left: "50%", // Move to the middle horizontally
    // transform: [{ translateX: -50 }, { translateY: -50 }], // Offset the button by half its size to truly center it
    borderWidth: 1,
    padding: 4,
    height: 200,
    width: 200,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C1C1C1",
  },
  viewPdfScreen: {
    // borderWidth: 1,
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  uploadBtn: {
    width: 30,
    height: 25,
    marginBottom: 6,
  },

  Btn: {
    // // borderWidth: 1,
    // flexDirection: "row",
    // width: "40%",
    // // alignSelf: "center",
    // position: "absolute",
    // bottom: 10, // Align it to the bottom
    // left: "30%", // Align it to the left
    // right: "30%", // Align it to the right
    // // padding: 20, // Optional padding
    // borderRadius: 12,
    // height: 50,
    // backgroundColor: "#FFFFFF",
    // borderColor: "#A0A0A0",
    // justifyContent: "space-evenly",
    // alignItems: "center",
    flexDirection: "row",
    width: "60%",
    position: "absolute",
    bottom: 20,
    left: "20%",
    right: "20%",
    borderRadius: 12,
    height: 50,
    backgroundColor: "#FFFFFF",
    borderColor: "#A0A0A0",
    // borderWidth: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, // For Android shadow
  },

  BtnTxt: {
    textAlign: "center",
    color: "#A0A0A0",
    // borderWidth: 1,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 8,
    height: "100%",
    fontSize: 23,
  },
  btnIcon: {
    height: 25,
    width: 25,
  },
  //css for full-screen-image :
});
