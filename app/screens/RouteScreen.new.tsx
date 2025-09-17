import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Platform } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = NativeStackScreenProps<RootStackParamList, "Route">;

/**
 * RouteScreen - mostra rota até a vaga selecionada
 * - Recebe params: parkingId
 * - Placeholder para integração com APIs de rota (OSRM, Google Directions)
 */

export default function RouteScreen({ route, navigation }: Props) {
  const { parkingId } = route.params ?? {};
  const [loading, setLoading] = useState(true);
  const [eta, setEta] = useState<string | null>(null);

  useEffect(() => {
    // Simular chamada de cálculo de rota
    const t = setTimeout(() => {
      setEta("6 min (1.2 km)");
      setLoading(false);
    }, 700);
    return () => clearTimeout(t);
  }, [parkingId]);

  const onStart = useCallback(() => {
    // iniciar navegação externa (ex: abrir Google Maps)
    // navigation.navigate("ExternalNavigation", { parkingId });
  }, [parkingId]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Rota até a vaga</Text>
      <View style={styles.card}>
        <Text style={styles.title}>Vaga selecionada</Text>
        <Text style={styles.meta}>{parkingId ? `ID: ${parkingId}` : "Nenhuma vaga selecionada"}</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        <View style={styles.details}>
          <Text style={styles.eta}>Tempo estimado: {eta}</Text>
          <TouchableOpacity style={styles.startButton} onPress={onStart} accessibilityRole="button" accessibilityLabel="Iniciar navegação">
            <MaterialCommunityIcons name="navigation" size={18} color="#fff" />
            <Text style={styles.startText}>Iniciar navegação</Text>
          </TouchableOpacity>
        </View>
      )}
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
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
  },
  title: { fontSize: 14, fontWeight: "700" },
  meta: { fontSize: 13, color: "#475569", marginTop: 6 },
  details: { marginTop: 18 },
  eta: { fontSize: 16, fontWeight: "600", marginBottom: 12 },
  startButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#022743",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  startText: { color: "#fff", marginLeft: 8, fontWeight: "600" },
});