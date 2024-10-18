import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ReviewAndSubmit = () => {
  const [extractedData, setExtractedData] = useState<any>(null); // State to hold the extracted JSON from the medical document
  const [userDetails, setUserDetails] = useState<any>(null); // State to hold the user details

  // Fetch userDetails from AsyncStorage
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const storedUserDetails = await AsyncStorage.getItem("userDetails");
        if (storedUserDetails) {
          setUserDetails(JSON.parse(storedUserDetails)); // Parse the JSON string
        } else {
          console.log("No userDetails found in AsyncStorage.");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails(); // Call the async function
  }, []);

  // Fetch extracted JSON data from AsyncStorage
  useEffect(() => {
    const fetchExtractedData = async () => {
      try {
        const jsonData = await AsyncStorage.getItem("Extractedjson");
        if (jsonData != null) {
          setExtractedData(JSON.parse(jsonData)); // Parse the JSON string into an object
        } else {
          console.log("No data found for the key 'Extractedjson'.");
        }
      } catch (error) {
        console.error("Error retrieving data from AsyncStorage:", error);
      }
    };

    fetchExtractedData(); // Call the async function
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // If no extractedData exists, display a message
  if (!extractedData) {
    return (
      <View style={styles.container}>
        <Text>No data available.</Text>
      </View>
    );
  }

  // Extract specific data from the extracted JSON
  const { discharge_details, treating_consultant } = extractedData || {};

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.heading}>Review and Submit</Text>

        {/* Display the entire extracted data */}
        {extractedData ? (
          <Text>{JSON.stringify(extractedData, null, 2)}</Text> // Pretty-print JSON
        ) : (
          <Text>No data available.</Text>
        )}

        {/* Patient Information */}
        {userDetails ? (
          <>
            <Text style={styles.sectionTitle}>Patient Information</Text>
            <Text>Name: {userDetails?.name || "N/A"}</Text>
            <Text>Age: {userDetails?.age || "N/A"}</Text>
            <Text>Gender: {userDetails?.gender || "N/A"}</Text>
            <Text>DOB: {userDetails?.dateOfBirth || "N/A"}</Text>
          </>
        ) : (
          <Text>No patient details available.</Text>
        )}

        {/* Treating Consultant Information */}
        <Text style={styles.sectionTitle}>Treating Consultant</Text>
        <Text>Name: {treating_consultant?.name || "N/A"}</Text>
        <Text>Specialty: {treating_consultant?.specialty || "N/A"}</Text>
        <Text>Hospital: {treating_consultant?.hospital || "N/A"}</Text>

        {/* Medication Details */}
        <Text style={styles.sectionTitle}>Medication Details</Text>
        {discharge_details?.prescription?.length > 0 ? (
          discharge_details.prescription.map((med: any, index: number) => (
            <View key={index} style={styles.card}>
              <Text>Name: {med?.medicine_name || "N/A"}</Text>
              <Text>Qty: {med?.qty || "N/A"}</Text>
              <Text>Time: {med?.dosage || "N/A"}</Text>
              <Text>Duration: {med?.duration || "N/A"}</Text>
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
