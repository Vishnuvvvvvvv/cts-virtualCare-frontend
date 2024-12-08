import React from "react";
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
} from "react-native";

// Get screen dimensions
const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  return (
    // <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Virtual Care</Text>
        <View style={styles.circle}></View>
      </View>

      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <View style={styles.profileDetails}>
          <Image
            source={require("../../../assets/homeScreen/Helping.png")} // Replace with profile image URL
            style={styles.profileImageLarge}
          />
          <View>
            <Text style={styles.profileText}>Name: John David</Text>
            <Text style={styles.profileText}>Age: 54 years</Text>
            <Text style={styles.profileText}>Gender: Male</Text>
          </View>
        </View>
      </View>

      {/* Today's Reminder Section */}
      <View style={styles.section1}>
        <Text style={styles.sectionHeader1}>Reminder</Text>
        {/* <ScrollView style={styles.remindersContainer} horizontal={true}> */}

        <View style={styles.remindersContainer}>
          <TouchableOpacity style={styles.reminderButton}>
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
          <TouchableOpacity style={styles.monitorButton}>
            <Image
              source={require("../../../assets/homeScreen/Pills.png")}
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Medications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.monitorButton}>
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
    fontSize: width * 0.045,
    color: "#5a3d8e",
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
