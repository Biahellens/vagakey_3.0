import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = NativeStackScreenProps<RootStackParamList, "Menu">;

export default function MenuScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Muito obrigada por utilizar o <Text style={styles.title}>VagaKey</Text></Text>

      <Image source={require('../assets/Car.png')} style={styles.image} />

      <View style={styles.buttonContent}>
        <TouchableOpacity
          style={[styles.buttonOutline, { backgroundColor: "#022743", marginTop: 20 }]}
          onPress={() => navigation.navigate("Vehicle")}
        >
          <Text style={styles.buttonOutlineText}>Nova reserva</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContent}>
        <TouchableOpacity
          style={[styles.buttonOutline, { backgroundColor: "#6691FE", marginTop: -40 }]}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonOutlineText}>Falar com Viky</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "flex-start", alignItems: "flex-start", backgroundColor: "#fff", padding: 20, paddingTop: 40 },
  title: { fontSize: 24, marginTop: 80, fontWeight: "600" },
  text: { fontSize: 33, marginTop: 20, fontWeight: "400" },
  image: {
    width: 316,
    height: 158,
    left: -80,
    margin: 60
  },
  logo: {
    width: 36,
    height: 36,
    top: 6,
    marginRight: 10
  },
  buttonOutline: { width: 184, height: 74, padding: 24, borderRadius: 20, alignItems: "center", },
  buttonOutlineText: { color: "#ffffff", fontSize: 20, fontWeight: "400" },
  buttonContent: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
