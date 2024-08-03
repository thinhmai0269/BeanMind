import { Dimensions, Image, Pressable, StyleSheet } from "react-native";
import { FlatList, Text, View } from "react-native";
import ListStudent from "@/src/components/FlatList/listStudent";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { getUser } from "@/src/lib/user/users";
import { Ionicons } from "@expo/vector-icons";
import { getParent, getParentDetail } from "@/src/lib/user/parent";
import { getStudent, getStudentDetail } from "@/src/lib/user/student";

const withScreen = Dimensions.get("window").width;

export default function TabOneScreen() {
  const router = useRouter();
  const [dataStudent, setStudent] = useState<Student[]>([]);
  const [parent, setParent] = useState<Parent>();
console.log(parent)
  useEffect(() => {
    getParentDetail("4977e82e-9592-475b-a6fa-10942721c6d0")
      .then(function (res) {
        setParent(res.data.data);
        setStudent(res.data.data.students);
      })
      .catch(function (error) {
        console.error(error, "error tai statistic");
      });
    const idsStudent = dataStudent.map((student) => student.id);
    console.log(idsStudent);
  }, []);

  const renderHeaderUser = () => {
    if (!parent) {
      return null;
    }
    return (
      <View style={styles.headerContainer}>
        <View style={styles.card}>
          <View style={styles.infoWrapper}>
            {
              /* <Image
              source={{ uri: parent?.profilePictureUrl }}
              style={styles.image}
            /> */
            }
            <View style={styles.infoContainer}>
              <Text style={styles.name}>
                {parent?.applicationUser.userName}
              </Text>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Số điện thoại:</Text>
                <Text style={styles.value}>{parent?.phone}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>
                  {parent?.applicationUser.email}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Đã đăng ký:</Text>
                <Text style={styles.value}>{dataStudent.length}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button}>
            <Ionicons
              name="wallet-outline"
              size={14}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Hóa đơn khóa học</Text>
          </Pressable>
          <Pressable style={styles.button}
            onPress={() =>router.navigate(`/user/activities/updateUser?id=${parent.applicationUserId}`) }
          >
            <Ionicons
              name="pencil-outline"
              size={14}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Sửa thông tin</Text>
          </Pressable>
          <Pressable
            style={styles.addButton}
            onPress={() =>router.navigate(`/user/activities/postUser?id=${parent.id}`) }
          >
            <Ionicons name="add-circle-outline" size={24} />
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={dataStudent}
      ListHeaderComponent={renderHeaderUser}
      renderItem={({ item }) => <ListStudent infoStudent={item} />}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "white",
    width: withScreen,
    paddingVertical: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoWrapper: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
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
    width: 120,
  },
  value: {
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    width: "100%",
    justifyContent: "space-around",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 14,
    color: "#333",
  },
  addButton: {
    alignItems: "center",
    justifyContent: "center",
  },
});
