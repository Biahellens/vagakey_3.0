import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import Header from '@/components/Header';

export default function RouteScreenWeb() {
  return (
    <View style={styles.container}>
      <Header />

      <Stack.Screen options={{ title: 'Mapa (Versão Web)' }} />
      <Text style={styles.title}>Mapa Interativo Indisponível</Text>
      <Text style={styles.message}>
        A funcionalidade completa do mapa está disponível apenas nos aplicativos
        mobile (iOS e Android) devido a limitações da biblioteca.
      </Text>
      <Text style={styles.message}>
        Por favor, use o aplicativo NOAH no seu celular para ver as rotas seguras e alertas de alagamento.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F8FA',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 22,
  },
});