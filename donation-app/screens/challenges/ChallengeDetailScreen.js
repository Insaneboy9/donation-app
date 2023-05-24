import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Image,
  StyleSheet,
  Dimensions,
  View,
  Text,
  Share,
  Platform,
  TouchableOpacity,
} from "react-native";
import {
  AntDesign,
  FontAwesome5,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import * as Progress from "react-native-progress";

const Header = styled.View`
  width: 100%;
  height: 200px;
  background-color: red;
  padding: 15px;
  justify-content: center;
`;

const HeaderTitle = styled.View`
  flex-direction: row;
  /* justify-items: center; */
  align-items: center;
  margin-bottom: 30px;
`;

const HeaderDescription = styled.Text`
  color: white;
  font-size: 16px;
`;

const BackBtn = styled.TouchableOpacity`
  margin-right: 20px;
`;

const BoxTitle = styled.View`
  background-color: white;
  height: 80px;
  margin-horizontal: 20px;
  border-radius: 15px;
  top: -30px;
  elevation: 20;
  /* justify-content: center; */
  padding: 10px;
  /* align-items: center; */
`;

const Body = styled.View`
  padding: 30px;
`;

const Timeline = styled.View`
  z-index: -1;
  height: 80px;
  top: 50px;
  left: 20px;
  width: 5px;
  position: absolute;
  background-color: #2ed573;
`;

const Content = styled.View`
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
  margin-bottom: 50px;
`;

const Detail = styled.View`
  width: 80%;
`;

const Terms = styled.View`
  padding: 10px;
`;

const ConditionView = styled.View`
  flex-direction: row;
  width: 90%;
`;

const ChallengeDetailScreen = ({
  navigation: { setOptions },
  route: { params },
}) => {
  const navigation = useNavigation();
  const [leftDays, setLeftDays] = useState();
  const getLeftDays = () => {
    var currentTime = new Date().getTime();
    var timeDiff = params.data.expiry_date.seconds * 1000 - currentTime;
    var remainingDays = Math.ceil(timeDiff / 1000 / 60 / 60 / 24);
    setLeftDays(remainingDays);
  };
  console.log(params.expiry_date);

  const Divisor = () => (
    <View
      style={{
        borderBottomColor: "#b2bec3",
        borderBottomWidth: 1,
        marginBottom: 10,
      }}
    />
  );

  const goBack = () => {
    navigation.goBack();
  };
  console.log(params);
  useEffect(() => {
    getLeftDays();
  }, []);
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Header>
          <HeaderTitle>
            <BackBtn onPress={goBack}>
              <AntDesign name="arrowleft" size={30} color="white" />
            </BackBtn>
            <Text style={styles.title}>{params.data.title}</Text>
          </HeaderTitle>
          <HeaderDescription>{params.data.body}</HeaderDescription>
        </Header>
        <BoxTitle>
          <Text style={styles.boxTitle}>
            {params.data.state == 0
              ? "Drop in to the challenge NOW!"
              : "Take your first step, Challenger!"}
          </Text>
          <Text style={styles.boxText}>
            {params.data.state == 0
              ? "Participate at the Challenge Homepage now!"
              : "You've accepted the challenge. Time to start donating!"}
          </Text>
        </BoxTitle>
        <Body>
          <Content>
            <Timeline />
            <Image style={styles.logo} source={{ uri: params.data.logoUrl }} />
            <Detail>
              <Text style={{ ...styles.begun, marginBottom: 5 }}>
                {params.data.state == 0
                  ? "Challenge has yet to begun"
                  : "Challenge has begun"}
              </Text>
              <Text style={styles.begun}>{leftDays} days left</Text>
            </Detail>
          </Content>
          <Content>
            <Timeline />
            <View style={styles.onProgress}>
              <FontAwesome5 name="running" size={40} color="white" />
            </View>
            <Detail>
              <Text style={{ marginBottom: 5, fontWeight: "bold" }}>
                {params.data.instruction}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Progress.Bar
                  height={15}
                  progress={params.data.progress / params.data.max_progress}
                  width={200}
                  color={"#2ed573"}
                  borderRadius={10}
                  unfilledColor={"#a4b0be"}
                  borderColor="white"
                />
                <Text style={{ color: "#808e9b", marginLeft: 10 }}>
                  {params.data.progress}/{params.data.max_progress}
                </Text>
              </View>
            </Detail>
          </Content>
          <Content>
            <View style={styles.onProgress}>
              <FontAwesome name="gift" size={40} color="white" />
            </View>
            <Detail>
              <Text style={{ marginBottom: 5, fontWeight: "bold" }}>
                Final Reward
              </Text>
              <Text>{params.data.prize}</Text>
              <View style={styles.quantity}>
                <Text style={{ color: "white" }}>
                  Only {params.data.quantity} left
                </Text>
              </View>
            </Detail>
          </Content>
        </Body>
        <Divisor />
        <Terms>
          <Text style={styles.terms}>Terms & Condition</Text>
          <ConditionView>
            <Entypo name="dot-single" size={24} color="black" />
            <Text>
              You will be qualified to participate in the reward after clicking
              on the Drop-in button
            </Text>
          </ConditionView>
          <ConditionView>
            <Entypo name="dot-single" size={24} color="black" />
            <Text>
              The reward will be credited to your account within 6 hours upon
              completion.
            </Text>
          </ConditionView>
        </Terms>
      </View>
    </SafeAreaView>
  );
};

export default ChallengeDetailScreen;

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
    fontWeight: "bold",
    fontSize: 24,
    color: "white",
  },
  boxTitle: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 16,
  },
  logo: {
    width: 50,
    height: 50,
    marginVertical: 10,
    marginRight: 20,
  },
  onProgress: {
    marginRight: 20,
    backgroundColor: "#7bed9f",
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  begun: {
    color: "#808e9b",
  },
  quantity: {
    marginTop: 10,
    width: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff7f50",
    padding: 5,
  },
  terms: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
});
