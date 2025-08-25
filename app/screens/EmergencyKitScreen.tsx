import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import CustomButton from '../components/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from '@/components/Header';

const { width } = Dimensions.get('window');

const kitItems = [
  { name: 'Água potável', icon: 'water' },
  { name: 'Kit primeiros socorros', icon: 'medical-bag' },
  { name: 'Lanterna', icon: 'flashlight' },
  { name: 'Alimentos não perecíveis', icon: 'food' },
  { name: 'Rádios', icon: 'radio' },
];

export default function EmergencyKitScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />

      <View style={styles.card}>
        <MaterialCommunityIcons name="medical-bag" size={80} color="#FFF" style={styles.mainIcon} />
        <Text style={styles.cardTitle}>Kit de emergência</Text>
        <View style={styles.itemList}>
          {kitItems.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <MaterialCommunityIcons name={item.icon as any} size={24} color="#D32F2F" style={styles.itemIcon} />
              <Text style={styles.itemText}>{item.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <CustomButton
        title="Ver plano de ação"
        onPress={() => alert('Plano de Ação (Ainda não implementado)')}
        buttonStyle={styles.actionButton}
        textStyle={styles.actionButtonText}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F8FA',
  },
  card: {
    backgroundColor: '#D32F2F',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    width: width * 0.9,
    maxWidth: 400,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 8,
  },
  mainIcon: {
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  itemList: {
    width: '100%',
    paddingHorizontal: 10,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  itemIcon: {
    marginRight: 15,
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 5,
  },
  itemText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: '500',
  },
  actionButton: {
    backgroundColor: '#1E90FF',
    marginTop: 30,
    width: width * 0.8,
    maxWidth: 350,
    paddingVertical: 15,
  },
  actionButtonText: {
    fontSize: 18,
  },
});