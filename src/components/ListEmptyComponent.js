import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ListEmptyComponent = () => {
  return (
    <View style={styles.container}>
      <Text>Il n'y a aucune station autour de vous</Text>
    </View>
  );
};

export default ListEmptyComponent;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
