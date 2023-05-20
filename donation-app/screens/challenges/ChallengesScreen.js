import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

const ChallengesScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView></ScrollView>
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
});
