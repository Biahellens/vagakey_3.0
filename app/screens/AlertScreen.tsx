
import Header from '@/components/Header';
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const alerts = [
  { id: '1', title: 'Enchente em andamento', description: 'Evacue a área da Vila Central imediatamente.' },
  { id: '2', title: 'Risco de deslizamento', description: 'Atenção às áreas de encosta no bairro Verde Luz.' }
];

export default function AlertScreen() {
  return (
    <View style={styles.container}>
      <Header />

      <Text style={styles.header}>Alertas Atuais</Text>
      <FlatList
        data={alerts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.alertCard}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F8FA',
  },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, marginTop: 20 },
  alertCard: { padding: 15, backgroundColor: '#ffdddd', marginBottom: 10, borderRadius: 8 },
  title: { fontSize: 18, fontWeight: 'bold' },
  description: { fontSize: 14 }
});
