import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { data } from "./courseData";

import { Stack, useLocalSearchParams } from "expo-router";
import TrackingCourse from "@/src/components/FlatList/trackingCourse";
import { getCourse, getCourseDetail } from "@/src/lib/course/courses";

const Index = () => {
  const { id: idChild } = useLocalSearchParams();


  const title = Array.isArray(idChild)
    ? idChild[0]
    : idChild || "Default Title";

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Tên khóa học" }} />
      <FlatList
        data={data}
        renderItem={({ item }) => <TrackingCourse />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default Index;
