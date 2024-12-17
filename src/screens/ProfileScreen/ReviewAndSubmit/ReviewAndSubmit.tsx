// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TextInput,
//   Button,
//   Alert,
//   Image,
//   TouchableOpacity,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { stackScreens } from "../../../Navigation/RootNavigation";
// import { useUser } from "../../../UserContext";
// import HorizontalLine from "../../../components/HorizontalLine";
// import DaysCheckbox from "./comp/DaysCheckbox";
// import HomeScreen from "../../HomeScreen/HomeScreen";

// type propsType = NativeStackScreenProps<stackScreens, "ReviewAndSubmit">;

// const ReviewAndSubmit = ({ navigation }: propsType) => {
//   const [extractedData, setExtractedData] = useState<any>(null);
//   const [userDetails, setUserDetails] = useState<any>(null);
//   const [isEditing, setIsEditing] = useState<boolean>(false);
//   const { step, setStep } = useUser();

//   // Fetch userDetails from AsyncStorage
//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const storedUserDetails = await AsyncStorage.getItem("userDetails");
//         if (storedUserDetails) {
//           setUserDetails(JSON.parse(storedUserDetails));
//         } else {
//           console.log("No userDetails found in AsyncStorage.");
//         }
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//       }
//     };

//     fetchUserDetails();
//   }, []);

//   // Fetch extracted JSON data from AsyncStorage
//   useEffect(() => {
//     const fetchExtractedData = async () => {
//       try {
//         const jsonData = await AsyncStorage.getItem("Extractedjson");
//         if (jsonData != null) {
//           setExtractedData(JSON.parse(jsonData));
//         } else {
//           console.log("No data found for the key 'Extractedjson'.");
//         }
//       } catch (error) {
//         console.error("Error retrieving data from AsyncStorage:", error);
//       }
//     };

//     fetchExtractedData();
//   }, []);

//   // Handle saving the details into an object
//   const handleSave = async () => {
//     const saveData = {
//       userDetails,
//       treating_consultant: extractedData?.treating_consultant || {},
//       PlanActivatedDate: new Date(),
//       discharge_details: extractedData?.discharge_details || {},
//     };

//     try {
//       await AsyncStorage.setItem("SavedData", JSON.stringify(saveData));
//       Alert.alert("Success", "Health Plan has been Activated successfully!");
//       console.log("Saved Data: ", JSON.stringify(saveData, null, 2));
//       setStep(3);
//       navigation.goBack(); // Navigate back to the previous screen
//     } catch (error) {
//       console.error("Error saving data:", error);
//     }
//   };
//   // console.log(
//   //   "Data extracted : ",
//   //   extractedData.discharge_details.prescription
//   // );
//   // Handle toggling edit mode
//   const handleEdit = () => {
//     setIsEditing(!isEditing);
//   };

//   if (!extractedData) {
//     return (
//       <View style={styles.container}>
//         <Text>No data available.</Text>
//       </View>
//     );
//   }

//   const { discharge_details, treating_consultant } = extractedData || {};
//   console.log("extracted data: ", extractedData);
//   //new one
//   // const [prescription, setPrescription] =
//   //   useState();
//   // extractedData.discharge_details.prescription

//   console.log("disdcharge det: ", discharge_details);
//   console.log("treating consultant: ", treating_consultant);
//   return (
//     <View style={styles.container}>
//       <ScrollView>
//         {!isEditing && (
//           <View style={styles.editButtonContainer}>
//             <TouchableOpacity onPress={handleEdit}>
//               <Text>{"Edit Details"}</Text>
//             </TouchableOpacity>
//           </View>
//         )}

//         {/* Patient Information */}
//         {userDetails ? (
//           <>
//             <Text style={styles.sectionTitle}>Patient Information</Text>
//             <View style={styles.line} />
//             <Text style={styles.label}>Name</Text>
//             <TextInput
//               editable={isEditing}
//               style={styles.input}
//               value={userDetails.name}
//               onChangeText={(text) =>
//                 setUserDetails({ ...userDetails, name: text })
//               }
//             />
//             <Text style={styles.label}>Age</Text>
//             <TextInput
//               editable={isEditing}
//               style={styles.input}
//               value={userDetails.age}
//               onChangeText={(text) =>
//                 setUserDetails({ ...userDetails, age: text })
//               }
//             />
//             <Text style={styles.label}>Gender</Text>
//             <TextInput
//               editable={isEditing}
//               style={styles.input}
//               value={userDetails.gender}
//               onChangeText={(text) =>
//                 setUserDetails({ ...userDetails, gender: text })
//               }
//             />
//             <Text style={styles.label}>Date of Birth</Text>
//             <TextInput
//               editable={isEditing}
//               style={styles.input}
//               value={userDetails.dateOfBirth}
//               onChangeText={(text) =>
//                 setUserDetails({ ...userDetails, dateOfBirth: text })
//               }
//             />
//           </>
//         ) : (
//           <Text>No patient details available.</Text>
//         )}

