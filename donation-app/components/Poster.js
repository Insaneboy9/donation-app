import { StyleSheet, Image } from "react-native";
import React from "react";

const Poster = ({ posterPath }) => {
  return <Image style={styles.poster} source={{ uri: posterPath }} />;
};

export default Poster;

const styles = StyleSheet.create({
  poster: {
    width: 150,
    height: 160,
    borderRadius: 5,
    backgroundColor: "grey",
  },
});
