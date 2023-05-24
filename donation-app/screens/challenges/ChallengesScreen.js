import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  FlatList,
  Image,
} from "react-native";
import { useQuery } from "react-query";
import { FontAwesome5, AntDesign, Entypo } from "@expo/vector-icons";

import axios from "axios";
import * as Progress from "react-native-progress";

import styled from "styled-components/native";
import { callApi } from "../../api";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../firebase/firebaseAuth";
import Loader from "../../components/Loader";

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

const AvailableChallenges = styled.View`
  background-color: white;
  padding: 15px;
  border-radius: 20px;
  margin-top: 10px;
  margin-bottom: 30px;
  elevation: 10;
`;

const Challenge = styled.TouchableOpacity`
  flex-direction: column;
`;

const ChallengeTitle = styled.View`
  flex-direction: row;
`;

const ChallengeHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ChallengeBtn = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 10px;
  align-items: center;
  background-color: aliceblue;
  margin-bottom: 10px;
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

const ChallengesScreen = () => {
  const { user } = useAuth();
  const userId = user?.userId;
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

  const getLeftDays = (expiry) => {
    var currentTime = new Date().getTime();
    var timeDiff = expiry * 1000 - currentTime;

    return Math.ceil(timeDiff / 1000 / 60 / 60 / 24);
  };

  const onParticipate = async (challengeId) => {
    setLoading(true);
    try {
      const data = {
        challengeId: challengeId,
        userId: userId,
      };
      await axios.post(
        `http://10.0.2.2:5001/donation-app-8de49/us-central1/app/challenges`,
        data
      );
      refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const Divisor = () => (
    <View
      style={{
        borderBottomColor: "#b2bec3",
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 10,
      }}
    />
  );

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
            <Box>
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
            <Box>
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
            <Box>
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
            <AvailableChallenges>
              <ChallengeHeader>
                <Text style={styles.AvailableChallengesText}>
                  Join challenges
                </Text>
                <TouchableOpacity>
                  <Text style={{ color: "blue" }}>See all</Text>
                </TouchableOpacity>
              </ChallengeHeader>
              {data?.map(
                (c, index) =>
                  c.state == 0 && (
                    <Challenge onPress={() => toDetail(c)} key={index}>
                      <ChallengeTitle>
                        <Text style={{ marginRight: 5 }}>
                          {c.body.length > 40
                            ? c.body.slice(0, 40) + "..."
                            : c.body}
                        </Text>
                        <View>
                          <AntDesign
                            name="rightcircle"
                            size={18}
                            color="#b2bec3"
                          />
                        </View>
                      </ChallengeTitle>
                      <Image style={styles.logo} source={{ uri: c.logoUrl }} />
                      <ChallengeBtn onPress={() => onParticipate(c.id)}>
                        {loading ? (
                          <ActivityIndicator />
                        ) : (
                          <Text style={styles.btnText}>Drop in now</Text>
                        )}
                      </ChallengeBtn>
                      {index + 1 < data?.length ? <Divisor /> : null}
                    </Challenge>
                  )
              )}
            </AvailableChallenges>

            {data && (
              <OngoingChallenge>
                <Text style={styles.AvailableChallengesText}>
                  Your ongoing challenges
                </Text>
                <FlatList
                  data={[data?.find((c) => c.state == 1)]}
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
                          {item.title.length > 30
                            ? item.title.slice(0, 30) + "..."
                            : item.title}
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
  AvailableChallengesText: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 15,
  },
  btnText: {
    fontWeight: "bold",
    color: "blue",
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
});
