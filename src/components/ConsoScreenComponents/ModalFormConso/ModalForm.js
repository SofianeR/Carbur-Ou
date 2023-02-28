import React, { useState } from "react";

import { Alert, StyleSheet, Text, Modal, Pressable, View } from "react-native";

import InputForm from "./InputForm";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { AntDesign } from "@expo/vector-icons";

const ModalForm = ({
  modalFormVisible,
  setModalFormVisible,
  consoArrayState,
  setConsoArrayState,
  fetchAsyncStorageData,
}) => {
  const [stationNameState, setStationNameState] = useState("");
  const [montant, setMontant] = useState("");
  const [litres, setLitres] = useState("");

  const addConso = async () => {
    const dateObject = new Date();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();

    const fullDateString = `${month < 10 ? "0" + month : month}/${year}`;

    const copyConsoArrayState = [...consoArrayState];

    const objectConso = {
      title: fullDateString,
      data: {
        id: copyConsoArrayState.length,
        station: stationNameState,
        montant: montant,
        litres: litres,
        date: fullDateString,
      },
    };

    copyConsoArrayState.push(objectConso);

    await AsyncStorage.setItem("allConso", JSON.stringify(copyConsoArrayState));
    setConsoArrayState(copyConsoArrayState);

    setModalFormVisible(false);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        // transparent={true}
        visible={modalFormVisible}
        onRequestClose={() => {
          setModalFormVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                alignItems: "flex-end",
                width: "100%",
                marginBottom: "5%",
              }}>
              <Pressable onPress={() => setModalFormVisible(false)}>
                <AntDesign name="closecircleo" size={24} color="white" />
              </Pressable>
            </View>
            <Text style={[styles.modalText, styles.textStyle]}>
              Ajouter une nouvelle consommation
            </Text>

            <InputForm
              label={"Station"}
              setState={setStationNameState}
              valueState={stationNameState}
            />
            <InputForm
              label={"Montant"}
              setState={setMontant}
              valueState={montant}
            />
            <InputForm
              label={"Litres"}
              setState={setLitres}
              valueState={litres}
            />

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={addConso}>
              <Text
                style={{
                  color: "white",
                  fontWeight: "700",
                  fontSize: 17,
                }}>
                Ajouter
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalForm;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#444",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: "5%",
  },

  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
