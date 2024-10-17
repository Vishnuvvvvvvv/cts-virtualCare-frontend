import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ActionItem from "./ActionItem";
/*
Current page : ActionItems container page

In the profile screen ,there are 3 container
1.Top container
2.Bottom Main container:
    -Get started container
    -ActionItems container


*/
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { stackScreens } from "../../Navigation/RootNavigation";
type propsType = NativeStackScreenProps<stackScreens, "Profile">;

const ActionItemsContainer = (props: propsType) => {
  const { navigation } = props;
  const UploadDocHandler = () => {
    navigation.navigate("UploadDocuments");
  };
  return (
    <View style={styles.ActionItemsContainer}>
      <ActionItem
        icon={require("../../../assets/ProfileIcons/fileIcon.png")}
        title="Upload Documents"
        onPress={UploadDocHandler}
      />
      <ActionItem
        icon={require("../../../assets/ProfileIcons/PlusIcon.png")}
        title="Additional Info"
        onPress={() => {
          navigation.navigate("AdditionalInfo");
        }}
      />
      <ActionItem
        icon={require("../../../assets/ProfileIcons/SubmitIcon.png")}
        title="Review and submit"
        iconStyle={{ width: 18, height: 21 }}
        onPress={() => {
          navigation.navigate("ReviewAndSubmit");
        }}
      />
    </View>
  );
};

export default ActionItemsContainer;

const styles = StyleSheet.create({
  ActionItemsContainer: {
    height: "70%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
