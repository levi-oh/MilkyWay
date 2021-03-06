import React from "react";
import { StyleSheet, Text, View, Animated } from "react-native";

export default function App() {
  state = {
    x: new Animated.Value(0),
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
