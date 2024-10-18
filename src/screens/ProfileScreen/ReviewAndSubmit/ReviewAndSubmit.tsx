import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { stackScreens } from "../../../Navigation/RootNavigation";
import { useUser } from "../../../UserContext";
import HorizontalLine from "../../../components/HorizontalLine";

type propsType = NativeStackScreenProps<stackScreens, "ReviewAndSubmit">;

const ReviewAndSubmit = ({ navigation }: propsType) => {
  const [extractedData, setExtractedData] = useState<any>(null);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { step, setStep } = useUser();
  // Fetch userDetails from AsyncStorage
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const storedUserDetails = await AsyncStorage.getItem("userDetails");
        if (storedUserDetails) {
          setUserDetails(JSON.parse(storedUserDetails));
        } else {
          console.log("No userDetails found in AsyncStorage.");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  // Fetch extracted JSON data from AsyncStorage
  useEffect(() => {
    const fetchExtractedData = async () => {
      try {
        const jsonData = await AsyncStorage.getItem("Extractedjson");
        if (jsonData != null) {
          setExtractedData(JSON.parse(jsonData));
        } else {
          console.log("No data found for the key 'Extractedjson'.");
        }
      } catch (error) {
        console.error("Error retrieving data from AsyncStorage:", error);
      }
    };

    fetchExtractedData();
  }, []);

  // Handle saving the details into an object
  const handleSave = async () => {
    const saveData = {
      userDetails,
      date: new Date(),
      discharge_details: extractedData?.discharge_details || {},
      treating_consultant: extractedData?.treating_consultant || {},
    };

    try {
      await AsyncStorage.setItem("SavedData", JSON.stringify(saveData));
      Alert.alert("Success", "Health Plan have been Activated successfully!");
      console.log("Saved Data: ", saveData);
      // Navigate back to the previous screen
      setStep(3);
      navigation.goBack(); // Add this line
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // Handle toggling edit mode
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  if (!extractedData) {
    return (
      <View style={styles.container}>
        <Text>No data available.</Text>
      </View>
    );
  }

  const { discharge_details, treating_consultant } = extractedData || {};

  return (
    <View style={styles.container}>
      <ScrollView>
        {!isEditing && (
          <View style={styles.editButtonContainer}>
            <TouchableOpacity onPress={handleEdit}>
              <Text>{"Edit Details"}</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Patient Information */}
        {userDetails ? (
          <>
            <Text style={styles.sectionTitle}>Patient Information</Text>
            <View style={styles.line} />
            <Text style={styles.label}>Name</Text>
            <TextInput
              editable={isEditing}
              style={styles.input}
              value={userDetails.name}
              onChangeText={(text) =>
                setUserDetails({ ...userDetails, name: text })
              }
            />
            <Text style={styles.label}>Age</Text>
            <TextInput
              editable={isEditing}
              style={styles.input}
              value={userDetails.age}
              onChangeText={(text) =>
                setUserDetails({ ...userDetails, age: text })
              }
            />
            <Text style={styles.label}>Gender</Text>
            <TextInput
              editable={isEditing}
              style={styles.input}
              value={userDetails.gender}
              onChangeText={(text) =>
                setUserDetails({ ...userDetails, gender: text })
              }
            />
            <Text style={styles.label}>Date of Birth</Text>
            <TextInput
              editable={isEditing}
              style={styles.input}
              value={userDetails.dateOfBirth}
              onChangeText={(text) =>
                setUserDetails({ ...userDetails, dateOfBirth: text })
              }
            />
          </>
        ) : (
          <Text>No patient details available.</Text>
        )}

        {/* Treating Consultant Information */}
        <Text style={styles.sectionTitle}>Treating Consultant</Text>
        <View style={styles.line} />
        <Text style={styles.label}>Consultant Name</Text>
        <TextInput
          editable={isEditing}
          style={styles.input}
          value={treating_consultant?.name}
          onChangeText={(text) =>
            setExtractedData({
              ...extractedData,
              treating_consultant: { ...treating_consultant, name: text },
            })
          }
        />
        <Text style={styles.label}>Specialty</Text>
        <TextInput
          editable={isEditing}
          style={styles.input}
          value={treating_consultant?.specialty}
          onChangeText={(text) =>
            setExtractedData({
              ...extractedData,
              treating_consultant: { ...treating_consultant, specialty: text },
            })
          }
        />
        <Text style={styles.label}>Hospital</Text>
        <TextInput
          editable={isEditing}
          style={styles.input}
          value={treating_consultant?.hospital}
          onChangeText={(text) =>
            setExtractedData({
              ...extractedData,
              treating_consultant: { ...treating_consultant, hospital: text },
            })
          }
        />

        {/* Follow up date */}
        <Text style={styles.sectionTitle}>Follow-Up Date</Text>
        <TextInput
          editable={isEditing}
          style={styles.input}
          value={discharge_details?.follow_up_date}
          onChangeText={(text) =>
            setExtractedData({
              ...extractedData,
              follow_up_date: text,
            })
          }
        />

        {/* Prescribed Illness */}
        <Text style={styles.sectionTitle}>Prescribed Illness</Text>
        <TextInput
          editable={isEditing}
          style={styles.input}
          value={discharge_details?.prescribed_illness}
          onChangeText={(text) =>
            setExtractedData({
              ...extractedData,
              prescribed_illness: text,
            })
          }
        />

        {/* Medication Details */}
        <Text style={styles.sectionTitle}>Medication Details</Text>
        <View style={styles.line} />

        {/* medicines */}
        {discharge_details?.prescription?.length > 0 ? (
          discharge_details.prescription.map((med: any, index: number) => (
            <View key={index} style={styles.card}>
              <Text style={styles.label}>Medicine Name</Text>
              <TextInput
                editable={isEditing}
                style={styles.input}
                value={med?.medicine_name}
                onChangeText={(text) => {
                  const updatedPrescription = [
                    ...discharge_details.prescription,
                  ];
                  updatedPrescription[index].medicine_name = text;
                  setExtractedData({
                    ...extractedData,
                    discharge_details: {
                      ...discharge_details,
                      prescription: updatedPrescription,
                    },
                  });
                }}
              />
              <Text style={styles.label}>Quantity</Text>
              <TextInput
                editable={isEditing}
                style={styles.input}
                value={med?.qty}
                onChangeText={(text) => {
                  const updatedPrescription = [
                    ...discharge_details.prescription,
                  ];
                  updatedPrescription[index].qty = text;
                  setExtractedData({
                    ...extractedData,
                    discharge_details: {
                      ...discharge_details,
                      prescription: updatedPrescription,
                    },
                  });
                }}
              />
              <Text style={styles.label}>Dosage</Text>
              <TextInput
                editable={isEditing}
                style={styles.input}
                value={med?.dosage}
                onChangeText={(text) => {
                  const updatedPrescription = [
                    ...discharge_details.prescription,
                  ];
                  updatedPrescription[index].dosage = text;
                  setExtractedData({
                    ...extractedData,
                    discharge_details: {
                      ...discharge_details,
                      prescription: updatedPrescription,
                    },
                  });
                }}
              />
              <Text style={styles.label}>Duration</Text>
              <TextInput
                editable={isEditing}
                style={styles.input}
                value={med?.duration}
                onChangeText={(text) => {
                  const updatedPrescription = [
                    ...discharge_details.prescription,
                  ];
                  updatedPrescription[index].duration = text;
                  setExtractedData({
                    ...extractedData,
                    discharge_details: {
                      ...discharge_details,
                      prescription: updatedPrescription,
                    },
                  });
                }}
              />
            </View>
          ))
        ) : (
          <Text>No medication details available.</Text>
        )}
        {!isEditing && (
          // <View style={styles.saveButtonContainer}>
          //   <Button title="Submit" onPress={handleSave} />
          // </View>

          <TouchableOpacity style={styles.Btn} onPress={handleSave}>
            <Text style={styles.BtnTxt}>Continue</Text>
            <Image
              style={styles.btnIcon}
              source={require("../../../../assets/RightChevron.png")}
            ></Image>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Save Changes / Submit Button Container */}
      {isEditing && (
        <View style={styles.saveButtonContainer}>
          <TouchableOpacity onPress={handleEdit}>
            <Text>Save Changes</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ReviewAndSubmit;

const styles = StyleSheet.create({
  line: {
    borderBottomColor: "#ccc", // Color of the line
    borderBottomWidth: 1, // Thickness of the line
    marginBottom: 13, // Optional: Space above and below the line
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  editButtonContainer: {
    position: "absolute",
    top: 10,
    right: 20,
    zIndex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
  saveButtonContainer: {
    // position: "absolute",
    // bottom: 20,
    // left: 20,
    // right: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    alignItems: "center",
  },

  Btn: {
    // borderWidth: 1,
    flexDirection: "row",
    width: "40%",

    alignSelf: "center",
    // position: "absolute",
    // bottom: 10, // Align it to the bottom
    // left: "30%", // Align it to the left
    // right: "30%", // Align it to the right
    // padding: 20, // Optional padding
    borderRadius: 12,
    height: 50,
    backgroundColor: "#FFFFFF",
    borderColor: "#A0A0A0",
    justifyContent: "space-evenly",
    alignItems: "center",
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
});
