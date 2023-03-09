import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { callApi } from "../../api";
import Loader from "../../components/Loader";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../colors";
import styled from "styled-components/native";
import axios from "axios";

const CardContainer = styled.View``;

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const TransactionScreen = () => {
  const transactionHistory = [
    {
      date: "08 March",
      history: [
        { to: "Chicken Rice", amount: 5.65 },
        { to: "UNICEF", amount: 20 },
        { to: "Chicken Rice", amount: 5.65 },
        { to: "Chicken Rice", amount: 5.65 },
        { to: "Chicken Rice", amount: 5.65 },
      ],
    },
    {
      date: "07 March",
      history: [
        { to: "Chicken Rice", amount: 5.65 },
        { to: "UNICEF", amount: 20 },
        { to: "Chicken Rice", amount: 5.65 },
        { to: "Chicken Rice", amount: 5.65 },
        { to: "Chicken Rice", amount: 5.65 },
      ],
    },
    {
      date: "06 March",
      history: [
        { to: "Chicken Rice", amount: 5.65 },
        { to: "UNICEF", amount: 20 },
        { to: "Chicken Rice", amount: 5.65 },
        { to: "Chicken Rice", amount: 5.65 },
        { to: "Chicken Rice", amount: 5.65 },
      ],
    },
  ];
  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Transactions</Text>
        <Text style={styles.subTitle}>PaiDrop</Text>
        {transactionHistory.map((history) => (
          <View style={{ marginTop: 20 }}>
            <Text style={styles.date}>{history.date}</Text>
            {history.history.map((h) => (
              <View style={styles.card}>
                <Text style={styles.to}>{h.to}</Text>
                <View style={styles.wrapper}>
                  <Text style={{ color: "#808e9b" }}>SGD</Text>
                  <Text style={styles.amount}>{h.amount}</Text>
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TransactionScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginBottom: 20,
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 16,
    color: "#808e9b",
    textAlign: "center",
  },
  date: {
    color: "#808e9b",
    marginLeft: 20,
    marginBottom: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  card: {
    width: "90%",
    backgroundColor: "white",
    marginHorizontal: 20,
    // ios
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,

    // android
    // elevation: 20,
    // shadowColor: "#52006A",
    padding: 15,
    borderColor: "#dfe6e9",
    borderWidth: 1,
  },
  wrapper: {
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  to: {
    fontSize: 16,
    fontWeight: "bold",
  },
  amount: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
});
