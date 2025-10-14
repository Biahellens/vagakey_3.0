import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import { RootStackParamList } from '@/types/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, "VehicleRegistration">;

export default function VehicleRegistrationScreen({ navigation }: Props) {
  const [tipoVeiculo, setTipoVeiculo] = useState('');
  const [placa, setPlaca] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [cor, setCor] = useState('');
  const [imagem, setImagem] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  };

  const handleConfirm = () => {
    const vehicleData = {
      tipoVeiculo,
      placa,
      marca,
      modelo,
      ano,
      cor,
      imagem,
    };
    alert('Veículo cadastrado com sucesso!');

    navigation.replace('Menu');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro de Veículo</Text>

      <Text style={styles.label}>Tipo de Veículo*</Text>
      <RNPickerSelect
        onValueChange={setTipoVeiculo}
        placeholder={{ label: 'Selecione o tipo', value: '' }}
        items={[
          { label: 'Carro', value: 'carro' },
          { label: 'Moto', value: 'moto' },
          { label: 'Caminhão', value: 'caminhao' },
        ]}
        style={pickerSelectStyles}
        value={tipoVeiculo}
      />

      <Text style={styles.label}>Placa*</Text>
      <TextInput
        style={styles.input}
        value={placa}
        onChangeText={setPlaca}
        placeholder="Digite a placa"
      />

      <Text style={styles.label}>Marca*</Text>
      <RNPickerSelect
        onValueChange={setMarca}
        placeholder={{ label: 'Selecione a marca', value: '' }}
        items={[
          { label: 'Toyota', value: 'toyota' },
          { label: 'Honda', value: 'honda' },
          { label: 'Ford', value: 'ford' },
        ]}
        style={pickerSelectStyles}
        value={marca}
      />

      <Text style={styles.label}>Modelo*</Text>
      <TextInput
        style={styles.input}
        value={modelo}
        onChangeText={setModelo}
        placeholder="Digite o modelo"
      />

      <Text style={styles.label}>Ano*</Text>
      <TextInput
        style={styles.input}
        value={ano}
        onChangeText={setAno}
        placeholder="Digite o ano"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Cor*</Text>
      <TextInput
        style={styles.input}
        value={cor}
        onChangeText={setCor}
        placeholder="Digite a cor"
      />

      <Text style={styles.label}>Imagem</Text>
      <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
        {imagem ? (
          <Image source={{ uri: imagem }} style={styles.uploadedImage} />
        ) : (
          <Text>Carregar imagem (Formato .jpeg .png)</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 10,
    backgroundColor: '#fff',
    alignItems: 'stretch',
  },
  title: {
    fontSize: 24, fontWeight: "600", textAlign: 'center', marginBottom: 20
  },
  label: {
    fontWeight: '400',
    marginTop: 10,
    color: '#1A1F71'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: "#EEEEEE",
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 10
  },
  imageUpload: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: "#EEEEEE",
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    backgroundColor: "#EEEEEE",
  },
  button: { width: "100%", height: 60, backgroundColor: "#022743", borderRadius: 20, justifyContent: "center", alignItems: "center", marginTop: 20 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "500" },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginTop: 5,
    color: 'black',
    marginBottom: 10,
    backgroundColor: "#EEEEEE",
  },
  inputAndroid: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginTop: 5,
    color: 'black',
    marginBottom: 10,
    backgroundColor: "#EEEEEE",
  },
});
