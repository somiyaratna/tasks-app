import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import colors from "../utils/colors";

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleSave = () => {
    if (editedTitle.trim() === "") return;
    onEdit(task.id, editedTitle);
    setIsEditing(false);
  };

  return (
    <View style={styles.task}>
      {isEditing ? (
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            value={editedTitle}
            onChangeText={setEditedTitle}
            autoFocus
          />
          <TouchableOpacity onPress={handleSave}>
            <Feather name="check" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.row}>
          <TouchableOpacity onPress={() => onToggle(task.id)}>
            <Feather
              name={task.completed ? "check-circle" : "circle"}
              size={24}
              color={task.completed ? colors.primary : colors.textSecondary}
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>

          <Text style={[styles.text, task.completed && styles.completed]}>
            {task.title}
          </Text>

          {!task.completed && (
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => setIsEditing(true)}>
                <Feather name="edit-2" size={20} color={colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onDelete(task.id)}
                style={{ marginLeft: 10 }}
              >
                <MaterialIcons name="delete" size={24} color={colors.error} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  task: {
    padding: 12,
    backgroundColor: colors.taskBackground,
    borderBottomWidth: 1,
    borderColor: colors.border,
    marginBottom: 10,
    borderRadius: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
  },
  completed: {
    textDecorationLine: "line-through",
    color: colors.completedText,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: colors.primary,
    color: colors.textPrimary,
    minWidth: "90%",
  },
});
