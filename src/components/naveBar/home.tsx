import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Drawer from "../drawer";
import { IconButton } from "react-native-paper";
import { router } from "expo-router";

interface CustomHeaderBackProps {
  title: string;
}

const CustomHeaderBack: React.FC<CustomHeaderBackProps> = ({ title }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    router.navigate('/home');
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={toggleDrawer}>
          <IconButton icon="arrow-left" iconColor="black" size={20} />
        </TouchableOpacity>
        {/* <Image
          style={styles.logo}
          source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
        /> */}
        <View style={styles.headerTitle}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
      </View>
      <View style={styles.rightSection}>
        <IconButton
          icon="bell"
          iconColor="rgba(27, 27, 27, 0.6)"
          size={20}
          onPress={() => router.push('/notification')}
        />
      </View>
      <Drawer visible={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 80,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    height: 38,
    width: 38,
    marginRight: 5,
    borderRadius: 20,
  },
  headerTitle: {
    justifyContent: "center",
  },
  titleText: {
    fontWeight: "900",
    fontSize: 21,
    color: "blue",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CustomHeaderBack;
