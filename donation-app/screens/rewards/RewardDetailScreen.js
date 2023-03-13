import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import Checkbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";
import colors from "../../colors";
import styled from "styled-components/native";
import { Entypo } from "@expo/vector-icons";
import { callApi } from "../../api";

const Button = styled.TouchableOpacity`
  margin-horizontal: 60px;
  background-color: ${(props) =>
    props.disabled === true ? "grey" : colors.accentColor};
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 20px;
`;

const ConditionView = styled.View`
  flex-direction: row;
  width: 90%;
`;

export default function RewardDetailScreen({
  navigation: { setOptions },
  route: { params },
}) {
  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(false);
  const [disable, setDisable] = useState(true);
  const userPoints = params.user.points;

  const toggleChecked = () => {
    setIsChecked((prev) => !prev);
    setDisable((prev) => !prev);
  };
  // post data to backend and navigate back to rewards screen
  const onSubmit = () => {
    const data = {
      userId: params.user.userId,
      amount: params.points,
      type: "rewards",
      email: params.user.email,
    };
    callApi.onTransaction(data);
    navigation.navigate("Rewards");
  };
  // render title as reward brand
  useEffect(() => {
    setOptions({
      title: params.brand,
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.imageContainer}>
          <Image
            style={StyleSheet.absoluteFill}
            source={{ uri: params.imagelUrl }}
          />
        </View>
        <Text style={styles.title}>{params.name}</Text>
        <Text style={styles.brand}>{params.brand}</Text>
        <Text style={styles.points}>{params.points}</Text>
      </View>
      <View style={styles.center}>
        <View style={styles.myPoint}>
          <Text style={styles.pointText}>My points</Text>
          <Text style={styles.pointText}>{userPoints}</Text>
        </View>
        <ScrollView style={styles.conditions}>
          <ConditionView>
            <Entypo name="dot-single" size={24} color="black" />
            <Text>
              This promotion is open to all users who have registered for
              PaiDrop and installed the same on their compatible devices.
            </Text>
          </ConditionView>
          <ConditionView>
            <Entypo name="dot-single" size={24} color="black" />
            <Text>
              To redeem this reward, you need {params.points} PaiDrop rewards
              Points.
            </Text>
          </ConditionView>
          <ConditionView>
            <Entypo name="dot-single" size={24} color="black" />
            <Text>PaiDrop Rewards Points used are non-refundable.</Text>
          </ConditionView>
          <ConditionView>
            <Entypo name="dot-single" size={24} color="black" />
            <Text>
              This voucher entitles you to one (1) pc of {params.name}.
            </Text>
          </ConditionView>
          <ConditionView>
            <Entypo name="dot-single" size={24} color="black" />
            <Text>Voucher is for one-time redemption only.</Text>
          </ConditionView>
          <ConditionView>
            <Entypo name="dot-single" size={24} color="black" />
            <Text>
              PaiDrop Rewards Points and vouchers are non-transferrable.
            </Text>
          </ConditionView>
        </ScrollView>
      </View>
      <View style={styles.bottom}>
        <View style={styles.terms}>
          <Checkbox
            disabled={userPoints - params.points < 0 ? true : false}
            style={styles.checkbox}
            value={isChecked}
            onValueChange={toggleChecked}
            color={isChecked ? colors.accentColor : undefined}
          />
          <Text>I agree to the full-terms and conditions</Text>
        </View>
        <Button disabled={disable} onPress={onSubmit}>
          <Text style={styles.btnText}>
            {userPoints - params.points < 0
              ? "INSUFFICIENT POINTS"
              : "USE POINTS"}
          </Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,

    // ios
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,

    // android
    elevation: 20,
    shadowColor: "#52006A",
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  brand: {
    fontSize: 16,
    color: "#808e9b",
    marginBottom: 10,
  },
  points: {
    fontWeight: "bold",
    color: "#1e90ff",
    fontSize: 20,
  },
  center: {
    flex: 2,
  },
  myPoint: {
    flexDirection: "row",
    // backgroundColor: "#95a5a6",
    backgroundColor: colors.accentColor,
    justifyContent: "space-between",
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  pointText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  terms: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    margin: 8,
    borderRadius: 20,
  },
  conditions: {
    marginTop: 10,
    flex: 1,
    paddingHorizontal: 20,
  },
});
