// FooterBody.tsx
import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { getAllTeacher, getTeacherDetail } from "@/src/lib/user/teacher";
import { getUserDetail } from "@/src/lib/user/users";

interface FooterProps {
  subjectId: string | null;
}

const renderTeacherList = ({ item }: { item: Teacher }) => (
  <View style={styles.teacherContainer}>
    <Image
      resizeMethod="auto"
      source={{ uri: item.teacher.image }}
      style={styles.teacherImage}
    />
    <View style={styles.teacherInfo}>
      <Text style={styles.teacherName}>{item.userName}</Text>
      <Text style={styles.teacherDescription} numberOfLines={2}>
        {item.teacher.level}
      </Text>
      <Text style={styles.teacherExperience}>{item.teacher.experience}</Text>
    </View>
  </View>
);

const FooterBody: React.FC<FooterProps> = ({ subjectId }) => {
  const [dataTeacher, setDataTeacher] = useState<Teacher[]>([]);
  const [idsTeacher, setIdsTeacher] = useState<string[]>([]);
  const [detailedTeachers, setDetailedTeachers] = useState<Teacher[]>([]);
  useEffect(() => {
    getAllTeacher().then((res) => {
      const teachers = res.data.data.items;
      setDataTeacher(teachers);
      getinfoTeacher(teachers);
    });
  }, []);

  useEffect(() => {
    if (idsTeacher.length > 0) {
      fetchTeacherDetails(idsTeacher);
    }
  }, [idsTeacher]);

  const getinfoTeacher = (teachers: Teacher[]) => {
    const ids = teachers
      .map((item) => item.applicationUserId)
      .filter((id): id is string => id !== undefined);
    setIdsTeacher(ids);
  };

  const fetchTeacherDetails = async (ids: string[]) => {
    const detailedInfoPromises = ids.map((id) => getTeacherDetail(id));
    const detailedInfoResponses = await Promise.all(detailedInfoPromises);
    const detailedInfo = detailedInfoResponses.map((res) => res.data.data);
    setDetailedTeachers(detailedInfo);
  };

  return (
    subjectId === null && (
      <View style={styles.footerContainer}>
        <Text style={styles.teacherListHeader}>Giảng viên</Text>
        <FlatList
          data={detailedTeachers}
          renderItem={renderTeacherList}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
        <View>
          <Image
            source={{
              uri:
                "https://img.freepik.com/free-psd/back-school-facebook-cover-banner-template_106176-1189.jpg",
            }}
            style={{ width: "100%", height: 150 }}
          />
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  teacherContainer: {
    padding: 10,
    width: 250,
    marginHorizontal: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  teacherImage: {
    width: 195,
    height: 250,
  },
  teacherInfo: {
    width: 190,
    alignItems: "flex-start",
  },
  teacherName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  teacherDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  teacherExperience: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
  },
  teacherListHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
    marginLeft: 10,
  },
  footerContainer: {
    width: "100%",
    height: "auto",
    backgroundColor: "white",
    justifyContent: "center",
  },
});

export default FooterBody;
