import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import colors from "../colors";

const Slide = ({ posterPath, originalTitle, category }) => {
  const navigation = useNavigation();
  const toDetail = () => {
    // //@ts-ignore
    // navigation.navigate("Stack", {
    //   screen: "Detail",
    //   params: {
    //     ...fullData,
    //   },
    // });
  };

  return (
    <TouchableOpacity onPress={toDetail}>
      <View style={styles.container}>
        <Image style={styles.poster} source={{ uri: posterPath }} />
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
  category: {},
  poster: {
    width: 100,
    height: 160,
    borderRadius: 5,
    backgroundColor: "grey",
  },
});
