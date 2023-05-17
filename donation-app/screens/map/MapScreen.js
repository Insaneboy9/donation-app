import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { Button, StyleSheet, View } from "react-native";
import * as Location from "expo-location";

const MapScreen = () => {
  const [mapRegion, setMapRegion] = useState({
    latitude: 1.29027,
    longitude: 103.851959,
    latitudeDelta: 0.06,
    longitudeDelta: 0.03,
  });

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.06,
      longitudeDelta: 0.03,
    });
  };

  useEffect(() => {
    userLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={mapRegion}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        <Marker
          coordinate={{
            latitude: 1.3507,
            longitude: 103.8488,
          }}
          title="Marker"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapScreen;
