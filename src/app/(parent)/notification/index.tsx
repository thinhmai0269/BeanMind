import {
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
// import { usePushNotifications } from "@/src/components/usePushNotification";

const Index = () => {
// const {expoPushToken, notification} = usePushNotifications();
// const data2 = JSON.stringify(notification, undefined, 2)
// console.log(data2, 'checke')
  const seed = [
    {
      id: "1",
      time: "20-6-2024",
      data: [
        "A đã hoàn thành xong kiểm tra 1 tiết",
        "A đã hoàn thành xong kiểm tra 1 tiết 2 10 diem",
        "A đã hoàn thành xong kiểm tra 1 tiết 2 10 diem",
      ],
    },
    {
      id: "2",
      time: "21-6-2024",
      data: [
        "A đã hoàn thành xong kiểm tra 1 tiết",
        "A đã hoàn thành xong kiểm tra 1 tiết 2 10 diem",
        "A đã hoàn thành xong kiểm tra 1 tiết 2 10 diem",
      ],
    },
  ];

  return (
    <SectionList
      sections={seed}
      keyExtractor={(item, index) => item + index}
      style={styles.container}
      renderSectionHeader={({ section: { time } }) => (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>{time}</Text>
        </View>
      )}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>{item}</Text>
          <Text style={styles.itemTime}>Time: 15h20</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 20,
  },
  sectionHeader: {
    // backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionHeaderText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#333",
  },
  itemContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4169E1",
  },
  itemTime: {
    fontSize: 12,
    marginTop: 5,
    color: "#666",
  },
});

export default Index;
