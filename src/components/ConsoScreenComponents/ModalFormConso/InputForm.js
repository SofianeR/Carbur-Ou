import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { IconButton, MD3Colors, Modal, TextInput } from "react-native-paper";

const InputForm = ({ label, value }) => {
  return (
    <TextInput style={styles.inputStyle} label={label} mode={"outlined"} />
  );
};

export default InputForm;

const styles = StyleSheet.create({
  inputStyle: {
    width: "90%",
    height: 30,
  },
});
