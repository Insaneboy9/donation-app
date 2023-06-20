import React, { useRef, useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Animated,
  FlatList,
  Image,
} from "react-native";
import { useQuery } from "react-query";
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import styled from "styled-components/native";
import { callApi } from "../../api";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../firebase/firebaseAuth";
import Loader from "../../components/Loader";
import Challenges from "../../components/Challenges";

const Header = styled.View`
  padding: 10px;
`;

const AnimatedHeader = Animated.createAnimatedComponent(Header);

const TextHeader = styled.Text`
  font-size: 22px;
  font-weight: bold;
`;

const Box = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
  border-radius: 10px;
  width: 30%;
  elevation: 10;
`;

const OngoingChallenge = styled.View`
  margin-bottom: 50px;
  margin-horizontal: 10px;
`;
const ChallengeBox = styled.TouchableOpacity`
  flex-direction: row;
  background-color: white;
  border: solid;
  border-width: 1px;
  padding: 10px;
  border-radius: 5px;
  border-color: #808e9b;
`;

const BoxDetail = styled.View`
  justify-content: center;
  align-items: center;
`;

const ChallengesScreen = ({ route: { params } }) => {
  const { user } = useAuth();
  const userId = params.user.userId;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { isLoading, data, refetch } = useQuery(["challenges", userId], () =>
    callApi.challenges(userId)
  );

  const offset = useRef(new Animated.Value(0)).current;

  const bgColor = offset.interpolate({
    inputRange: [0, 150],
    outputRange: ["rgb(241,242,246)", "rgb(255, 255, 255)"],
    extrapolate: "clamp",
  });

  const toDetail = (data) => {
    navigation.navigate("Stack", {
      screen: "Challenge Detail",
      params: { data },
    });
  };

  const toHistory = (data, type) => {
    navigation.navigate("Stack", {
      screen: "Challenge History",
      params: { data, type },
    });
  };

  const getLeftDays = (expiry) => {
    var currentTime = new Date().getTime();
    var timeDiff = expiry * 1000 - currentTime;

    return Math.ceil(timeDiff / 1000 / 60 / 60 / 24);
  };

  // rerender when transaction made
  useEffect(() => {
    refetch();
  }, [user]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <AnimatedHeader
        style={{
          backgroundColor: bgColor,
        }}
      >
        <TextHeader>Donate more</TextHeader>
      </AnimatedHeader>
      {isLoading ? (
        <Loader />
      ) : (
        <ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: offset } } }],
            { useNativeDriver: false }
          )}
          style={styles.container}
        >
          <View style={styles.top}>
            <Box
              onPress={() =>
                toHistory(
                  data?.filter((c) => c.state == 0),
                  "0"
                )
              }
            >
              <Entypo
                style={styles.boxLogo}
                name="new"
                size={24}
                color="#808e9b"
              />
              <Text style={styles.boxTitle}>New</Text>
              <Text style={styles.boxQuantity}>
                {data?.filter((c) => c.state == 0).length}
              </Text>
            </Box>
            <Box
              onPress={() =>
                toHistory(
                  data?.filter((c) => c.state == 1),
                  "1"
                )
              }
            >
              <FontAwesome5
                style={styles.boxLogo}
                name="running"
                size={24}
                color="#808e9b"
              />
              <Text style={styles.boxTitle}>Ongoing</Text>
              <Text style={styles.boxQuantity}>
                {data?.filter((c) => c.state == 1).length}
              </Text>
            </Box>
            <Box
              onPress={() =>
                toHistory(
                  data?.filter((c) => c.state == 2),
                  "2"
                )
              }
            >
              <FontAwesome5
                style={styles.boxLogo}
                name="history"
                size={24}
                color="#808e9b"
              />
              <Text style={styles.boxTitle}>History</Text>
              <Text style={styles.boxQuantity}>
                {data?.filter((c) => c.state == 2).length}
              </Text>
            </Box>
          </View>
          <View style={styles.bottom}>
            <Challenges
              title="Join Challenges"
              data={data?.filter((c) => c.state == 0)}
              loading={loading}
              setLoading={setLoading}
              isBtn={true}
              userId={userId}
            />

            {data && (
              <OngoingChallenge>
                <Text style={styles.AvailableChallengesText}>
                  Your ongoing challenges
                </Text>
                <FlatList
                  data={data.filter((c) => c.state == 1)}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 10 }}
                  ItemSeparatorComponent={<View style={{ width: 20 }} />}
                  renderItem={({ item }) => (
                    <ChallengeBox onPress={() => toDetail(item)}>
                      <Image
                        style={{ ...styles.logo, marginRight: 10 }}
                        source={{ uri: item.logoUrl }}
                      />
                      <BoxDetail>
                        <Text style={{ marginLeft: 10, marginBottom: 10 }}>
                          {item.body.length > 30
                            ? item.body.slice(0, 30) + "..."
                            : item.body}
                        </Text>
                        <Progress.Bar
                          progress={item.progress / item.max_progress}
                          width={200}
                        />
                        <View style={styles.moreInfo}>
                          <Text style={styles.seeMore}>See more</Text>
                          <Text style={styles.expiry}>
                            {getLeftDays(item.expiry_date.seconds)} days left
                          </Text>
                        </View>
                      </BoxDetail>
                    </ChallengeBox>
                  )}
                />
              </OngoingChallenge>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ChallengesScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  top: {
    width: "100%",
    padding: 10,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  boxLogo: {
    marginBottom: 15,
  },
  boxTitle: {
    color: "#808e9b",
  },
  boxQuantity: {
    fontSize: 20,
    fontWeight: "bold",
  },
  bottom: {
    backgroundColor: "white",
    height: "100%",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    padding: 10,
    elevation: 20,
  },
  moreInfo: {
    position: "relative",
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
  },
  expiry: {
    color: "#808e9b",
    position: "absolute",
    right: 0,
  },
  seeMore: {
    color: "#0984e3",
    fontWeight: "bold",
  },
  logo: {
    width: 50,
    height: 50,
    marginVertical: 10,
  },
  AvailableChallengesText: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 15,
  },
});
