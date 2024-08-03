import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Href, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";



const CourseCard: React.FC<{ item: Course; selectedSubjectID?: any }> = (
  { item, selectedSubjectID },
) => {
  const viewDetail = () => {
    router.push(`/home/${item.id}` as Href<`/home/${string}`>);
  };
  const oldPrice = (item.price * 1.2).toFixed(2);
  return (
    <Pressable
      style={selectedSubjectID !== null
        ? styles.containerCardSelected
        : styles.containerCard}
      onPress={viewDetail}
    >
      <Image
        source={{ uri: item.imageURL }}
        style={selectedSubjectID ? styles.imageSelected : styles.image}
        resizeMode="cover"
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.title}</Text>
        {/* <View style={styles.authorContainer}>
          <Ionicons name="add-circle" size={16} color="rgba(61, 203, 177, 1)" />
          <Text style={styles.author}>Thầy Cường</Text>
        </View> */}
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.oldPrice}>{oldPrice}</Text>
          <Text style={styles.newPrice}>{item.price}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  containerCardSelected: {
    width: Dimensions.get("window").width - 40,
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: "auto",
    marginVertical: 10,
    overflow: "hidden",
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageSelected: {
    width: "100%",
    height: Dimensions.get("window").height * 0.2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#666",
  },

  containerCard: {
    width: 250,
    marginRight: 20,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 150,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: "#666",
  },
  detailsContainer: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  author: {
    fontSize: 12,
    color: "rgba(61, 203, 177, 1)",
    marginLeft: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  oldPrice: {
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "line-through",
    color: "#888",
  },
  newPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "rgba(61, 203, 177, 1)",
  },
});

export default CourseCard;
