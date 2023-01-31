import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "../colors";
import { Ionicons } from "@expo/vector-icons/";
import HomeScreen from "../screens/home/HomeScreen";
import HawkerScreen from "../screens/hawker/HawkerScreen";
import RewardScreen from "../screens/rewards/RewardScreen";

const Tab = createBottomTabNavigator();

const Tabs = () => {
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
        name="Hawker"
        component={HawkerScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="restaurant" size={size} color={color} />;
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
