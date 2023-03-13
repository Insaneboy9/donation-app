import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useQuery } from "react-query";
import { callApi } from "../../api";
import Loader from "../../components/Loader";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../firebase/firebaseAuth"

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const RewardScreen = ({ route }) => {
  const { user } = useAuth();
  const { isLoading, data } = useQuery("rewards", callApi.rewards);

  const navigation = useNavigation();
  const toRewardDetail = (data) => {
    navigation.navigate("Stack", {
      screen: "RewardDetail",
      params: { ...data },
    });
  };

  return isLoading ? (
    <Loader />
  ) : (
    <SafeAreaView style={styles.wrapper}>
      <FlatList
        style={styles.container}
        ListHeaderComponent={
          <>
            <View style={styles.top}>
              <Image
                style={styles.bg}
                source={require("../../assets/rewards_bg.jpg")}
              />
              <View style={styles.header}>
                <View style={styles.logo}>
                  <Image
                    style={StyleSheet.absoluteFill}
                    source={require("../../assets/logo_black_x60.png")}
                  />
                </View>
                <Text style={styles.title}>Rewards</Text>
              </View>
              <Text style={styles.subTitle}>Everyone loves good rewards</Text>
            </View>
            <View style={styles.pointCard}>
              <Text style={styles.available}>Available Points</Text>
              <View style={styles.pointsView}>
                <Image
                  style={styles.pointLogo}
                  source={require("../../assets/point_logo.png")}
                />
                <Text style={styles.points}>{user.points}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.rewardHeader}>All Rewards</Text>
            </View>
          </>
        }
        data={data}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={<View style={{ width: 20 }} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => toRewardDetail(item)}
            style={styles.rewardCard}
          >
            <View style={styles.rewardImage}>
              <Image
                style={StyleSheet.absoluteFill}
                source={{ uri: item.imagelUrl }}
              />
            </View>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.brand}>{item.brand}</Text>
              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <Text style={styles.cost}>{item.points}</Text>
                <Text style={styles.brand}>points</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
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
    marginBottom: 10,
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
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: 10,
  },
  logo: {
    marginRight: 10,
    height: 60,
    width: 60,
  },
  rewardCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    flexDirection: "row",
  },
  rewardImage: {
    width: 150,
    height: 100,
    marginRight: 10,
    borderRadius: 20,
    overflow: "hidden",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  brand: {
    fontSize: 14,
    color: "#808e9b",
  },
  cost: {
    color: "#1e90ff",
    fontWeight: "bold",
    marginRight: 5,
  },
});
