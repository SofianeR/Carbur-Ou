import React from "react";
import { StyleSheet, Dimensions } from "react-native";

import { Button, MD3Colors } from "react-native-paper";

const ButtonFilter = ({ fuelName, filterFuel, setFilterFuel }) => {
  const setFilterFunction = (fuelString) => {
    if (!filterFuel.includes(fuelString)) {
      const copyFilterFuel = [...filterFuel];
      copyFilterFuel.push(fuelString);
      setFilterFuel(copyFilterFuel);
    } else {
      const copyFilterFuel = [...filterFuel];
      const index = copyFilterFuel.indexOf(fuelString);
      copyFilterFuel.splice(index, 1);
      setFilterFuel(copyFilterFuel);
    }
  };

  return (
    <Button
      style={styles.button}
      mode="contained"
      textColor={filterFuel.includes(fuelName) ? "white" : MD3Colors.primary40}
      buttonColor={
        filterFuel.includes(fuelName) ? MD3Colors.primary40 : "white"
      }
      onPress={() => {
        setFilterFunction(fuelName);
      }}>
      {fuelName}
    </Button>
  );
};

export default ButtonFilter;

const styles = StyleSheet.create({
  button: {
    margin: 5,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: MD3Colors.primary20,
  },
});
