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
import PermissionLocationComponent from "../components/PermissionLocationComponent";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [stationData, setStationData] = useState([]);
  const [locationState, setLocationState] = useState(null);

  const askPermissionForLocation = async () => {
    let permissionResponse = await Location.requestForegroundPermissionsAsync();

    if (permissionResponse.status !== "granted") {
      setErrorMessage("Permission to access location was denied");
      setIsLoading(false);
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setLocationState(location);
    getStationData(location);
  };

  const getStationData = async (location) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
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
    askPermissionForLocation();
  }, []);

  if (isLoading) return <LoadingComponents />;

  //if (errorMessage) return <AlertComponents errorMessage={errorMessage} />;

  if (!locationState) return <PermissionLocationComponent />;

  return (
    <View style={styles.container}>
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
