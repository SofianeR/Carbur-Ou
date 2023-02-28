import React, { useEffect, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  SectionList,
  TouchableOpacity,
} from "react-native";

import ModalForm from "../../components/ConsoScreenComponents/ModalFormConso/ModalForm";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Constants from "expo-constants";
import { IconButton, MD3Colors, Modal } from "react-native-paper";

import { AntDesign } from "@expo/vector-icons";

const ConsoScreen = ({ route }) => {
  const [modalFormVisible, setModalFormVisible] = useState(false);

  const [consoArrayState, setConsoArrayState] = useState([]);

  const fetchAsyncStorageData = async () => {
    try {
      const consoData = await AsyncStorage.getItem("allConso");
      if (consoData) {
        setConsoArrayState(JSON.parse(consoData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sectionsFormat = () => {
    const copyArrayConso = [...consoArrayState];
    const dataForSection = [];

    copyArrayConso.map((item) => {
      if (!dataForSection.length > 0) {
        dataForSection.push({
          title: item.title,
          price: item.data.montant,
          data: [item.data],
        });
      } else {
        const isSectionExist = dataForSection.find(
          (objectToFind) => objectToFind.title === item.title
        );
        if (!isSectionExist) {
          dataForSection.push({
            title: item.title,
            price: item.data.montant,
            data: [item.data],
          });
        } else {
          isSectionExist.data.push(item.data);
          console.log(isSectionExist);
          isSectionExist.price = isSectionExist.data.reduce(
            (previousValue, currentValue) =>
              previousValue + Number(currentValue.montant),
            0
          );
        }
      }
    });
    return dataForSection;
  };

  const renderConsoItem = ({ item }) => {
    return (
      <View style={styles.sectionItemContainer}>
        <View style={styles.sectionItemTextContainer}>
          <Text style={styles.sectionItemLabel}>Station :</Text>
          <Text style={styles.sectionItemText}>{item.station}</Text>
        </View>

        <View style={styles.sectionItemTextContainer}>
          <Text style={styles.sectionItemLabel}>Prix :</Text>
          <Text style={styles.sectionItemText}>{item.montant} €</Text>
        </View>

        <View style={styles.sectionItemTextContainer}>
          <Text style={styles.sectionItemLabel}>Litres :</Text>
          <Text style={styles.sectionItemText}>{item.litres} L</Text>
        </View>
        <TouchableOpacity
          onPress={() => deleteSingleConso(item)}
          style={styles.sectionItemIconContainer}>
          <AntDesign name="delete" size={24} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  const deleteSingleConso = async (elementToDelete) => {
    const copyConsoArrayState = [...consoArrayState];

    const indexToDelete = copyConsoArrayState.findIndex(
      (elementToFind) => elementToFind.data.id === elementToDelete.id
    );

    copyConsoArrayState.splice(indexToDelete, 1);

    await AsyncStorage.setItem("allConso", JSON.stringify(copyConsoArrayState));
    setConsoArrayState(copyConsoArrayState);
  };

  const clearAllData = async () => {
    try {
      await AsyncStorage.clear();
      alert("success");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // clearAllData();
    fetchAsyncStorageData();
  }, []);

  if (modalFormVisible)
    return (
      <ModalForm
        modalFormVisible={modalFormVisible}
        setModalFormVisible={setModalFormVisible}
        consoArrayState={consoArrayState}
        setConsoArrayState={setConsoArrayState}
        fetchAsyncStorageData={fetchAsyncStorageData}
      />
    );

  return (
    <View style={styles.container}>
      {/* <IconButton
        icon="plus"
        mode={"elevated"}
        dark={true}
        buttonColor={MD3Colors.primary50}
        // style={styles.buttonAddConso}
        onPress={async () => {
          console.log(sectionsFormat());
          // console.log(consoArrayState);
          // console.log(sectionListArray);
          console.log(await AsyncStorage.getItem("allConso"));
        }}
      /> */}
      {/* {modalFormVisible && (
        <ModalForm
          modalFormVisible={modalFormVisible}
          setModalFormVisible={setModalFormVisible}
          consoArrayState={consoArrayState}
          setConsoArrayState={setConsoArrayState}
          fetchAsyncStorageData={fetchAsyncStorageData}
        />
      )} */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Ma consommation</Text>
      </View>

      {consoArrayState && (
        <SectionList
          contentContainerStyle={{ padding: "3%" }}
          sections={sectionsFormat()}
          renderItem={renderConsoItem}
          renderSectionHeader={({ section }) => (
            <View style={styles.sectionHeaderContainer}>
              <Text style={styles.sectionHeader}>{section.title}</Text>
              <Text style={styles.sectionHeader}>Total {section.price}€</Text>
            </View>
          )}
          keyExtractor={(item, index) => index}
        />
      )}

      <IconButton
        icon="plus"
        size={30}
        style={styles.addButton}
        onPress={() => setModalFormVisible(true)}
        disabled={modalFormVisible ? true : false}
      />
    </View>
  );
};

export default ConsoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  sectionHeaderContainer: {
    backgroundColor: MD3Colors.primary30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionHeader: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    padding: "3%",
  },
  sectionItemContainer: {
    padding: "3%",
    // borderBottomColor: MD3Colors.primary30,
    // borderBottomWidth: 1,
  },
  sectionItemTextContainer: {
    alignItems: "space-between",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#444",
    borderBottomWidth: 1,
  },
  sectionItemLabel: {
    fontWeight: "500",
    fontSize: 16,
    color: MD3Colors.primary20,
  },
  sectionItemText: {
    fontSize: 18,
    fontWeight: "bold",
    padding: "1%",
    color: MD3Colors.primary20,
  },
  sectionItemIconContainer: {
    alignSelf: "flex-end",
    alignItems: "center",
    padding: "2%",
    marginTop: "3%",
    backgroundColor: MD3Colors.error50,
    borderRadius: 5,
    width: "30%",
  },
});
