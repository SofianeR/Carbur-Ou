import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";

import AlertComponents from "../components/AlertComponents";

import axios from "axios";
import * as Location from "expo-location";
import Constants from "expo-constants";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [data, setData] = useState();
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
        data && (
          <FlatList
            data={data.records}
            renderItem={({ item, index }) => {
              return (
                <View key={item.fields.id} style={styles.cardContainer}>
                  <Text>{item.fields.name}</Text>
                  <Text>{item.fields.fuel}</Text>
                  <Text>{item.fields.city}</Text>
                  <View>
                    <Text>
                      {item.fields.price_e10 ? item.fields.price_e10 : null}
                    </Text>
                    <Text>
                      {item.fields.price_e85 ? item.fields.price_e85 : null}
                    </Text>
                    <Text>
                      {item.fields.price_gazole
                        ? item.fields.price_gazole
                        : null}
                    </Text>
                    <Text>
                      {item.fields.price_sp98 ? item.fields.price_sp98 : null}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        )
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
