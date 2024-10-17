import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ReviewAndSubmit = () => {
  const [extractedData, setExtractedData] = useState(null); // State to hold the extracted JSON

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("Extractedjson");
        if (jsonValue != null) {
          // Parse the JSON string into an object
          setExtractedData(JSON.parse(jsonValue));
        } else {
          console.log("No data found for the key 'Extractedjson'.");
        }
      } catch (error) {
        console.error("Error retrieving data from AsyncStorage:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // If the extractedData exists, map the data accordingly
  if (!extractedData) {
    return (
      <View style={styles.container}>
        <Text>No data available.</Text>
      </View>
    );
  }

  // Extract specific data from the JSON (based on expected structure)
  const { discharge_details, patient, treating_consultant } = extractedData;

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.heading}>Review and Submit</Text>

        {extractedData ? (
          <Text>{JSON.stringify(extractedData, null, 2)}</Text> // Display the extracted data
        ) : (
          <Text>No data available.</Text>
        )}

        <Text style={styles.sectionTitle}>Patient Information</Text>
        <Text>Name: {patient?.name || "N/A"}</Text>
        <Text>Age: {patient?.age || "N/A"}</Text>

        <Text style={styles.sectionTitle}>Treating Consultant</Text>
        <Text>Name: {treating_consultant?.name || "N/A"}</Text>
        <Text>Specialty: {treating_consultant?.specialty || "N/A"}</Text>
        <Text>Hospital: {treating_consultant?.hospital || "N/A"}</Text>

        <Text style={styles.sectionTitle}>Medication Details</Text>
        {discharge_details?.prescription?.length > 0 ? (
          discharge_details.prescription.map((med, index) => (
            <View key={index} style={styles.card}>
              <Text>Name: {med.name || "N/A"}</Text>
              <Text>Qty: {med.qty || "N/A"}</Text>
              <Text>Time: {med.time || "N/A"}</Text>
              <Text>Duration: {med.duration || "N/A"}</Text>
            </View>
          ))
        ) : (
          <Text>No medication details available.</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default ReviewAndSubmit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 20,
  },
});
