import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import ChildForm from "../components/updateStudent";
import ParentForm from "../components/updateParent";
import { getUserDetail } from "@/src/lib/user/users";

const UpdateUser = () => {
  //ID ở đây là applicationUser
  const { id: idUser } = useLocalSearchParams();
  const [role, setRole] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (idUser) {
      getUserDetail(idUser.toString())
        .then((res) => {
          setRole(res.data.data.roles);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [idUser]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Stack.Screen
          options={{
            title: "Đợi xí ...",
            headerShown: true,
          }}
        />
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    role[0] === "Student" // Check if the first role is "Student"
      ? <ChildForm idUser={idUser} />
      : <ParentForm idUser={idUser} />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default UpdateUser;
