import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import colors from "../../colors";
import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const LoginScreen = () => {
  const navigation = useNavigation();
  const login = () => {
    navigation.navigate("Tabs", {
      screen: "Home",
    });
  };
  return (
    // <SafeAreaView>
    <View style={styles.container}>
      <Image
        style={styles.bg}
        source={require("../../assets/login-bg.jpg")}
        blurRadius={20}
      />
      <Ionicons
        style={styles.logo}
        name="logo-twitch"
        size={50}
        color="black"
      />
      <View style={styles.card}>
        <Text style={styles.title}>Log in to PaiDrop</Text>
        <TextInput style={styles.input} placeholder="Username" />
        <TextInput style={styles.input} placeholder="Password" />
        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
    // </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  logo: {
    marginTop: -30,
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    marginTop: 20,
    height: SCREEN_HEIGHT / 3,
    backgroundColor: colors.bg,
    borderRadius: 20,
    opacity: 0.8,
  },
  title: {
    marginBottom: 20,
    fontSize: 20,
  },
  input: {
    height: 40,
    padding: 10,
    width: "80%",
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 10,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9b59b6",
    width: "50%",
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
