import { StyleSheet, View, Dimensions } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const Loading = () => {
  return (
    <View style={styles.container}>
      <LottieView 
        source={require("../../assets/loading.json")} 
        autoPlay 
        loop 
        style={styles.animation} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    zIndex: 2,
  },
  animation: {
    width: 200,
    height: 200,
  },
});

export default Loading;
