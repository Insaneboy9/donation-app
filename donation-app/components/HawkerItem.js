import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import * as geolib from 'geolib';

const HawkerItem = ({ hawker, userLocation, mapRef  }) => {
  const hawkerLocation = {
    latitude: parseFloat(hawker.latitude),
    longitude: parseFloat(hawker.longitude),
  };

  const distance = geolib.getDistance(userLocation, hawkerLocation);
  const distanceInKm = geolib.convertDistance(distance, 'km');

  const handlePress = () => {
    mapRef.current?.animateToRegion({
      latitude: hawkerLocation.latitude,
      longitude: hawkerLocation.longitude,
      latitudeDelta: 0.06,
      longitudeDelta: 0.03,
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.hawkerItem}>
      <Text style={styles.boldText}>{hawker.name}</Text>
      <Text>{hawker.address}</Text>
      <Text>- {distanceInKm}km away</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  hawkerItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HawkerItem;
