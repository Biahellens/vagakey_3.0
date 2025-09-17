import React, { useCallback, useState, useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Platform } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = NativeStackScreenProps<RootStackParamList, "Map">;

/**
 * MapScreen - versão inicial pronta para substituir/criar
 * - Placeholder para MapView (substitua por react-native-maps ou provider de sua escolha)
 * - Lista de vagas mock com estado de carregamento e seleção
 * - Componentes acessíveis e memoizados para performance
 */

const PARKING_MOCK = [
  { id: "1", name: "Vaga Rua A - 1", distance: "120 m", price: "R$ 3,50/h" },
  { id: "2", name: "Vaga Rua B - 3", distance: "200 m", price: "R$ 2,80/h" },
  { id: "3", name: "Vaga Garagem Central", distance: "350 m", price: "R$ 4,00/h" },
];

function ParkingItem({ item, onSelect }: { item: any; onSelect: (id: string) => void }) {
  return (
    <TouchableOpacity
      accessible
      accessibilityRole="button"
      accessibilityLabel={`Selecionar ${item.name}`}
      onPress={() => onSelect(item.id)}
      style={styles.parkingCard}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.parkingTitle}>{item.name}</Text>
        <Text style={styles.parkingMeta}>{item.distance} • {item.price}</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={22} />
    </TouchableOpacity>
  );
}

export default function MapScreen({ navigation }: Props) {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const data = useMemo(() => PARKING_MOCK, []);

  const onSelect = useCallback((id: string) => {
    setSelected(id);
    // navegar para rota (Route) com param
    navigation.navigate("Route" as any, { parkingId: id });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mapa de Vagas</Text>

      <View style={styles.mapPlaceholder} accessible accessibilityLabel="Mapa de vagas pendente">
        {loading ? <ActivityIndicator size="large" /> : <Text>MAPA AQUI (substitua por MapView)</Text>}
      </View>

      <Text style={styles.listTitle}>Vagas próximas</Text>
      <FlatList
        data={data}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => <ParkingItem item={item} onSelect={onSelect} />}
        contentContainerStyle={{ paddingBottom: 24 }}
        ListEmptyComponent={<Text style={styles.empty}>Nenhuma vaga encontrada.</Text>}
      />

      <TouchableOpacity
        style={styles.fab}
        accessibilityRole="button"
        accessibilityLabel="Centralizar mapa"
        onPress={() => { /* implementar centralizar */ }}
      >
        <MaterialCommunityIcons name="crosshairs-gps" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? 24 : 42,
    backgroundColor: "#fff",
  },
  header: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  mapPlaceholder: {
    height: 240,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#cbd5e1",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  listTitle: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  parkingCard: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#f8fafc",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  parkingTitle: { fontSize: 14, fontWeight: "600" },
  parkingMeta: { fontSize: 12, color: "#64748b", marginTop: 4 },
  empty: { textAlign: "center", color: "#94a3b8", padding: 20 },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 24,
    backgroundColor: "#022743",
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
});