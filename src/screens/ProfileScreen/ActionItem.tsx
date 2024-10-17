import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageSourcePropType,
} from "react-native";
import React from "react";

type propsType = {
  icon: ImageSourcePropType;
  title: string;
  iconStyle?: {
    width: number;
    height: number;
  };
  onPress?: () => void;
};

const ActionItem = ({ icon, title, iconStyle, onPress }: propsType) => {
  return (
    <TouchableOpacity style={styles.ActionItem} onPress={onPress}>
      <Image source={icon} style={[styles.icon, iconStyle]} />
      <Text style={styles.label}>{title}</Text>
      <Image
        style={styles.rightArrow}
        source={require("../../../assets/ProfileIcons/rightArrow.png")}
      ></Image>
    </TouchableOpacity>
  );
};

export default ActionItem;

const styles = StyleSheet.create({
  ActionItem: {
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 25,
    marginBottom: "5%",
    width: "90%",
    height: "18%",
    paddingLeft: "2%",
    paddingRight: "2%",
    borderColor: "#E9E9E9",
  },
  icon: {
    width: 24,
    height: 26,
    marginLeft: 10,
  },
  label: {
    fontSize: 16,
    // borderWidth: 1,
    flex: 1,
    paddingLeft: 18,
    fontWeight: "300",
  },
  submitIcon: {
    width: 20,
    height: 20,
  },
  rightArrow: {
    width: 18,
    height: 22,
  },
});
