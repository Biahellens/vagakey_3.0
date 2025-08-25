import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

export default function MapScreenWeb() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Mapa (Versão Web)' }} />
      <Text style={styles.title}>Mapa Interativo Indisponível</Text>
      <Text style={styles.message}>
        A funcionalidade completa do mapa está disponível apenas nos aplicativos
        mobile (iOS e Android) devido a limitações da biblioteca.
      </Text>
      <Text style={styles.message}>
        Por favor, use o aplicativo NOAH no seu celular para ver as rotas seguras.
      </Text>
      {/* Opcional: Você pode adicionar um mapa estático ou um iframe do Google Maps aqui
          se quiser alguma visualização, mas a interatividade será limitada. */}
      {/* Exemplo de iframe (pode precisar de ajuste de CORS ou segurança): */}
      {/* <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15383.332353169722!2d-46.64332924999999!3d-23.5615694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59a35e4e2a1b%3A0x6b4a3a6b4a3a6b4a!2sS%C3%A3o%20Paulo%2C%20SP!5e0!3m2!1sen!2sbr!4v1701198466657!5m2!1sen!2sbr"
        width="100%"
        height="300"
        style={{ border: 0, marginTop: 20 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Mapa de São Paulo"
      ></iframe> */}
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