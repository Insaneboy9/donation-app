import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import moment, { add } from "moment";
import Loader from "../../components/Loader";
import { useQuery } from "react-query";
import { callApi } from "../../api";
import { useAuth } from "../../firebase/firebaseAuth";

const Card = styled.View`
  margin-horizontal: 20px;
  padding: 10px 20px;
  margin-bottom: 5px;
  height: 60px;
  flex-direction: row;
  background-color: ${(props) =>
    props.rank === 0
      ? "#ffb142"
      : props.rank === 1
      ? "#d1ccc0"
      : props.rank === 2
      ? "#ff793f"
      : "#f7f1e3"};
  align-items: center;
  justify-content: space-between;
  border-radius: 15px;
`;

const Rank = styled.View`
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
  margin-top: -5px;
`;

const TopRank = styled.Image`
  border-radius: 50px;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  margin-top: -10px;
`;

const NormalRank = styled.View`
  justify-content: center;
  align-items: center;
  background-color: #ff6348;
  border-radius: 50px;
  width: 20px;
  height: 20px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const LeaderboardScreen = () => {
  const { user } = useAuth();
  const [remainingTime, setRemainingTime] = useState(7 * 24 * 60 * 60);
  // fetching users data
  const { isLoading, data, refetch } = useQuery(
    "leaderboard",
    callApi.leaderboard
  );
  const users = data;
  // sort the users in descending order
  users?.sort((a, b) => b.points - a.points);

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    return `${hours} : ${minutes} : ${seconds}`;
  };

  const currentTime = moment().add(8, 'hours').format('hh:mm A');

  // rerender when the points increase
  useEffect(() => {
    refetch();
  }, [user]);

  //reset timer every second
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);
  
    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Leaderboard</Text>
        <LinearGradient
          colors={["#ffd32a", "#fffa65"]}
          style={styles.card}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        >
          <Image
            style={styles.prizeLogo}
            source={require("../../assets/prize.png")}
          />
          <Text style={styles.header}>WIN 1000 POINTS!</Text>
          <Text style={styles.content}>This week's highest point wins!</Text>
          <Text style={styles.timer}>Contest ends in {formatTime(remainingTime)}</Text>
        </LinearGradient>
        <View style={styles.updateWrapper}>
          <Text style={{ color: "#808e9b" }}>As of {currentTime} SGT</Text>
        </View>
        {users.map((user, index) => (
          <Card key={index} rank={index}>
            <View key={index} style={styles.profile}>
              <Rank>
                {index === 0 && (
                  <TopRank source={require("../../assets/first_prize.png")} />
                )}
                {index === 1 && (
                  <TopRank source={require("../../assets/second_prize.png")} />
                )}
                {index === 2 && (
                  <TopRank source={require("../../assets/third_prize.png")} />
                )}
                {index > 2 && (
                  <NormalRank>
                    <Text style={{ color: "white" }}>{index + 1}</Text>
                  </NormalRank>
                )}
              </Rank>
              <Ionicons name="person" size={24} color="black" />
              <Text>{user.name}</Text>
            </View>
            <Text>{user.points}</Text>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LeaderboardScreen;

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
  card: {
    position: "relative",
    marginTop: 20,
    marginBottom: 10,
    height: SCREEN_HEIGHT / 5,
    marginHorizontal: 20,
    borderRadius: 20,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontSize: 20,
    marginTop: -20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  content: {
    fontSize: 14,
  },
  timer: {
    fontSize: 14,
    color: "#ff9f1a",
  },
  prizeLogo: {
    width: 100,
    position: "absolute",
    right: 10,
  },
  updateWrapper: {
    marginHorizontal: 20,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "flex-end",
  },
  rankCard: {
    marginHorizontal: 20,
    padding: 10,
    paddingHorizontal: 20,
    marginBottom: 5,
    height: 60,
    flexDirection: "row",
    backgroundColor: "#dfe4ea",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 15,
  },
  profile: {
    flexDirection: "row",
  },
});
