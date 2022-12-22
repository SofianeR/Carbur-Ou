import React from "react";

import { FlatList, StyleSheet } from "react-native";

import CardComponent from "./CardComponent";

const ListStationComponent = ({ stationData }) => {
  const renderItem = ({ item }) => {
    return <CardComponent item={item} />;
  };

  return (
    <FlatList
      data={stationData}
      keyExtractor={(item) => item.fields.id}
      renderItem={renderItem}
      ListEmptyComponent={() => {}}
    />
  );
};

export default ListStationComponent;

const styles = StyleSheet.create({});
