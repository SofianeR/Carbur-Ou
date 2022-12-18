import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";

const alertComponents = ({ errorMessage }) => {
  return (
    <View style={styles.errorMessageContainer}>
      <Text style={styles.errorMessageText}>{errorMessage}</Text>
    </View>
  );
};

export default alertComponents;

const styles = StyleSheet.create({
  errorMessageContainer: {
    width: Dimensions.get("screen").width,
    justifyContent: "center",
    alignItems: "center",
  },
  errorMessageText: {
    color: "#ff7b6f",
  },
});
