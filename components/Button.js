import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import colors from "../utils/colors";

const Button = ({ title, onPress }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={{ color: "#fff" }}>{title}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
  },
});
