import React, { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { stackScreens } from "../../Navigation/RootNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../../UserContext";
import axios from "axios";
import { API, getToken, getTokenAndCheckExpiry } from "../../apiConfig";
import moment from "moment-timezone";
// Get screen dimensions
const { width, height } = Dimensions.get("window");

type propsType = NativeStackScreenProps<stackScreens, "HomeScreen">;

const HomeScreen = (props: propsType) => {
  const { navigation } = props;
  // Declare state for storing parsed data
  const [userData, setUserData] = useState<any>({});
  const {
    // userDetails,
    // setIsAuthenticated,
    isPlanActivated,
    setIsPlanActivated,
    isFollowUpDateReached,
    setIsFollowUpDateReached,
  } = useUser();

  const [isLoading, setIsLoading] = useState<any>();

  console.log("Inside the home screen ! ");

  const parseDate = (dateString: string) => {
    return moment
      .tz(
        dateString,
        ["YYYY-MM-DD", "D MMM YYYY", "DD-MM-YYYY", "DD/MM/YYYY", "D MMMM YYYY"],
        "Asia/Kolkata"
      )
      .format("YYYY-MM-DD");
  };
  useEffect(() => {
    console.log("-----------===========--------------");
    console.log("date is ", new Date());
    console.log("new date is is ", new Date().toLocaleString("en-IN"));
    const todayd = new Date().toLocaleString("en-IN").split(",")[0];
    const todayd1 = parseDate(todayd);

    console.log("today's date is ", todayd1, " inside the use effect ...");
    console.log("-----------===========--------------");
  }, []);

  const checkFollowUpDate = async () => {
    console.log("===========*******************======================");
    console.log("going to check the follow up date has reached or not.... ...");
    console.log("checking ..");
    setIsLoading(true);
    try {
      const today = parseDate(new Date().toLocaleString("en-IN").split(",")[0]); // Truncate today's date to remove time
      console.log("parsed form of today is ", today);

      const today1 = new Date(today);

      const token = await getToken();
      const userId = await AsyncStorage.getItem("userId");

      if (!token || !userId) {
        setIsLoading(false);
        return;
      }

      getTokenAndCheckExpiry(token, navigation);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log("Requesting follow-up date from API...");

      const response = await axios.get(`${API.GET_SAVED_DATA}`);

      if (
        response.status === 200 &&
        response?.data?.discharge_details?.follow_up_date
      ) {
        console.log(
          "API response success for collecting the follow up date  : ",
          response?.data?.discharge_details?.follow_up_date
        );

        console.log("going to parse the data");
        // Parse API date and truncate time
        const fetchedFollowUpDate = parseDate(
          response?.data?.discharge_details?.follow_up_date
        );

        console.log("parsed folow up date is : ", fetchedFollowUpDate);

        console.log("converting the date to date object");
        const fetchedFollowUpDate1 = new Date(fetchedFollowUpDate);

        console.log("the saved date is : ", fetchedFollowUpDate1);

        console.log(
          "successfully stored the follow up date in the async storage,now compare whether today is >= fetchedFollowUpDate"
        );
        // Compare Date objects
        if (today1.getTime() >= fetchedFollowUpDate1.getTime()) {
          console.log("today date is : ", today1);
          console.log("follow up date is: ", fetchedFollowUpDate1);
          console.log("yes , the today >= fetchedFollowUpDate is true");
          console.log("Follow-up date has been reached. Skipping API calls.");
          setIsFollowUpDateReached(true);
        } else {
          console.log("today date is : ", today1);
          console.log("follow up date is: ", fetchedFollowUpDate1);
          console.log(
            "follow up date hasn't yet reached ,so plan hasn't expired..."
          );
          setIsFollowUpDateReached(false);
        }
      }
      console.log("===========*******************======================");
    } catch (error) {
      console.error("Error checking follow-up date: ", error);
      setIsFollowUpDateReached(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function: Truncate time part of a Date object
  const truncateTime = (date: any) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  useEffect(() => {
    checkFollowUpDate();
    console.log(
      "checking follow up date in home screen: is follow up date reahced",
      isFollowUpDateReached
    );
  }, [isFollowUpDateReached, isPlanActivated]);

  useEffect(() => {
    console.log("checking plan status ....");
    const checkActivationStatus = async () => {
      try {
        const planActivated = await AsyncStorage.getItem("planActivated");
        console.log("plan activated stuatus : ", planActivated);
        if (planActivated === null) return;
        // If the key doesn't exist, default to `false`
        if (planActivated === "true") setIsPlanActivated(true);
        else if (planActivated === "true") setIsPlanActivated(false);
      } catch (error) {
        console.error("Error checking plan activation status:", error);
        setIsPlanActivated(false); // Fallback to false in case of an error
      }
    };
    checkActivationStatus();
  }, []);

  useEffect(() => {
    console.log("ststst: ", isPlanActivated);
  }, [isPlanActivated]);

  // Fetch and parse data from AsyncStorage
  useEffect(() => {
    // if (isFollowUpDateReached) return;
    const fetchData = async () => {
      try {
        let data = await AsyncStorage.getItem("SavedData");
        if (data) {
          const parsedData = JSON.parse(data);
          console.log(
            "Parsed data: ",
            parsedData.discharge_details.prescription
          );
          setUserData(parsedData); // Store parsed data in state
        }
      } catch (error) {
        console.error("Error fetching savedData:", error);
      }
    };

    fetchData();

    console.log("is plan activated ", isPlanActivated);
  }, []);

  const handlePressDailyMedication = () => {
    // if (isFollowUpDateReached) return;
    // console.log("v", isPlanActivated);
    console.log("daily medications clicked");
    // Navigate to the Daily Medicine screen
    navigation.navigate("DailyMedication");
  };

  const handleNotActivatedState = () => {
    if (!isPlanActivated) {
      console.log("plan is not activated");
      Alert.alert(
        "Plan Not Activated",
        "Please upload your medical documents and generate a health plan.",
        [
          {
            text: "OK",
            onPress: () => console.log("Dialog closed"),
          },
        ]
      );
    } else if (isFollowUpDateReached) {
      console.log("follow up reached");
      Alert.alert(
        "Current Plan has Expired!",
        "Please upload new medical documents and generate a health plan.",
        [
          {
            text: "OK",
            onPress: () => console.log("Dialog closed"),
          },
        ]
      );
    }
  };

  return (
    // <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Virtual Care</Text>
        {/* <View style={styles.circle}></View> */}
      </View>

      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <View style={styles.profileDetails}>
          <Image
            source={require("../../../assets/homeScreen/Helping.png")} // Replace with profile image URL
            style={styles.profileImageLarge}
          />

          {/* {userData && (
            <View style={{ height: "100%", width: "50%" }}>
              <Text style={styles.profileText}>
                Name: {userData?.userDetails?.name}
              </Text>
              <Text style={styles.profileText}>
                Age: {userData.userDetails?.age} years
              </Text>
              <Text style={styles.profileText}>
                Gender: {userData.userDetails?.gender}
              </Text>
            </View>
          )} */}

          <View style={{ height: "100%", width: "50%" }}>
            <Text style={styles.headerText}>Virtual Care </Text>
            <Text style={styles.profileText}>
              Your Perfect Solution for health Care!
            </Text>
          </View>
        </View>
      </View>

      {/* Today's Reminder Section */}
      <View style={styles.section1}>
        <Text style={styles.sectionHeader1}>Reminder</Text>
        {/* <ScrollView style={styles.remindersContainer} horizontal={true}> */}

        <View style={styles.remindersContainer}>
          <TouchableOpacity
            style={styles.reminderButton}
            onPress={
              isPlanActivated && !isFollowUpDateReached
                ? handlePressDailyMedication
                : handleNotActivatedState
            }
          >
            <Image
              source={require("../../../assets/homeScreen/Capsule.png")}
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Daily Medicine</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reminderButton}>
            <Image
              source={require("../../../assets/homeScreen/Diet.png")}
              style={styles.DailyDietIcon}
            />
            <Text style={styles.buttonText}>Daily Diet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reminderButton}>
            <Image
              source={require("../../../assets/homeScreen/CheckupDate.png")}
              style={styles.iconCheckup}
            />
            <Text style={styles.buttonText}>Checkup</Text>
          </TouchableOpacity>
        </View>
        {/* </ScrollView>{" "} */}
        {/*scroll view*/}
      </View>

      {/* Monitor Health Section */}
      <View style={styles.section2}>
        <Text style={styles.sectionHeader}>Monitor Health</Text>
        <View style={styles.monitorContainer}>
          <TouchableOpacity
            style={styles.monitorButton}
            onPress={() => {
              isPlanActivated && !isFollowUpDateReached
                ? navigation.navigate("Medications")
                : handleNotActivatedState();
            }}
          >
            <Image
              source={require("../../../assets/homeScreen/Pills.png")}
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Medications</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.monitorButton}
            onPress={() => {
              isPlanActivated
                ? navigation.navigate("HealthReport")
                : handleNotActivatedState();
            }}
          >
            <Image
              source={require("../../../assets/homeScreen/HealthReport.png")}
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Health Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.monitorButton}>
            <Image
              source={require("../../../assets/homeScreen/Calendar.png")}
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Test Dates</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.monitorButton}>
            <Image
              source={require("../../../assets/homeScreen/Exercise.png")}
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Exercise</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  {
    /* </ScrollView> */
  }
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: width * 0.05, // 5% of screen width for padding
    backgroundColor: "#fff",
    flexGrow: 1,
    paddingTop: width * 0.1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height * 0.02, // 2% of screen height for spacing
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: height * 0.02,
  },
  headerText: {
    fontSize: width * 0.06, // Responsive font size
    fontWeight: "bold",
    color: "#5a3d8e",
    textShadowColor: "rgba(0, 0, 0, 0.5)", // Black shadow with transparency
    textShadowOffset: { width: 1, height: 1 }, // Shadow offset (horizontal and vertical)
    textShadowRadius: 3,
  },
  circle: {
    width: width * 0.07, // Circle size based on screen width
    height: width * 0.07,
    borderRadius: (width * 0.07) / 2, // Ensuring the circle is perfectly round
    backgroundColor: "#5a3d8e", // Purple circle
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: height * 0.02,
    backgroundColor: "#E6D7FF",
    borderRadius: 10,
    padding: width * 0.05,
    height: "20%",
    marginTop: "2%",
    // Shadow for iOS
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow position
    shadowOpacity: 0.4, // Shadow opacity
    shadowRadius: 6, // Shadow blur radius
    // Elevation for Android
    elevation: 5, //
  },
  profileDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    // height: "10%",
  },
  profileText: {
    fontSize: width * 0.04,
    paddingTop: 10,
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.5)", // Black shadow with transparency
    textShadowOffset: { width: 1, height: 1 }, // Shadow offset (horizontal and vertical)
    textShadowRadius: 3, // Blur radius
  },
  profileImageLarge: {
    width: width * 0.3,
    height: width * 0.3,
    // borderRadius: width * 0.1,
    marginRight: 15,
    borderColor: "#E6D7FF",
    borderWidth: 0,
  },
  section1: {
    marginTop: "3%",
    marginBottom: height * 0.02,
    // backgroundColor: "#E6D7FF",
    borderRadius: 10,
    paddingTop: width * 0.03,
    paddingBottom: width * 0.03,
    paddingRight: width * 0.03,
  },
  sectionHeader1: {
    paddingLeft: 10,
    fontSize: width * 0.05,
    fontWeight: "bold",
    color: "#5a3d8e",
    marginBottom: height * 0.01,
  },
  section2: {
    marginTop: "3%",
    marginBottom: height * 0.02,
    // backgroundColor: "#E6D7FF",
    borderRadius: 10,
    padding: width * 0.03,
  },
  sectionHeader: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    color: "#5a3d8e",
    marginBottom: height * 0.01,
  },
  remindersContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  reminderButton: {
    width: "30%",
    alignItems: "center",
    backgroundColor: "#c2a7d6",
    borderRadius: 10,
    padding: width * 0.04, // Padding based on screen size
    marginLeft: 10,
    // Shadow for iOS
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow position
    shadowOpacity: 0.4, // Shadow opacity
    shadowRadius: 6, // Shadow blur radius
    // Elevation for Android
    elevation: 10, // Controls the shadow size and intensity
  },
  buttonText: {
    fontSize: width * 0.035,
    color: "#fff",
    textAlign: "center",
    marginTop: height * 0.01,
  },
  icon: {
    width: 34, // 12% of screen width for icon size
    height: 36,
    borderRadius: 10,
    // backgroundColor: "#e6d7f9",
  },
  DailyDietIcon: {
    width: 48, // 12% of screen width for icon size
    height: 48,
    // borderRadius: 10,
    // backgroundColor: "#e6d7f9",
  },
  iconCheckup: {
    width: 48, // 12% of screen width for icon size
    height: 48,
  },
  monitorContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  monitorButton: {
    width: "45%",
    alignItems: "center",
    backgroundColor: "#c2a7d6",
    borderRadius: 10,
    padding: width * 0.04,
    marginBottom: height * 0.015,

    // Shadow for iOS
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow position
    shadowOpacity: 0.4, // Shadow opacity
    shadowRadius: 6, // Shadow blur radius
    // Elevation for Android
    elevation: 10, //
  },
});
