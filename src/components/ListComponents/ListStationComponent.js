import React from "react";

import { FlatList, StyleSheet, View } from "react-native";

import LoadingComponent from "../Shared/LoadingComponent";

import ListItem from "./ListItem";
import ListEmptyComponent from "./EmptyComponent";

const ListStationComponent = ({
  stationData,
  filterFuel,
  isLoadingFilteredResults,
  locationState,
  selectStation,
}) => {
  const renderItem = ({ item }) => {
    return (
      <ListItem
        item={item}
        filterFuel={filterFuel}
        locationState={locationState}
        selectStation={selectStation}
      />
    );
  };

  if (isLoadingFilteredResults)
    return (
      <View style={styles.container}>
        <LoadingComponent />
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={stationData}
        style={styles.container}
        keyExtractor={(item) => item.fields.id}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};

export default ListStationComponent;

const styles = StyleSheet.create({
  container: {
    flex: 8,
  },
});
