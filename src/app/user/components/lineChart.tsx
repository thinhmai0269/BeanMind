import { Dimensions, Text, View } from "react-native";
import React from "react";
import {
  BarChart,
  ContributionGraph,
  LineChart,
  PieChart,
  ProgressChart,
  StackedBarChart,
} from "react-native-chart-kit";
const lineChart = () => {
  return (
    <View style={{}}>
      <View style={{marginLeft:10}}>
        <Text style={{ fontSize: 14, fontWeight:'500' }}>
          Điểm trung bình các bài kiểm tra
        </Text>
      </View>
      <LineChart
        data={{
          labels: ["17/6", "18/6", "19/6", "20/6", "21/6", "22/6"],
          datasets: [{
            data: [
              4,
              6,
              7,
              7,
              10,
              9,
            ],
          }],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisSuffix={" đ"}
        chartConfig={{
          backgroundColor: "white",
          backgroundGradientFrom: "white",
          backgroundGradientTo: "white",
          decimalPlaces: 1, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          marginLeft: 4,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default lineChart;
