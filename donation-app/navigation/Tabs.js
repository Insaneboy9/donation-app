import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "../colors";

import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons/";
import HomeScreen from "../screens/home/HomeScreen";
import LeaderboardScreen from "../screens/leaderboard/LeaderboardScreen";
import RewardScreen from "../screens/rewards/RewardScreen";
import TransactionScreen from "../screens/transaction/TransactionScreen";
import MapScreen from "../screens/map/MapScreen";
import ChallengesScreen from "../screens/challenges/ChallengesScreen";

const Tab = createBottomTabNavigator();

const Tabs = ({ route }) => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: colors.bg,
      }}
      screenOptions={{
        tabBarStyle: { backgroundColor: "white" },
        tabBarActiveTintColor: colors.iconFillColor,
        tabBarInactiveTintColor: colors.iconColor,
        tabBarLabelStyle: { fontSize: 12, fontWeight: "600", marginTop: -5 },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Challenges"
        component={ChallengesScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <AntDesign name="staro" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={TransactionScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="receipt" size={size} color={color} />;
          },
        }}
      />

      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <Ionicons
                name="navigate-circle-outline"
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Rewards"
        component={RewardScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="gift" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