//         {/* Treating Consultant Information */}
//         <Text style={styles.sectionTitle}>Treating Consultant</Text>
//         <View style={styles.line} />
//         <Text style={styles.label}>Consultant Name</Text>
//         <TextInput
//           editable={isEditing}
//           style={styles.input}
//           value={treating_consultant?.name}
//           onChangeText={(text) =>
//             setExtractedData({
//               ...extractedData,
//               treating_consultant: { ...treating_consultant, name: text },
//             })
//           }
//         />
//         <Text style={styles.label}>Specialty</Text>
//         <TextInput
//           editable={isEditing}
//           style={styles.input}
//           value={treating_consultant?.specialty}
//           onChangeText={(text) =>
//             setExtractedData({
//               ...extractedData,
//               treating_consultant: { ...treating_consultant, specialty: text },
//             })
//           }
//         />
//         <Text style={styles.label}>Hospital</Text>
//         <TextInput
//           editable={isEditing}
//           style={styles.input}
//           value={treating_consultant?.hospital}
//           onChangeText={(text) =>
//             setExtractedData({
//               ...extractedData,
//               treating_consultant: { ...treating_consultant, hospital: text },
//             })
//           }
//         />

//         {/* Follow up date */}
//         <Text style={styles.sectionTitle}>Follow-Up Date</Text>
//         <TextInput
//           editable={isEditing}
//           style={styles.input}
//           value={discharge_details?.follow_up_date}
//           onChangeText={(text) =>
//             setExtractedData({
//               ...extractedData,
//               discharge_details: { ...discharge_details, follow_up_date: text },
//             })
//           }
//         />

//         {/* Prescribed Illness */}
//         <Text style={styles.sectionTitle}>Prescribed Illness</Text>
//         <TextInput
//           editable={isEditing}
//           style={styles.input}
//           value={discharge_details?.prescribed_illness}
//           onChangeText={(text) =>
//             setExtractedData({
//               ...extractedData,
//               discharge_details: {
//                 ...discharge_details,
//                 prescribed_illness: text,
//               },
//             })
//           }
//         />

//         {/* Medication Details */}
//         <Text style={styles.sectionTitle}>Medication Details</Text>
//         <View style={styles.line} />

//         {/* medicines */}
//         {discharge_details?.prescription?.length > 0 ? (
//           discharge_details.prescription.map((med: any, index: number) => (
//             <View key={index} style={styles.card}>
//               <Text style={styles.label}>Medicine Name</Text>
//               <TextInput
//                 editable={isEditing}
//                 style={styles.input}
//                 value={med?.medicine_name}
//                 onChangeText={(text) => {
//                   const updatedPrescription = [
//                     ...discharge_details.prescription,
//                   ];
//                   updatedPrescription[index].medicine_name = text;
//                   setExtractedData({
//                     ...extractedData,
//                     discharge_details: {
//                       ...discharge_details,
//                       prescription: updatedPrescription,
//                     },
//                   });
//                 }}
//               />
//               <Text style={styles.label}>Time</Text>
//               <TextInput
//                 editable={isEditing}
//                 style={styles.input}
//                 value={med?.time}
//                 onChangeText={(text) => {
//                   const updatedPrescription = [
//                     ...discharge_details.prescription,
//                   ];
//                   updatedPrescription[index].time = text;
//                   setExtractedData({
//                     ...extractedData,
//                     discharge_details: {
//                       ...discharge_details,
//                       prescription: updatedPrescription,
//                     },
//                   });
//                 }}
//               />
//               <Text style={styles.label}>Dosage</Text>
//               <TextInput
//                 editable={isEditing}
//                 style={styles.input}
//                 value={med?.dosage}
//                 onChangeText={(text) => {
//                   const updatedPrescription = [
//                     ...discharge_details.prescription,
//                   ];
//                   updatedPrescription[index].dosage = text;
//                   setExtractedData({
//                     ...extractedData,
//                     discharge_details: {
//                       ...discharge_details,
//                       prescription: updatedPrescription,
//                     },
//                   });
//                 }}
//               />
//               <Text style={styles.label}>Day</Text>
//               {/* i want the logic to setup days showing up here, with user able to modify it */}
//               <DaysCheckbox
//                 selectedDays={med?.days || []}
//                 onChange={(updatedDays) => {
//                   const updatedPrescription = [
//                     ...discharge_details.prescription,
//                   ];
//                   updatedPrescription[index].days = updatedDays;
//                   setExtractedData({
//                     ...extractedData,
//                     discharge_details: {
//                       ...discharge_details,
//                       prescription: updatedPrescription,
//                     },
//                   });
//                 }}
//               />
//             </View>
//           ))
//         ) : (
//           <Text>No medication details available.</Text>
//         )}

