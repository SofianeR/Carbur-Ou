import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";

import AlertComponents from "../components/AlertComponents";

import axios from "axios";
import * as Location from "expo-location";
import Constants from "expo-constants";
import MapView, { Marker } from "react-native-maps";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [data, setData] = useState();
  const markers = [
    {
      id: 1,
      latitude: 48.8564449,
      longitude: 2.4002913,
      title: "Le Reacteur",
      description: "La formation des champion·ne·s !",
    },
  ];

  const [locationState, setLocationState] = useState(null);

  const getData = async () => {
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

      setData(response.data);
    } catch (error) {
      setErrorMessage(error.message);

      console.log(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      {errorMessage ? <AlertComponents errorMessage={errorMessage} /> : null}

      {isLoading ? (
        <View>
          <Text>En cours de chargement ....</Text>
        </View>
      ) : (
        <>
          {locationState && (
            <MapView
              style={{
                height: Dimensions.get("screen").height / 3,
                width: Dimensions.get("screen").width,
              }}
              initialRegion={{
                latitude: locationState.coords.latitude,
                longitude: locationState.coords.longitude,
                latitudeDelta: 0.2,
                longitudeDelta: 0.2,
              }}
              showsUserLocation={true}>
              {data.records.map((marker) => {
                return (
                  <Marker
                    key={marker.fields.id}
                    coordinate={{
                      latitude: marker.fields.geo_point[0],
                      longitude: marker.fields.geo_point[1],
                    }}
                    title={marker.fields.name}
                    description={marker.fields.timetable}
                  />
                );
              })}
            </MapView>
          )}
          {data && (
            <FlatList
              data={data.records}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    key={item.fields.id}
                    style={styles.cardContainer}>
                    <Text>{item.fields.name}</Text>
                    <Text>{item.fields.fuel}</Text>
                    <Text>{item.fields.city}</Text>
                    {item.fields.shortage ? (
                      <Text>Pénurie(s) : {item.fields.shortage}</Text>
                    ) : null}

                    <View>
                      {item.fields.price_gplc ? (
                        <Text>Prix GPLc : {item.fields.price_gplc}</Text>
                      ) : null}

                      {item.fields.price_e10 ? (
                        <Text>Prix E10 : {item.fields.price_e10}</Text>
                      ) : null}

                      {item.fields.price_e85 ? (
                        <Text>Prix E85 : {item.fields.price_e85}</Text>
                      ) : null}

                      {item.fields.price_gazole ? (
                        <Text>Prix Gazole : {item.fields.price_gazole}</Text>
                      ) : null}

                      {item.fields.price_sp98 ? (
                        <Text>Prix SP98 : {item.fields.price_sp98}</Text>
                      ) : null}

                      {item.fields.price_sp95 ? (
                        <Text>Prix SP95 : {item.fields.price_sp95}</Text>
                      ) : null}
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          )}
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

  cardContainer: {
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "space-between",
    alignItems: "center",
    width: Dimensions.get("screen").width,
  },
});
