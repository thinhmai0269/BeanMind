import React, { useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { Link, Stack, useRouter } from "expo-router";
import { Checkbox } from "react-native-paper";
import Button from "@/src/components/Button";
import KeyboardAvoidingContainer from "@/src/components/keyboardVoiding";
import { useAuth } from "@/src/lib/auth/AuthContext";
import Loading from "@/src/components/loading";

const SignUpScreen = () => {
  const { onRegister, isLoading } = useAuth();

  const [email, setEmail] = useState("mthinh01123 @gmail.com");
  const [password, setPassword] = useState("Thinh123!");
  const [password2, setPassword2] = useState("Thinh123!");
  const [checker, setChecker] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [showChecker, setShowChecker] = useState(false);
  const router = useRouter();

  async function createNewUser() {
    const data = { username: email, password: password };
    if (email.length < 6) {
      setChecker("Email phải có ít nhất 6 ký tự");
      setShowChecker(true);
      return;
    }
    if (!email.includes("@")) {
      setChecker("Email không hợp lệ");
      setShowChecker(true);
      return;
    }
    if (password.length < 6) {
      setChecker("Password phải có ít nhất 6 ký tự");
      setShowChecker(true);
      return;
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)/;
    if (!passwordRegex.test(password)) {
      setChecker(
        "Mật khẩu phải chứa ít nhất một chữ cái viết hoa, một ký tự đặc biệt và một chữ số",
      );
      setShowChecker(true);
      return;
    }
    if (!email || !password) {
      Alert.alert("Please fill in both fields");
      return;
    }
    if (password !== password2) {
      setChecker("Passwords do not match");
      setShowChecker(true);
      return;
    }
    if (isChecked) {
      if (onRegister) {
        try {
          const response = await onRegister(email, password);
          if (response === "Email already existed") {
            setChecker("Đã có người sử dụng email này hãy kiểm tra lại");
            setShowChecker(true);
            return;
          }
          router.push("/sign-in");
        } catch (error) {
          console.error("Registration error:", error);
          setChecker("Registration failed");
          setShowChecker(true);
        }
      } else {
        setChecker("Registration function is not available");
        setShowChecker(true);
      }
    } else {
      setChecker("Ấn chấp nút chấp nhận điều khoản sử dụng");
      setShowChecker(true);
    }
  }
  return (
    <KeyboardAvoidingContainer>
      <Stack.Screen options={{ title: "Sign up", headerShown: false }} />
      <View style={styles.container}>
        <Image
          source={require("../../../assets/images/bgLogin.png")}
          style={styles.backgroundImage}
        />
        <View style={styles.formContainer}>
          <Text style={styles.label}>Điền tên đăng nhập</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="VD: NguyenVanA@gmail.com"
            style={styles.input}
          />

          <Text style={styles.label}>Đặt mật khẩu</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder=""
            style={styles.input}
            secureTextEntry
          />
          <Text style={styles.label}>Điền lại mật khẩu</Text>
          <TextInput
            value={password2}
            onChangeText={setPassword2}
            placeholder=""
            style={styles.input}
            secureTextEntry
          />
          <View style={styles.checkBoxContainer}>
            <Checkbox
              status={isChecked ? "checked" : "unchecked"}
              onPress={() => setChecked(!isChecked)}
              color={isChecked ? "#4630EB" : undefined}
            />
            <Text style={styles.checkboxLabel}>
              Chấp nhận các điều khoản sử dụng
            </Text>
          </View>
          {showChecker && <Text style={styles.errorText}>{checker}</Text>}
          <Button onPress={createNewUser} text={"Tạo tài khoản"} />
          <View style={styles.footer}>
            <Text>Nếu đã có tài khoản hãy ấn nút</Text>
            <Link href="/sign-in" style={styles.textButton}>
              đăng nhập
            </Link>
          </View>
        </View>
      </View>
      {isLoading && <Loading />}
    </KeyboardAvoidingContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f8fa",
  },
  backgroundImage: {
    position: "absolute",
    top: -50,
    left: 0,
    right: 0,
    height: 372,
    width: "100%",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  formContainer: {
    padding: 20,
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
    marginTop: 250,
    height: "100%",
  },
  label: {
    color: "#333",
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 5,
    fontSize: 16,
  },
  checkBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  errorText: {
    color: "red",
    marginBottom: 20,
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: "#007bff",
    marginLeft: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
});

export default SignUpScreen;
