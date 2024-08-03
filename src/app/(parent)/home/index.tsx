// TabOneScreen.tsx
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { getCourse } from "@/src/lib/course/courses";
import HeaderBody from "./component/header";
import FooterBody from "./component/footer";
import Body from "./component/body";

export default function TabOneScreen() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [subjectId, setSubjectId] = useState<string | null>(null);

  useEffect(() => {
    getCourse()
      .then((res) => {
        setCourses(res.data.data.items);
      })
      .catch(() => {
        console.log("Cannot find courses");
      });
  }, []);

  const filteredCourses = selectedSubject
    ? courses.filter((course) => course.subjectId === subjectId)
    : courses;

  return (
    <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <HeaderBody
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
        setSubjectId={setSubjectId}
      />
      <Body selectedSubjectID={subjectId} courses={filteredCourses} />
      <FooterBody subjectId={subjectId} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 0,
    backgroundColor: "white",
    flexGrow: 1,
  },
});
