import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

import { TextInput } from "react-native-paper";

const InputForm = ({ label, setState, valueState }) => {
  const onChangeValue = (valueInput) => {
    setState(valueInput);
  };
  return (
    <TextInput
      style={styles.inputStyle}
      value={valueState}
      label={label}
      mode={"outlined"}
      onChangeText={(v) => onChangeValue(v)}
      placeholder={label}
    />
  );
};

export default InputForm;

const styles = StyleSheet.create({
  inputStyle: {
    width: Dimensions.get("screen").width / 2,
    height: 30,
  },
});
