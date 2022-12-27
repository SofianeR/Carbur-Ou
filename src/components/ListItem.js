import React from "react";
import { StyleSheet, Dimensions, View, Text, Image } from "react-native";

import { CARREFOUR, PLACEHOLDER } from "../utils/assets";
import logoStationObject from "../../assets/logoStationObject.json";

import ListItemPrice from "./ListItemPrice";

import { MD3Colors } from "react-native-paper";

const ListItem = ({ item, filterFuel }) => {
  let icon = PLACEHOLDER;

  switch (item.fields.brand.toLowerCase()) {
    case "carrefour":
      icon = CARREFOUR;
      break;

    default:
      icon = PLACEHOLDER;
      break;
  }
  return (
    <>
      <Text
        style={
          styles.stationTitle
        }>{`${item.fields.name} / ${item.fields.city}`}</Text>
      <View style={styles.stationContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={icon} />
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
        </View>
      </View>
    </>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  stationContainer: {
    padding: 10,
    // borderWidth: 2,
    // borderColor: MD3Colors.primary30,
    marginVertical: 3,
    borderRadius: 5,
    flexDirection: "row",
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
    alignSelf: "center",
    marginRight: 10,
  },
  image: {
    width: 50,
    height: 50,
  },
});
