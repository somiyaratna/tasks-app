import React, { useEffect, useState } from "react";
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
import { saveTasksToStorage, loadTasksFromStorage } from "./utils/storage";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function App() {
  const [task, setTask] = useState({
    id: "",
    title: "",
    completed: false,
    priority: "medium",
    notificationId: null,
  });
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      const savedTasks = await loadTasksFromStorage();
      setTasks(savedTasks);
    };
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  // Add task
  const handleAddTask = async () => {
    if (!task.title.trim()) return;

    const permissionGranted = await requestNotificationPermission();

    const newId = Date.now().toString();
    let notificationId = null;

    if (permissionGranted) {
      notificationId = await scheduleNotification(task, newId);
    }

    const newTask = {
      ...task,
      id: newId,
      notificationId,
    };

    setTasks((prev) => [...prev, newTask]);
    setTask({
      id: "",
      title: "",
      completed: false,
      priority: "medium",
      notificationId: null,
    });
  };

  // Toggle task completion
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

  // Edit task
  const editTask = (id, title, priority) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title, priority } : t))
    );
  };

  // Delete task
  const deleteTask = (id) => {
    const taskToDelete = tasks.find((t) => t.id === id);
    if (taskToDelete?.notificationId) {
      cancelNotification(taskToDelete.notificationId);
    }

    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Tasks</Text>
      <TaskInput task={task} setTask={setTask} onAdd={handleAddTask} />
      <View style={styles.tasksContainer}>
        {tasks.length > 0 ? (
          <FlatList
            data={tasks}
            renderItem={({ item }) => (
              <TaskItem
                task={item}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onEdit={editTask}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <Text style={{ color: colors.textPrimary }}>
            Add a few tasks to get started!
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
    marginBottom: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.textPrimary,
  },
  tasksContainer: {
    flex: 1,
  },
});
