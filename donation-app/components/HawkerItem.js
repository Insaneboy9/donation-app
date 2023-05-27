import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const HawkerItem = ({ hawker, mapRef }) => {
  const hawkerLocation = {
    latitude: parseFloat(hawker.latitude),
    longitude: parseFloat(hawker.longitude),
  };

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
      <Text style={{ marginVertical: 5 }}>{hawker.address}</Text>
      <View style={styles.holder}>
        <MaterialIcons name="directions-run" size={24} color="black" />
        <Text>{hawker.distance.toFixed(2)}km away</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  hawkerItem: {
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "gray",
    backgroundColor: "#f1f2f6",
  },
  boldText: {
    color: "#2ed573",
    fontWeight: "bold",
    fontSize: 16,
  },
  holder: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default HawkerItem;
