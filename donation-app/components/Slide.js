import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import colors from "../colors";
import Poster from "./Poster";

const Slide = ({ posterPath, originalTitle, category, fullData }) => {
  const navigation = useNavigation();
  const toDetail = () => {
    navigation.navigate("Stack", {
      screen: "Detail",
      params: {
        ...fullData,
      },
    });
  };
  // console.log(fullData);

  return (
    <TouchableOpacity onPress={toDetail}>
      <View style={styles.container}>
        <Poster posterPath={posterPath} />
        <Text style={styles.title}>
          {originalTitle.slice(0, 12)}
          {originalTitle.length > 12 && "..."}
        </Text>
        <Text style={styles.category}>{category}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Slide;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  title: {
    color: colors.text,
    // fontWeight: 600,
    marginTop: 7,
    marginBottom: 5,
  },
  category: {
    fontSize: 13,
    color: "#636e72",
  },
});
