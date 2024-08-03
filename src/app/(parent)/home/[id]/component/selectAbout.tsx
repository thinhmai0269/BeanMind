import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getTeacherDetail } from "@/src/lib/user/teacher";


interface Course {
  id: string;
  image?: string;
  title: string;
  description: string;
  totalSlot: number;
  subjectId: string;
  programTypeId: string;
  courseLevelId: string;
  isDeleted: boolean;
  enrollments: any[];
  chapters: any[];
  teachables: any[];
}

interface SelectAboutProps {
  dataCourse: Course;
}

const SelectAbout: React.FC<SelectAboutProps> = ({ dataCourse }) => {
  const [dataTeacher, setDataTeacher] = useState<{ [id: string]: Teacher }>({});

  useEffect(() => {
    const getTopicFromChapter = async () => {
      const idsTeacher = dataCourse.teachables.map((teacher) => teacher.applicationUserId);

      try {
        const details = await Promise.all(
          idsTeacher.map((id) =>
            getTeacherDetail(id).then((res) => ({
              id,
              teacher: res.data.data,
            }))
          )
        );
        const topicsObject: { [key: string]: Teacher } = {};
        details.forEach(({ id, teacher }) => {
          topicsObject[id] = teacher;
        });

        setDataTeacher(topicsObject);
        console.log(topicsObject)
      } catch (error) {
        console.error("Error fetching teacher details:", error);
      }
    };

    getTopicFromChapter();
  }, [dataCourse.teachables]);

  return (
    <View style={styles.contentContainer}>
      <View style={styles.section}>
        <Text style={styles.heading}>Tổng quát khóa học:</Text>
        <View style={styles.infoRow}>
          <Text style={styles.text}>Số buổi học:</Text>
          <Text style={styles.text}>{dataCourse.totalSlot}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.text}>Tổng chương:</Text>
          <Text style={styles.text}>{dataCourse.chapters.length}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.text}>Số học sinh đã đăng ký:</Text>
          <Text style={styles.text}>{dataCourse.enrollments.length}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Chi tiết:</Text>
        <Text style={styles.text}>{dataCourse.description}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Giảng viên phụ trách</Text>
        {Object.entries(dataTeacher).map(([id, teacher]) => (
          <View key={teacher.id} style={styles.instructorContainer}>
            <Image source={{ uri: teacher.teacher.image }} style={styles.instructorImage} />
            <View style={styles.instructorInfo}>
              <Text style={styles.instructorName}>{teacher.userName}</Text>
              <Text style={styles.instructorBio}>{teacher.teacher.level}</Text>
              <Text style={styles.instructorBio}>{teacher.teacher.experience}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  text: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  instructorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  instructorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    borderWidth:1
  },
  instructorInfo: {
    flex: 1,
  },
  instructorName: {
    fontSize: 16,
    fontWeight: "600",
  },
  instructorBio: {
    fontSize: 14,
    color: "rgba(27, 27, 27, 0.8)",
  },
});

export default SelectAbout;
