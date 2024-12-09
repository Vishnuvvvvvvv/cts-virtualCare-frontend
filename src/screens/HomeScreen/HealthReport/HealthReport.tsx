import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as Print from "expo-print"; // Import expo-print
import * as Sharing from "expo-sharing"; // Import expo-sharing
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const PatientReport = () => {
  const patientDetails = {
    name: "John David",
    age: "54 years",
    bloodGroup: "B+",
    illness: "Acute Myocardial Infarction",
  };

  //   const medications = ["Paracetamol", "Xyz Tablets", "ABC Tabs"];
  const [medications, setMedications] = useState([] as any);
  const [fullDetails, setFullDetails] = useState({} as any);
  const [summary, setSummary] = useState("Preparing summary...");

  const medicatn = medications?.map((med: any, index: any) => {
    return (
      <View key={index}>
        <Text style={styles.listItem}>• {med.medicine_name}</Text>
      </View>
    );
  });

  const prepareAndSendSummary = async () => {
    try {
      // Fetch all keys
      const allKeys = await AsyncStorage.getAllKeys();

      // Filter relevant keys
      const savedDataKey = "SavedData";
      const symptomKeys = allKeys.filter((key) => key.startsWith("symptoms-"));
      const reminderKeys = allKeys.filter((key) =>
        key.startsWith("todaysReminders-")
      );

      // Fetch data for these keys
      const savedData = await AsyncStorage.getItem(savedDataKey);
      const symptomsData = await Promise.all(
        symptomKeys.map(async (key) => ({
          date: key.replace("symptoms-", ""),
          value: await AsyncStorage.getItem(key),
        }))
      );

      const remindersData = await Promise.all(
        reminderKeys.map(async (key) => ({
          date: key.replace("todaysReminders-", ""),
          value: await AsyncStorage.getItem(key),
        }))
      );

      // Structure the data
      const summaryObject = {
        savedData: savedData ? JSON.parse(savedData) : null,
        symptoms: symptomsData.reduce((acc: any, { date, value }) => {
          acc[date] = value;
          return acc;
        }, {}),
        todaysReminders: remindersData.reduce((acc: any, { date, value }) => {
          acc[date] = JSON.parse(value || "{}");
          return acc;
        }, {}),
      };

      console.log("Prepared Summary Object:", summaryObject);
      setFullDetails(summaryObject);

      // Send to backend
      //   const response = await axios.post(
      //     "https://192.168.1.3/summarize",
      //     summaryObject
      //   );
      //   console.log("Backend Response:", response.data);
      return summaryObject;
    } catch (error) {
      console.error("Error preparing or sending summary:", error);
    }
  };

  let summaryObject = {} as any;

  useEffect(() => {
    if (summaryObject)
      setMedications(fullDetails?.savedData?.discharge_details?.prescription);
  }, [fullDetails]);

  useEffect(() => {
    async function fetchSummary() {
      summaryObject = await prepareAndSendSummary();
      console.log(
        "medicatiosn : ",
        fullDetails?.savedData?.discharge_details?.prescription
      );

      //   console.log("going to next");
      const response = await axios.post("http://192.168.1.7:3001/summarize", {
        summaryObject,
      });
      console.log("going to next 2");
      console.log("summ : ", response.data);
      setSummary(response.data.summary); // Save the response for rendering
    }

    fetchSummary();
  }, []);

  const getTodayDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0"); // Ensures 2-digit day
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Ensures 2-digit month
    const year = today.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const downloadReport = async () => {
    // HTML content to generate the PDF

    const medicationList = medications
      .map((med: any, index: any) => {
        return `• ${med}`;
      })
      .join("<br />");

    const content = `
    <html>
      <body>
        <h1>Patient Report</h1>
        <p><strong>Dated:</strong> 12-06-2023 to ${getTodayDate()}</p>
        <h2>Patient Details</h2>
        <p><strong>Name:</strong> ${patientDetails.name}</p>
        <p><strong>Age:</strong> ${patientDetails.age}</p>
        <p><strong>Blood Group:</strong> ${patientDetails.bloodGroup}</p>
        <p><strong>Prescribed Illness:</strong> ${patientDetails.illness}</p>
        <h2>Medications</h2>
        <p>
        
        ${medicationList}
        
        </p>
        <h2>Report Summary</h2>
        <p>${summary}</p>
      </body>
    </html>`;

    // Generate PDF from HTML content
    try {
      const file = await Print.printToFileAsync({
        html: content,
        base64: false, // Don't use base64 encoding
      });

      await Sharing.shareAsync(file.uri);

      // Request permission to write to the directory
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", `Failed to generate PDF: ${error.message}`);
      } else {
        Alert.alert("Error", "An unknown error occurred.");
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.downloadButton}>
        <Button title="Download PDF" onPress={downloadReport} />
      </View> */}
      <View style={styles.downloadButton}>
        <TouchableOpacity onPress={downloadReport}>
          {/* <Icon name="download" size={30} color="#000" />  */}
          {/* Replace name="download" with the specific icon name you prefer */}

          <Image
            style={styles.downloadIcon}
            source={require("../../../../assets/homeScreen/DownloadIcon.png")}
          ></Image>
        </TouchableOpacity>
      </View>

      <Text style={styles.dateRange}>
        Dated: {fullDetails?.savedData?.PlanActivatedDate} to {getTodayDate()}
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardText}>
          <Text style={styles.cardTitle}>Patient Name: </Text>
          {fullDetails?.savedData?.userDetails?.name}
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.cardTitle}>Age: </Text>
          {fullDetails?.savedData?.userDetails?.age}
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.cardTitle}>Blood Group: </Text>
          {fullDetails?.savedData?.userDetails?.gender}
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.cardTitle}>Prescribed Illness: </Text>
          {fullDetails?.savedData?.userDetails?.prescribed_illness}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Medication Details</Text>
      {medications && medicatn}

      <Text style={styles.sectionTitle}>Report Summary</Text>
      <Text>{summary}</Text>
    </View>
  );
};

export default PatientReport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: "10%",
    backgroundColor: "#f8f8f8",
  },
  dateRange: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "left",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  cardText: {
    fontSize: 14,
    marginBottom: 5,
    color: "#333",
  },
  cardTitle: {
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  listItem: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  downloadButton: {
    position: "absolute",
    top: 30,
    right: 25,
    zIndex: 10,
    // backgroundColor: "",
  },
  // iconButton: {
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  downloadIcon: {
    width: 30,
    height: 30,
  },
});
