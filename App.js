import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import Rotas from "./src/rotas";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={"#f4511e"}/>
      <Rotas />
    </SafeAreaView>
  );
}