//         {/* Continue Button */}
//         <View style={styles.buttonContainer}>
//           <Button title="Continue" onPress={handleSave} />
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginTop: 20,
//   },
//   label: {
//     marginTop: 10,
//     fontSize: 16,
//   },
//   input: {
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginTop: 5,
//     paddingLeft: 10,
//     fontSize: 16,
//   },
//   card: {
//     marginBottom: 20,
//   },
//   line: {
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//     marginVertical: 10,
//   },
//   buttonContainer: {
//     marginTop: 20,
//   },
//   editButtonContainer: {
//     marginBottom: 20,
//   },
// });

// export default ReviewAndSubmit;

//second working:only days wokring remove the time compponenet

// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   TextInput,
//   Button,
//   Alert,
//   TouchableOpacity,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { stackScreens } from "../../../Navigation/RootNavigation";
// import { useUser } from "../../../UserContext";
// import DaysCheckbox from "./comp/DaysCheckbox";
// import TimeCheckbox from "./comp/TimeCheckbox";

// type propsType = NativeStackScreenProps<stackScreens, "ReviewAndSubmit">;

// const ReviewAndSubmit = ({ navigation }: propsType) => {
//   const [extractedData, setExtractedData] = useState<any>(null);
//   const [userDetails, setUserDetails] = useState<any>(null);
//   const [isEditing, setIsEditing] = useState<boolean>(false);
//   const { step, setStep } = useUser();

//   // Fetch userDetails from AsyncStorage
//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const storedUserDetails = await AsyncStorage.getItem("userDetails");
//         if (storedUserDetails) {
//           setUserDetails(JSON.parse(storedUserDetails));
//         } else {
//           console.log("No userDetails found in AsyncStorage.");
//         }
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//       }
//     };

//     fetchUserDetails();
//   }, []);

//   // Fetch extracted JSON data from AsyncStorage
//   useEffect(() => {
//     const fetchExtractedData = async () => {
//       try {
//         const jsonData = await AsyncStorage.getItem("Extractedjson");
//         if (jsonData != null) {
//           setExtractedData(JSON.parse(jsonData));
//         } else {
//           console.log("No data found for the key 'Extractedjson'.");
//         }
//       } catch (error) {
//         console.error("Error retrieving data from AsyncStorage:", error);
//       }
//     };

//     fetchExtractedData();
//   }, []);

//   // Handle saving the details into an object
//   const handleSave = async () => {
//     const saveData = {
//       userDetails,
//       treating_consultant: extractedData?.treating_consultant || {},
//       PlanActivatedDate: new Date(),
//       discharge_details: extractedData?.discharge_details || {},
//     };
//     console.log("saved data ", saveData.discharge_details.prescription);
//     try {
//       await AsyncStorage.setItem("SavedData", JSON.stringify(saveData));
//       Alert.alert("Success", "Health Plan has been Activated successfully!");
//       setStep(3);
//       navigation.goBack(); // Navigate back to the previous screen
//     } catch (error) {
//       console.error("Error saving data:", error);
//     }
//   };

//   if (!extractedData) {
//     return (
//       <View style={styles.container}>
//         <Text>No data available.</Text>
//       </View>
//     );
//   }

//   const { discharge_details, treating_consultant } = extractedData || {};

