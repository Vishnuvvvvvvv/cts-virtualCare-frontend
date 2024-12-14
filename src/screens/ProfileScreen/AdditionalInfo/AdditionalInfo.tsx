import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
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
      <View style={styles.infoBox}>
        <Image
          style={styles.infoIcon}
          source={require("../../../../assets/ProfileIcons/Check.png")}
        />
        <Text style={styles.infoText}>
          No further information is needed. You're good to go to the next step!
        </Text>
      </View>

      {step >= 1 && (
        <TouchableOpacity style={styles.Btn} onPress={handleNext}>
          <Text style={styles.BtnTxt}>Continue</Text>
          <Image
            style={styles.btnIcon}
            source={require("../../../../assets/RightChevron.png")}
          />
        </TouchableOpacity>
      )}
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
    paddingHorizontal: 20,
  },
  infoBox: {
    backgroundColor: "#F0F8FF",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    width: "100%",
  },
  infoIcon: {
    height: 50,
    width: 50,
    marginBottom: 10,
  },
  infoText: {
    textAlign: "center",
    fontSize: 18,
    color: "#4A4A4A",
    fontWeight: "500",
  },
  Btn: {
    flexDirection: "row",
    width: "60%",
    position: "absolute",
    bottom: 20,
    borderRadius: 12,
    height: 50,
    backgroundColor: "#FFFFFF",
    borderColor: "#A0A0A0",
    // borderWidth: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, // For Android shadow
  },
  BtnTxt: {
    textAlign: "center",
    color: "#A0A0A0",
    fontSize: 18,
    fontWeight: "bold",
  },
  btnIcon: {
    height: 25,
    width: 25,
  },
});
