import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

// current screen : Get Started Screen

/** 
In the profile screen ,there are 3 container
1.Top container
2.Bottom Main container:
    -Get started container
    -ActionItems container
*/
import { useUser } from "../../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GetStartedContainer = () => {
  //  const [step, setStep] = useState(0);
  const { step, setStep } = useUser();

  /**when,
   
   * step 0: initial state,all icons unfilled ,
   * step 1: 1st step completed :tick for upload docs
   * step 2: 2nd step completed :tick for [upload docs + more info]
   * step 3: 3rd step completed :tick for  [upload docs + more info +submit]
   *
   *
   */

  useEffect(() => {
    const checkExtractedJson = async () => {
      try {
        const extractedJson = await AsyncStorage.getItem("Extractedjson");
        if (extractedJson) {
          // If extractedJson exists, set step to 1
          setStep(1);
        } else {
          // If extractedJson doesn't exist, set step to 0
          setStep(0);
        }
      } catch (error) {
        console.error("Error reading extracted JSON from AsyncStorage:", error);
        // You might want to handle errors, maybe set step to a default value
        setStep(0);
      }
    };

    checkExtractedJson();
  }, [setStep]);

  return (
    <View style={styles.GetStartedContainer}>
      <Text style={styles.heading}>Get Started</Text>

      <View style={styles.iconContainer}>
        <View style={styles.step1}>
          <View style={styles.roundContainer1}>
            {step == 0 ? (
              <Image
                style={styles.FileUpload}
                source={require("../../../assets/FileUpload.png")}
              ></Image>
            ) : (
              <Image
                style={styles.checkMark}
                source={require("../../../assets/CheckMark.png")}
              ></Image>
            )}
          </View>
          <Text style={styles.label}>Upload docs</Text>
        </View>

        <View style={[styles.line, step > 0 ? styles.filledLine1 : null]} />

        <View style={styles.step2}>
          <View style={styles.roundContainer2}>
            {step == 0 || step == 1 ? (
              <Image
                style={styles.FileUpload}
                source={require("../../../assets/PlusIcon.png")}
              ></Image>
            ) : (
              <Image
                style={styles.checkMark}
                source={require("../../../assets/CheckMark.png")}
              ></Image>
            )}
          </View>
          <Text style={styles.label}>More Info</Text>
        </View>

        <View style={[styles.line, step > 1 ? styles.filledLine2 : null]} />

        <View style={styles.step3}>
          <View style={styles.roundContainer3}>
            {step == 0 || step == 1 || step == 2 ? (
              <Image
                style={styles.rightArrow}
                source={require("../../../assets/rightArrowIcon.png")}
              ></Image>
            ) : (
              <Image
                style={styles.checkMark}
                source={require("../../../assets/CheckMark.png")}
              ></Image>
            )}
          </View>
          <Text style={styles.label}>Submit</Text>
        </View>
      </View>
    </View>
  );
};

export default GetStartedContainer;

const styles = StyleSheet.create({
  txt: {
    color: "#ccc",
  },
  GetStartedContainer: {
    // borderWidth: 2,
    height: "30%",
    width: "100%",
  },

  heading: {
    fontSize: 21,
    fontWeight: "700",
    paddingLeft: "2%",
    paddingTop: "2%",
    color: "#B8B5B5",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
    padding: 10,
  },
  step1: {
    alignItems: "center",
    height: "100%",
    // borderWidth: 1,
    width: "18%",
    // marginTop: "1%",
    // paddingTop: "1%",
    paddingTop: "1.8%",
  },
  roundContainer1: {
    // Width and height should be the same for a perfect circle
    width: "100%",
    aspectRatio: 1,
    borderRadius: 50,
    // borderColor: "#8253E9",
    // borderWidth: 3,
    backgroundColor: "#A1A5A4",

    alignItems: "center",
    justifyContent: "center",
  },
  FileUpload: {
    width: "55%",
    height: "55%",
  },
  label: {
    marginTop: "1%",
    textAlign: "center",
    fontSize: 11,
    color: "#B2B2B2",
    fontWeight: "500",
  },
  checkMark: {
    width: "36%",
    height: "27%",
  },

  line: {
    width: "22%",
    height: 5,

    backgroundColor: "#ccc",
  },

  rightArrow: {
    width: "37%",
    height: "38.5%",
  },

  roundContainer2: {
    // Width and height should be the same for a perfect circle
    width: "100%",
    aspectRatio: 1,
    borderRadius: 50,
    backgroundColor: "#687B51",

    alignItems: "center",
    justifyContent: "center",
  },
  step2: {
    alignItems: "center",
    height: "100%",
    // borderWidth: 1,
    width: "18%",
    paddingTop: "1.8%",
  },
  step3: {
    alignItems: "center",
    height: "100%",
    // borderWidth: 1,
    width: "18%",
    paddingTop: "1.8%",
  },
  roundContainer3: {
    // Width and height should be the same for a perfect circle
    width: "100%",
    aspectRatio: 1,
    borderRadius: 50,
    backgroundColor: "#9F7F6A",

    alignItems: "center",
    justifyContent: "center",
  },
  IconTextContainer: {
    paddingLeft: "1%",
    paddingRight: "4%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  filledLine1: {
    backgroundColor: "#A1A5A4", // Color for the filled line
  },
  filledLine2: {
    backgroundColor: "#687B51", // Color for the filled line
  },
});
