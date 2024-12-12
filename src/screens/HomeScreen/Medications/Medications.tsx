import { FlatList, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API } from "../../../apiConfig";
const Medications = () => {
  const [medications, setMedications] = useState();
  const [userId, setUserId] = useState("John David");
  // Fetch and parse data from AsyncStorage

  function processMedicineData(data: any) {
    // Mapping binary index to day strings
    const dayMapping = ["Mn", "Tu", "Wd", "Th", "Fr", "Sa", "Su"];
    // Mapping binary index to time strings
    const timeMapping = ["Mn", "Nn", "Ev", "Nt"];

    // Process each item in the data array
    return data.map((item: any) => {
      // Convert binary days to readable format
      const daysArray = item.days.split("");
      const readableDays = daysArray
        .map((value: any, index: any) =>
          value === "1" ? dayMapping[index] : null
        )
        .filter(Boolean)
        .join(", ");

      // Convert binary time to readable format
      const timeArray = item.time.split("");
      const readableTime = timeArray
        .map((value: any, index: any) =>
          value === "1" ? timeMapping[index] : null
        )
        .filter(Boolean)
        .join(", ");

      // Return the processed item with updated fields
      return {
        ...item,
        days: readableDays,
        time: readableTime,
      };
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // let data = await AsyncStorage.getItem("SavedData");
        console.log("calling request : ", `${API.GET_SAVED_DATA}/${userId}`);
        const response = await axios.get(`${API.GET_SAVED_DATA}/${userId}`);
        if (response.status === 200 && response.data) {
          console.log(
            "Fetched prescription data from backend:",
            response.data?.discharge_details?.prescription
          );
          const processedMedData = processMedicineData(
            response.data?.discharge_details?.prescription
          );

          console.log("prescription ", processedMedData);
          setMedications(processedMedData);
        } else {
          console.warn("No prescription data found or failed to fetch");
          //   setdayWiseMedicinePresciption(null);
        }

        // if (data) {
        //   const parsedData = JSON.parse(data);
        //   console.log("Parsed data: ", parsedData.userDetails);

        //   const processedMedData = processMedicineData(
        //     parsedData.discharge_details.prescription
        //   );
        //   setMedications(processedMedData);
        // }
      } catch (error) {
        console.error("Error fetching savedData:", error);
      }
    };

    fetchData();
  }, []);

  const renderMedicationItem = ({ item }: any) => (
    <View style={styles.medicationCard} key={item.medicine_name}>
      <View style={styles.medicationNameHeading}>
        <Image
          style={styles.imgIcon}
          source={require("../../../../assets/updateHealthIcons/Pills.png")}
        />
        <Text style={styles.nameTxt}> {item.medicine_name}</Text>
      </View>
      <View style={styles.medicationDetail}>
        <Text style={styles.medicationDetailText}>
          <Text style={styles.label}>Days :</Text>
          {item.days}
        </Text>
        <Text style={styles.medicationDetailText}>
          <Text style={styles.label}>Time :</Text>
          {item.time}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {medications && (
        <FlatList
          data={medications}
          keyExtractor={(item) => item.id}
          renderItem={renderMedicationItem}
        />
      )}
    </View>
  );
};

export default Medications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  medicationCard: {
    borderWidth: 1,
    borderColor: "#007BFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#F9F9F9",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    height: 150,
  },
  medicationNameHeading: {
    // fontSize: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 25,
  },
  imgIcon: {
    width: 30,
    height: 30,
  },
  imgIcon1: {
    width: 20,
    height: 26,
  },
  imgIcon2: {
    width: 24,
    height: 23,
    marginLeft: 10,
  },

  nameTxt: {
    fontWeight: "bold",
    fontSize: 16,
  },
  iconContainer: {
    // width: 80,
    flexDirection: "row", // For horizontal alignment
    // justifyContent: "flex-end", // Align items to the left
    position: "absolute", // Makes the icons fixed at// Optional, aligns items vertically
    // borderWidth: 3,
    right: 0,
    alignItems: "center",
    paddingLeft: "10%",
  },
  medicationDetail: {
    paddingTop: 25,
  },
  medicationDetailText: {
    marginBottom: 7,
    fontSize: 14,
    color: "#666666",
  },
  label: {
    fontWeight: "bold",
    color: "#333333",
  },
});
