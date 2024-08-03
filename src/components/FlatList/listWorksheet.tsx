import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";

interface Answer {
  key: string;
  text: string;
}

interface Question {
  id: string;
  answer: Answer[];
}

const DetailWorksheet = () => {
  const correctAnswers: { [key: string]: string } = {
    "1": "Ans1",
    "2": "Ans2",
    "3": "Ans3",
    "4": "Ans4",
    "5": "Ans2",
    "6": "Ans3",
    "7": "Ans1",
    "8": "Ans4",
    "9": "Ans2",
    "10": "Ans1",
  };

  const userAnswers: { [key: string]: string } = {
    "1": "Ans1",
    "2": "Ans1",
    "3": "Ans1",
    "4": "Ans3",
    "5": "Ans2",
    "6": "Ans2",
    "7": "Ans3",
    "8": "Ans4",
    "9": "Ans3",
    "10": "Ans1",
  };

  const data: Question[] = [
    {
      id: "1",
      answer: [
        { key: "Ans1", text: "A" },
        { key: "Ans2", text: "B" },
        { key: "Ans3", text: "C" },
        { key: "Ans4", text: "D" },
      ],
    },
    {
      id: "2",
      answer: [
        { key: "Ans1", text: "A" },
        { key: "Ans2", text: "B" },
        { key: "Ans3", text: "C" },
        { key: "Ans4", text: "D" },
      ],
    },
    {
      id: "3",
      answer: [
        { key: "Ans1", text: "A" },
        { key: "Ans2", text: "B" },
        { key: "Ans3", text: "C" },
        { key: "Ans4", text: "D" },
      ],
    },
    {
      id: "4",
      answer: [
        { key: "Ans1", text: "A" },
        { key: "Ans2", text: "B" },
        { key: "Ans3", text: "C" },
        { key: "Ans4", text: "D" },
      ],
    },
    {
      id: "5",
      answer: [
        { key: "Ans1", text: "A" },
        { key: "Ans2", text: "B" },
        { key: "Ans3", text: "C" },
        { key: "Ans4", text: "D" },
      ],
    },
    {
      id: "6",
      answer: [
        { key: "Ans1", text: "A" },
        { key: "Ans2", text: "B" },
        { key: "Ans3", text: "C" },
        { key: "Ans4", text: "D" },
      ],
    },
    {
      id: "7",
      answer: [
        { key: "Ans1", text: "A" },
        { key: "Ans2", text: "B" },
        { key: "Ans3", text: "C" },
        { key: "Ans4", text: "D" },
      ],
    },
    {
      id: "8",
      answer: [
        { key: "Ans1", text: "A" },
        { key: "Ans2", text: "B" },
        { key: "Ans3", text: "C" },
        { key: "Ans4", text: "D" },
      ],
    },
    {
      id: "9",
      answer: [
        { key: "Ans1", text: "A" },
        { key: "Ans2", text: "B" },
        { key: "Ans3", text: "C" },
        { key: "Ans4", text: "D" },
      ],
    },
    {
      id: "10",
      answer: [
        { key: "Ans1", text: "A" },
        { key: "Ans2", text: "B" },
        { key: "Ans3", text: "C" },
        { key: "Ans4", text: "D" },
      ],
    },
  ];

  const [checkedItems, setCheckedItems] = useState<{ [key: string]: string }>(
    {},
  );

  useEffect(() => {
    const newCheckedItems: { [key: string]: string } = {};
    Object.keys(userAnswers).forEach((id) => {
      const userAnswer = userAnswers[id];
      const correctAnswer = correctAnswers[id];
      if (userAnswer !== correctAnswer) {
        newCheckedItems[id] = correctAnswer;
        newCheckedItems[`${id}_incorrect`] = userAnswer;
      } else {
        newCheckedItems[id] = userAnswer;
      }
    });
    setCheckedItems(newCheckedItems);
  }, []);

  const getBorderColor = (id: string) => {
    if (!checkedItems[id]) return "black";
    return checkedItems[id] === userAnswers[id] ? "green" : "red";
  };

  return (
    <View >
      <View style={styles.containerCard}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.questionContainer,
                { borderColor: getBorderColor(item.id) },
              ]}
            >
              <Text>Câu hỏi: ---------------------</Text>
              {item.answer.map((ans) => (
                <View key={ans.key} style={styles.itemContainer}>
                  <Text>{ans.text}</Text>
                  {checkedItems[item.id] === ans.key
                    ? <Text style={styles.correctMark}>✓</Text>
                    : checkedItems[`${item.id}_incorrect`] === ans.key && (
                      <Text style={styles.incorrectMark}>X</Text>
                    )}
                </View>
              ))}
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerCard: {
    width: "90%",
    height: "auto",
    backgroundColor: "white",
    marginTop: 20,
    marginHorizontal: "auto",
    borderColor: "black",
    borderRadius: 11,
    padding: 10,
  },
  questionContainer: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    height: 30,
    borderRadius: 10,
  },
  correctMark: {
    color: "green",
    fontWeight: "bold",
    marginRight: 14,
  },
  incorrectMark: {
    color: "red",
    fontWeight: "bold",
    marginRight: 14,
  },
});

export default DetailWorksheet;
