import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import colors from "../colors";
import Slide from "./Slide";
import { useNavigation } from "@react-navigation/native";

const HorizontalList = ({ title, data }) => {
  const navigation = useNavigation();
  const toShowAll = () => {
    navigation.navigate("Stack", {
      screen: "ShowAll",
      params: { data },
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={toShowAll}>
          <AntDesign name="rightcircle" size={18} color="#b2bec3" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 30 }}
        ItemSeparatorComponent={<View style={{ width: 20 }} />}
        renderItem={({ item }) => (
          <Slide
            posterPath={item.posterUrl || ""} // URL to default image if none
            originalTitle={item.name}
            category={item.type}
            fullData={item}
          />
        )}
      />
    </View>
  );
};

export default HorizontalList;

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  header: {
    // backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 30,
    marginBottom: 20,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
});
