import React, { useCallback } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { ExpoRouter } from "expo-router/types/expo-router";

interface DrawerProps {
  visible: boolean;
  onClose: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ visible, onClose }) => {
  const windowWidth = Dimensions.get("window").width;
  const slideAnimation = React.useRef(new Animated.Value(-windowWidth)).current;

  React.useEffect(() => {
    Animated.timing(slideAnimation, {
      toValue: visible ? 0 : -windowWidth,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible, slideAnimation, windowWidth]);

  const navigateTo = useCallback((path: ExpoRouter.Href) => {
    onClose();
    router.push(path);
  }, [onClose]);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          styles.drawerContainer,
          { transform: [{ translateX: slideAnimation }] },
        ]}
      >
        <View style={styles.container}>
          <View style={styles.profileContainer}>
            <Image
              source={{
                uri:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ41UoXzHTDnz3IpqdRzRZrl6deOwz_azfb5w&s",
              }}
              style={styles.image}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Nguyen Thi Dieu</Text>
              <View style={styles.userDetail}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>xyz@gmail.com</Text>
              </View>
              <View style={styles.userDetail}>
                <Text style={styles.label}>Phone:</Text>
                <Text style={styles.value}>09xxxxxxxx</Text>
              </View>
            </View>
          </View>
          <View style={styles.navigationContainer}>
            <TouchableOpacity
              onPress={() => navigateTo("/(parent)/home")}
              style={styles.navItem}
            >
              <FontAwesome name="home" size={20} color="#4630EB" />
              <Text style={styles.navText}>Trang chủ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigateTo("/(parent)/calendar")}
              style={styles.navItem}
            >
              <FontAwesome name="calendar" size={20} color="#4630EB" />
              <Text style={styles.navText}>Thời khóa biểu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigateTo("/(parent)/statistics")}
              style={styles.navItem}
            >
              <FontAwesome name="user" size={20} color="#4630EB" />
              <Text style={styles.navText}>Thông tin gia đình</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigateTo("/sign-in")}
            style={styles.logoutButton}
          >
            <FontAwesome name="sign-out" size={20} color="#f44336" />
            <Text style={styles.logoutText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  drawerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "80%",
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 10,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white", 
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: "#ffffff", 
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginRight: 15,
    borderWidth: 2, 
    borderColor: "#ddd",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333", // Darker color for text
  },
  userDetail: {
    flexDirection: "row",
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
    color: "#555",
  },
  value: {
    marginLeft: 5,
    color: "#555",
  },
  navigationContainer: {
    flex: 1,
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#ffffff", // Background color for navigation items
  },
  navText: {
    marginLeft: 20,
    fontSize: 16,
    color: "#4630EB",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    marginTop: 20,
    backgroundColor: "#fff8f8", // Light background for logout button
    borderRadius: 10, // Rounded corners for logout button
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#f44336",
  },
});

export default Drawer;
