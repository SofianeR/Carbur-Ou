import React, { useState, useEffect } from "react";

import { Text, View, StyleSheet } from "react-native";

import { getUrlApi } from "../utils/getUrlApi";

import AlertComponents from "../components/AlertComponents";
import LoadingComponents from "../components/LoadingComponents";

import MapComponents from "../components/MapComponents";
import ListStationComponent from "../components/ListStationComponent";

import axios from "axios";
import * as Location from "expo-location";
import Constants from "expo-constants";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [stationData, setStationData] = useState([]);
  const [locationState, setLocationState] = useState(null);

  const askPermissionForLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setErrorMessage("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocationState(location);

    return location;
  };

  const getStationData = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const location = await askPermissionForLocation();

      const urlServer = await getUrlApi(
        location.coords.latitude,
        location.coords.longitude
      );

      const response = await axios.get(urlServer);

      setStationData(response.data.records);
    } catch (error) {
      setErrorMessage(error.message);

      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getStationData();
  }, []);

  if (isLoading) return <LoadingComponents />;

  if (!locationState) return; // hey qccepte la locqlistion sinon on peut rien faire  avc un bnt pour peut rien

  return (
    <View style={styles.container}>
      {errorMessage ? <AlertComponents errorMessage={errorMessage} /> : null}

      <MapComponents locationState={locationState} stationData={stationData} />

      <ListStationComponent stationData={stationData} />
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
  },
});
