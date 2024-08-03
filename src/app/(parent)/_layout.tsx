import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import Colors from "@/src/constants/Colors";
import { useColorScheme } from "@/src/components/useColorScheme";
import { useClientOnlyValue } from "@/src/components/useClientOnlyValue";
import CustomHeader from "@/src/components/naveBar/parent";

import CustomHeaderBack from "@/src/components/naveBar/home";
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: { display: "none" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Trang chủ",
          header: () => <CustomHeader />,
          headerTitleStyle: { color: "white" },
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          headerShown: true,
          header: () => <CustomHeaderBack title="Thông tin cá nhân" />,
          title: "Thống kê",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bar-chart-o" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          headerStyle: { backgroundColor: "#65737e" },
          headerTitleStyle: { color: "white" },
          headerShown: true,
          header: () => <CustomHeaderBack title="Thời khóa biểu" />,
          title: "Lịch học",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calendar" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          headerShown: true,
          header: () => <CustomHeaderBack title="Thông báo" />,
          title: "Thông báo",
          tabBarIcon: ({ color }) => <TabBarIcon name="bell-o" color={color} />,
        }}
      />
    </Tabs>
  );
}
