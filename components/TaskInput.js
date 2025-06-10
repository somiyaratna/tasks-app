import React from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import colors from "../utils/colors";

const TaskInput = ({ task, setTask, onAdd }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter a task"
        value={task}
        onChangeText={setTask}
      />
      <Button style={styles.button} title="Add" onPress={onAdd} />
    </View>
  );
};

export default TaskInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
});
