import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { data2 } from "./seed2";
import ListScore from "@/src/components/FlatList/listScore";
import LineChart from "./components/lineChart";
import { getUserDetail } from "@/src/lib/user/users";
import { getApplicationUserIdOfStudent, getStudentDetail } from "@/src/lib/user/student";
import { getCourseEnrollmentByStudentId } from "@/src/lib/course/enrollment";
interface ProgressItem {
  id: string;
  subject: string;
  progress: number;
}
const screenWidth = Dimensions.get("window").width;
const progressData: ProgressItem[] = [
  { id: "1", subject: "Toán tiểu học nâng cao lớp 3", progress: 0.2 },
  { id: "2", subject: "Tiếng Anh cơ bản lớp 4", progress: 0.5 },
  { id: "3", subject: "Khoa học tự nhiên lớp 5", progress: 0.8 },
  { id: "4", subject: "Khoa học tự nhiên lớp 5", progress: 0.8 },
  { id: "5", subject: "Khoa học tự nhiên lớp 5", progress: 0.8 },
];

const dataDetailChild = () => {
  const { id: idChild } = useLocalSearchParams();
  const [dataDetail, setStudentDetail] = useState<Student | null>(null);
  const [dataCourse, setDataCourse] = useState<Student | null>(null);
  console.log(idChild, "kt")
  useEffect(() => {
    const fetchStudentDetails = async () => {
      if (idChild) {
        try {
          const studentDetailResponse = await getStudentDetail(idChild.toString());
          setStudentDetail(studentDetailResponse.data.data);

          const applicantIDstudent = await getApplicationUserIdOfStudent(idChild.toString());
          console.log('check :', applicantIDstudent)
          await getCourseEnrollmentByStudentId(applicantIDstudent);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchStudentDetails();
  }, [idChild]);

  const renderHeader = () => (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `${dataDetail?.applicationUser.userName}` }} />
      <View style={styles.card}>
        <View style={styles.dataDetailContainer}>
          <View style={styles.dataDetailRow}>
            <Text style={styles.dataDetailLabel}>Họ & Tên:</Text>
            <Text>{dataDetail?.applicationUser.userName}</Text>
          </View>
          <View style={styles.dataDetailRow}>
            <Text style={styles.dataDetailLabel}>Lớp:</Text>
            <Text>{dataDetail?.class}</Text>
          </View>
          <View style={styles.dataDetailRow}>
            <Text style={styles.dataDetailLabel}>Thời gian học:</Text>
            <Text>{dataDetail?.class} update thêm </Text>
          </View>
          <View style={styles.dataDetailRow}>
            <Text style={styles.dataDetailLabel}>Điểm trung bình:</Text>
            <Text>{dataDetail?.class} update thêm</Text>
          </View>
        </View>
      </View>
      <Text style={styles.sectionTitle}>Các môn đang học</Text>
      <View style={styles.headerRow}>
        <Text style={styles.headerCol}>Môn học</Text>
        <Text style={styles.headerCol}>Tiến trình</Text>
      </View>
      <View style={{ marginVertical: 10 }}>
        {progressData.map((item) => (
          <Link
            key={item.id}
            href={`/course/${item.id}`}
          >
            <View style={styles.progressRow}>
              <View style={styles.progressSubject}>
                <Text>{item.subject}</Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBackground}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: `${item.progress * 100}%` },
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>{Math.round(item.progress * 100)}%</Text>
              </View>
            </View>
          </Link>
        ))}
      </View>
      {/* Display the LineChart here */}
      <LineChart />
    </View>
  );

  return (
    <FlatList
      style={{ backgroundColor: "white" }}
      data={data2}
      ListHeaderComponent={renderHeader}
      renderItem={({ item }) => <ListScore Score={item} />}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f9fa",
    padding: 15,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // For Android shadow
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
    backgroundColor: "#e0e0e0", // Placeholder color
  },
  dataDetailContainer: {
    flex: 1,
    justifyContent: "center",
  },
  dataDetailRow: {
    flexDirection: "row",
    marginVertical: 5,
    alignItems: "center",
  },
  dataDetailLabel: {
    fontWeight: "600",
    marginRight: 10,
    color: "#333", // Darker text for better readability
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 15,
    color: "#333",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
    marginBottom: 10,
  },
  headerCol: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: "#666", // Slightly lighter text
    paddingVertical: 5,
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",

    width: screenWidth,
  },
  progressSubject: {
    flex: 4,
    paddingRight: 20,
  },
  progressBarContainer: {
    flex: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  progressBarBackground: {
    height: 10,
    width: "80%",
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    marginRight: 10,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#3b5998",
    borderRadius: 5,
  },
  progressText: {
    fontSize: 12,
    color: "#666",
  },
});
export default dataDetailChild;
