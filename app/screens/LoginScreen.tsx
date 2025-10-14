import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { supabase } from '../supabaseClient';
import { RootStackParamList } from '@/types/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type LoginProps = NativeStackScreenProps<RootStackParamList, "Login">;

export function LoginScreen({ navigation }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      Alert.alert('Erro', error.message);
    } else {
      Alert.alert('Sucesso', 'Login realizado!');
      navigation.navigate('Vehicle');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/car_model_02.png')} style={styles.image} />
      <Text style={styles.text}>Estacione com o </Text>
      <Text style={styles.title}>VagaKey</Text>

      {/* Botões de login social */}
      {/*<View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialButtonText}>Logar com Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialButtonText}>Logar com Google</Text>
        </TouchableOpacity>
      </View>*/}

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
        <Text style={styles.linkText}>Criar uma conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "flex-start", alignItems: "center", backgroundColor: "#fff", padding: 20, paddingTop: 40 },
  title: { fontSize: 48, marginTop: 5, fontWeight: "600", width: '100%', paddingLeft: 60 },
  text: { fontSize: 32, marginTop: 20, fontWeight: "400", width: '100%', paddingLeft: 60 },
  input: { width: "100%", height: 50, borderWidth: 1, borderColor: "#ccc", borderRadius: 10, paddingHorizontal: 10, marginTop: 12 },
  button: { width: "100%", height: 60, backgroundColor: "#022743", borderRadius: 20, justifyContent: "center", alignItems: "center", marginTop: 20 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "500" },
  linkText: { color: "#022743", marginTop: 15, fontSize: 16, textDecorationLine: "underline" },
  image: { width: 184, height: 280, marginBottom: 20 },
  socialButtons: { flexDirection: "row", justifyContent: "space-between", width: "100%", marginTop: 20 },
  socialButton: { flex: 1, height: 50, marginHorizontal: 5, borderRadius: 10, backgroundColor: "#eee", justifyContent: "center", alignItems: "center" },
  socialButtonText: { fontSize: 14 }
});