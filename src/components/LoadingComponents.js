import React from "react";

import { Text, View, StyleSheet } from "react-native";

import { ProgressBar, MD2DarkTheme } from "react-native-paper";

const LoadingComponents = () => {
  return (
    <View>
      <Text>En cours de chargement ...</Text>
      <ProgressBar indeterminate={true} color={MD2DarkTheme.colors.error} />
    </View>
  );
};

export default LoadingComponents;

const styles = StyleSheet.create({});
