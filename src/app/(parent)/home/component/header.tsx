import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getSubject } from "@/src/lib/course/subject";

interface HeaderBodyProps {
  selectedSubject: string | null;
  setSelectedSubject: (className: string | null) => void;
  setSubjectId: (subjectId: string | null) => void;
}

const HeaderBody: React.FC<HeaderBodyProps> = ({
  selectedSubject,
  setSelectedSubject,
  setSubjectId,
}) => {
  const [subject, setSubject] = useState<Course[]>([]);

  useEffect(() => {
    getSubject()
      .then((res) => {
        setSubject(res.data.data.items);
      })
      .catch(() => {
        console.log("Cannot find courses");
      });
  }, []);

  const showAllCourse = () => {
    setSelectedSubject(null);
    setSubjectId(null);
  };

  const showCourseByClass = (className: string, subjectId: string) => () => {
    setSelectedSubject(className);
    setSubjectId(subjectId);
  };

  return (
    <View>
      <ScrollView
        style={styles.classFiltersContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <Pressable
          style={[
            styles.classFilter,
            selectedSubject === null && styles.selectedFilter,
          ]}
          onPress={showAllCourse}
        >
          <Text style={selectedSubject === null ? styles.selectedText : null}>
            All
          </Text>
          <View
            style={selectedSubject === null
              ? styles.trapezoid
              : styles.untrapezoid}
          />
        </Pressable>
        {subject.map((course) => (
          <Pressable
            key={course.id}
            style={[
              styles.classFilter,
              selectedSubject === course.title && styles.selectedFilter,
            ]}
            onPress={showCourseByClass(course.title, course.id)}
          >
            <Text
              style={selectedSubject === course.title
                ? styles.selectedText
                : null}
            >
              {course.title}
            </Text>
            <View
              style={selectedSubject === course.title
                ? styles.trapezoid
                : styles.untrapezoid}
            />
          </Pressable>
        ))}
      </ScrollView>
      {!selectedSubject && (
        <Image
          source={{
            uri:
              "https://img.freepik.com/free-psd/back-school-facebook-cover-banner-template_106176-1189.jpg",
          }}
          style={styles.bannerImage}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bannerImage: {
    width: "100%",
    height: 150,
  },
  classFiltersContainer: {
    flexDirection: "row",
    backgroundColor: "white",
  },
  classFilter: {
    width: 100,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  selectedFilter: {
    borderColor: "blue",
  },
  selectedText: {
    fontWeight: "bold",
    color: "blue",
  },
  trapezoid: {
    width: 35,
    height: 4,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "rgba(61, 203, 177, 1)",
    position: "absolute",
    bottom: 0,
  },
  untrapezoid: {
    width: 35,
    height: 4,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 0,
  },
});

export default HeaderBody;
