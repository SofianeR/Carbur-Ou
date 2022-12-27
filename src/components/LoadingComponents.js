import React from "react";

import { Text, View, StyleSheet, Dimensions } from "react-native";

import { ActivityIndicator, MD3Colors } from "react-native-paper";

const LoadingComponents = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={true}
        size={"large"}
        color={MD3Colors.error10}
      />
    </View>
  );
};

export default LoadingComponents;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
  },
});
