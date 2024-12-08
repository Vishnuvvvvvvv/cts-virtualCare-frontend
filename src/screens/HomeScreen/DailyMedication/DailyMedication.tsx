import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
// import {  } from "react-native-paper/lib/typescript/components/Avatar/Avatar";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../../../UserContext";

const DailyMedication = () => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  //   const prescription = [
  //     {
  //       days: "1111000",
  //       dosage: "1 Morning, 1 Night (After Food)",
  //       duration: "10 Days",
  //       medicine_name: "TAB-ALCOMETASONE",
  //       time: "1010",
  //     },
  //     {
  //       days: "1100111",
  //       dosage: "1 Morning, 1 Night (After Food)",
  //       duration: "10 Days",
  //       medicine_name: "TAB-NAPROXEN",
  //       time: "1100",
  //     },
  //   ];

  const [dayWiseMedicinePresciption, setdayWiseMedicinePresciption] =
    useState<any>(null);
  const { isPlanActivated } = useUser();

  //   if (!isPlanActivated) return;

  useEffect(() => {
    const fetchPrescriptionData = async () => {
      try {
        // Retrieve the saved data from AsyncStorage
        let storedData = (await AsyncStorage.getItem("SavedData")) as any;
        storedData = JSON.parse(storedData);
        console.log("::", storedData?.discharge_details?.prescription);
        if (storedData) {
          // Parse the data if it's in JSON format
          setdayWiseMedicinePresciption(
            storedData?.discharge_details?.prescription
          );
        } else {
          console.warn("No data found in AsyncStorage for key: savedData");
          setdayWiseMedicinePresciption(null);
        }
      } catch (error) {
        console.error("Error fetching prescription data: ", error);
      }
      //    finally {
      //     setLoading(false);
      //   }
    };

    fetchPrescriptionData();
    console.log("the data is :", dayWiseMedicinePresciption);
  }, [isPlanActivated]);

  console.log("the data is here :", dayWiseMedicinePresciption);
  const [medicinesForToday, setMedicinesForToday] = useState({
    morning: [] as any,
    noon: [] as any,
    evening: [] as any,
    night: [] as any,
  });
  /**
  useEffect(() => {
    const today = new Date();

    // Get the day of the week (0-6) //get today
    const dayIndex = today.getDay();

    const dayName = daysOfWeek[dayIndex];

    console.log("Today is:", dayName);
    const medicines = {
      morning: [] as any,
      noon: [] as any,
      evening: [] as any,
      night: [] as any,
    };

    prescription.forEach((med) => {
      //if that medicine is prescribed for today
      const medicine_info = {
        name: med.medicine_name,
        dosage: med.dosage,
        status: "waiting",
      };

      // Check each time slot for this medicine and add it accordingly
      if (med.time[0] === "1") medicines.morning.push(medicine_info);
      if (med.time[1] === "1") medicines.noon.push(medicine_info);
      if (med.time[2] === "1") medicines.evening.push(medicine_info);
      if (med.time[3] === "1") medicines.night.push(medicine_info);
    });

    setMedicinesForToday(medicines);
    console.log(
      "Medicines for today:",
      JSON.stringify(medicinesForToday, null, 2)
    );
   }, []);
**/

  useEffect(() => {
    const processPrescriptionForToday = async () => {
      const today = new Date();
      const dayIndex = today.getDay(); // Get the day of the week (0-6)
      const todayKey = `todaysReminders-${today.toISOString().split("T")[0]}`; // YYYY-MM-DD key

      try {
        // Check if today's data already exists in AsyncStorage
        const storedData = await AsyncStorage.getItem(todayKey);

        if (storedData) {
          // Load data if already processed for today
          setMedicinesForToday(JSON.parse(storedData));
        } else if (dayWiseMedicinePresciption) {
          // Process `dayWiseMedicinePrescription` for today's medicines
          const medicines = {
            morning: [] as any,
            noon: [] as any,
            evening: [] as any,
            night: [] as any,
          };

          dayWiseMedicinePresciption?.forEach((med: any) => {
            const medicine_info = {
              name: med.medicine_name,
              dosage: med.dosage,
              status: "waiting",
            };

            // Check time slots and add to medicines
            if (med.time[0] === "1") medicines.morning.push(medicine_info);
            if (med.time[1] === "1") medicines.noon.push(medicine_info);
            if (med.time[2] === "1") medicines.evening.push(medicine_info);
            if (med.time[3] === "1") medicines.night.push(medicine_info);
          });

          // Save processed data to AsyncStorage
          await AsyncStorage.setItem(todayKey, JSON.stringify(medicines));

          // Update state
          setMedicinesForToday(medicines);
        }
      } catch (error) {
        console.error("Error processing prescription for today: ", error);
      }
    };

    processPrescriptionForToday();
  }, [dayWiseMedicinePresciption]);

  const getRoundContainerStyle = (status: string) => {
    if (status === "done") {
      return styles.doneContainer; // Green color
    } else if (status === "missed") {
      return styles.missedContainer; // Red color
    } else if (status === "waiting") {
      return styles.waitingContainer; // Light blue color
    }
    return {}; // Default (empty) style if no match
  };
  type TimeSlot = "morning" | "noon" | "evening" | "night";

  const updateMedicineStatus = (
    timeSlot: TimeSlot,
    name: any,
    newStatus: any
  ) => {
    setMedicinesForToday((prevState) => {
      const updatedState = { ...prevState };

      updatedState[timeSlot] = updatedState[timeSlot].map((med: any) =>
        med.name === name ? { ...med, status: newStatus } : med
      );
      // Save updated state to AsyncStorage
      const todayKey = `todaysReminders-${
        new Date().toISOString().split("T")[0]
      }`;
      AsyncStorage.setItem(todayKey, JSON.stringify(updatedState)).catch(
        (err) =>
          console.error("Error saving updated status to AsyncStorage: ", err)
      );

      return updatedState;
    });

    // console.log(
    //   "Medicines for today updated as :",
    //   JSON.stringify(medicinesForToday, null, 2)
    // );
  };

  useEffect(() => {
    console.log(
      "Medicines for today updated as:",
      JSON.stringify(medicinesForToday, null, 2)
    );
  }, [medicinesForToday]);

  const MedicineList = ({
    data,
    timeSlot,
  }: {
    data: any[];
    timeSlot: TimeSlot;
  }) => {
    console.log("data ", data);
    if (data.length === 0) return <Text>No medicine for this time slot</Text>;

    return (
      <>
        {data.map((medicine, index) => (
          <View style={styles.MedMainCont}>
            <View
              style={[
                styles.roundContainer,
                getRoundContainerStyle(medicine.status),
              ]}
            >
              {medicine.status === "done" && (
                <Image
                  style={styles.doneIcon}
                  source={require("../../../../assets/homeScreen/Done.png")}
                ></Image>
              )}
              {medicine.status === "waiting" && (
                <Image
                  style={styles.doneIcon}
                  source={require("../../../../assets/homeScreen/upcomming.png")}
                ></Image>
              )}
              {medicine.status === "missed" && (
                <Image
                  style={styles.doneIcon}
                  source={require("../../../../assets/homeScreen/Unchecked.png")}
                ></Image>
              )}
            </View>
            <View key={index} style={styles.SingleMedicineWrapper}>
              <View style={styles.textComp}>
                <Text>{medicine.name}</Text>
                <Text>Dos : {medicine.dosage}</Text>
              </View>
              <Picker
                selectedValue={medicine.status}
                onValueChange={(newValue) =>
                  updateMedicineStatus(timeSlot, medicine.name, newValue)
                }
                style={{
                  width: 45,
                  height: 20,
                  backgroundColor: "#FFFFFF",
                  marginLeft: 8,
                }}
              >
                {/* <Picker.Item label="Waiting" value="waiting" /> */}
                <Picker.Item label="Done" value="done" />
                <Picker.Item label="Missed" value="missed" />
              </Picker>
            </View>
          </View>
        ))}
      </>
    );
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Today's Medication</Text> */}

      <View style={styles.timeSlotContainer}>
        <Text style={styles.timeSlot}>Morning</Text>
        <Image
          source={require("../../../../assets/homeScreen/Sun.png")} // Update the path based on your file location
          style={styles.icon}
        ></Image>
      </View>

      <MedicineList data={medicinesForToday.morning} timeSlot="morning" />

      <View style={styles.timeSlotContainer}>
        <Text style={styles.timeSlot}>Noon</Text>
        <Image
          source={require("../../../../assets/homeScreen/NoonSun.png")} // Update the path based on your file location
          style={styles.icon}
        ></Image>
      </View>
      <MedicineList data={medicinesForToday.noon} timeSlot="noon" />

      <View style={styles.timeSlotContainer}>
        <Text style={styles.timeSlot}>Evening</Text>
        <Image
          source={require("../../../../assets/homeScreen/Evening.png")} // Update the path based on your file location
          style={styles.icon}
        ></Image>
      </View>
      <MedicineList data={medicinesForToday.evening} timeSlot="evening" />

      <View style={styles.timeSlotContainer}>
        <Text style={styles.timeSlot}>Night</Text>
        <Image
          source={require("../../../../assets/homeScreen/Night.png")} // Update the path based on your file location
          style={styles.iconNight}
        ></Image>
      </View>
      <MedicineList data={medicinesForToday.night} timeSlot="night" />
    </View>
  );
};

