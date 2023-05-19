import { StyleSheet, View, Text } from "react-native";
import * as geolib from 'geolib';

const HawkerItem = ({ hawker, userLocation }) => {
  const hawkerLocation = {
    latitude: parseFloat(hawker.latitude),
    longitude: parseFloat(hawker.longitude),
  };

  const distance = geolib.getDistance(userLocation, hawkerLocation);
  const distanceInKm = geolib.convertDistance(distance, 'km');

  return (
    <View style={styles.hawkerItem}>
      <Text style={styles.boldText}>{hawker.name}</Text>
      <Text>{hawker.address}</Text>
      <Text>- {distanceInKm}km away</Text>
    </View>
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
