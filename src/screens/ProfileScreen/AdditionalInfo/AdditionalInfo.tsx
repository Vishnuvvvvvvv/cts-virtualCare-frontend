import {
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { stackScreens } from "../../../Navigation/RootNavigation";
import { useUser } from "../../../UserContext";

type propsType = NativeStackScreenProps<stackScreens, "AdditionalInfo">;

const AdditionalInfo = ({ navigation }: propsType) => {
  const { step, setStep } = useUser();

  const handleNext = () => {
    setStep(2);
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Text>Add Details about Diet , Exercise here</Text>
      <TouchableOpacity style={styles.Btn} onPress={handleNext}>
        <Text style={styles.BtnTxt}>Continue</Text>
        <Image
          style={styles.btnIcon}
          source={require("../../../../assets/RightChevron.png")}
        ></Image>
      </TouchableOpacity>
    </View>
  );
};

export default AdditionalInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  Btn: {
    // borderWidth: 1,
    flexDirection: "row",
    width: "40%",
    // alignSelf: "center",
    position: "absolute",
    bottom: 10, // Align it to the bottom
    left: "30%", // Align it to the left
    right: "30%", // Align it to the right
    // padding: 20, // Optional padding
    borderRadius: 12,
    height: 50,
    backgroundColor: "#FFFFFF",
    borderColor: "#A0A0A0",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  BtnTxt: {
    textAlign: "center",
    color: "#A0A0A0",
    // borderWidth: 1,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 8,
    height: "100%",
    fontSize: 23,
  },
  btnIcon: {
    height: 25,
    width: 25,
  },
});
