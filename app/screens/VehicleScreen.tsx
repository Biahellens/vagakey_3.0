import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground } from "react-native";
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

  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Olá Visitante</Text>
      <Text style={styles.title}>
        Estacione de forma <Text style={{ fontWeight: "bold" }}>RÁPIDA</Text> e{" "}
        <Text style={{ fontWeight: "bold" }}>FÁCIL</Text>
      </Text>

      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={[
            styles.buttonOutline,
            selectedVehicle === "carro" && styles.selectedCard,
          ]}
          onPress={() => setSelectedVehicle("carro")}
        >
          {selectedVehicle === "carro" ? (<Image source={require("../assets/car_icone_white.png")} style={styles.image} />
          ) : (<Image source={require("../assets/car_icone.png")} style={styles.image} />
          )}          <Text style={[styles.buttonOutlineText, selectedVehicle === "carro" && styles.selectedText,
          ]}>Carro</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.buttonOutline,
            selectedVehicle === "moto" && styles.selectedCard,
          ]}
          onPress={() => setSelectedVehicle("moto")}
        >
          {selectedVehicle === "moto" ? (<Image source={require("../assets/moto_icone_white.png")} style={styles.image} />
          ) : (<Image source={require("../assets/moto_icone.png")} style={styles.image} />
          )}          <Text style={[styles.buttonOutlineText, selectedVehicle === "moto" && styles.selectedText,
          ]}>Moto</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.buttonOutline,
            selectedVehicle === "bike" && styles.selectedCard,
          ]}
          onPress={() => setSelectedVehicle("bike")}
        >
          <Image source={require("../assets/bicicleta_icone.png")} style={styles.image} />
          <Text style={[styles.buttonOutlineText, selectedVehicle === "bike" && styles.selectedText,
          ]}>Bicicleta</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.carSelected}>
        <ImageBackground
          source={require("../assets/car_selected.png")}
          style={styles.carImage}
          imageStyle={{ borderRadius: 12 }} // se quiser arredondar a imagem
        >
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("RouteVehicle")}
          >
            <Text style={styles.buttonText}>Selecionar</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20, paddingTop: 40 },
  title: { fontSize: 26, fontWeight: "400", marginBottom: 20 },
  text1: { fontSize: 16, fontWeight: "200" },

  cardContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  buttonOutline: {
    width: 110,
    height: 130,
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#D9D9D9",
  },

  selectedCard: {
    backgroundColor: "#03385c",
  },
  selectedText: {
    color: "#ffffff",
  },

  buttonOutlineText: { color: "#5D5A6D", fontSize: 18, fontWeight: "400" },

  image: { width: 50, height: 50 },

  carSelected: {
    position: "relative", // garante que o botão fique relativo à imagem
    alignItems: "center",
    width: "100%",
    height: 200,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 80,
  },
  carImage: {
    width: 214,
    height: 344,
    //resizeMode: "contain",
  },
  button: {
    position: "absolute",
    bottom: 10,
    left: 45,
    backgroundColor: "#03385c",
    width: 120,
    height: 120,
    borderRadius: 100,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
