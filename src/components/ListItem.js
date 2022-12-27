import React from "react";
import { StyleSheet, Dimensions, View, Text, Image } from "react-native";

import { CARREFOUR, getIcon, PLACEHOLDER } from "../utils/assets";

import ListItemPrice from "./ListItemPrice";
import ListIconContainer from "./ListIconContainer";

import { getDistance } from "geolib";
import { MD3Colors } from "react-native-paper";

const ListItem = ({ item, filterFuel }) => {
  const icon = getIcon(item.fields.brand.toLowerCase());

  return (
    <>
      <Text style={styles.stationTitle}>{item.fields.brand}</Text>
      <Text style={styles.stationCity}>{item.fields.city}</Text>

      <View style={styles.stationContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={icon} resizeMode={"contain"} />
        </View>
        <View style={styles.dataContainer}>
          <ListItemPrice
            filterFuel={filterFuel}
            fuelName={"Gazole"}
            price={item.fields.price_gazole}
          />
          <ListItemPrice
            filterFuel={filterFuel}
            fuelName={"SP95"}
            price={item.fields.price_sp95}
          />
          <ListItemPrice
            filterFuel={filterFuel}
            fuelName={"SP98"}
            price={item.fields.price_sp98}
          />
          <ListItemPrice
            filterFuel={filterFuel}
            fuelName={"E10"}
            price={item.fields.price_e10}
          />
          <ListItemPrice
            filterFuel={filterFuel}
            fuelName={"E85"}
            price={item.fields.price_e85}
          />
          <ListItemPrice
            filterFuel={filterFuel}
            fuelName={"GPLc"}
            price={item.fields.price_gplc}
          />
          {item.fields.shortage && filterFuel.length === 0 && (
            <View style={styles.penurieContainer}>
              <Text style={styles.penurieString}>Pénurie</Text>
              <Text style={styles.penurieString}>
                {item.fields.shortage.split("/").join(" - ")}
              </Text>
            </View>
          )}
          <ListIconContainer />
        </View>
      </View>
    </>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  stationContainer: {
    padding: 10,

    marginVertical: 3,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  dataContainer: {
    width: "75%",
  },
  stationTitle: {
    fontWeight: "bold",
    color: MD3Colors.primary30,
    // marginBottom: 10,
    textTransform: "capitalize",
    fontSize: 18,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  stationCity: {
    textTransform: "capitalize",
    paddingHorizontal: 10,
  },
  penurieContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  penurieString: {
    fontWeight: "bold",
    color: MD3Colors.primary30,
    marginTop: 10,
  },
  imageContainer: {
    width: "20%",
    // backgroundColor: "lightgreen",
    alignSelf: "flex-start",
    marginRight: 10,
  },
  image: {
    width: 50,
    height: 50,
  },
});
