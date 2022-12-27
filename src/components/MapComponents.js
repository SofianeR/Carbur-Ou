import React from "react";
import { StyleSheet, Dimensions } from "react-native";

import MapView, { Marker } from "react-native-maps";

const MapComponents = ({ locationState, stationData }) => {
  return (
    <MapView
      style={styles.mapStyle}
      initialRegion={{
        latitude: locationState.coords.latitude,
        longitude: locationState.coords.longitude,
        latitudeDelta: 0.7,
        longitudeDelta: 0.7,
      }}
      showsUserLocation={true}>
      {stationData.map((marker) => {
        return (
          <Marker
            key={marker.fields.id}
            coordinate={{
              latitude: marker.fields.geo_point[0],
              longitude: marker.fields.geo_point[1],
            }}
            title={marker.fields.name}
            description={marker.fields.timetable}
          />
        );
      })}
    </MapView>
  );
};

export default MapComponents;

const styles = StyleSheet.create({
  mapStyle: {
    // height: Dimensions.get("screen").height / 4,
    width: Dimensions.get("screen").width,
    flex: 4,
  },
});
