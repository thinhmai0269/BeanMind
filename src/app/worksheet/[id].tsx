import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { data } from "./dataWorsheet";
import DetailWorksheet from "@/src/components/FlatList/listWorksheet";
import { Stack, Tabs } from "expo-router";
import { Title } from "react-native-paper";

const Index = () => {
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Stack.Screen options={{ title: "Bài kiểm tra" }} />
      <Text style={styles.headerText}>Kết quả kiểm tra X</Text>
      <View style={styles.statsContainer}>
        <View style={styles.statRow}>
          <Text style={styles.correctText}>Đúng</Text>
          <View style={styles.correctBox}>
            <Text style={styles.correctNumber}>2</Text>
          </View>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.incorrectText}>Sai</Text>
          <View style={styles.incorrectBox}>
            <Text style={styles.incorrectNumber}>2</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <DetailWorksheet />}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={styles.flatListContainer}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  statRow: {
    alignItems: "center",
  },
  correctText: {
    fontSize: 18,
    color: "green",
  },
  incorrectText: {
    fontSize: 18,
    color: "orange",
  },
  correctBox: {
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 10,
    padding: 10,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  incorrectBox: {
    borderWidth: 1,
    borderColor: "orange",
    borderRadius: 10,
    padding: 10,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  correctNumber: {
    fontSize: 18,
    color: "green",
  },
  incorrectNumber: {
    fontSize: 18,
    color: "orange",
  },
  flatListContainer: {
    paddingHorizontal: 0,
  },
});

export default Index;
