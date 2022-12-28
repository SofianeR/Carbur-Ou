import React, { useState } from "react";

import { StyleSheet, Text, View, Dimensions } from "react-native";

import ModalForm from "../../components/ConsoScreenComponents/ModalFormConso/ModalForm";

import Constants from "expo-constants";

import { IconButton, MD3Colors, Modal } from "react-native-paper";

const ConsoScreen = ({}) => {
  const [modalForm, setModalForm] = useState(false);

  return (
    <View style={styles.container}>
      {modalForm && (
        <ModalForm modalForm={modalForm} setModalForm={setModalForm} />
      )}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Ma consommation</Text>
      </View>
      <IconButton
        icon="plus"
        size={30}
        style={styles.addButton}
        onPress={() => setModalForm(true)}
        disabled={modalForm ? true : false}
      />
    </View>
  );
};

export default ConsoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "space-between",
    paddingTop: Constants.statusBarHeight,
  },

  titleContainer: {
    alignSelf: "center",
    borderBottomColor: MD3Colors.primary30,
    borderBottomWidth: 2,
    width: "60%",
    paddingBottom: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: MD3Colors.primary40,
    textAlign: "center",
  },

  addButton: {
    borderWidth: 2,
    borderColor: MD3Colors.secondary50,
    alignSelf: "flex-end",
    margin: 20,
  },
});
