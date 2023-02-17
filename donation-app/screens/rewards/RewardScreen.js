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
import { useQuery } from "react-query";
import { callApi } from "../../api";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const RewardScreen = () => {
  const { isLoading, data } = useQuery("rewards", callApi.rewards);
  console.log("data" + data);
  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView style={styles.container}>
        <View style={styles.top}>
          <Image
            style={styles.bg}
            source={require("../../assets/rewards_bg.jpg")}
          />
          <View style={styles.header}>
            <Ionicons
              style={styles.logo}
              name="logo-twitch"
              size={40}
              color="black"
            />
            <Text style={styles.title}>Rewards</Text>
          </View>
          <Text style={styles.subTitle}>Everybody loves a good rewards</Text>
        </View>
        <View style={styles.pointCard}>
          <Text style={styles.available}>Available Points</Text>
          <View style={styles.pointsView}>
            <Image
              style={styles.pointLogo}
              source={require("../../assets/point_logo.png")}
            />
            <Text style={styles.points}>4000</Text>
          </View>
        </View>
        <View>
          <Text style={styles.rewardHeader}>All Rewards</Text>
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
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  header: {
    paddingLeft: 20,
    paddingTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  subTitle: {
    paddingLeft: 20,
  },
  pointCard: {
    marginBottom: 20,
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 10,
    height: 100,
    marginTop: -30,

    // ios
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,

    // android
    elevation: 20,
    shadowColor: "#52006A",
    padding: 15,
  },
  pointLogo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  pointsView: {
    flexDirection: "row",
    alignItems: "center",
  },
  available: {
    fontSize: 16,
    marginBottom: 10,
  },
  points: {
    fontSize: 20,
    fontWeight: "bold",
  },
  rewardHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 20,
  },
});
