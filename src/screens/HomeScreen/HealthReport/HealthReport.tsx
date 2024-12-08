import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Print from "expo-print"; // Import expo-print
import * as Sharing from "expo-sharing"; // Import expo-sharing

const PatientReport = () => {
  const patientDetails = {
    name: "John David",
    age: "54 years",
    bloodGroup: "B+",
    illness: "Acute Myocardial Infarction",
  };

  const medications = ["Paracetamol", "Xyz Tablets", "ABC Tabs"];

  const [summary, setSummary] = useState(
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, tempore neque dignissimos esse praesentium voluptatibus accusantium voluptas sequi suscipit. Nihil consequuntur dolore excepturi est perspiciatis ad quod officia velit praesentium? "
  );

  const medicatn = medications.map((med, index) => {
    return (
      <View key={index}>
        <Text style={styles.listItem}>• {med}</Text>
      </View>
    );
  });

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
      .map((med, index) => {
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
      <View style={styles.downloadButton}>
        <Button title="Download PDF" onPress={downloadReport} />
      </View>

      <Text style={styles.dateRange}>
        Dated: 12-06-2023 to {getTodayDate()}
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardText}>
          <Text style={styles.cardTitle}>Patient Name: </Text>
          {patientDetails.name}
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.cardTitle}>Age: </Text>
          {patientDetails.age}
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.cardTitle}>Blood Group: </Text>
          {patientDetails.bloodGroup}
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.cardTitle}>Prescribed Illness: </Text>
          {patientDetails.illness}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Medication Details</Text>
      {medicatn}

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
    paddingTop: "20%",
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
    top: 40,
    right: 25,
    zIndex: 10,
  },
});