export default DailyMedication;

const styles = StyleSheet.create({
  container: {
    // padding: 16,
    // backgroundColor: "#f5f5f5",
    // flex: 1,

    justifyContent: "center",
    alignItems: "center",
    paddingTop: "10%",
    backgroundColor: "#FFFFFF",
    height: "100%",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    // marginBottom: 10,
  },
  timeSlotContainer: {
    flexDirection: "row", // Aligns items horizontally
    alignItems: "center", // Vertically centers the text and icon
    // backgroundColor: "red",
    textAlign: "center",
    justifyContent: "space-around",
    width: "40%",
    height: "12%",
  },
  timeSlot: {
    fontSize: 20,
    fontWeight: "600",
    // marginTop
  },
  icon: {
    width: 40, // Adjust width of the image
    height: 40, // Adjust height of the image
  },
  iconNight: {
    width: 36,
    height: 35,
  },

  SingleMedicineWrapper: {
    backgroundColor: "#F8F8F8",
    marginBottom: 10,
    width: "80%",
    justifyContent: "flex-end",
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#F8F8F8",

    // display: "flex",
  },
  textComp: {
    paddingTop: 5,
  },
  roundContainer: {
    backgroundColor: "blue",
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  doneIcon: {
    width: 30,
    height: 30,
  },
  MedMainCont: {
    flexDirection: "row",
  },
  doneContainer: {
    backgroundColor: "green",
  },
  missedContainer: {
    backgroundColor: "#BC3B3B",
  },
  waitingContainer: {
    backgroundColor: "lightblue",
  },
});
