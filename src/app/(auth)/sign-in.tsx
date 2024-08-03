import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { Link, Stack, useRouter } from "expo-router";
import Button from "@/src/components/Button";
import { useAuth } from "@/src/lib/auth/AuthContext";
import Loading from "@/src/components/loading";
import KeyboardAvoidingContainer from "@/src/components/keyboardVoiding";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId: "928782526578-vcnncqj2d1j68dhasi8i0q93utihn26i.apps.googleusercontent.com",
});

const SignInScreen = () => {
  const [email, setEmail] = useState("mthinh01@gmail.com");
  const [password, setPassword] = useState("Thinh123!");
  const { onLogin, isLoading } = useAuth();
  const router = useRouter();
  const [checker, setChecker] = useState("");
  const [showChecker, setShowChecker] = useState(false);

  async function login() {
    if (!email || !password) {
      Alert.alert("Please fill in both fields");
      return;
    }
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
      setChecker("Mật khẩu phải chứa ít nhất một chữ cái viết hoa, một ký tự đặc biệt và một chữ số");
      setShowChecker(true);
      return;
    }

    try {
      const result = await onLogin!(email, password);
      if (result.data && !result.error) {
        if (result.data.message === "User is not confirm mail yet") {
          Alert.alert("Phụ huynh vào email mình đã đăng ký để xác nhận");
          router.push("/(parent)");
        } else {
          setChecker("Sai email hoặc mật khẩu");
          setShowChecker(true);
        }
      }
    } catch (error) {
      Alert.alert("Login Failed", "An unexpected error occurred");
    }
  }

  const handleSignInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo.user);
    } catch (error) {
       console.log(error)
    }
  };

  return (
    <KeyboardAvoidingContainer>
      <Stack.Screen options={{ title: "Sign in", headerShown: false }} />
      <Image
        source={require("../../../assets/images/bgLogin.png")}
        style={styles.backgroundImage}
      />
      <Text style={styles.Header}>Welcome to BEAN MIND</Text>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Điền email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="jon@gmail.com"
          style={styles.input}
        />
        <Text style={styles.label}>Điền mật khẩu</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder=""
          style={styles.input}
          secureTextEntry
        />
        {showChecker && <Text style={styles.errorText}>{checker}</Text>}
        <View style={styles.actionsContainer}>
          <Link href="">
            <Text style={styles.forgotPasswordLink}>Quên mật khẩu ?</Text>
          </Link>
        </View>
        <Button
          onPress={login}
          disabled={isLoading}
          text={isLoading ? "Signing in..." : "Sign in"}
        />
        <Link href="/(auth)\testGG" style={styles.textButton}>
          Create an account
        </Link>
        <Text style={styles.orText}>or</Text>
        <Pressable
          style={styles.googleSignIn}
          onPress={handleSignInWithGoogle}
        >
          <Image
            source={require("../../../assets/images/google.png")}
            style={styles.googleIcon}
          />
        </Pressable>
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
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    width: "100%",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  formContainer: {
    padding: 20,
    marginTop: 300,
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },
  Header: {
    fontSize: 28,
    fontWeight: "600",
    color: "#0984e3",
    position: "absolute",
    top: 330,
    left: 55,
    right: 30,
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
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  forgotPasswordLink: {
    color: "#007bff",
    fontSize: 14,
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "500",
    color: "#007bff",
    marginVertical: 20,
  },
  orText: {
    alignSelf: "center",
    fontWeight: "400",
    color: "#333",
    marginBottom: 20,
  },
  googleSignIn: {
    alignSelf: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  googleIcon: {
    height: 20,
    width: 20,
  },
  errorText: {
    color: "red",
    marginBottom: 20,
  },
});

export default SignInScreen;
