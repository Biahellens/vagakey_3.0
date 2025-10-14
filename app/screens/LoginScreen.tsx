import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ScrollView, Alert, Platform, Linking } from "react-native";
import * as AuthSession from 'expo-auth-session';
import { supabase } from '../supabaseClient';
import { RootStackParamList } from '@/types/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type LoginProps = NativeStackScreenProps<RootStackParamList, "Login">;

export function LoginScreen({ navigation }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigation.replace('Vehicle');
      }
    };
    checkSession();
  }, []);

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      Alert.alert('Erro', error.message);
    } else {
      navigation.replace('Vehicle');
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const redirectUrl = AuthSession.makeRedirectUri({
        scheme: 'vagakeyapp',
      });

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: redirectUrl },
      });

      if (error) {
        Alert.alert('Erro', error.message);
        return;
      }

      if (!data.url) {
        Alert.alert('Erro', 'Não foi possível obter a URL de login do Google');
        return;
      }

      Linking.openURL(data.url);
    } catch (err: any) {
      Alert.alert('Erro', err.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../assets/car_model_02.png')} style={styles.image} />
      <Text style={styles.text}>Estacione com o </Text>
      <Text style={styles.title}>VagaKey</Text>

      <View style={styles.socialButtons}>
        <TouchableOpacity style={[styles.socialButton]} onPress={handleLoginWithGoogle}>
          <Image
            source={{ uri: 'https://s3-alpha.figma.com/hub/file/2729744958/2a5758d6-4edb-4047-87bb-e6b94dbbbab0-cover.png' }}
            style={styles.logo}
          />
          <Text style={styles.socialButtonText}>Logar com Google</Text>
        </TouchableOpacity>
      </View>

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
  container: { flexGrow: 1, justifyContent: "flex-start", alignItems: "center", backgroundColor: "#fff", padding: 20, paddingTop: 20 },
  title: { fontSize: 32, marginTop: 5, fontWeight: "600", width: '100%', paddingLeft: 60 },
  text: { fontSize: 28, marginTop: 20, fontWeight: "400", width: '100%', paddingLeft: 60 },
  input: { width: "100%", height: 50, borderWidth: 1, borderColor: "#ccc", borderRadius: 10, paddingHorizontal: 10, marginTop: 12 },
  button: { width: "100%", height: 60, backgroundColor: "#022743", borderRadius: 20, justifyContent: "center", alignItems: "center", marginTop: 20 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "500" },
  linkText: { color: "#022743", marginTop: 15, fontSize: 16, textDecorationLine: "underline" },
  image: { width: 144, height: 220, marginBottom: 10 },
  logo: { width: 20, height: 20},
  socialButtons: { flexDirection: "row", justifyContent: "center", width: "100%", marginTop: 20 },
  socialButton: { backgroundColor: "#EEEEEE", flexDirection: 'row', alignItems: 'center', gap: 10, width: '50%', height: 50, marginHorizontal: 5, borderRadius: 10, justifyContent: "center" },
  socialButtonText: { fontSize: 14 }
});
