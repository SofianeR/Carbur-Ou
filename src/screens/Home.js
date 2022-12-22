import React, { useState, useEffect } from "react";

import { Text, View, StyleSheet } from "react-native";

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

  const [stationData, setStationData] = useState();

  const [locationState, setLocationState] = useState(null);

  const getStationData = async () => {
    setIsLoading(true);
    setErrorMessage("");

    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setErrorMessage("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocationState(location);

    try {
      const url_server = `https://public.opendatasoft.com/api/records/1.0/search/?dataset=prix_des_carburants_j_7&q=&facet=cp&facet=pop&facet=city&facet=automate_24_24&facet=fuel&facet=shortage&facet=update&facet=services&facet=brand&geofilter.distance=${location.coords.latitude},${location.coords.longitude},30000`;
      console.log(url_server);
      const response = await axios.get(url_server);

      setStationData(response.data);
    } catch (error) {
      setErrorMessage(error.message);

      console.log(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getStationData();
  }, []);

  return (
    <View style={styles.container}>
      {errorMessage ? <AlertComponents errorMessage={errorMessage} /> : null}

      {isLoading ? (
        <LoadingComponents />
      ) : (
        <>
          {locationState && (
            <MapComponents
              locationState={locationState}
              stationData={stationData}
            />
          )}
          {stationData && <ListStationComponent stationData={stationData} />}
        </>
      )}
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
