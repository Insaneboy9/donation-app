import {
  SafeAreaView,
  Image,
  StyleSheet,
  Dimensions,
  View,
  Text,
  Share,
  Platform,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../colors";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const DetailScreen = ({ navigation: { setOptions }, route: { params } }) => {
  const navigation = useNavigation();
  // navigate to account page
  const toAccount = (type) => {
    navigation.navigate("Stack", {
      screen: "Account",
      params: { type },
    });
  };
  // share selected hawker / organization data to others
  const shareMedia = async () => {
    const isAndroid = Platform.OS === "android";
    if (isAndroid) {
      await Share.share({
        message: `${params.description}\nCheck it out: ${
          "country" in params ? params.country : params.address
        } \n`,
        title: params.name,
      });
    } else {
      await Share.share({
        message: `${params.description}\nCheck it out: ${
          "country" in params ? params.country : params.address
        } \n`,
        url: params.thumbnailUrl + "",
        title: params.address,
      });
    }
  };

  const ShareButton = () => (
    <TouchableOpacity onPress={shareMedia}>
      <Ionicons name="share" size={24} color={"black"} />
    </TouchableOpacity>
  );
  // render title based on category
  useEffect(() => {
    setOptions({
      title: "country" in params ? "Organization" : "Hawker",
      headerRight: () => <ShareButton />,
    });
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.top}>
        <Image
          style={StyleSheet.absoluteFill}
          source={{ uri: params.thumbnailUrl }}
        />
        <LinearGradient
          colors={["transparent", colors.bg]}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.posterHolder}>
          <Image style={styles.poster} source={{ uri: params.posterUrl }} />
          <View style={styles.posterDescription}>
            <Text style={styles.name}>{params.name}</Text>
            <Text style={styles.category}>{params.type}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.header}>Overview</Text>
      <Text style={styles.content}>{params.description}</Text>
      {"country" in params ? (
        <>
          <Text style={styles.header}>Country</Text>
          <Text style={styles.content}>{params.country}</Text>
        </>
      ) : (
        <>
          <Text style={styles.header}>Address</Text>
          <Text style={styles.content}>{params.address}</Text>
        </>
      )}
      <View style={styles.buttonContainer}>
        {"country" in params ? (
          <TouchableOpacity
            style={styles.dropButton}
            onPress={() => toAccount(params.name)}
          >
            <Text style={styles.buttonText}>DROP NOW</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.dropButton}
            onPress={() => toAccount("Donate")}
          >
            <Text style={styles.buttonText}>DROP NOW</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  top: {
    marginBottom: 20,
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "flex-end",
    height: SCREEN_HEIGHT / 4,
  },
  thumbnail: {
    width: "100%",
    height: 200,
  },
  poster: {
    width: 100,
    height: 160,
    borderRadius: 5,
    backgroundColor: "grey",
  },
  posterHolder: {
    flexDirection: "row",
  },
  posterDescription: {
    marginLeft: 20,
    width: SCREEN_WIDTH <= 350 ? SCREEN_WIDTH / 2 : SCREEN_WIDTH / 1.6,
    alignSelf: "flex-end",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  category: {
    fontSize: 14,
  },
  header: {
    marginHorizontal: 20,
    fontWeight: "bold",
    fontSize: 16,
  },
  content: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  dropButton: {
    marginTop: 40,
    backgroundColor: colors.accentColor,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  buttonContainer: {
    flex: 1,
    marginBottom: 20,
    justifyContent: "flex-end",
  },
});
