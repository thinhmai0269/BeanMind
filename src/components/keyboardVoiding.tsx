import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

const KeyboardAvoidingContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor:'white'
  },
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor:'white'
  },
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor:'white',
    paddingTop: Platform.OS === "android"
      ? (StatusBar.currentHeight || 0) + 0
      : 0,
  },
});

export default KeyboardAvoidingContainer;
