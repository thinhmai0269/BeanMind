import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomHeaderCourse from "@/src/components/naveBar/course";
import { Stack } from "expo-router";
import Button from "@/src/components/Button";

const App = () => {
  const [showFullText, setShowFullText] = useState(false);

  const handleToggleText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Stack.Screen
          options={{
            title: "Giỏ h",
            header: () => <CustomHeaderCourse />,
            headerTitleStyle: { fontSize: 12 },
          }}
        />

        <View style={styles.imageContainer}>
          <Image
            source={require("../../../assets/images/course.jpg")}
            style={styles.image}
          />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Thẻ visa </Text>
          </View>
      
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button text="Thanh toán" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: "absolute",
    top: 10,
    left: 5,
    right: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    height: 250,
    width: 350,
    resizeMode: "cover",
  },
  contentContainer: {
    marginTop: "75%",
    marginHorizontal: 10,
  },
  title: {
    marginBottom: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "700",
  },
  textContainer: {
    width: "100%",
    marginBottom:100
  },
  toggleText: {
    color: "blue",
    fontWeight: "bold",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 10,
  },
});

export default App;
