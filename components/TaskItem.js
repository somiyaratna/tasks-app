import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Button from "./Button";
import DropDownPicker from "react-native-dropdown-picker";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import colors from "../utils/colors";

const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedPriority, setEditedPriority] = useState(task.priority);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
  ]);

  const handleSave = () => {
    if (editedTitle.trim() === "") return;
    onEdit(task.id, editedTitle, editedPriority);
    setIsEditing(false);
  };

  return (
    <View style={styles.task}>
      {isEditing ? (
        <View style={styles.row}>
          <TextInput
            style={[styles.input]}
            value={editedTitle}
            onChangeText={setEditedTitle}
            autoFocus
          />

          <DropDownPicker
            open={open}
            value={editedPriority}
            items={items}
            setOpen={setOpen}
            setValue={setEditedPriority}
            setItems={setItems}
            containerStyle={styles.dropDownContainer}
            dropDownContainerStyle={styles.dropDownList}
            style={styles.dropDownPicker}
            textStyle={{
              fontSize: 14,
              color: colors.textSecondary,
              textTransform: "capitalize",
            }}
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

          <View style={styles.textContainer}>
            <Text style={[styles.text, task.completed && styles.completed]}>
              {task.title}
            </Text>
            {!task.completed && (
              <Text
                style={[
                  styles.priorityLabel,
                  {
                    color: colors.priority[task.priority],
                  },
                ]}
              >
                {task.priority}
              </Text>
            )}
          </View>

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
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    color: colors.textPrimary,
    fontWeight: "bold",
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
    marginHorizontal: 4,
    flex: 1,
  },
  priorityLabel: {
    fontSize: 14,
    marginTop: 2,
    textTransform: "capitalize",
  },
  dropDownContainer: {
    marginHorizontal: 4,
    width: "30%",
  },
  dropDownList: {
    width: "100%",
    borderColor: colors.border,
  },
  dropDownPicker: {
    borderColor: colors.border,
    flex: 1,
    zIndex: 100,
  },
});
