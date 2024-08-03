import {
  addDays,
  addWeeks,
  eachDayOfInterval,
  endOfWeek,
  format,
  isAfter,
  isToday,
  startOfWeek,
  subWeeks,
} from "date-fns";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const screenWidth = Dimensions.get("window").width;

const dayMapping: { [key: string]: string } = {
  Sun: "CN",
  Mon: "T2",
  Tue: "T3",
  Wed: "T4",
  Thu: "T5",
  Fri: "T6",
  Sat: "T7",
};

const monthMapping: { [key: string]: string } = {
  January: "Tháng 1",
  February: "Tháng 2",
  March: "Tháng 3",
  April: "Tháng 4",
  May: "Tháng 5",
  June: "Tháng 6",
  July: "Tháng 7",
  August: "Tháng 8",
  September: "Tháng 9",
  October: "Tháng 10",
  November: "Tháng 11",
  December: "Tháng 12",
};

const data = [
  {
    day: "25-7-2024",
    event: [
      {
        description: "Học toán X",
        student: "Nguyễn văn A",
        time: "17:30",
        color: "#686de0",
        attendence: true,
      },
      {
        description: "Học toán Y",
        student: "Nguyễn văn B",
        time: "18:30",
        color: "#ff7979",
        attendence: true,
      },
    ],
  },
  {
    day: "27-7-2024",
    event: [
      {
        description: "Học toán X",
        student: "Nguyễn văn A",
        time: "17:30",
        color: "#686de0",
        attendence: false,
      },
      {
        description: "Học toán Y",
        student: "Nguyễn văn B",
        time: "18:30",
        color: "#ff7979",
        attendence: false,
      },
    ],
  },
];

const getEventsForDay = (date: Date) => {
  const formattedDate = format(date, "d-M-yyyy");
  const dayData = data.find((item) => item.day === formattedDate);
  return dayData ? dayData.event : [];
};

const groupEventsByDay = (daysOfWeek: Date[]) => {
  const today = new Date();

  return daysOfWeek.map((day) => {
    const formattedDate = format(day, "d-M-yyyy");
    const events = getEventsForDay(day).filter((event) =>
      event.attendence || isToday(day) || isAfter(day, today)
    );

    return {
      date: formattedDate,
      hasEvents: events.length > 0,
      events: events,
    };
  });
};

const WeeklyCalendar: React.FC = () => {
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 }),
  );

  const currentWeekEnd = endOfWeek(currentWeekStart, { weekStartsOn: 1 });

  const daysOfWeek = eachDayOfInterval({
    start: currentWeekStart,
    end: currentWeekEnd,
  });

  const groupedEvents = groupEventsByDay(daysOfWeek);

  const goToPreviousWeek = () => {
    setCurrentWeekStart(
      startOfWeek(subWeeks(currentWeekStart, 1), { weekStartsOn: 1 }),
    );
  };

  const goToNextWeek = () => {
    setCurrentWeekStart(
      startOfWeek(addWeeks(currentWeekStart, 1), { weekStartsOn: 1 }),
    );
  };

  const formatWeekLabel = (startDate: Date, endDate: Date) => {
    const startMonth = format(startDate, "MMMM");
    const endMonth = format(endDate, "MMMM");
    const vietnameseStartMonth = monthMapping[startMonth] || startMonth;
    const vietnameseEndMonth = monthMapping[endMonth] || endMonth;
    return `${format(startDate, "d")} ${vietnameseStartMonth} - ${
      format(endDate, "d")
    } ${vietnameseEndMonth} ${format(endDate, "yyyy")}`;
  };

  const getVietnameseDay = (date: Date) => {
    const englishDay = format(date, "EEE");
    return dayMapping[englishDay] || englishDay;
  };

  const formatDateWithoutYear = (date: Date) => {
    const dayOfWeek = getVietnameseDay(date);
    const day = format(date, "d");
    const month = monthMapping[format(date, "MMMM")];
    return `${dayOfWeek}, ${day} ${month}`;
  };

  const ListHeader = () => (
    <View style={styles.headerFlatList}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={goToPreviousWeek} style={styles.navButton}>
          <Icon name="chevron-left" size={30} color="#007BFF" />
        </TouchableOpacity>
        <Text style={styles.weekLabel}>
          {formatWeekLabel(currentWeekStart, currentWeekEnd)}
        </Text>
        <TouchableOpacity onPress={goToNextWeek} style={styles.navButton}>
          <Icon name="chevron-right" size={30} color="#007BFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.calendarContainer}>
        <View style={styles.weekContainer}>
          {daysOfWeek.map((day) => {
            const formattedDate = format(day, "d-M-yyyy");
            const dayEvents = groupedEvents.find((event) =>
              event.date === formattedDate
            );
            const vietnameseDay = getVietnameseDay(day);
            return (
              <View key={day.toString()} style={styles.dayContainer}>
                <Text style={{ fontSize: 16, fontWeight: "600" }}>
                  {vietnameseDay}
                </Text>
                <Text style={{ fontSize: 14 }}>{day.getDate()}</Text>
                {dayEvents && dayEvents.hasEvents && (
                  <View style={styles.dot} />
                )}
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={groupedEvents.filter((item) => item.hasEvents)}
        ListHeaderComponent={ListHeader}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <View style={styles.eventContainer}>
            <Text style={styles.dateHeader}>
              {formatDateWithoutYear(
                new Date(item.date.split("-").reverse().join("-")),
              )}
            </Text>
            {item.events.map((event, index) => (
              <View key={index} style={styles.eventRow}>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.eventText}>{event.description}</Text>
                    <Text style={styles.eventText}>{event.time}</Text>
                  </View>

                  <Text style={[styles.eventText, { color: event.color }]}>
                    {event.student}
                  </Text>
                </View>
                <Text
                  style={[styles.eventText, {
                    color: event.attendence ? "green" : "red",
                  }]}
                >
                  {event.attendence ? "Có mặt" : "Vắng mặt"}
                </Text>
              </View>
            ))}
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    padding: 10,
    backgroundColor: "white", // Background color
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  navButton: {
    padding: 10,
  },
  weekLabel: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    color: "#333", // Darker text color
  },
  calendarContainer: {
    flexDirection: "row",
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    marginBottom: 5,
  },
  weekContainer: {
    flexDirection: "row",
    width: screenWidth,
    justifyContent: "space-around",
  },
  dayContainer: {
    alignItems: "center",
    paddingVertical: 10,
    width: screenWidth / 7, // Divide screen width by the number of days in a week
  },
  headerFlatList: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  eventContainer: {
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    padding: 15,
  },
  dateHeader: {
    fontSize: 20,
    fontWeight: "600",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    marginBottom: 10,
    color: "#333",
  },
  eventRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  eventText: {
    marginHorizontal: 10,

    fontSize: 16,
    color: "#555", // Lighter text color for events
  },
  dot: {
    width: 25,
    height: 3,
    borderRadius: 10,
    backgroundColor: "blue",
    marginTop: 5,
  },
});

export default WeeklyCalendar;
