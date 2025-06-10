import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import colors from "../utils/colors";
import Button from "./Button";

const TaskInput = ({ task, setTask, onAdd }) => {
  const [open, setOpen] = useState(false);
  const [priorityValue, setPriorityValue] = useState(task.priority || "medium");
  const [items, setItems] = useState([
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
  ]);

  useEffect(() => {
    setTask((prev) => ({ ...prev, priority: priorityValue }));
  }, [priorityValue]);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter task title"
        value={task.title}
        onChangeText={(text) => setTask({ ...task, title: text })}
      />
      <DropDownPicker
        open={open}
        value={task.priority}
        items={items}
        setOpen={setOpen}
        setValue={(callback) =>
          setTask((prev) => ({
            ...prev,
            priority: callback(prev.priority),
          }))
        }
        setItems={setItems}
        style={styles.dropdown}
        containerStyle={styles.dropDownContainer}
        dropDownContainerStyle={styles.dropDownList}
        textStyle={styles.dropdownText}
        placeholder="Select Priority"
        placeholderStyle={styles.placeholderText}
        listItemContainerStyle={styles.listItemContainer}
      />
      <Button title="Add Task" onPress={onAdd} />
    </View>
  );
};

export default TaskInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    zIndex: 10,
    height: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.textSecondary,
    padding: 10,
    marginHorizontal: 4,
    borderRadius: 5,
    height: "100%",
    flex: 1,
  },
  dropDownContainer: {
    marginHorizontal: 4,
    width: "25%",
  },
  dropDownList: {
    width: "100%",
  },
  dropdown: {
    borderColor: colors.textSecondary,
    borderRadius: 5,
  },

  dropdownText: {
    fontSize: 13,
    color: colors.textSecondary,
    textTransform: "capitalize",
  },
  placeholderText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  listItemContainer: {
    height: 30,
    justifyContent: "center",
  },
});
