import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/Car.png')} style={styles.image} />
      <Text style={styles.title}><Image source={require('../assets/car_icone.png')} style={styles.logo} />VagaKey</Text>
      <Text style={styles.text}>Revolucionando a maneira de como você estaciona 💪</Text>
      <View style={styles.buttonContent}>
        <TouchableOpacity
          style={styles.buttonOutline}
          onPress={() => navigation.navigate("Vehicle")}
        >
          <Text style={styles.buttonOutlineText}>Vamos lá</Text>
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
  buttonOutline: { width: 184, height: 74, padding: 24, borderRadius: 20, alignItems: "center", marginTop: 20, backgroundColor: "#022743" },
  buttonOutlineText: { color: "#ffffff", fontSize: 20, fontWeight: "400" },
  buttonContent: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
