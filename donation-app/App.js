import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, StatusBar, Platform } from "react-native";
import Root from "./navigation/Root";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
