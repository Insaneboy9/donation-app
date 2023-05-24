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
import styled from "styled-components/native";

const ChallengesHistoryScreen = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}></View>
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
  },
});
