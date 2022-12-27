import React from "react";

import { StyleSheet, Text, View } from "react-native";

import openMap from "react-native-open-maps";
import { MD3Colors } from "react-native-paper";

import { FontAwesome5, AntDesign, MaterialIcons } from "@expo/vector-icons";

const IconContainer = ({
  latitude,
  longitude,
  Userlongitude,
  Userlatitude,
}) => {
  const nativeItinerary = () => {
    openMap({
      navigate: true,
      travelType: "drive",
      start: `${Userlatitude}, ${Userlongitude}`,
      end: `${latitude}, ${longitude}`,
    });
  };
  return (
    <View style={styles.iconContainer}>
      <MaterialIcons
        name="favorite-outline"
        size={24}
        color={MD3Colors.primary10}
      />
      <AntDesign name="infocirlceo" size={24} color={MD3Colors.primary10} />
      <AntDesign name="creditcard" size={24} color={MD3Colors.primary10} />
      <FontAwesome5
        name="directions"
        size={24}
        color={MD3Colors.primary20}
        onPress={nativeItinerary}
      />
    </View>
  );
};

export default IconContainer;

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
