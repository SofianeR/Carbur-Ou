import React, { useRef } from "react";
import { StyleSheet, Dimensions } from "react-native";

import MapView, { Marker } from "react-native-maps";

const MapComponents = ({ locationState, stationData, mapRef }) => {
  return (
    <MapView
      ref={mapRef}
      style={styles.mapStyle}
      initialRegion={{
        latitude: locationState.coords.latitude,
        longitude: locationState.coords.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
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
    flex: 3,
  },
});
