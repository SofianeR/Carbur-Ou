import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

import { getUrlApi } from "../utils/getUrlApi";

import axios from "axios";
import { RadioButton } from "react-native-paper";

const RadioFilter = ({
  locationState,
  setStationData,
  setErrorMessage,
  filterFuel,
  setFilterFuel,
}) => {
  const setFilterFunction = (fuelString) => {
    console.log(filterFuel);
    if (!filterFuel.includes(fuelString)) {
      const copyFilterFuel = [...filterFuel];
      copyFilterFuel.push(fuelString);
      setFilterFuel(copyFilterFuel);
    } else {
      const copyFilterFuel = [...filterFuel];
      const index = copyFilterFuel.indexOf(fuelString);
      copyFilterFuel.splice(index, 1);
      setFilterFuel(copyFilterFuel);
    }
  };

  const getFilteredStation = async () => {
    setErrorMessage("");

    try {
      const urlServer = await getUrlApi(
        locationState.coords.latitude,
        locationState.coords.longitude,
        filterFuel
      );

      console.log(urlServer);

      const response = await axios.get(urlServer);

      setStationData(response.data.records);
    } catch (error) {
      setErrorMessage(error.message);

      console.log(error.message);
    }
  };

  useEffect(() => {
    getFilteredStation();
  }, [filterFuel]);

  return (
    <View>
      <View style={styles.radioFilterContainer}>
        <View>
          <Text>Gazole</Text>
          <RadioButton
            style={styles.radioButton}
            value="Gazole"
            status={filterFuel.includes("Gazole") ? "checked" : "unchecked"}
            onPress={() => {
              setFilterFunction("Gazole");
            }}
          />
        </View>

        <View>
          <Text>SP95</Text>
          <RadioButton
            style={styles.radioButton}
            value="SP95"
            status={filterFuel.includes("SP95") ? "checked" : "unchecked"}
            onPress={() => {
              setFilterFunction("SP95");
            }}
          />
        </View>
        <View>
          <Text>SP98</Text>
          <RadioButton
            style={styles.radioButton}
            value="SP98"
            status={filterFuel.includes("SP98") ? "checked" : "unchecked"}
            onPress={() => {
              setFilterFunction("SP98");
            }}
          />
        </View>
      </View>
      <View style={styles.radioFilterContainer}>
        <View>
          <Text>SP95 E10</Text>
          <RadioButton
            style={styles.radioButton}
            value="SP95E10"
            status={filterFuel.includes("E10") ? "checked" : "unchecked"}
            color={"black"}
            onPress={() => {
              setFilterFunction("E10");
            }}
          />
        </View>

        <View>
          <Text>E85</Text>
          <RadioButton
            style={styles.radioButton}
            value="E85"
            status={filterFuel.includes("E85") ? "checked" : "unchecked"}
            color={"black"}
            onPress={() => {
              setFilterFunction("E85");
            }}
          />
        </View>
        <View>
          <Text>GPLc</Text>
          <RadioButton
            style={styles.radioButton}
            value="GPLc"
            status={filterFuel.includes("GPLc") ? "checked" : "unchecked"}
            color={"black"}
            onPress={() => {
              setFilterFunction("GPLc");
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default RadioFilter;

const styles = StyleSheet.create({
  radioFilterContainer: {
    backgroundColor: "lightgreen",
    width: Dimensions.get("screen").width,
    flexDirection: "row",
    justifyContent: "space-around",
  },

  radioButton: {
    backgroundColor: "black",
    borderWidth: 3,
    borderColor: "black",
  },
});
