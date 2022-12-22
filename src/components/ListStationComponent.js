import React from "react";

import { FlatList, StyleSheet } from "react-native";

import CardComponent from "./CardComponent";
import ListEmptyComponent from "./ListEmptyComponent";

const ListStationComponent = ({ stationData }) => {
  const renderItem = ({ item }) => {
    return <CardComponent item={item} />;
  };

  return (
    <FlatList
      data={stationData}
      keyExtractor={(item) => item.fields.id}
      renderItem={renderItem}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
};

export default ListStationComponent;

const styles = StyleSheet.create({});
