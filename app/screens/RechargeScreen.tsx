import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
} from "react-native";
import { Image } from "react-native";

export default function RechargeScreen() {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [balance] = useState(60.0);

  const values = [10, 20, 50, 100];

  const handleRecharge = () => {
    if (!selectedValue) {
      Alert.alert("Selecione um valor para recarregar");
      return;
    }
    Alert.alert(
      "Recarga realizada!",
      `Você adicionou R$ ${selectedValue.toFixed(2)}`
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Recarga VKeys</Text>

      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Saldo Atual</Text>
        <Text style={styles.balanceValue}>R$ {balance.toFixed(2)}</Text>
      </View>

      <View style={styles.valuesContainer}>
        <Text style={styles.valuesLabel}>Valores para Recarga:</Text>
        <View style={styles.valuesGrid}>
          {values.map((value) => (
            <TouchableOpacity
              key={value}
              style={[
                styles.valueButton,
                selectedValue === value && styles.valueButtonSelected,
              ]}
              onPress={() => setSelectedValue(value)}
            >
              <Text
                style={[
                  styles.valueButtonText,
                  selectedValue === value && styles.valueButtonTextSelected,
                ]}
              >
                R$ {value.toFixed(2)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Card info */}
      <View style={styles.cardBox}>
        <View style={styles.cardRow}>
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png",
            }}
            style={styles.cardLogo}
          />
          <View style={styles.cardInfo}>
            <Text style={styles.cardBrand}>Crédito / Débito</Text>
            <Text style={styles.cardNumber}>3056 **** **** 5904</Text>
            <Text style={styles.cardHolder}>Paulo Alex • 06/26</Text>
          </View>
        </View>
        <Text style={styles.secureText}>
          🔒 Ambiente seguro. Pagamento com tecnologia PCI DSS.
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRecharge}>
        <Text style={styles.buttonText}>Concluir Recarga</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 20,
  },
  title: { fontSize: 24, fontWeight: "600" },

  balanceContainer: {
    alignItems: "center",
    marginBottom: 24,
    marginTop: 20,
    width: "100%",
  },
  balanceLabel: { fontSize: 16, color: "#1A1F71" },
  balanceValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0054B0",
    paddingBottom: 20,
    paddingTop: 20,
    width: "100%",
    backgroundColor: "#EEEEEE",
    textAlign: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  valuesContainer: { marginBottom: 24 },
  valuesLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: "#1A1F71",
    fontWeight: "600",
  },
  valuesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  valueButton: {
    width: "47%",
    height: 50,
    paddingVertical: 12,
    backgroundColor: "#AAD2FF",
    borderRadius: 10,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  valueButtonSelected: { backgroundColor: "#1A1F71" },
  valueButtonText: { fontSize: 16, fontWeight: "800", color: "#0054B0" },
  valueButtonTextSelected: { color: "#fff" },
  cardBox: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 24,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardLogo: {
    width: 50,
    height: 40,
    resizeMode: "contain",
    marginRight: 16,
  },
  cardInfo: {
    flex: 1,
  },
  cardBrand: {
    fontSize: 14,
    color: "#333",
  },
  cardNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  cardHolder: {
    fontSize: 13,
    color: "#555",
  },
  secureText: {
    marginTop: 10,
    marginBottom: 15,
    fontSize: 12,
    color: "#888",
    textAlign: "center",
  },
  button: { width: "100%", height: 60, backgroundColor: "#022743", borderRadius: 20, justifyContent: "center", alignItems: "center", marginTop: 20 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "500" },
});
