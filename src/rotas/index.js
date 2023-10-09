import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Pomodoro from "../telas/pomodoro";
import Perfil from "../telas/perfil";

const Tab = createBottomTabNavigator();

export default function Rotas() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Pomodoro" component={Pomodoro} />
        <Tab.Screen name="Perfil" component={Perfil} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}