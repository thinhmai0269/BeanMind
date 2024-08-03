import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Button from "@/src/components/Button";
import { Ionicons } from "@expo/vector-icons";
import SelectCourse from "./component/selectCourse";
import { getCourseDetail } from "@/src/lib/course/courses";
import SelectAbout from "./component/selectAbout";


const Index = () => {
  const [selectedTab, setSelectedTab] = useState("Course");
  const { id: idChild } = useLocalSearchParams();
  const [dataCourseDetail, setDataCourseDetail] = useState();
  const [title, setTitle] = useState('');
  const [dataChapter, setDataChapter] = useState<Chapter[]>([]);

  useEffect(() => {
    getCourseDetail(idChild as string)
      .then((res) => {
        setDataCourseDetail(res.data.data);
        setTitle(res.data.data.title);
        setDataChapter(res.data.data.chapters);
   
      })
      .catch((e) => console.log("Fail at courseDetail", e));
  }, [idChild]);

  const paymentScreen = () => {
    router.push("/cart/payment");
    Alert.alert("Làm phần chuyển sang thanh toán ");
  };

  const backToHome = () => {
    router.push("/home");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../../../../assets/images/course.jpg")}
            style={styles.image}
          />
          <Pressable onPress={backToHome} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
        </View>
        {dataCourseDetail && (
          <>
            <View style={styles.title}>
              <Text style={styles.titleText}>{title}</Text>
            </View>
            <View style={styles.tabContainer}>
              <TouchableOpacity
                onPress={() => setSelectedTab("About")}
                style={[styles.tab, selectedTab === "About" && styles.activeTab]}
              >
                <Text
                  style={[
                    styles.tabText,
                    selectedTab === "About" && styles.activeTabText,
                  ]}
                >
                  About
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedTab("Course")}
                style={[styles.tab, selectedTab === "Course" && styles.activeTab]}
              >
                <Text
                  style={[
                    styles.tabText,
                    selectedTab === "Course" && styles.activeTabText,
                  ]}
                >
                  Course
                </Text>
              </TouchableOpacity>
            </View>
            {selectedTab === "Course" && (
              <View>
                <SelectCourse chapters={dataChapter} />
              </View>
            )}
            {selectedTab === "About" && (
              <View>
                <SelectAbout dataCourse={dataCourseDetail} />
              </View>
            )}
          </>
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button text="Thanh toán" onPress={paymentScreen} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    height: 250,
    width: "100%",
    resizeMode: "cover",
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 5,
  },
  title: {
    margin: 10,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "700",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginVertical: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderColor: "transparent",
  },
  activeTab: {
    borderColor: "blue",
  },
  tabText: {
    fontSize: 16,
    color: "gray",
  },
  activeTabText: {
    color: "blue",
    fontWeight: "bold",
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: "white",
  },
});

export default Index;
