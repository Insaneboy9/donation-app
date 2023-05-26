import {
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons/";
import { NavigationContainer } from "@react-navigation/native";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect, useState } from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import { QueryClient, QueryClientProvider } from "react-query";
import Root from "./navigation/Root";

// Keep the splash screen visible while fetching resources
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

// Function to load images and fonts
const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));
const loadImages = (images) =>
  images.map((image) => {
    return Asset.loadAsync(image);
  });

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  async function prepare() {
    try {
      // Pre-load fonts and images
      const fonts = loadFonts([
        Ionicons.font,
        MaterialIcons.font,
        FontAwesome.font,
        Entypo.font,
      ]);
      const images = loadImages([
        require("../donation-app/assets/login-bg.jpg"),
        require("../donation-app/assets/logo_x150.png"),
        require("../donation-app/assets/logo_x60.png"),
        require("../donation-app/assets/rewards_bg.jpg"),
        require("../donation-app/assets/logo_black_x60.png"),
        require("../donation-app/assets/point_logo.png"),
        require("../donation-app/assets/prize.png"),
        require("../donation-app/assets/first_prize.png"),
        require("../donation-app/assets/second_prize.png"),
        require("../donation-app/assets/third_prize.png"),
      ]);
      await Promise.all([...fonts, ...images]);
    } catch (e) {
      console.warn(e);
    } finally {
      // Tell the application to render
      setAppIsReady(true);
    }
  }

  useEffect(() => {
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  // when app is loading show null
  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <QueryClientProvider client={queryClient}>
        <AutocompleteDropdownContextProvider>
          <SafeAreaView style={styles.container}>
            <NavigationContainer>
              <Root />
            </NavigationContainer>
          </SafeAreaView>
        </AutocompleteDropdownContextProvider>
      </QueryClientProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
