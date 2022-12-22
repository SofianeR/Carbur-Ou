import React from "react";

import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";

import { Card, Paragraph, MD3Colors } from "react-native-paper";

const ListStationComponent = ({ stationData }) => {
  const flatListRenderItem = ({ item }) => {
    return (
      <Card
        key={item.fields.id}
        mode={"outlined"}
        children={item}
        style={styles.cardContainer}>
        <Card.Title
          title={`${item.fields.name} / ${item.fields.city}`}
          subtitle={
            item.fields.shortage ? (
              <Paragraph>Pénurie(s) : {item.fields.shortage}</Paragraph>
            ) : null
          }
        />
        <Card.Content>
          {item.fields.price_gplc ? (
            <Paragraph>Prix GPLc : {item.fields.price_gplc}</Paragraph>
          ) : null}

          {item.fields.price_e10 ? (
            <Paragraph>Prix E10 : {item.fields.price_e10}</Paragraph>
          ) : null}

          {item.fields.price_e85 ? (
            <Paragraph>Prix E85 : {item.fields.price_e85}</Paragraph>
          ) : null}

          {item.fields.price_gazole ? (
            <Paragraph>Prix Gazole : {item.fields.price_gazole}</Paragraph>
          ) : null}

          {item.fields.price_sp98 ? (
            <Paragraph>Prix SP98 : {item.fields.price_sp98}</Paragraph>
          ) : null}

          {item.fields.price_sp95 ? (
            <Paragraph>Prix SP95 : {item.fields.price_sp95}</Paragraph>
          ) : null}
        </Card.Content>
      </Card>
    );
  };

  return (
    <FlatList
      data={stationData.records}
      keyExtractor={(item) => item.fields.id}
      renderItem={flatListRenderItem}
    />
  );
};

export default ListStationComponent;

const styles = StyleSheet.create({
  cardContainer: {
    width: Dimensions.get("screen").width,
    backgroundColor: MD3Colors.error80,
  },
});
