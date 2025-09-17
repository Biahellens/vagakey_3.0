import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Platform } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = NativeStackScreenProps<RootStackParamList, "Vehicle">;

/**
 * VehicleScreen - lista de veículos do usuário
 * - Mock de veículos, botão para adicionar e editar
 * - Componentes acessíveis e pronto para conectar com backend
 */

const VEHICLES_MOCK = [
  { id: "v1", label: "HB20 - Placa ABC1D23", type: "car" },
  { id: "v2", label: "Honda CG - Placa XYZ9Z99", type: "motorcycle" },
];

function VehicleCard({ v, onEdit }: { v: any; onEdit: (id: string) => void }) {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{v.label}</Text>
        <Text style={styles.meta}>{v.type}</Text>
      </View>
      <TouchableOpacity accessibilityRole="button" accessibilityLabel={`Editar ${v.label}`} onPress={() => onEdit(v.id)}>
        <MaterialCommunityIcons name="pencil" size={20} />
      </TouchableOpacity>
    </View>
  );
}

export default function VehicleScreen({ navigation }: Props) {
  const [vehicles, setVehicles] = useState(VEHICLES_MOCK);

  const onAdd = useCallback(() => {
    // placeholder - abrir modal ou tela de cadastro
    navigation.navigate("VehicleAdd" as any);
  }, [navigation]);

  const onEdit = useCallback((id: string) => {
    navigation.navigate("VehicleEdit" as any, { vehicleId: id });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meus veículos</Text>
      <FlatList
        data={vehicles}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => <VehicleCard v={item} onEdit={onEdit} />}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum veículo cadastrado.</Text>}
      />

      <TouchableOpacity style={styles.addButton} onPress={onAdd} accessibilityRole="button" accessibilityLabel="Adicionar veículo">
        <MaterialCommunityIcons name="plus" size={20} color="#fff" />
        <Text style={styles.addText}>Adicionar veículo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? 24 : 42,
  },
  header: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  card: {
    padding: 14,
    backgroundColor: "#f8fafc",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  title: { fontSize: 14, fontWeight: "600" },
  meta: { fontSize: 12, color: "#64748b", marginTop: 4 },
  empty: { textAlign: "center", color: "#94a3b8", padding: 20 },
  addButton: {
    position: "absolute",
    right: 16,
    bottom: 24,
    backgroundColor: "#022743",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  addText: { color: "#fff", marginLeft: 8, fontWeight: "600" },
});