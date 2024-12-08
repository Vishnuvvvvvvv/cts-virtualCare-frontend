import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

const UpdateMedicationDetails = () => {
  const [medications, setMedications] = useState([
    {
      id: "1",
      name: "Tab Ceftum",
      days: "M, Tu, W, Th, Fr",
      time: "M, N, E, Nt",
    },
    {
      id: "2",
      name: "Tab WysoLone",
      days: "M, Tu, W, Th, Fr",
      time: "M, N, E, Nt",
    },
  ]);
  const handleAddNewMedication = () => {
    console.log("Add New Medication");
  };
  const renderMedicationItem = ({ item }: any) => (
    <View style={styles.medicationCard}>
      <View style={styles.medicationNameHeading}>
        <Image
          style={styles.imgIcon}
          source={require("../../../../assets/updateHealthIcons/Pills.png")}
        />
        <Text style={styles.nameTxt}> {item.name}</Text>

        <View style={styles.iconContainer}>
          <View>
            <Image
              style={styles.imgIcon1}
              source={require("../../../../assets/updateHealthIcons/delete.png")}
            />
          </View>

          <View>
            <Image
              style={styles.imgIcon2}
              source={require("../../../../assets/updateHealthIcons/edit.png")}
            />
          </View>
        </View>
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
      <Text style={styles.title}>Medication Details</Text>

      <FlatList
        data={medications}
        keyExtractor={(item) => item.id}
        renderItem={renderMedicationItem}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddNewMedication}
      >
        <Image
          style={styles.imgIcon}
          source={require("../../../../assets/updateHealthIcons/add.png")}
        />
        <Text style={styles.addButtonText}>Add New Medication</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateMedicationDetails;

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

  addButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    // borderWidth: 1,
    // borderColor: "#007BFF",
    borderRadius: 5,
    alignSelf: "center",
  },
  addButtonText: {
    fontSize: 16,
    color: "#007BFF",
    marginLeft: 5,
  },
});
