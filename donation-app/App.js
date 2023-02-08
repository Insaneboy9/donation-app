import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, StatusBar, Platform } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import Root from "./navigation/Root";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </SafeAreaView>
    </QueryClientProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
