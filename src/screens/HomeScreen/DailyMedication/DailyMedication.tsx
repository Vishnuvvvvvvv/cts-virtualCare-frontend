import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../../../UserContext";
import axios from "axios";
import { API, getTokenAndCheckExpiry } from "../../../apiConfig";
import { getToken } from "../../../apiConfig";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";

const DailyMedication = () => {
  const { navigation } = useNavigation<any>(); //new line
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [dayWiseMedicinePresciption, setdayWiseMedicinePresciption] =
    useState<any>(null);
  const { isPlanActivated } = useUser();

  const fetchUserId = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem("userId");
      if (storedUserId !== null) {
        console.log("stored user id in async storage ", storedUserId);
        return storedUserId; // Update state with the userId from AsyncStorage
      }
    } catch (error) {
      console.log("Error fetching userId from AsyncStorage:", error);
    }
  };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // if (!userId) return;
    const fetchPrescriptionData = async () => {
      try {
        const token = await getToken();
        if (!token) {
          console.log("no token -Daily Med");
          return;
        }
        // Set the Authorization header globally
        getTokenAndCheckExpiry(token, navigation);
        const userId = await fetchUserId();
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // console.log("get saved data: ", API.GET_SAVED_DATA);
        const response = await axios.get(`${API.GET_SAVED_DATA}`);
        console.log("res >>>>>>", response.data);
        if (response.status === 200 && response.data) {
          console.log(
            "Succefully Fetched prescription data from backend:",
            response.data?.discharge_details?.prescription
          );
          setdayWiseMedicinePresciption(
            response.data?.discharge_details?.prescription
          );
        } else {
          console.warn("No prescription data found or failed to fetch");
          setdayWiseMedicinePresciption(null);
        }
      } catch (error) {
        console.log("Error fetching prescription data: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrescriptionData();
    // console.log("the data is :", dayWiseMedicinePresciption);
  }, []);

  //   console.log("the data is here :", dayWiseMedicinePresciption);
  const [medicinesForToday, setMedicinesForToday] = useState({
    morning: [] as any,
    noon: [] as any,
    evening: [] as any,
    night: [] as any,
  });

  useEffect(() => {
    const processPrescriptionForToday = async () => {
      console.log("()()<<<<<<<<processing prescription for today>>>>>()()");
      const today = new Date();
      const date = today.toISOString().split("T")[0]; // Date in YYYY-MM-DD format

      try {
        // const userId = await fetchUserId();

        // console.log(
        //   "ddata is :",
        //   `${API.GET_DAILY_MEDICINE_STATUS}/${userId}/${date}`
        // );
        console.log("=====fetching  the get daily medicine status======");
        const response = await axios.get(`${API.GET_DAILY_MEDICINE_STATUS}`, {
          params: {
            date, // Query parameter passed here
          },
        });
        console.log("response is<<<<<<<>>>>>>>", response);
        // if (response.status === 404 ) {
        // Check if the response contains a message

        if (response.status === 200) {
          //if the data from server is a "message" --> "no data found"
          console.log("there is  medictaion data at the backend");

          // Handle case where user data is not found
          // console.log(
          //   "message from server {daily medication} ",
          //   response.data.message
          // );
          // Proceed with processing dayWiseMedicinePrescription since the user doesn't have any data
          //   processDayWiseMedicinePrescription();
          // } else {
          console.log(
            "+++++++++----checking there is data at bakcend or not------+++++"
          );
          // Check if the medicineSchedule is present in the response
          const existingSchedule = response.data;

          if (existingSchedule) {
            const medicines = {
              morning: existingSchedule.morning || [],
              noon: existingSchedule.noon || [],
              evening: existingSchedule.evening || [],
              night: existingSchedule.night || [],
            };

            setMedicinesForToday(medicines);
            console.log("setted medicines for today");
            console.log("Medicines for today (from backend):", medicines);
          } else {
            console.log(
              "No medicine schedule found, processing dayWiseMedicinePrescription"
            );
            // If no schedule exists, process dayWiseMedicinePrescription
            processDayWiseMedicinePrescription();
          }
        }
        // } else {
        //   console.log("Unexpected response:", response);
        // }
      } catch (error: any) {
        if (error.response) {
          // Server responded with a status outside the 2xx range
          console.error("Error response:", error.response.data);
          if (error.response.status === 404) {
            processDayWiseMedicinePrescription();
            console.log("Medicines not found. Please check back later.");
          } else {
            alert(
              `Error: ${error.response.data.error || "Something went wrong"}`
            );
          }
        } else if (error.request) {
          // Request was made but no response received
          console.error("Error request:", error.request);
          alert("Network error. Please try again.");
        } else {
          // Something else caused the error
          console.error("Error message:", error.message);
          alert("An unexpected error occurred.");
        }
        console.error("Error processing prescription for today:", error);
      }
    };

    const processDayWiseMedicinePrescription = async () => {
      console.log("started processing the data .. ");
      const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms)); // Delay function

      // Delay execution by 2 seconds (2000 milliseconds)
      await delay(2000);

      const today = new Date();
      const date = today.toISOString().split("T")[0]; // Date in YYYY-MM-DD format

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

        if (med.time[0] === "1") medicines.morning.push(medicine_info);
        if (med.time[1] === "1") medicines.noon.push(medicine_info);
        if (med.time[2] === "1") medicines.evening.push(medicine_info);
        if (med.time[3] === "1") medicines.night.push(medicine_info);
      });

      // Save processed data to backend
      const userId = await fetchUserId();

      const formattedData = {
        userId: userId, // Use the actual userId here
        dailyMedicineStatus: [
          {
            date,
            morning: medicines.morning,
            noon: medicines.noon,
            evening: medicines.evening,
            night: medicines.night,
          },
        ],
      };

      console.log("sending data to store new prescription");

      axios
        // .post("http://192.168.1.6:6000/api/storeDailyMedicine", formattedData)
        .post(`${API.STORE_DAILY_MEDICINE}`, formattedData)
        .then((postResponse) => {
          if (postResponse.status === 201) {
            console.log("Medicine schedule saved successfully!");
          }
          setMedicinesForToday(medicines);
        })
        .catch((error) => {
          console.error("Error storing new prescription:", error);
        });
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

  const updateMedicineStatus = async (
    timeSlot: TimeSlot,
    name: string,
    newStatus: string
  ) => {
    console.log("= updating the medications =");
    const userId = await fetchUserId();

    setMedicinesForToday((prevState) => {
      const updatedState = { ...prevState };
      console.log("hey");

      // Update the specific medicine status in the local state
      updatedState[timeSlot] = updatedState[timeSlot].map((med: any) =>
        med.name === name ? { ...med, status: newStatus } : med
      );

      // Prepare data for the backend

      const today = new Date();
      const date = today.toISOString().split("T")[0]; // YYYY-MM-DD format

      const formattedData = {
        userId: userId, // Replace with actual user ID
        dailyMedicineStatus: [
          {
            date,
            morning: updatedState.morning || [],
            noon: updatedState.noon || [],
            evening: updatedState.evening || [],
            night: updatedState.night || [],
          },
        ],
      };

      // Send updated data to the backend
      console.log("seding the data to the backend ...");
      axios
        // .post("http://192.168.1.6:6000/api/storeDailyMedicine", formattedData)
        .post(`${API.STORE_DAILY_MEDICINE}`, formattedData)
        .then((response) => {
          console.log("::");
          if (response.status === 201) {
            console.log("Medicine status updated successfully in backend!");
          }
        })
        .catch((error) => {
          console.error("Error updating medicine status in backend: ", error);
        });

      return updatedState;
    });
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
          <View style={styles.MedMainCont} key={index}>
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
    paddingTop: "1%",
    backgroundColor: "#FFFFFF",
    height: "100%",
    paddingBottom: "10%",
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
