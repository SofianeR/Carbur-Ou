import React from "react";

import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import {
  IconButton,
  MD3Colors,
  Modal,
  TextInput,
  Button,
} from "react-native-paper";
import InputForm from "./InputForm";

const ModalForm = ({ modalForm, setModalForm }) => {
  return (
    <Modal
      visible={modalForm}
      onDismiss={() => setModalForm(false)}
      contentContainerStyle={styles.modalContainer}>
      <Text style={styles.titleModal}>Ajoutez une nouvelle consommation</Text>

      <InputForm label={"Station"} />
      <InputForm label={"Montant"} />
      <InputForm label={"Date"} />

      <Button
        mode={"elevated"}
        dark={true}
        buttonColor={MD3Colors.primary20}
        style={styles.buttonAddConso}>
        Ajouter
      </Button>
    </Modal>
  );
};

export default ModalForm;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: MD3Colors.primary90,
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "center",
    padding: 30,
  },

  titleModal: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 20,
    color: MD3Colors.primary30,
  },
  buttonAddConso: {
    marginTop: 20,
  },
});
