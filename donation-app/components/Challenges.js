import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { callApi } from "../api";

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

const Challenges = ({ data, loading, setLoading, isBtn, title, userId }) => {
  const { refetch } = useQuery(["challenges", userId], () =>
    callApi.challenges(userId)
  );
  const navigation = useNavigation();

  const toDetail = (data) => {
    navigation.navigate("Stack", {
      screen: "Challenge Detail",
      params: { data },
    });
  };

  const onParticipate = async (challengeId) => {
    setLoading(true);
    const data = {
      challengeId: challengeId,
      userId: userId,
    };
    callApi.joinChallenge(data);
    refetch();
    setLoading(false);
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
    <AvailableChallenges>
      <ChallengeHeader>
        <Text style={styles.AvailableChallengesText}>{title}</Text>
      </ChallengeHeader>
      {data?.map((c, index) => (
        <Challenge onPress={() => toDetail(c)} key={index}>
          <ChallengeTitle>
            <Text style={{ marginRight: 5 }}>{c.body}</Text>
          </ChallengeTitle>
          <Image style={styles.logo} source={{ uri: c.logoUrl }} />
          {isBtn && (
            <ChallengeBtn onPress={() => onParticipate(c.id)}>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.btnText}>Drop in now</Text>
              )}
            </ChallengeBtn>
          )}

          {index + 1 < data?.length ? <Divisor /> : null}
        </Challenge>
      ))}
    </AvailableChallenges>
  );
};

export default Challenges;

const styles = StyleSheet.create({
  AvailableChallengesText: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 15,
  },
  btnText: {
    fontWeight: "bold",
    color: "blue",
  },
  logo: {
    width: 50,
    height: 50,
    marginVertical: 10,
  },
});