import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import Challenges from "../../components/Challenges";

const ChallengesHistoryScreen = ({
  navigation: { setOptions },
  route: { params },
}) => {
  console.log(params);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setOptions({
      title:
        params.type == 0
          ? "New Challenges"
          : params.type == 1
          ? "Ongoing Challenges"
          : "History",
    });
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView style={styles.container}>
        <Challenges
          title={
            params.type == 0
              ? "Join New Challenges"
              : params.type == 1
              ? "Your Ongoing Challenges"
              : "Your Challenge History"
          }
          data={params.data}
          loading={loading}
          setLoading={setLoading}
          isBtn={false}
          userId={params.userId}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChallengesHistoryScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    padding: 10,
  },
});
