import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import Pomodoro from "./src/telas/pomodoro";

export default function App() {
  return (
    <SafeAreaView style={styles.content}>
      <StatusBar />
      <Pomodoro />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  // content: {
  //   backgroundColor: "#caf1f8",
  //   flex: 1,
  // },

  content: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
})