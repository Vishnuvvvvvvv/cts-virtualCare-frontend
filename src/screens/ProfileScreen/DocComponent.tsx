import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

type propsType = {
  title: string;
  source?: string;
  type?: string;
  onPress: () => void;
};
const DocComponent = ({ title, type, onPress, source }: propsType) => {
  const getIconSource = () => {
    switch (type) {
      case "application/pdf":
        return require("../../../assets/ProfileIcons/pdficon.png");
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return require("../../../assets/ProfileIcons/DocType.png");
      case "text/plain":
        return require("../../../assets/ProfileIcons/Txtfile.png");
    }
  };

  // const getFileType = () => {
  //   switch (type) {
  //     case "application/pdf":
  //       return ".pdf";
  //     case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
  //       return ".docx";
  //     case "text/plain":
  //       return ".txt";
  //   }
  // };

  return (
    <View style={styles.DocComponent}>
      <View style={styles.docIconContainer}>
        <Image
          style={!source ? styles.docIconStyle : styles.ImageIconStyle}
          source={!source ? getIconSource() : { uri: source }}
        ></Image>
      </View>
      <Text style={styles.title}>
        {title}
        {/* {getFileType()} */}
      </Text>
      <TouchableOpacity onPress={onPress} style={styles.Btn}>
        <Image
          style={styles.binIcon}
          source={require("../../../assets/ProfileIcons/Bin.png")}
        ></Image>
      </TouchableOpacity>
    </View>
  );
};

export default DocComponent;

const styles = StyleSheet.create({
  docIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    height: "100%",
    width: "35%",
  },
  DocComponent: {
    height: "100%",
    width: "95%",
    borderWidth: 1,
    borderColor: "#C1C1C1",
    flexDirection: "row",
    position: "relative",
    borderRadius: 12,

    // Shadow for Android
  },
  docIconStyle: {
    height: "80%",
    width: "90%",
  },
  ImageIconStyle: {
    height: "90%",
    width: 110,
    borderRadius: 8,
  },
  binIcon: {
    width: 24,
    height: 25,
  },
  title: {
    // borderWidth: 1,
    flex: 0.8,
    paddingTop: "3%",
    fontWeight: "500",
  },

  Btn: {
    position: "absolute", // Position the icon absolutely
    top: 8, // Position from the top
    right: 8, // Position from the right
  },
});
