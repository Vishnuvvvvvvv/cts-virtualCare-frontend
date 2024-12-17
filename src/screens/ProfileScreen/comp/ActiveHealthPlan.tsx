import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { ProgressBar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../../../UserContext";
import moment from "moment";
import axios from "axios";
import { API, getToken, getTokenAndCheckExpiry } from "../../../apiConfig";
import { useNavigation } from "@react-navigation/native";
const ActiveHealthPlan: React.FC = () => {
  const [data, setData] = useState<any>(null); // Initialize as null
  const { navigation } = useNavigation<any>(); //new line
  //   const [userId, setUserId] = useState("");
  const {
    // userDetails,
    setIsAuthenticated,
    isPlanActivated,
    setIsPlanActivated,
  } = useUser();

  const fetchUserId = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem("userId");
      if (storedUserId !== null) {
        console.log("stored user id in async storage ", storedUserId);
        return storedUserId; // Update state with the userId from AsyncStorage
      }
    } catch (error) {
      console.error("Error fetching userId from AsyncStorage:", error);
    }
  };

  // Call the function when the component mounts

  useEffect(() => {
    const fetchData = async () => {
      try {
        /*
        const savedData = await AsyncStorage.getItem("SavedData");
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          console.log("Parsed data: active plan component", parsedData);
          setData(parsedData); // Store parsed data in state
        }
         */
        /*** */
        // const response = await axios.get(
        //   "http://192.168.1.216:6000/getSavedData"
        // );
        // console.log(":: ", API.GET_SAVED_DATA);
        const token = await getToken();

        // Set the Authorization header globally
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        if (!token) {
          console.log("no token for Active health plan");
          return;
        }
        getTokenAndCheckExpiry(token, navigation);
        const userId = await fetchUserId();

        // console.log("---", userId);
        const response = await axios.get(`${API.GET_SAVED_DATA}/${userId}`);

        if (response.status === 200) {
          console.log(
            `successfully Fetched data from backend for setting active plan for user:${userId}`
          );
          setData(response.data); // Store the fetched data in state
          //   await AsyncStorage.setItem(
          //     "followUp",
          //     response?.data?.discharge_details?.follow_up_date
          //   );
        } else {
          setData(null);
          console.error("Failed to fetch data, status:", response.status);
        }

        /*** */
      } catch (error) {
        console.error("Error fetching savedData:", error);
      }
    };

    fetchData();
  }, []);

  // Safely destructure data, falling back to default values
  const {
    discharge_details = {},
    treating_consultant = {},
    userDetails = {},
    PlanActivatedDate = "",
  } = data || {}; // Use fallback empty objects if data is null

  const { prescribed_illness = "N/A", follow_up_date = "" } = discharge_details;
  const {
    name = "N/A",
    specialty = "N/A",
    hospital = "N/A",
  } = treating_consultant;
  const { name: userName = "N/A", age = "N/A", gender = "N/A" } = userDetails;

  const parseDate = (dateString: any) => {
    return moment(dateString, [
      "YYYY-MM-DD",
      "D MMM YYYY",
      "DD-MM-YYYY",
      "DD/MM/YYYY",
      "D MMMM YYYY",
    ]).toDate();
  };

  // Calculate progress based on dates
  //   const calculateProgress = (startDate: string, endDate: string): number => {
  //     console.log("startDate in doc ", startDate);
  //     console.log("endDate in doc ", endDate);
  //     if (!startDate || !endDate) return 0; // Handle invalid or missing dates
  //     // const start = new Date(startDate.split("-").reverse().join("-"));

  //     const start = parseDate(startDate);
  //     const end = parseDate(endDate);

  //     console.log("start ", start);
  //     console.log("end ", end);
  //     const today = new Date();
  //     const totalDays = Math.ceil(
  //       (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  //     );
  //     const daysElapsed = Math.ceil(
  //       (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  //     );
  //     return totalDays > 0 ? Math.min(daysElapsed / totalDays, 1) : 0; // Avoid division by zero
  //   };
  const calculateProgress = (startDate: string, endDate: string): number => {
    console.log("startDate in doc ", startDate);
    console.log("endDate in doc ", endDate);
    if (!startDate || !endDate) return 0; // Handle invalid or missing dates
    // startDate = "15-06-2022";
    const start = truncateTime(parseDate(startDate));
    const end = truncateTime(parseDate(endDate));
    const today = truncateTime(new Date());
    if (start >= end) return 1;

    console.log("start (local):", start.toLocaleString());
    console.log("end (local):", end.toLocaleString());
    console.log("today (local):", today.toLocaleString());

    const totalDays = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    const daysElapsed = Math.ceil(
      (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    console.log("day", daysElapsed + 1);
    return totalDays > 0 ? Math.min(daysElapsed / totalDays, 1) : 0; // Avoid division by zero
  };

  const truncateTime = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const progress = calculateProgress(PlanActivatedDate, follow_up_date);
  const handleResetPlan = async () => {
    try {
      // Extract all keys from AsyncStorage
      const keys = await AsyncStorage.getAllKeys();
      console.log("All keys in AsyncStorage:", keys);
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (userId) {
          const response = await axios.delete(`${API.DELETE_DATA}/${userId}`);
          console.log("Data deleted successfully:", response.data);
        } else {
          console.log("User ID not found in AsyncStorage.");
        }
      } catch (error) {
        console.error("Error deleting data:", error);
      }

      const keysToDelete = keys.filter(
        (key) =>
          key !== "userDetails" &&
          key !== "authToken" &&
          key !== "planActivated" &&
          key != "userId"
      );

      await AsyncStorage.setItem("planActivated", "false");
      setIsPlanActivated(false);
      console.log("Keys to delete:", keysToDelete);
      // Remove all keys except 'userDetails'
      await AsyncStorage.multiRemove(keysToDelete);
    } catch (error) {
      console.error("Error extracting keys from AsyncStorage:", error);
    }
  };

  useEffect(() => {
    const get = async () => {
      const keys = await AsyncStorage.getAllKeys();
      console.log("All keys in AsyncStorage:", keys);
    };
    get();
  }, []);
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.header}>Active Health Plan</Text>
      <TouchableOpacity style={styles.reset} onPress={handleResetPlan}>
        <Text>Reset Plan</Text>
      </TouchableOpacity>

      {data ? (
        <>
          <View style={styles.card}>
            <Text style={styles.illness}>
              Prescribed Illness: {prescribed_illness}
            </Text>
            <ProgressBar
              progress={progress}
              color="#4CAF50"
              style={styles.progressBar}
            />
            <Text style={styles.progressText}>
              {Math.round(progress * 100)}% Progress Made
            </Text>
          </View>

          <View style={styles.card}>
            {/* </View>

          <View style={styles.card}> */}
            <Text style={styles.sectionHeader}>User Details</Text>
            <Text style={styles.consultantInfo}>
              <Text style={styles.label}>Name: </Text>
              {userName}
            </Text>
            <Text style={styles.consultantInfo}>
              <Text style={styles.label}>Age: </Text>
              {age}
            </Text>
            <Text style={styles.consultantInfo}>
              <Text style={styles.label}>Gender: </Text>
              {gender}
            </Text>

            <Text style={styles.sectionHeader}>Treating Consultant</Text>
            <Text style={styles.consultantInfo}>
              <Text style={styles.label}>Name: </Text>
              {name}
            </Text>
            <Text style={styles.consultantInfo}>
              <Text style={styles.label}>Specialty: </Text>
              {specialty}
            </Text>
            <Text style={styles.consultantInfo}>
              <Text style={styles.label}>Hospital: </Text>
              {hospital}
            </Text>
          </View>
        </>
      ) : (
        <Text style={styles.loadingText}>Loading health plan details...</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 16,
  },
  reset: {
    position: "absolute",
    right: "8%",
    top: "5%",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  illness: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 16,
    color: "#34495E",
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginVertical: 8,
  },
  progressText: {
    fontSize: 14,
    color: "#34495E",
    marginTop: 8,
    textAlign: "center",
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 8,
    marginTop: 8,
    textDecorationLine: "underline",
  },
  consultantInfo: {
    fontSize: 14,
    marginBottom: 4,
    color: "#34495E",
  },
  label: {
    fontWeight: "bold",
  },
  loadingText: {
    fontSize: 16,
    color: "#34495E",
    textAlign: "center",
    marginTop: 50,
  },
});

export default ActiveHealthPlan;
