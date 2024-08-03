import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Href, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getStudentDetail } from "@/src/lib/user/student";

interface ListStudentProps {
  infoStudent: Student;
}

const screenWidth = Dimensions.get("window").width;

const ListStudent: React.FC<ListStudentProps> = ({ infoStudent }) => {
  const idsStudent = infoStudent.id;

  const [dataStudentDetail, setStudentDetail] = useState<Student>();

  useEffect(() => {
    if (idsStudent) {
      getStudentDetail(idsStudent)
        .then((res) => {
          setStudentDetail(res.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [idsStudent]);
  const viewDetailStudent = () => {
    router.push(`user/${dataStudentDetail?.id}` as Href<"user/[id]">);
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Pressable onPress={() => viewDetailStudent()}>
          <View style={{ flexDirection: "row" }}>
            {/* <Image source={{ uri: dataStudentDetail?.image }} style={styles.image} /> */}
            <View style={{}}>
              <Text style={styles.name}>
                {dataStudentDetail?.applicationUser.userName}
              </Text>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Lớp:</Text>
                <Text style={styles.value}>{dataStudentDetail?.class}</Text>
              </View>
              {
                /* <View style={styles.infoRow}>
                <Text style={styles.label}>Thời gian học:</Text>
                <Text style={styles.value}>2h</Text>
              </View> */
              }
              <View style={styles.infoRow}>
                <Text style={styles.label}>Trường:</Text>
                <Text style={styles.value}>{dataStudentDetail?.school}</Text>
              </View>
            </View>
          </View>
        </Pressable>
      </View>
      <View
        style={{
          marginTop: "auto",
          alignItems: "flex-end",
          marginHorizontal: 10,
        }}
      >
        <Pressable
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => {
            router.push(`/user/activities/updateUser?id=${dataStudentDetail?.applicationUserId}`);
          }}
        >
          <Ionicons name="pencil-outline" size={24} />
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: screenWidth - 30,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    justifyContent: "space-between",
    alignSelf: "center",
  },
  card: {
    flex: 7,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingLeft: 20,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginRight: 25,
    backgroundColor: "rgba(55,35,65,0.4)",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 3,
  },
  label: {
    fontWeight: "500",
    color: "#666",
    width: 60,
  },
  value: {
    color: "#333",
  },
});

export default ListStudent;
