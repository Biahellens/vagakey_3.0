import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Vehicle">;

type Vehicle = {
  id: string;
  plate: string;
  model: string;
};

export default function VehicleScreen({ navigation }: Props) {
  const [plate, setPlate] = useState("");
  const [model, setModel] = useState("");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const addVehicle = () => {
    if (!plate || !model) {
      alert("Preencha todos os campos!");
      return;
    }

    const newVehicle: Vehicle = {
      id: Date.now().toString(),
      plate,
      model,
    };

    setVehicles((prev) => [...prev, newVehicle]);
    setPlate("");
    setModel("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Veículos</Text>

      <TextInput
        style={styles.input}
        placeholder="Placa (ex: ABC-1234)"
        value={plate}
        onChangeText={setPlate}
      />

      <TextInput
        style={styles.input}
        placeholder="Modelo (ex: Corolla, Civic)"
        value={model}
        onChangeText={setModel}
      />

      <TouchableOpacity style={styles.button} onPress={addVehicle}>
        <Text style={styles.buttonText}>Adicionar Veículo</Text>
      </TouchableOpacity>

      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.vehicleCard}>
            <Text style={styles.vehicleText}>{item.model} - {item.plate}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={{ marginTop: 20 }}>Nenhum veículo cadastrado.</Text>}
      />

      <TouchableOpacity
        style={styles.buttonOutline}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonOutlineText}>⬅ Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20, paddingTop: 120 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { height: 50, borderColor: "#ccc", borderWidth: 1, borderRadius: 10, paddingHorizontal: 15, marginBottom: 10 },
  button: { backgroundColor: "#28a745", padding: 15, borderRadius: 10, alignItems: "center", marginBottom: 20 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  vehicleCard: { backgroundColor: "#f8f9fa", padding: 15, borderRadius: 8, marginBottom: 10 },
  vehicleText: { fontSize: 16 },
  buttonOutline: { borderWidth: 2, borderColor: "#007bff", padding: 15, borderRadius: 10, alignItems: "center", marginTop: 20 },
  buttonOutlineText: { color: "#007bff", fontSize: 16, fontWeight: "bold" },
});
