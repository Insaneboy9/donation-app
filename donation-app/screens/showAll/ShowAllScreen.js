import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Poster from "../../components/Poster";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const ShowAllScreen = ({ navigation: { setOptions }, route: { params } }) => {
  const navigation = useNavigation();
  // navigate to detail page
  const toDetail = (data) => {
    navigation.navigate("Stack", {
      screen: "Detail",
      params: {
        ...data,
      },
    });
  };
  // render the title according to the category
  useEffect(() => {
    setOptions({
      title: "country" in params.data[0] ? "All Organizations" : "All Hawkers",
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.container}
        data={params.data}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 30 }}
        ItemSeparatorComponent={<View style={{ height: 20 }} />}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toDetail(item)} style={styles.item}>
            <Poster style={styles.poster} posterPath={item.posterUrl} />
            <View style={styles.details}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.type}>{item.type}</Text>
              {"country" in item ? (
                <View style={styles.toBottom}>
                  <Text style={styles.address}>{item.country}</Text>
                </View>
              ) : (
                <View style={styles.toBottom}>
                  <Text style={styles.address}>{item.address}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ShowAllScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: "row",
  },
  details: {
    marginLeft: 20,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  type: {
    fontSize: 16,
    color: "#636e72",
  },
  address: {
    textAlignVertical: "bottom",
    fontSize: 16,
  },
  toBottom: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
});
