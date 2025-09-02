import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

type Props = {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  value?: string;
};

export default function SearchInput({ placeholder = "Buscar...", onChangeText, value }: Props) {
  const [text, setText] = useState(value || "");

  const handleChange = (input: string) => {
    setText(input);
    if (onChangeText) onChangeText(input);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        value={text}
        onChangeText={handleChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 10,
  },
  input: {
    height: 45,
    borderColor: "#DDD",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
});