//   return (
//     <View style={styles.container}>
//       <ScrollView>
//         {/* Patient Information */}
//         {userDetails ? (
//           <>
//             <Text style={styles.sectionTitle}>Patient Information</Text>
//             <View style={styles.line} />
//             <Text style={styles.label}>Name</Text>
//             <TextInput
//               editable={isEditing}
//               style={styles.input}
//               value={userDetails.name}
//             />
//             <Text style={styles.label}>Age</Text>
//             <TextInput
//               editable={isEditing}
//               style={styles.input}
//               value={userDetails.age}
//             />
//           </>
//         ) : (
//           <Text>No patient details available.</Text>
//         )}

//         {/* Treating Consultant Information */}
//         <Text style={styles.sectionTitle}>Treating Consultant</Text>
//         <View style={styles.line} />
//         <Text style={styles.label}>Consultant Name</Text>
//         <TextInput
//           editable={isEditing}
//           style={styles.input}
//           value={treating_consultant?.name}
//         />

//         {/* Medication Details */}
//         <Text style={styles.sectionTitle}>Medication Details</Text>
//         <View style={styles.line} />
//         {discharge_details?.prescription?.length > 0 ? (
//           discharge_details.prescription.map((med: any, index: number) => (
//             <View key={index} style={styles.card}>
//               <Text style={styles.label}>Medicine Name</Text>
//               <TextInput
//                 editable={isEditing}
//                 style={styles.input}
//                 value={med?.medicine_name}
//               />
//               <Text style={styles.label}>Time</Text>
//               {/* <TextInput
//                 editable={isEditing}
//                 style={styles.input}
//                 value={med?.time}
//               />
//                */}
//               <TimeCheckbox
//                 selectedTime={med?.time || ["0", "0", "0", "0"]}
//                 onChange={(updatedTime) => {
//                   const updatedPrescription = [
//                     ...discharge_details.prescription,
//                   ];
//                   updatedPrescription[index].time = updatedTime;
//                   setExtractedData({
//                     ...extractedData,
//                     discharge_details: {
//                       ...discharge_details,
//                       prescription: updatedPrescription,
//                     },
//                   });
//                 }}
//               />

//               <Text style={styles.label}>Dosage</Text>
//               <TextInput
//                 editable={isEditing}
//                 style={styles.input}
//                 value={med?.dosage}
//               />
//               <Text style={styles.label}>Day</Text>

//               {/* Display Days with color change */}
//               <DaysCheckbox
//                 selectedDays={med?.days || []}
//                 onChange={(updatedDays) => {
//                   const updatedPrescription = [
//                     ...discharge_details.prescription,
//                   ];
//                   updatedPrescription[index].days = updatedDays;
//                   setExtractedData({
//                     ...extractedData,
//                     discharge_details: {
//                       ...discharge_details,
//                       prescription: updatedPrescription,
//                     },
//                   });
//                 }}
//               />
//             </View>
//           ))
//         ) : (
//           <Text>No medication details available.</Text>
//         )}

//         <View style={styles.buttonContainer}>
//           <Button title="Continue" onPress={handleSave} />
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginTop: 20,
//   },
//   label: {
//     marginTop: 10,
//     fontSize: 16,
//   },
//   input: {
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginTop: 5,
//     paddingLeft: 10,
//     fontSize: 16,
//   },
//   card: {
//     marginBottom: 20,
//   },
//   line: {
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//     marginVertical: 10,
//   },
//   buttonContainer: {
//     marginTop: 20,
//   },
// });

// export default ReviewAndSubmit;
//

/***
 *
 * third
 *
 *
 *
 */

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { stackScreens } from "../../../Navigation/RootNavigation";
import { useUser } from "../../../UserContext";
import DaysCheckbox from "./comp/DaysCheckbox";
import TimeCheckbox from "./comp/TimeCheckbox"; // Import TimeCheckbox
import axios from "axios";
import { API, getToken } from "../../../apiConfig";
import { ActivityIndicator } from "react-native-paper";

type propsType = NativeStackScreenProps<stackScreens, "ReviewAndSubmit">;

