import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import * as Notifications from "expo-notifications";
import TaskInput from "./components/TaskInput";
import TaskItem from "./components/TaskItem";
import colors from "./utils/colors";
import {
  cancelNotification,
  requestNotificationPermission,
  scheduleNotification,
} from "./utils/notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [priority, setPriority] = useState("medium");

  const handleAddTask = async () => {
    if (!task.trim()) return;

    const permissionGranted = await requestNotificationPermission();
    let notificationId = null;

    if (permissionGranted) {
      const notif = await scheduleNotification(task, Date.now().toString());
      notificationId = notif;
    }

    const newTask = {
      id: Date.now().toString(),
      title: task,
      completed: false,
      priority: "medium",
      notificationId,
    };

    setTasks((prev) => [...prev, newTask]);
    setTask("");
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          if (!t.completed && t.notificationId) {
            cancelNotification(t.notificationId);
          }
          return { ...t, completed: !t.completed };
        }
        return t;
      })
    );
  };

  const editTask = (id, newTitle) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: newTitle } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Tasks</Text>
      <TaskInput task={task} setTask={setTask} onAdd={handleAddTask} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={toggleTask}
            onEdit={editTask}
            onDelete={deleteTask}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.textPrimary,
  },
});
