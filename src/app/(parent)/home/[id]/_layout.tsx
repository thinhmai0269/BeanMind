import Colors from "@/src/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

export default function Statistics() {
  return (
    <Stack>
      <Stack.Screen name="index"  options={{ headerShown: false }}/>
    </Stack>
  );
}
