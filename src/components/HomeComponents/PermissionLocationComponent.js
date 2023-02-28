import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";

import { MD3Colors } from "react-native-paper";

const PermissionLocationComponent = () => {
  const askPermissionForLocation = async () => {
    Linking.openSettings();
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Vous ne pouvez pas utiliser la carte et liste des stations sans
          accepter la géolocalisation
        </Text>
        <TouchableOpacity onPress={askPermissionForLocation}>
          <Text style={styles.touchableText}>
            Pressez-ici pour acceder aux autorisations de géolocalisation des
            paramètres
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PermissionLocationComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: "1%",
    // backgroundColor: "#444",
  },
  textContainer: {
    backgroundColor: "#444",
    padding: "3%",
    paddingVertical: "5%",
    borderRadius: 15,
  },
  text: {
    color: "white",
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
  },

  touchableText: {
    marginTop: "3%",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    color: MD3Colors.primary60,
  },
});
