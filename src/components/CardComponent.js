import React from "react";
import { StyleSheet, Dimensions } from "react-native";

import { Card, Paragraph, MD3Colors } from "react-native-paper";

const CardComponent = ({ item, filterFuel }) => {
  const formatPrice = (floatPrice) => {
    if (floatPrice < 0.003) {
      return (floatPrice * 1000).toFixed(2);
    } else {
      return floatPrice.toFixed(2);
    }
  };

  return (
    <Card mode={"outlined"} children={item} style={styles.cardContainer}>
      <Card.Title
        title={`${item.fields.name} / ${item.fields.city}`}
        subtitle={
          item.fields.shortage && filterFuel.length === 0 ? (
            <Paragraph>Pénurie(s) : {item.fields.shortage}</Paragraph>
          ) : null
        }
      />
      <Card.Content>
        {(item.fields.price_gazole && filterFuel.length === 0) ||
        (item.fields.price_gazole &&
          filterFuel.length > 0 &&
          filterFuel.includes("Gazole")) ? (
          <Paragraph>
            Prix Gazole : {formatPrice(item.fields.price_gazole)}
          </Paragraph>
        ) : null}

        {(item.fields.price_sp95 && filterFuel.length === 0) ||
        (item.fields.price_sp95 &&
          filterFuel.length > 0 &&
          filterFuel.includes("SP95")) ? (
          <Paragraph>
            Prix SP95 : {formatPrice(item.fields.price_sp95)}
          </Paragraph>
        ) : null}

        {(item.fields.price_sp98 && filterFuel.length === 0) ||
        (item.fields.price_sp98 &&
          filterFuel.length > 0 &&
          filterFuel.includes("SP98")) ? (
          <Paragraph>
            Prix SP98 : {formatPrice(item.fields.price_sp98)}
          </Paragraph>
        ) : null}

        {(item.fields.price_e10 && filterFuel.length === 0) ||
        (item.fields.price_e10 &&
          filterFuel.length > 0 &&
          filterFuel.includes("E10")) ? (
          <Paragraph>
            Prix SP95 E10 : {formatPrice(item.fields.price_e10)}
          </Paragraph>
        ) : null}

        {(item.fields.price_e85 && filterFuel.length === 0) ||
        (item.fields.price_e85 &&
          filterFuel.length > 0 &&
          filterFuel.includes("E85")) ? (
          <Paragraph>Prix E85 : {formatPrice(item.fields.price_e85)}</Paragraph>
        ) : null}

        {(item.fields.price_gplc && filterFuel.length === 0) ||
        (item.fields.price_gplc &&
          filterFuel.length > 0 &&
          filterFuel.includes("GPLc")) ? (
          <Paragraph>
            Prix GPLc : {formatPrice(item.fields.price_gplc)}
          </Paragraph>
        ) : null}
      </Card.Content>
    </Card>
  );
};

export default CardComponent;

const styles = StyleSheet.create({
  cardContainer: {
    width: Dimensions.get("screen").width,
    backgroundColor: MD3Colors.error80,
  },
});
