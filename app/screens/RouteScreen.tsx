import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import SearchInput from "@/components/SearchInput";

type Props = NativeStackScreenProps<RootStackParamList, "RouteVehicle">;

type Vehicle = {
  id: string;
  plate: string;
  model: string;
};

const { width, height } = Dimensions.get("window");

const initialRegion = {
  latitude: -23.55052,
  longitude: -46.633308,
  latitudeDelta: 0.03,
  longitudeDelta: 0.03,
};

const floodedAreaCoordinates = [
  { latitude: -23.548, longitude: -46.635 },
  { latitude: -23.552, longitude: -46.639 },
  { latitude: -23.555, longitude: -46.634 },
  { latitude: -23.550, longitude: -46.630 },
];

const safeRoutePath = [
  { latitude: -23.55052, longitude: -46.633308 },
  { latitude: -23.545, longitude: -46.630 },
  { latitude: -23.540, longitude: -46.628 },
  { latitude: -23.538, longitude: -46.625 },
];

export default function RouteScreen({ navigation }: Props) {
  const [plate, setPlate] = useState("");
  const [model, setModel] = useState("");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

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

  // 👇 Importa dinamicamente o mapa apenas se não for web
  let MapView, Marker, Polyline, Polygon;
  if (Platform.OS !== "web") {
    const Maps = require("react-native-maps");
    MapView = Maps.default;
    Marker = Maps.Marker;
    Polyline = Maps.Polyline;
    Polygon = Maps.Polygon;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mapa de Estacionamentos</Text>
      <SearchInput />

      <View style={styles.cardContainer}>
        {Platform.OS !== "web" && MapView ? (
          <MapView
            style={styles.map}
            initialRegion={initialRegion}
            showsUserLocation={true}
          >
            <Marker
              coordinate={initialRegion}
              title="Sua Localização"
              pinColor="blue"
            />
            <Marker
              coordinate={safeRoutePath[safeRoutePath.length - 1]}
              title="Destino Seguro"
              pinColor="green"
            />
            <Polygon
              coordinates={floodedAreaCoordinates}
              fillColor="rgba(255, 99, 71, 0.5)"
              strokeColor="rgba(255, 99, 71, 0.8)"
              strokeWidth={2}
            />
            <Polyline
              coordinates={safeRoutePath}
              strokeColor="#28a745"
              strokeWidth={5}
              geodesic={true}
            />
          </MapView>
        ) : (
          <View
            style={[
              styles.map,
              { alignItems: "center", justifyContent: "center" },
            ]}
          >
            <Text>Mapa não disponível na Web</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20, paddingTop: 40 },
  title: {
    fontSize: 24,
    fontWeight: "400",
    marginBottom: 20,
    textAlign: "center",
  },
  cardContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  map: {
    width: width * 0.9,
    height: height * 0.6,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#DDD",
  },
});
