import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";

import { getUrlApi } from "../utils/getUrlApi";

import RadioButtonFilterFuel from "./ButtonFilterFuel";

import axios from "axios";
import { Modal, Button, MD3Colors } from "react-native-paper";

const FilterComponent = ({
  setIsLoadingFilterResults,
  setErrorMessage,
  locationState,
  setStationData,
  filterFuel,
  setFilterFuel,
}) => {
  const clearFilter = () => {
    setFilterFuel([]);
  };

  const getFilteredStation = async () => {
    setIsLoadingFilterResults(true);
    setErrorMessage("");

    try {
      const urlServer = await getUrlApi(
        locationState.coords.latitude,
        locationState.coords.longitude,
        filterFuel
      );

      // console.log(urlServer);

      const response = await axios.get(urlServer);

      setStationData(response.data.records);
    } catch (error) {
      setErrorMessage(error.message);

      console.log(error.message);
    } finally {
      setIsLoadingFilterResults(false);
    }
  };

  useEffect(() => {
    getFilteredStation();
  }, [filterFuel]);

  return (
    <>
      <ScrollView
        style={styles.ScrollViewStyle}
        contentContainerStyle={styles.containerModal}
        horizontal={true}>
        <RadioButtonFilterFuel
          fuelName={"Gazole"}
          filterFuel={filterFuel}
          setFilterFuel={setFilterFuel}
        />

        <RadioButtonFilterFuel
          fuelName={"SP95"}
          filterFuel={filterFuel}
          setFilterFuel={setFilterFuel}
        />

        <RadioButtonFilterFuel
          fuelName={"SP98"}
          filterFuel={filterFuel}
          setFilterFuel={setFilterFuel}
        />

        <RadioButtonFilterFuel
          fuelName={"E10"}
          filterFuel={filterFuel}
          setFilterFuel={setFilterFuel}
        />

        <RadioButtonFilterFuel
          fuelName={"E85"}
          filterFuel={filterFuel}
          setFilterFuel={setFilterFuel}
        />

        <RadioButtonFilterFuel
          fuelName={"GPLc"}
          filterFuel={filterFuel}
          setFilterFuel={setFilterFuel}
        />
      </ScrollView>
    </>
  );
};

export default FilterComponent;

const styles = StyleSheet.create({
  containerModal: {
    // backgroundColor: MD3Colors.primary20,
    justifyContent: "center",
    flexGrow: 1,
  },
  ScrollViewStyle: {
    flex: 1,
  },
  button: {
    margin: 5,
    alignSelf: "center",
  },
});
