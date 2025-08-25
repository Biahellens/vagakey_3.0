import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, motorista 👋</Text>
      <Text style={styles.subtitle}>O que deseja fazer?</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Vehicle")}
      >
        <Text style={styles.buttonText}>🚘 Selecionar Veículo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonOutline}
        onPress={() => navigation.navigate("Map")}
      >
        <Text style={styles.buttonOutlineText}>📍 Criar Reserva</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "#666", marginBottom: 40 },
  button: { backgroundColor: "#007bff", padding: 15, borderRadius: 10, width: "100%", alignItems: "center", marginBottom: 15 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  buttonOutline: { borderWidth: 2, borderColor: "#007bff", padding: 15, borderRadius: 10, width: "100%", alignItems: "center" },
  buttonOutlineText: { color: "#007bff", fontSize: 16, fontWeight: "bold" },
});
