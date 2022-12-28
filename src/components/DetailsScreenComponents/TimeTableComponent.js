import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MD3Colors } from "react-native-paper";

const TimeTableComponent = ({ day, timeTable }) => {
  return (
    <View style={styles.timeTableDay}>
      <View style={styles.timeTableTextRow}>
        <Text style={[styles.timeTableText, styles.timeTableTextBold]}>
          {day} :
        </Text>
        <Text style={[styles.timeTableText, styles.timeTableTextBold]}>
          {timeTable[day]["ouvert"] ? "ouvert" : "fermé"}
        </Text>
      </View>
      {timeTable[day]["ouverture"] ? (
        <View style={styles.timeTableTextRow}>
          <Text style={styles.timeTableText}>Ouverture:</Text>
          <Text style={[styles.timeTableText, styles.timeTableTextBold]}>
            {timeTable[day]["ouverture"]}
          </Text>
        </View>
      ) : null}
      {timeTable[day]["fermeture"] ? (
        <View style={styles.timeTableTextRow}>
          <Text style={styles.timeTableText}>Fermeture:</Text>
          <Text style={[styles.timeTableText, styles.timeTableTextBold]}>
            {timeTable[day]["fermeture"]}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default TimeTableComponent;

const styles = StyleSheet.create({
  timeTableDay: {
    width: "50%",

    padding: 10,
  },
  timeTableTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    // borderBottomColor: MD3Colors.primary20,
    // borderBottomWidth: 1,
    paddingVertical: 5,
  },
  timeTableText: {
    color: MD3Colors.primary30,
  },
  timeTableTextBold: {
    fontWeight: "bold",
  },
});
