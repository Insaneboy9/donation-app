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
} from "react-native";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { callApi } from "../../api";
import Loader from "../../components/Loader";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../colors";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const AccountScreen = ({ navigation: { setOptions }, route: { params } }) => {
  const [amount, setAmount] = useState();
  const placeholderText = `${params.type} Amount`;

  const onTransfer = () => {
    console.log(amount);
  };

  useEffect(() => {
    setOptions({
      title: params.type,
    });
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.accountContainer}>
          <View>
            <View style={styles.item}>
              <View style={{ ...styles.icon, borderWidth: 1 }}>
                <MaterialIcons name="attach-money" size={24} color="#2d3436" />
              </View>
              <TextInput
                value={amount}
                onChangeText={(text) => setAmount(text)}
                style={styles.textInput}
                keyboardType="numeric"
                placeholder={placeholderText}
              />
            </View>
            <View style={styles.item}>
              <View style={styles.icon}>
                <MaterialIcons
                  name="account-balance"
                  size={36}
                  color="#2d3436"
                />
              </View>
              <View>
                <Text style={{ fontSize: 18 }}>POSB eSavings Account</Text>
                <Text style={{ fontSize: 18 }}>XXXXX2679</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onTransfer} style={styles.submitBtn}>
            <Text style={styles.btnText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  accountContainer: {
    position: "absolute",
    width: "100%",
    height: SCREEN_HEIGHT / 4.5,
    backgroundColor: "white",
    paddingLeft: 20,
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  item: {
    flexDirection: "row",
    marginBottom: 40,
    alignItems: "center",
  },
  textInput: {
    width: SCREEN_WIDTH / 1.5,
    fontSize: 18,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomColor: "#b2bec3",
    borderBottomWidth: 1,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  submitBtn: {
    marginTop: 40,
    backgroundColor: colors.accentColor,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  btnText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
