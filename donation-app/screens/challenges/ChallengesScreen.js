import React, { useRef } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  UIManager,
  TouchableOpacity,
  LayoutAnimation,
  Animated,
  FlatList,
} from "react-native";
import {
  FontAwesome5,
  Entypo,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";

import * as Progress from "react-native-progress";

import styled from "styled-components/native";

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

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const ChallengesScreen = () => {
  const offset = useRef(new Animated.Value(0)).current;

  const bgColor = offset.interpolate({
    inputRange: [0, 150],
    outputRange: ["rgb(241,242,246)", "rgb(255, 255, 255)"],
    extrapolate: "clamp",
  });

  const Divisor = () => (
    <View
      style={{
        borderBottomColor: "#b2bec3",
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 10,
      }}
    />
  );
  const challenges = [
    {
      title: "Donate 3 times to win $10 Goole-Play voucher",
      logo: (
        <Entypo
          style={{ marginVertical: 10 }}
          name="google-play"
          size={24}
          color="black"
        />
      ),
    },
    {
      title: "Donate 3 times to win $10 Goole-Play voucher",
      logo: (
        <Entypo
          style={{ marginVertical: 10 }}
          name="google-play"
          size={24}
          color="black"
        />
      ),
    },
    {
      title: "Donate 3 times to win $10 Goole-Play voucher",
      logo: (
        <Entypo
          style={{ marginVertical: 10 }}
          name="google-play"
          size={24}
          color="black"
        />
      ),
    },
    {
      title: "Donate 3 times to win $10 Goole-Play voucher",
      logo: (
        <Entypo
          style={{ marginVertical: 10 }}
          name="google-play"
          size={24}
          color="black"
        />
      ),
    },
    {
      title: "Donate minimum of $20 to win $10 Apple vouchers",
      logo: (
        <FontAwesome
          style={{ marginVertical: 10 }}
          name="apple"
          size={24}
          color="black"
        />
      ),
    },
  ];
  const ongoingChallenges = [
    {
      title: "Donate 3 times to win $10 Goole-Play voucher",
      logo: (
        <Entypo
          style={{ marginVertical: 10 }}
          name="google-play"
          size={24}
          color="black"
        />
      ),
    },
    {
      title: "Donate 3 times to win $10 Goole-Play voucher",
      logo: (
        <Entypo
          style={{ marginVertical: 10 }}
          name="google-play"
          size={24}
          color="black"
        />
      ),
    },
  ];
  return (
    <SafeAreaView style={styles.wrapper}>
      <AnimatedHeader
        style={{
          backgroundColor: bgColor,
        }}
      >
        <TextHeader>Donate more</TextHeader>
      </AnimatedHeader>
      <ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: offset } } }],
          { useNativeDriver: false }
        )}
        style={styles.container}
      >
        <View style={styles.top}>
          <Box>
            <FontAwesome5
              style={styles.boxLogo}
              name="running"
              size={24}
              color="#808e9b"
            />
            <Text style={styles.boxTitle}>Ongoing</Text>
            <Text style={styles.boxQuantity}>3</Text>
          </Box>
          <Box>
            <FontAwesome5
              style={styles.boxLogo}
              name="gift"
              size={24}
              color="#808e9b"
            />
            <Text style={styles.boxTitle}>Prize</Text>
            <Text style={styles.boxQuantity}>0</Text>
          </Box>
          <Box>
            <FontAwesome5
              style={styles.boxLogo}
              name="history"
              size={24}
              color="#808e9b"
            />
            <Text style={styles.boxTitle}>History</Text>
            <Text style={styles.boxQuantity}>0</Text>
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
            {challenges.map((c, index) => (
              <Challenge key={index}>
                <ChallengeTitle>
                  <Text style={{ marginRight: 5 }}>
                    {c.title.length > 40
                      ? c.title.slice(0, 40) + "..."
                      : c.title}
                  </Text>
                  <View>
                    <AntDesign name="rightcircle" size={18} color="#b2bec3" />
                  </View>
                </ChallengeTitle>
                {c.logo}
                <ChallengeBtn>
                  <Text style={styles.btnText}>Drop in now</Text>
                </ChallengeBtn>
                {index + 1 < challenges.length ? <Divisor /> : null}
              </Challenge>
            ))}
          </AvailableChallenges>

          {ongoingChallenges && (
            <OngoingChallenge>
              <Text style={styles.AvailableChallengesText}>
                Your ongoing challenges
              </Text>
              <FlatList
                data={ongoingChallenges}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 10 }}
                ItemSeparatorComponent={<View style={{ width: 20 }} />}
                renderItem={({ item }) => (
                  <ChallengeBox>
                    {item.logo}
                    <BoxDetail>
                      <Text style={{ marginLeft: 10, marginBottom: 10 }}>
                        {item.title.length > 30
                          ? item.title.slice(0, 30) + "..."
                          : item.title}
                      </Text>
                      <Progress.Bar progress={0.3} width={200} />
                      <View style={styles.moreInfo}>
                        <Text style={styles.seeMore}>See more</Text>
                        <Text style={styles.expiry}>Left 13 days</Text>
                      </View>
                    </BoxDetail>
                  </ChallengeBox>
                )}
              />
            </OngoingChallenge>
          )}
        </View>
      </ScrollView>
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
});
