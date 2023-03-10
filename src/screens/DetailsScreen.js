import React from "react";

import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";

import { getIcon } from "../utils/assets";

import Constants from "expo-constants";
import { MD3Colors } from "react-native-paper";
import TimeTableComponent from "../components/DetailsScreenComponents/TimeTableComponent";
import ListItemPrice from "../components/HomeComponents/ListComponents/ListItemPrice";

const DetailsScreen = ({ route }) => {
  const { stationDetail, distance, filterFuel } = route.params;

  let timeTable;
  if (stationDetail.timetable) {
    timeTable = JSON.parse(stationDetail.timetable);
  } else {
    timeTable = null;
  }

  const icon = getIcon(stationDetail.brand.toLowerCase());
  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={icon} resizeMode={"contain"} />
        </View>

        <View>
          <Text style={[styles.title, styles.stationName]}>
            {stationDetail.name}
          </Text>
          <View style={styles.cityContainer}>
            <Text style={[styles.title, styles.stationCity]}>
              {stationDetail.city}
            </Text>

            <Text style={[styles.title, styles.stationCity]}>
              {distance} km
            </Text>
          </View>

          {stationDetail.shortage ? (
            <Text style={[styles.title, styles.stationCity]}>
              Pénurie(s) : {stationDetail.shortage.split("/").join(" - ")} km
            </Text>
          ) : null}
        </View>

        <View style={styles.listItemPrice}>
          <Text style={[styles.stationName, { textAlign: "center" }]}>
            Prix
          </Text>
          <ListItemPrice
            filterFuel={filterFuel}
            fuelName={"Gazole"}
            price={stationDetail.price_gazole}
          />

          <ListItemPrice
            filterFuel={filterFuel}
            fuelName={"SP95"}
            price={stationDetail.price_sp95}
          />
          <ListItemPrice
            filterFuel={filterFuel}
            fuelName={"SP98"}
            price={stationDetail.price_sp98}
          />
          <ListItemPrice
            filterFuel={filterFuel}
            fuelName={"E10"}
            price={stationDetail.price_e10}
          />
          <ListItemPrice
            filterFuel={filterFuel}
            fuelName={"E85"}
            price={stationDetail.price_e85}
          />
          <ListItemPrice
            filterFuel={filterFuel}
            fuelName={"GPLc"}
            price={stationDetail.price_gplc}
          />
        </View>

        {timeTable && (
          <>
            <Text style={[styles.title, styles.stationName]}>Horaires</Text>
            <View style={styles.timetableContainer}>
              <View style={styles.timeTableRow}>
                <TimeTableComponent timeTable={timeTable} day={"Lundi"} />
                <TimeTableComponent timeTable={timeTable} day={"Mardi"} />
              </View>
              <View style={styles.timeTableRow}>
                <TimeTableComponent timeTable={timeTable} day={"Mercredi"} />
                <TimeTableComponent timeTable={timeTable} day={"Jeudi"} />
              </View>
              <View style={styles.timeTableRow}>
                <TimeTableComponent timeTable={timeTable} day={"Vendredi"} />
                <TimeTableComponent timeTable={timeTable} day={"Samedi"} />
              </View>
              <View style={styles.timeTableRow}>
                <TimeTableComponent timeTable={timeTable} day={"Dimanche"} />
              </View>
            </View>
          </>
        )}

        {stationDetail.services ? (
          <View style={styles.serviceContainer}>
            <Text style={styles.serviceText}>
              <Text style={{ fontWeight: "bold" }}>Services : </Text>
              {stationDetail.services.split("/").join(" - ")}
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#fff",
    paddingHorizontal: Dimensions.get("screen").width / 20,
  },
  imageContainer: {
    width: "100%",
    height: "10%",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: Dimensions.get("screen").height / 10,
  },
  title: {
    textAlign: "center",
    color: MD3Colors.primary20,
    padding: 5,
    marginBottom: 10,
  },
  stationName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stationCity: {
    fontSize: 16,
    fontWeight: "500",
  },

  listItemPrice: {
    marginBottom: 20,
    // borderWidth: 1,
    // borderColor: MD3Colors.primary30,
    // padding: 10,
    borderRadius: 5,
  },

  timetableContainer: {
    borderColor: MD3Colors.primary20,
    borderWidth: 2,
    borderRadius: 5,
    flexWrap: "wrap",
  },

  timeTableRow: {
    borderBottomColor: MD3Colors.primary20,
    borderBottomWidth: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  serviceContainer: {
    marginVertical: 10,
  },
  serviceText: {
    padding: 5,
    // fontWeight: "bold",
    color: MD3Colors.primary20,
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
});
