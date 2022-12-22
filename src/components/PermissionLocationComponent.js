import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import React from "react";

const PermissionLocationComponent = () => {
  const askPermissionForLocation = async () => {
    Linking.openSettings();
  };

  return (
    <View style={styles.container}>
      <Text>
        Vous ne pouvez pas utiliser l'application sans accepter la
        géolocalisation
      </Text>
      <TouchableOpacity onPress={askPermissionForLocation}>
        <Text>Autorisation de géolocalisation dans les paramètres</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PermissionLocationComponent;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
