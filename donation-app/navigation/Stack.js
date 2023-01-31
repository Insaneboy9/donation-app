import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailScreen from "../screens/detail/DetailScreen";
import colors from "../colors";

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  return (
    <NativeStack.Navigator
      screenOptions={{
        animation: "fade",
        headerStyle: { backgroundColor: "white" },
        headerTitleStyle: { color: colors.text },
        headerTintColor: colors.text,
        headerTitleAlign: "center",
      }}
    >
      <NativeStack.Screen name="Detail" component={DetailScreen} />
    </NativeStack.Navigator>
  );
};

export default Stack;
