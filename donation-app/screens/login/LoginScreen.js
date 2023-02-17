import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import colors from "../../colors";
import { auth } from "../../firebase/firebaseConfig";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const LoginScreen = () => {
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    error: "",
  });

  async function signIn() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
    }
    console.log(value);
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Image
          style={styles.bg}
          source={require("../../assets/login-bg.jpg")}
          blurRadius={20}
        />
        <Image
          style={styles.logo}
          source={require("../../assets/logo_x150.png")}
        />
        <View style={styles.card}>
          <Text style={styles.title}>Log in to PaiDrop</Text>
          <TextInput
            style={styles.input}
            value={value.email}
            onChangeText={(text) => setValue({ ...value, email: text })}
            placeholder="Username"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setValue({ ...value, password: text })}
            secureTextEntry={true}
            placeholder="Password"
          />
          <TouchableOpacity style={styles.button} onPress={signIn}>
            {/* <TouchableOpacity style={styles.button} > */}
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
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
    width: 150,
    height: 150,
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
    backgroundColor: "#ff4757",
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
