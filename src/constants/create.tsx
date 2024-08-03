import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import Colors from "@/src/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams } from "expo-router";
import { Button } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
const AddMoreKid = () => {
  const [name, setName] = useState("");
  const [classroom, setClassroom] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const { id } = useLocalSearchParams();
  const isUpdate = !!id;
  const resetField = () => {
    setName("");
    setClassroom("");
  };
  const validateInput = () => {
    if (!name) {
      setError("Name is required");
      return false;
    }
    if (!classroom) {
      setError("classroom is required");
      return false;
    }
    if (isNaN(parseFloat(classroom))) {
      setError("classroom must be a number");
      return false;
    }
    return true;
  };
  const onCreate = () => {
    console.warn("Creating product", name);
  };
  const onUpdate = () => {
    console.warn("Update product", name);
    if (!validateInput()) {
      return;
    }

    resetField();
  };
  const onSubmit = () => {
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const onDelete = () => {
    console.warn("Delete product", name);
  };
  const confirmDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete", [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: onDelete,
      },
    ]);
  };
  const handleChooseBirth = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };
  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: isUpdate ? "Change profile kid" : "Add new kid" }}
      />
      <Image source={{ uri: image || undefined }} style={styles.image} />
      <Text onPress={pickImage} style={styles.selectText}>Select Image</Text>

      <Text style={styles.lable}>Họ Tên:</Text>
      <TextInput
        placeholder="Nguyễn Văn B"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <View style={{ flexDirection: "row" }}>
          <Text style={[styles.lable, { marginTop: 10, marginHorizontal: 5 }]}>
            Lớp:
          </Text>
          <TextInput
            value={classroom}
            onChangeText={setClassroom}
            placeholder="2"
            style={{
              backgroundColor: "white",
              padding: 5,
              marginTop:3,
              borderRadius: 5,
              marginBottom: 20,
            }}
            keyboardType="number-pad"
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={[{ marginTop: 10, marginHorizontal: 5 }]}>
            Ngày sinh:
          </Text>

          <TouchableOpacity onPress={() => setShowPicker(true)}>
            <TextInput
              value={formatDate(date)}
              placeholder="12/2/2023"
              style={{
                backgroundColor: "white",
                padding: 6,
                borderRadius: 5,
                marginBottom: 20,
                // color: "black",
              }}
              editable={false}
            />
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              is24Hour={true}
              onChange={handleChooseBirth}
            />
          )}
        </View>
      </View>
      <Text style={{ color: "red" }}>{error}</Text>
      <Button style={{marginTop:'auto'}} onPress={onSubmit} children={isUpdate ? "Update" : "Create"} />
      {isUpdate &&
        (
          <Text style={styles.selectText} onPress={confirmDelete}>
            Delete
          </Text>
        )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 10,
  },
  lable: {
    color: "gray",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  image: {
    width: "25%",
    aspectRatio: 1,
    alignSelf: "center",
    backgroundColor: "red",
  },
  selectText: {
    alignSelf: "center",
    fontWeight: "bold",
  },
});
export default AddMoreKid;
