import React, { useState } from "react";
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type CreateAccountProps = NativeStackScreenProps<RootStackParamList, "CreateAccount">;

export function CreateAccountScreen({ navigation }: CreateAccountProps) {
  const [form, setForm] = useState({
    fullName: "",
    cpf: "",
    birthDate: "",
    licenseType: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <TextInput style={styles.input} placeholder="Nome Completo*" value={form.fullName} onChangeText={v => handleChange("fullName", v)} />
      <TextInput style={styles.input} placeholder="CPF*" value={form.cpf} onChangeText={v => handleChange("cpf", v)} />
      <TextInput style={styles.input} placeholder="Data de Nascimento*" value={form.birthDate} onChangeText={v => handleChange("birthDate", v)} />
      <TextInput style={styles.input} placeholder="Tipo de Habilitação*" value={form.licenseType} onChangeText={v => handleChange("licenseType", v)} />
      <TextInput style={styles.input} placeholder="E-mail*" value={form.email} onChangeText={v => handleChange("email", v)} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Senha*" value={form.password} onChangeText={v => handleChange("password", v)} secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirmação de Senha*" value={form.confirmPassword} onChangeText={v => handleChange("confirmPassword", v)} secureTextEntry />

      <TouchableOpacity style={styles.button} onPress={() => console.log("Confirmar Cadastro")}>
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.linkText}>Já possui conta? Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "flex-start", alignItems: "center", backgroundColor: "#fff", padding: 20, paddingTop: 40 },
  title: { fontSize: 24, marginTop: 20, fontWeight: "600" },
  input: { width: "100%", height: 50, borderWidth: 1, borderColor: "#ccc", borderRadius: 10, paddingHorizontal: 10, marginTop: 12 },
  button: { width: "100%", height: 60, backgroundColor: "#022743", borderRadius: 20, justifyContent: "center", alignItems: "center", marginTop: 20 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "500" },
  linkText: { color: "#022743", marginTop: 15, fontSize: 16, textDecorationLine: "underline" },
  image: { width: 412, height: 200, marginBottom: 20 },
  socialButtons: { flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: 20 },
  socialButton: { flex: 1, height: 50, marginHorizontal: 5, borderRadius: 10, backgroundColor: "#eee", justifyContent: "center", alignItems: "center" },
  socialButtonText: { fontSize: 14 }
});
