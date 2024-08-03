import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getChapterDetail } from "@/src/lib/course/chapter";

interface SelectCourseProps {
  chapters: Chapter[];
}

const SelectCourse: React.FC<SelectCourseProps> = ({ chapters }) => {
  const [expandedChapterId, setExpandedChapterId] = useState<string | null>(
    null,
  );
  const [chapterTopics, setChapterTopics] = useState<{ [id: string]: Topic[] }>(
    {},
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getTopicFromChapter = async () => {
      const idsChapter = chapters.map((chapter) => chapter.id);

      try {
        setLoading(true);
        const details = await Promise.all(
          idsChapter.map((id) =>
            getChapterDetail(id)
              .then((res) => ({
                id,
                topics: res.data.data.topics,
              }))
          ),
        );
        const topicsObject: { [key: string]: Topic[] } = {};
        details.forEach(({ id, topics }) => {
          topicsObject[id] = topics;
        });

        setChapterTopics(topicsObject);
      } catch (error) {
        console.error("Error fetching chapter details:", error);
      } finally {
        setLoading(false); 
      }
    };

    getTopicFromChapter();
  }, [chapters]);

  const handlePress = (id: string) => {
    setExpandedChapterId((prevId) => (prevId === id ? null : id));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        {chapters.map((chapter: Chapter) => (
          <View key={chapter.id} style={styles.chapterContainer}>
            <TouchableOpacity
              onPress={() =>
                handlePress(chapter.id)}
              style={[
                styles.chapterTouchable,
                expandedChapterId === chapter.id &&
                styles.chapterTouchableExpanded,
              ]}
            >
              <View style={styles.chapterContent}>
                <Text style={styles.chapterTitle}>{chapter.title}</Text>
              </View>
              <Ionicons
                name={expandedChapterId === chapter.id
                  ? "chevron-up"
                  : "chevron-down"}
                size={24}
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
            {expandedChapterId === chapter.id && chapterTopics[chapter.id] && (
              <View style={styles.detailsContainer}>
                {chapterTopics[chapter.id].map((topic, idx) => (
                  <View key={idx} style={styles.lessonContainer}>
                    <View>
                      <Text style={styles.lessonTitle}>{topic.title}</Text>
                      <View style={styles.lessonInfo}>
                        <Ionicons
                          name="time-outline"
                          size={15}
                          color={"green"}
                          style={styles.clockIcon}
                        />
                        <Text style={styles.lessonDuration}>
                          Thêm slot thời gian các thứ vào topic
                        </Text>
                      </View>
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
    backgroundColor: "white",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  chapterContainer: {
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",

    shadowRadius: 8,
    elevation: 5,
  },
  chapterTouchable: {
    width: "100%",
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  chapterTouchableExpanded: {
    backgroundColor: "#f0f0f0",
  },
  chapterContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  chapterTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  arrowIcon: {
    color: "#888",
  },
  detailsContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fafafa",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
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
  lessonTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
  },
  lessonInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  clockIcon: {
    marginRight: 5,
  },
  lessonDuration: {
    fontSize: 14,
    color: "#999",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
});

export default SelectCourse;
