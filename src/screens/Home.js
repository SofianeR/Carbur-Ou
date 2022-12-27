import React, { useState, useEffect, useRef } from "react";

import { Text, View, StyleSheet, AppState, Dimensions } from "react-native";

import { getUrlApi } from "../utils/getUrlApi";

import AlertComponents from "../components/AlertComponents";
import LoadingComponents from "../components/LoadingComponents";

import MapComponents from "../components/MapComponents";
import ListStationComponent from "../components/ListStationComponent";
import RadioFilter from "../components/RadioFilter";

import axios from "axios";
import * as Location from "expo-location";
import PermissionLocationComponent from "../components/PermissionLocationComponent";

const Home = () => {
  // const appState = useRef(AppState.currentState);
  // const [appStateStatus, setAppStateStatus] = useState(appState.current);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [stationData, setStationData] = useState([]);
  const [locationState, setLocationState] = useState(null);

  const [filterFuel, setFilterFuel] = useState([]);

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

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        console.log(locationState);
        askPermissionForLocation();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  if (isLoading) return <LoadingComponents />;

  // if (errorMessage) return <AlertComponents errorMessage={errorMessage} />;

  if (!locationState) return <PermissionLocationComponent />;

  return (
    <View style={styles.container}>
      {errorMessage ? <AlertComponents errorMessage={errorMessage} /> : null}

      <MapComponents locationState={locationState} stationData={stationData} />

      <ListStationComponent stationData={stationData} filterFuel={filterFuel} />

      <RadioFilter
        locationState={locationState}
        setStationData={setStationData}
        setErrorMessage={setErrorMessage}
        filterFuel={filterFuel}
        setFilterFuel={setFilterFuel}
      />
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
