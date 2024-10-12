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

const ActionItemsContainer = () => {
  return (
    <View style={styles.ActionItemsContainer}>
      <ActionItem
        icon={require("../../../assets/ProfileIcons/fileIcon.png")}
        title="Upload Documents"
      />
      <ActionItem
        icon={require("../../../assets/ProfileIcons/PlusIcon.png")}
        title="Additional Info"
      />
      <ActionItem
        icon={require("../../../assets/ProfileIcons/SubmitIcon.png")}
        title="Review and submit"
        iconStyle={{ width: 18, height: 21 }}
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