const ReviewAndSubmit = ({ navigation }: propsType) => {
  const [extractedData, setExtractedData] = useState<any>(null);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const { step, setStep, setIsPlanActivated } = useUser();

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
  const PlanActivatedDate = (() => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0"); // Ensure 2-digit day
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Ensure 2-digit month
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  })();

  const handleSave = async () => {
    const userId = await AsyncStorage.getItem("userId");

    const saveData = {
      userId,
      userDetails,
      treating_consultant: extractedData?.treating_consultant || {},
      PlanActivatedDate: PlanActivatedDate,
      discharge_details: extractedData?.discharge_details || {},
    };
    // console.log("saved data ", saveData);
    console.log("sending data to server ... ");
    try {
      const token = await getToken();

      // Set the Authorization header globally
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      if (!token) {
        console.log("no token for review submit");
        return;
      }
      console.log("sending data to server 11 ... ");
      await AsyncStorage.setItem("SavedData", JSON.stringify(saveData));

      // console.log("sending data to server ... ");
      // const response = await axios.post(
      //   "http://192.168.1.2:7000/saveData",
      //   saveData
      // );

      const response = await axios.post(`${API.SAVE_EXTRACTED_DATA}`, saveData);

      if (response.status === 200) {
        Alert.alert("Success", "Health Plan has been Activated successfully!");
        setStep(3);
        setIsPlanActivated(true);
        await AsyncStorage.setItem("planActivated", "true");

        navigation.goBack(); // Navigate back to the previous screen
      } else {
        Alert.alert(
          "Error",
          "Failed to activate health plan. Please try again."
        );
        setIsPlanActivated(false);
        await AsyncStorage.setItem("planActivated", "false");
      }
    } catch (error) {
      setIsPlanActivated(false);
      console.error("Error saving data:", error);
    }
  };

  if (!extractedData) {
    return (
      <View style={styles.container}>
        <Text>No data available.</Text>
      </View>
    );
  }

  const { discharge_details, treating_consultant } = extractedData || {};
  console.log("user details ", userDetails.age);

  return (
    <View style={styles.container}>
      <ScrollView>
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
            />
            <Text style={styles.label}>Age</Text>
            <TextInput
              editable={isEditing}
              style={styles.input}
              value={String(userDetails.age)}
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
              value={userDetails.dateOfBirth.split("T")[0]}
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
        />
        <Text style={styles.label}>Specialty</Text>
        <TextInput
          editable={isEditing}
          style={styles.input}
          value={treating_consultant?.specialty}
          onChangeText={(text) =>
            setExtractedData({
              ...extractedData,
              treating_consultant: {
                ...treating_consultant,
                specialty: text,
              },
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

        <Text style={styles.sectionTitle}>Follow-Up Date</Text>
        <TextInput
          editable={isEditing}
          style={styles.input}
          value={discharge_details?.follow_up_date}
          onChangeText={(text) =>
            setExtractedData({
              ...extractedData,
              discharge_details: {
                ...discharge_details,
                follow_up_date: text,
              },
            })
          }
        />
        {/* Medication Details */}
        <Text style={styles.sectionTitle}>Medication Details</Text>
        <View style={styles.line} />
        {discharge_details?.prescription?.length > 0 ? (
          discharge_details.prescription.map((med: any, index: number) => (
            <View key={index} style={styles.card}>
              <Text style={styles.label}>Medicine {index + 1}</Text>
              <TextInput
                editable={isEditing}
                style={styles.input}
                value={med?.medicine_name}
              />
              <Text style={styles.label}>Intake Time</Text>
              {/* Add TimeCheckbox for the medication */}
              <TimeCheckbox
                selectedTime={med?.time || ["0", "0", "0", "0"]}
                onChange={(updatedTime) => {
                  const updatedPrescription = [
                    ...discharge_details.prescription,
                  ];
                  updatedPrescription[index].time = updatedTime;
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
              />
              <Text style={styles.label}>Choose Day</Text>

              {/* Display Days with color change */}
              <DaysCheckbox
                selectedDays={med?.days || []}
                onChange={(updatedDays) => {
                  const updatedPrescription = [
                    ...discharge_details.prescription,
                  ];
                  updatedPrescription[index].days = updatedDays;
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

        <View style={styles.buttonContainer}>
          <Button title="Continue" onPress={handleSave} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "grey",
    borderWidth: 1,
    paddingLeft: 10,
    marginTop: 5,
  },
  line: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
  card: {
    marginBottom: 20,
    borderWidth: 0.3, // Thickness of the border
    borderColor: "black", // Color of the border
    borderRadius: 2,
    padding: 4,
  },
  buttonContainer: {
    marginTop: 30,
  },
});

export default ReviewAndSubmit;
