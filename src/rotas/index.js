import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

import Pomodoro from "../telas/pomodoro";
import Perfil from "../telas/perfil";
import Configuracoes from "../telas/configuracoes";

const Tab = createBottomTabNavigator();

export default function Rotas() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // headerShown: false,
          headerStyle: {
            backgroundColor: "#f4511e",
          },

          headerTintColor: "#fff",

          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Pomodoro") {
              iconName = "timer-outline";
            } else if (route.name === "Perfil") {
              iconName = "person-circle-outline";
            } else if (route.name === "Configurações") {
              iconName = "list-outline";
            }

            return <Ionicons name={iconName} size={30} color={color} />;
          },

          tabBarInactiveBackgroundColor: "#44465c",
          tabBarActiveBackgroundColor: "#7c80a8",
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "white",
          tabBarShowLabel: false,

          tabBarStyle: {
            height: 60,
          },
        })}
      >
        <Tab.Screen name="Pomodoro" component={Pomodoro} />
        <Tab.Screen name="Perfil" component={Perfil} />
        <Tab.Screen name="Configurações" component={Configuracoes} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
