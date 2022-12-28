import React, { useState, useEffect, useRef } from "react";

import { Text, View, StyleSheet, AppState, Dimensions } from "react-native";

import { getUrlApi } from "../utils/getUrlApi";

import AlertComponents from "../components/Shared/AlertComponents";
import LoadingComponent from "../components/Shared/LoadingComponent";

import MapComponents from "../components/MapComponents";
import ListStationComponent from "../components/ListComponents/ListStationComponent";
import FilterComponent from "../components/FilterComponents/FilterComponent";

import axios from "axios";
import * as Location from "expo-location";
import PermissionLocationComponent from "../components/PermissionLocationComponent";

const Home = () => {
  const [isLoadingFilteredResults, setIsLoadingFilterResults] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [stationData, setStationData] = useState([]);
  const [locationState, setLocationState] = useState(null);

  const [filterFuel, setFilterFuel] = useState([]);

  const mapRef = useRef(null);
  const selectStation = (stationRegion) => {
    mapRef.current.animateToRegion(stationRegion, 1000);
  };

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
        askPermissionForLocation();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  if (isLoading) return <LoadingComponent />;

  // if (errorMessage) return <AlertComponents errorMessage={errorMessage} />;

  if (!locationState) return <PermissionLocationComponent />;

  return (
    <View style={styles.container}>
      {errorMessage ? <AlertComponents errorMessage={errorMessage} /> : null}

      <FilterComponent
        setIsLoadingFilterResults={setIsLoadingFilterResults}
        setErrorMessage={setErrorMessage}
        locationState={locationState}
        setStationData={setStationData}
        filterFuel={filterFuel}
        setFilterFuel={setFilterFuel}
      />

      <MapComponents
        locationState={locationState}
        stationData={stationData}
        mapRef={mapRef}
      />

      <ListStationComponent
        stationData={stationData}
        filterFuel={filterFuel}
        isLoadingFilteredResults={isLoadingFilteredResults}
        locationState={locationState}
        selectStation={selectStation}
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
