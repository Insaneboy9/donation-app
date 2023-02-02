import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useAuth } from "../firebase/firebaseAuth";
import Tabs from "./Tabs";
import Stack from "./Stack";
import LoginScreen from "../screens/login/LoginScreen";

const Nav = createNativeStackNavigator();

const Root = () => {
  const { user } = useAuth();
  console.log(user)

  return  !(user)  ? (
    <Nav.Navigator
      screenOptions={{ headerShown: false, presentation: "modal" }}
    >
      <Nav.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Nav.Navigator>
  ) : (
    <Nav.Navigator
      screenOptions={{ headerShown: false, presentation: "modal" }}
    >
      <Nav.Screen name="Tabs" component={Tabs} />
      <Nav.Screen name="Stack" component={Stack} />
    </Nav.Navigator>
  );
};

export default Root;
