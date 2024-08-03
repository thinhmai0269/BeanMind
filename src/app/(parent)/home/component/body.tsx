import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import ListCourse from "@/src/components/FlatList/listCourse";
import { getSubject } from "@/src/lib/course/subject";
import { Ionicons } from "@expo/vector-icons";

interface BodyProps {
  selectedSubjectID: string | null;
  courses: Course[];
}

const Body: React.FC<BodyProps> = ({ selectedSubjectID, courses }) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    getSubject().then((res) => {
      setSubjects(res.data.data.items);
    });
  }, []);

  const filteredCourses = selectedSubjectID
    ? courses.filter((course) => course.subjectId === selectedSubjectID)
    : courses;
  const renderAllCourseOfSubject = (id: string) => {
    const filteredCourses = id
      ? courses.filter((course) => course.subjectId === id)
      : courses;
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.courseList}
      >
        {filteredCourses.map((course) => (
          <ListCourse key={id} item={course} selectedSubjectID={id} />
        ))}
      </ScrollView>
    );
  };
  const renderEmptyMessage = () => {
    return (
      <Text style={styles.emptyMessage}>
        Hình như có gì đó không ổn hãy tắt và mở lại app
      </Text>
    );
  };

  const renderContent = () => {
    if (filteredCourses.length === 0) {
      return renderEmptyMessage();
    }

    if (!selectedSubjectID) {
      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          {subjects.map((subject: Subject) => (
            <View key={subject.id} style={styles.subjectContainer}>
              <View style={styles.subjectHeader}>
                <Text style={styles.subjectTitle}>
                  Các khóa học thuộc môn {subject.title}
                </Text>
                {/* <Pressable
                  onPress={() =>console.log('DOi it t dang update',subject.title)}
                >
                  <View style={styles.seeMoreContainer}>
                    <Text style={styles.seeMoreText}>Xem thêm</Text>
                    <Ionicons
                      name="chevron-forward"
                      size={16}
                      color="#007BFF"
                    />
                  </View>
                </Pressable> */}
              </View>

              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.courseList}
              >
                {courses
                  .filter((course) => course.subjectId === subject.id)
                  .map((course) => (
                    <ListCourse
                      key={course.id}
                      item={course}
                      selectedSubjectID={null}
                    />
                  ))}
              </ScrollView>
            </View>
          ))}
        </ScrollView>
      );
    }

    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.courseList}
      >
        {filteredCourses.map((course) => (
          <ListCourse key={course.id} item={course} selectedSubjectID />
        ))}
      </ScrollView>
    );
  };

  return (
    <View>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  subjectContainer: {
    marginBottom: 10,
    marginTop: 10,
  },
  subjectTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "#333",
  },
  courseList: {
    paddingHorizontal: 10,
  },
  emptyMessage: {
    padding: 20,
    textAlign: "center",
    color: "#888888",
  },
  subjectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  seeMoreContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  seeMoreText: {
    fontSize: 14,
    color: "#007BFF",
    marginRight: 5,
  },
});

export default Body;
