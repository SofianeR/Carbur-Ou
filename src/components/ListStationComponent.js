import React from "react";

import { FlatList, StyleSheet, Dimensions, View } from "react-native";

import LoadingComponent from "./LoadingComponent";

import ListItem from "./ListItem";
import ListEmptyComponent from "./ListEmptyComponent";

const ListStationComponent = ({
  stationData,
  filterFuel,
  isLoadingFilteredResults,
  locationState,
}) => {
  const renderItem = ({ item }) => {
    return (
      <ListItem
        item={item}
        filterFuel={filterFuel}
        locationState={locationState}
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
        style={styles.container}
        data={stationData}
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
