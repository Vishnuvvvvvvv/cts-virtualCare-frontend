// import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
// import React, { useEffect, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const HomeScreen = () => {
//   const [extractedData, setExtractedData] = useState<any>(null);
//   const [prescription, setPrescription] = useState<any>(null);

//   useEffect(() => {
//     const fetchExtractedData = async () => {
//       try {
//         const jsonData = await AsyncStorage.getItem("Extractedjson");
//         if (jsonData != null) {
//           const parsedData = JSON.parse(jsonData);
//           setExtractedData(parsedData);
//           setPrescription(parsedData.discharge_details.prescription);
//         } else {
//           console.log("No data found for the key 'Extractedjson'.");
//         }
//       } catch (error) {
//         console.error("Error retrieving data from AsyncStorage:", error);
//       }
//     };

//     fetchExtractedData();
//   }, []);

//   // Toggle day selection
//   const toggleDay = (medIndex: number, dayIndex: number) => {
//     if (!prescription) return;

//     const updatedPrescription = prescription.map((med: any, index: number) =>
//       index === medIndex
//         ? {
//             ...med,
//             days: med.days
//               .split("")
//               .map((d, i) => (i === dayIndex ? (d === "1" ? "0" : "1") : d))
//               .join(""),
//           }
//         : med
//     );
//     setPrescription(updatedPrescription);
//   };

//   const days = ["Mn", "Tu", "Wd", "Th", "Fr", "St", "Sn"];

//   return (
//     <View style={styles.center}>
//       {prescription?.map((med: any, medIndex: number) => (
//         <View key={medIndex} style={styles.medicineContainer}>
//           <Text style={styles.medicineName}>{med.medicine_name}</Text>
//           <View style={styles.daysContainer}>
//             {med.days.split("").map((day: string, dayIndex: number) => (
//               <TouchableOpacity
//                 key={dayIndex}
//                 style={[
//                   styles.day,
//                   day === "1" ? styles.greenStyle : styles.redStyle,
//                 ]}
//                 onPress={() => toggleDay(medIndex, dayIndex)}
//               >
//                 <Text style={styles.dayText}>{days[dayIndex]}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>
//       ))}
//     </View>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   center: {
//     marginTop: 50,
//     paddingHorizontal: 20,
//   },
//   medicineContainer: {
//     marginBottom: 20,
//   },
//   medicineName: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   daysContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//   },
//   day: {
//     margin: 5,
//     padding: 10,
//     borderRadius: 5,
//   },
//   greenStyle: {
//     backgroundColor: "green",
//   },
//   redStyle: {
//     backgroundColor: "red",
//   },
//   dayText: {
//     color: "white",
//     fontWeight: "bold",
//   },
// });

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MedicineTracker from "./DailyMedication/DailyMedication";
import HealthReport from "./HealthReport/HealthReport";
const HomeScreen = () => {
  return <></>;
};

export default HomeScreen;

const styles = StyleSheet.create({});
