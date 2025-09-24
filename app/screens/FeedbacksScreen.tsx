import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";


type Props1 = NativeStackScreenProps<RootStackParamList, "CreateAccountError">;

export function CreateAccountErrorScreen({ navigation }: Props1) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/Car.png')} style={styles.image} />
      <Text style={styles.title}>Opss, algo deu errado</Text>
      <Text style={styles.text}>Volte e <Text style={[styles.text, { fontWeight: "600" }]}>revise</Text> corretamente seus dados</Text>
      <View style={styles.buttonContent}>
        <TouchableOpacity
          style={[styles.buttonOutline, { backgroundColor: "#9C3025" }]}
          onPress={() => navigation.navigate("CreateAccount")}
        >
          <Text style={[styles.buttonOutlineText]}>
            Vou revisar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

type Props2 = NativeStackScreenProps<RootStackParamList, "AllRight">;

export function AllRightScreen({ navigation }: Props2) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/Car.png')} style={styles.image} />
      <Text style={styles.title}>Tudo certo!</Text>
      <Text style={styles.text}>Você já pode utilizar os serviços do <Text style={[styles.text, { fontWeight: "600" }]}>VagaKey</Text></Text>
      <View style={styles.buttonContent}>
        <TouchableOpacity
          style={[styles.buttonOutline, { backgroundColor: "#1B575B" }]}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={[styles.buttonOutlineText]}>
            Vamos lá
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "flex-start", alignItems: "flex-start", backgroundColor: "#fff", padding: 20, paddingTop: 40 },
  title: { fontSize: 24, marginTop: 80, fontWeight: "400" },
  text: { fontSize: 33, marginTop: 20, fontWeight: "400" },
  image: {
    width: 412,
    height: 200,
    left: -80
  },
  logo: {
    width: 36,
    height: 36,
    top: 6,
    marginRight: 10
  },
  buttonOutline: { width: 184, height: 74, padding: 24, borderRadius: 20, alignItems: "center", marginTop: 20 },
  buttonOutlineText: { color: "#ffffff", fontSize: 20, fontWeight: "400" },
  buttonContent: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
