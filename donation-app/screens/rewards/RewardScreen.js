import { SafeAreaView, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";

const RewardScreen = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Leaderboard</Text>
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
});
