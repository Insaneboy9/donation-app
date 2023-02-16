import {
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const RewardScreen = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView style={styles.container}>
        <View style={styles.top}>
          <Image
            style={styles.bg}
            source={require("../../assets/rewards_bg.jpg")}
          />
          <View style={styles.title}>
            <Ionicons
              style={styles.logo}
              name="logo-twitch"
              size={50}
              color="black"
            />
            <Text style={styles.subTitle}>Rewards</Text>
          </View>
          <Text>Everybody loves a good gift</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RewardScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    marginTop: 20,
    fontWeight: "bold",
  },
  top: {
    position: "relative",
    width: "100%",
    height: SCREEN_HEIGHT / 5,
  },
  bg: {
    // flex: 1,
    // width: "100%",
    // position: "absolute",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  title: {
    paddingLeft: 20,
    paddingTop: 20,
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
  },
  subTitle: {
    paddingLeft: 20,
  },
});
