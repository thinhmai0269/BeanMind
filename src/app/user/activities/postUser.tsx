import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { RadioButton, TextInput } from "react-native-paper";
import Button from "@/src/components/Button";

const CreateNewChild = () => {
  const [file, setFile] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [checked, setChecked] = useState("first");
  const [school, setSchool] = useState("");
  const [classs, setClass] = useState("");
  const { id: idUser } = useLocalSearchParams();
  const checkId = () => {
    if (idUser === null || idUser === undefined) return true;
    else return false;
  };
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

  const inputDay = (day: string) => {
    const num = parseInt(day, 10);
    if (!isNaN(num) && num >= 1 && num <= 31) {
      setDay(day);
    } else {
      setDay("");
    }
  };

  const inputMonth = (month: string) => {
    const num = parseInt(month, 10);
    if (!isNaN(num) && num >= 1 && num <= 12) {
      setMonth(month);
    } else {
      setMonth("");
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

  const inputClass = (classs: string) => {
    const num = parseInt(classs, 10);
    if (!isNaN(num) && num >= 1 && num <= 5) {
      setClass(classs);
    } else {
      setClass("");
    }
  };

  const handleEndEditing = () => {
    if (year.length === 4) {
      validateYear(year);
    }
  };

  const saveInfo = () => {
    Alert.alert("Save");
  };

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Tạo mới",
          headerShown: true,
        }}
      />
      <Text style={styles.header}>Thông Tin Học Sinh</Text>
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
      <View style={styles.dateContainer}>
        <TextInput
          label="Ngày"
          value={day}
          keyboardType="numeric"
          onChangeText={inputDay}
          mode="outlined"
          theme={{ colors: { primary: "#6200ee" } }}
          style={styles.textInput}
        />
        <TextInput
          label="Tháng"
          value={month}
          keyboardType="numeric"
          onChangeText={inputMonth}
          mode="outlined"
          theme={{ colors: { primary: "#6200ee" } }}
          style={styles.textInput}
        />
        <TextInput
          label="Năm"
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
      <View style={styles.input}>
        <TextInput
          label="Tên trường"
          value={school}
          onChangeText={setSchool}
          mode="outlined"
          theme={{ colors: { primary: "#6200ee" } }}
        />
      </View>
      <View style={styles.input}>
        <TextInput
          label="Lớp"
          value={classs}
          onChangeText={inputClass}
          keyboardType="numeric"
          mode="outlined"
          theme={{ colors: { primary: "#6200ee" } }}
        />
      </View>
      <Button text="Lưu" onPress={saveInfo} style={styles.saveButton} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
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
  imageContainer: {
    width: "100%",
    alignItems: "center",

    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 90,
  },
  dateContainer: {
    flexDirection: "row",

    marginBottom: 20,
  },
  textInput: {
    marginRight: 15,
  },
  input: {
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  radioLabel: {
    fontSize: 16,
    color: "#333",
    marginLeft: 8,
  },
  saveButton: {
    marginTop: 20,
  },
});

export default CreateNewChild;
