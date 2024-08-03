// and 928782526578-daroddq61hqcaod5hcm56nq7soupvp82.apps.googleusercontent.com
import { ActivityIndicator, Text, View } from "react-native";
import React from "react";

import { Link, Redirect } from "expo-router";
import Button from "../components/Button";
import { useAuth } from "../lib/auth/AuthContext";

const index = () => {
  const { authState } = useAuth();

  // if (loading) {
  //   return <ActivityIndicator />;
  // }

  // if (!authState) {
  //   return <Redirect href={"/sign-in"} />;
  // }

  // if (!isAdmin) {
  //   return <Redirect href={"/(user)"} />;
  // }
  const checkButton = () => {
    console.log("Hi");
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      {!authState &&
        <Redirect href={"/(parent)"} />}
    </View>
  );
};

export default index;
