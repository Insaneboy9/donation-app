import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import colors from "../../colors";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery } from "react-query";
import { signOut } from "firebase/auth";
import { callApi } from "../../api";
import Loader from "../../components/Loader";
import HorizontalList from "../../components/HorizontalList";
import { auth } from "../../firebase/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../firebase/firebaseAuth";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const HomeScreen = () => {
  const { user } = useAuth();
  // fetching hawker and organization data
  const { isLoading: hawkerLoading, data: hawkerData } = useQuery(
    "hawker",
    callApi.hawker
  );
  const { isLoading: organizationLoading, data: organizationData } = useQuery(
    "organization",
    callApi.organization
  );
  const navigation = useNavigation();
  // navigate to account page
  const toAccount = (type) => {
    navigation.navigate("Stack", {
      screen: "Account",
      params: { type },
    });
  };
  // navigate to scan page
  const toScan = () => {
    navigation.navigate("Stack", {
      screen: "Scan QR Code",
    });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {}, []);

  const isLoading = hawkerLoading || organizationLoading;

  return isLoading ? (
    <Loader />
  ) : (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logo}>
            <Image
              style={StyleSheet.absoluteFill}
              source={require("../../assets/logo_x60.png")}
            />
          </View>
          <View style={styles.welcomeView}>
            <Text style={{ lineHeight: 24 }}>Welcome, </Text>
            <Text style={styles.username}>{user.name}</Text>
          </View>
          <TouchableOpacity onPress={logout}>
            <Ionicons name="log-out-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.cardHolder}>
          <LinearGradient
            colors={[colors.card, colors.accentColor]}
            style={styles.card}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.balance}>SGD {user.cash}</Text>
            </View>
            <View style={styles.actionHolder}>
              <TouchableOpacity
                onPress={() => toAccount("Donate")}
                style={styles.action}
              >
                <FontAwesome name="paper-plane-o" size={36} color="white" />
                <Text style={styles.actionText}>Donate</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={toScan} style={styles.action}>
                <Ionicons name="scan" size={36} color="white" />
                <Text style={styles.actionText}>Scan</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => toAccount("Top Up")}
                style={styles.action}
              >
                <Ionicons name="wallet-outline" size={36} color="white" />
                <Text style={styles.actionText}>Top Up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => toAccount("Withdraw")}
                style={styles.action}
              >
                <MaterialIcons name="account-balance" size={36} color="white" />
                <Text style={styles.actionText}>Withdraw</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
        {isLoading ? <Loader /> : null}
        {hawkerData && <HorizontalList title="Hawker" data={hawkerData} />}
        {organizationData && (
          <HorizontalList title="Organization" data={organizationData} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  welcomeView: {
    flexDirection: "row",
  },
  username: {
    fontSize: 15,
    fontWeight: "bold",
    lineHeight: 24,
  },
  cardHolder: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    marginTop: 20,
    marginBottom: 40,
    height: SCREEN_HEIGHT / 4,
    width: "90%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cardHeader: {
    flexDirection: "row",
  },
  balance: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 30,
  },
  actionHolder: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  action: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    marginTop: 10,
    color: "white",
  },
  logo: {
    height: 60,
    width: 60,
  },
});
