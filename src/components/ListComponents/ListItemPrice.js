import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MD3Colors } from "react-native-paper";

const ListItemPrice = ({ price, filterFuel, fuelName }) => {
  const formatPrice = (floatPrice) => {
    if (floatPrice < 0.003) {
      return (floatPrice * 1000).toFixed(2);
    } else {
      return floatPrice.toFixed(2);
    }
  };

  if (
    (price && filterFuel.length === 0) ||
    (price && filterFuel.length > 0 && filterFuel.includes(fuelName))
  )
    return (
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>Prix {fuelName}</Text>
        <Text style={styles.priceText}>{formatPrice(price)} €</Text>
      </View>
    );
};

export default ListItemPrice;

const styles = StyleSheet.create({
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  priceText: {
    color: MD3Colors.primary40,
    fontWeight: "bold",
  },
});
