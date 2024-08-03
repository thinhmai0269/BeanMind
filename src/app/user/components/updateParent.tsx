import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { RadioButton, TextInput } from "react-native-paper";
import Button from "@/src/components/Button";
import { getUserDetail } from "@/src/lib/user/users";
import KeyboardAvoidingContainer from "@/src/components/keyboardVoiding";

const ParentForm = ({ idUser }: any) => {
  const [file, setFile] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [year, setYear] = useState("");
  const [checked, setChecked] = useState("first");

  useEffect(() => {
    getUserDetail(idUser)
      .then((res) => {
        const userData = res.data.data;
        setName(userData.userName);
        setEmail(userData.email);
        setPhone(userData.parent?.phone || "");
        setAddress(userData.parent?.address || "");
        setChecked(userData.parent?.gender === 0 ? "first" : "second");
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [idUser]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Sorry, we need camera roll permission to upload images.",
      );
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      setFile(result.assets[0].uri);
      setError(null);
    }
  };

  const validateYear = (year: string) => {
    const num = parseInt(year, 10);
    const currentYear = new Date().getFullYear();
    if (!isNaN(num)) {
      if (num < 1900) {
        setYear("1900");
      } else if (num > currentYear) {
        setYear(currentYear.toString());
      } else {
        setYear(year);
      }
    } else {
      setYear("");
    }
  };

  const handleEndEditing = () => {
    if (year.length === 4) {
      validateYear(year);
    }
  };

  const saveInfo = () => {
    // saveParent();
  };

  return (
    <KeyboardAvoidingContainer >
      <Stack.Screen
        options={{
          title: "Thông tin cá nhân",
          headerShown: true,
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={file
              ? { uri: file }
              : require("../../../../assets/images/course.jpg")}
            style={styles.image}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Chọn ảnh đại diện</Text>
        </TouchableOpacity>
        <View style={styles.input}>
          <TextInput
            label="Họ Tên"
            value={name}
            onChangeText={setName}
            mode="outlined"
            theme={{ colors: { primary: "#6200ee" } }}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            theme={{ colors: { primary: "#6200ee" } }}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            label="Địa chỉ"
            value={address}
            onChangeText={setAddress}
            mode="outlined"
            theme={{ colors: { primary: "#6200ee" } }}
            multiline={true}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            label="Số điện thoại"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            mode="outlined"
            theme={{ colors: { primary: "#6200ee" } }}
          />
        </View>
        <View style={styles.input}>
          <TextInput
            label="Năm sinh"
            value={year}
            keyboardType="numeric"
            maxLength={4}
            onChangeText={setYear}
            onEndEditing={handleEndEditing}
            mode="outlined"
            theme={{ colors: { primary: "#6200ee" } }}
          />
        </View>
        <View style={styles.radioContainer}>
          <View style={styles.radioOption}>
            <RadioButton
              value="Nam"
              status={checked === "first" ? "checked" : "unchecked"}
              onPress={() => setChecked("first")}
              color="#6200ee"
            />
            <Text style={styles.radioLabel}>Nam</Text>
          </View>
          <View style={styles.radioOption}>
            <RadioButton
              value="Nữ"
              status={checked === "second" ? "checked" : "unchecked"}
              onPress={() => setChecked("second")}
              color="#6200ee"
            />
            <Text style={styles.radioLabel}>Nữ</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button text="Lưu" onPress={saveInfo} />
      </View>
    </KeyboardAvoidingContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
    justifyContent: "space-between", // Ensures content is spaced properly
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center", // Center content in the scroll view
    marginHorizontal:15,
    
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75, // Ensures the image is circular
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#6200ee",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    marginBottom: 16, // Increased margin for better spacing
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 20, // Increased margin for better spacing
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  radioLabel: {
    fontSize: 16,
    color: "#333",
    marginLeft: 8,
  },
  footer: {
    padding: 16,
    backgroundColor: "white", // Ensures button area has a distinct background
  },
});

export default ParentForm;
