import { SafeAreaView, Text, StyleSheet, View, ScrollView } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import { callApi } from "../../api";
import Loader from "../../components/Loader";
import styled from "styled-components/native";
import { useAuth } from "../../firebase/firebaseAuth";

const Card = styled.View`
  width: 90%;
  background-color: white;
  margin-horizontal: 20px;
  padding: 15px;
  border-color: #dfe6e9;
  border-top-left-radius: ${(props) =>
    props.firstIndex == 0 ? "10px" : "0px"};
  border-top-right-radius: ${(props) =>
    props.firstIndex == 0 ? "10px" : "0px"};
  border-bottom-left-radius: ${(props) =>
    props.lastIndex == true ? "10px" : "0px"};
  border-bottom-right-radius: ${(props) =>
    props.lastIndex == true ? "10px" : "0px"};
  border-width: 1px;
`;

const TransactionScreen = ({ route }) => {
  const { user } = useAuth();
  const userId = user?.userId;

  //dependency to check when userId changed
  const { isLoading, data } = useQuery(["history", userId], () =>
    callApi.history(userId)
  );

  return isLoading ? (
    <Loader />
  ) : (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Transactions</Text>
        <Text style={styles.subTitle}>PaiDrop</Text>
        {data.map((history, index) => (
          <View key={index} style={{ marginTop: 20 }}>
            <Text style={styles.date}>{history.date}</Text>
            {history.history.map((h, index) => (
              <Card
                key={index}
                firstIndex={index}
                lastIndex={index === history.history.length - 1 ? true : false}
              >
                <Text style={styles.to}>{h.to}</Text>
                <View style={styles.wrapper}>
                  <Text style={{ color: "#808e9b" }}>SGD</Text>
                  <Text style={styles.amount}>{h.amount}</Text>
                </View>
              </Card>
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
