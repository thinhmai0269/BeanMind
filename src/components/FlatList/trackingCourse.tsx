import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-paper";

const TrackingCourse = () => {
  const [expandedChapterIndex, setExpandedChapterIndex] = useState<number | null>(null);

  const headerFlatlist = { Topic: "Toán Tiểu học" };

  const bodyFlatlist = [
    {
      chapter: "Bài 1: toán + 1 số",
      detail: [
        { lesson: "+ nhu nao1", status: true },
        { lesson: "+ nhieu so", status: false },
        { lesson: "+ nâng cao", status: false },
      ],
    },
    {
      chapter: "Bài 2: toán - 1 số",
      detail: [
        { lesson: "+ nhu nao2", status: true },
        { lesson: "+ nhieu so", status: false },
        { lesson: "+ nâng cao", status: false },
      ],
    },
    {
      chapter: "Bài 3: toán * 1 số",
      detail: [
        { lesson: "+ nhu nao3", status: true },
        { lesson: "+ nhieu so", status: false },
        { lesson: "+ nâng cao", status: false },
      ],
    },
    {
      chapter: "Bài 4: toán / 1 số",
      detail: [
        { lesson: "+ nhu nao4", status: true },
        { lesson: "+ nhieu so", status: false },
        { lesson: "+ nâng cao", status: false },
      ],
    },
  ];

  const handlePress = (index: number) => {
    setExpandedChapterIndex(index === expandedChapterIndex ? null : index);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{headerFlatlist.Topic}</Text>
      </View>
      <View style={styles.contentContainer}>
        {bodyFlatlist.map((item, index) => (
          <View key={index} style={styles.chapterContainer}>
            <TouchableOpacity
              onPress={() => handlePress(index)}
              style={styles.chapterTouchable}
            >
              <View>
                <Text style={styles.chapter}>{item.chapter}</Text>
                <View style={styles.chapterInfo}>
                  <Text style={styles.chapterInfoText}>1/3 chapter</Text>
                  <Ionicons name="ellipse" size={11} style={styles.ellipseIcon} />
                  <Text style={styles.chapterDuration}>1h 28m</Text>
                </View>
              </View>
              <Ionicons
                name={expandedChapterIndex === index ? "chevron-up" : "chevron-down"}
                size={24}
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
            {expandedChapterIndex === index && item.detail && (
              <View style={styles.detailsContainer}>
                {item.detail.map((lesson, idx) => (
                  <View key={idx} style={styles.lessonContainer}>
                    <View>
                      <Text style={styles.lesson}>{lesson.lesson}</Text>
                      <View style={styles.lessonInfo}>
                        <Ionicons
                          name="time-outline"
                          size={15}
                          color={lesson.status ? "green" : "red"}
                          style={styles.clockIcon}
                        />
                        <Text style={styles.lessonDuration}>
                          {lesson.status ? "1h 30m" : "Incomplete"}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={[
                        styles.statusContainer,
                        {
                          backgroundColor: lesson.status ? "rgba(0, 221, 192, 1)" : "red",
                        },
                      ]}
                    >
                      <Text style={styles.statusText}>
                        {lesson.status ? "Complete" : "Studying"}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f7",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4a4a4a",
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  chapterContainer: {
    marginBottom: 15,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // For Android shadow
  },
  chapterTouchable: {
    width: "100%",
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  chapter: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  chapterInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  chapterInfoText: {
    fontSize: 12,
    color: "#888",
    marginHorizontal: 5,
  },
  ellipseIcon: {
    color: "#888",
    marginHorizontal: 5,
  },
  chapterDuration: {
    fontSize: 12,
    color: "green",
  },
  arrowIcon: {
    color: "#888",
  },
  detailsContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  lessonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
  },
  lesson: {
    fontSize: 16,
    color: "#555",
  },
  lessonInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "10%",
  },
  clockIcon: {
    marginRight: 5,
  },
  lessonDuration: {
    fontSize: 12,
    color: "#999",
  },
  statusContainer: {
    height: 40,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  statusText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default TrackingCourse;
