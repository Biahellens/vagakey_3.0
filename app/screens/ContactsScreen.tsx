import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Dimensions, Linking, Alert } from 'react-native';
import CustomButton from '../components/Button';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import Header from '@/components/Header';

const { width } = Dimensions.get('window');

const emergencyContacts = [
  { name: 'Fulano', phone: '+5511987654321' },
  { name: 'Cicrano', phone: '+5511987654321' },
  { name: 'Beltrano', phone: '+5511987654321' },
];

const emergencyServices = [
  { label: 'Ligar 193', icon: 'fire-truck', phone: '193', color: '#D32F2F', iconLib: 'MaterialCommunityIcons' },
  { label: 'Ligar 192', icon: 'ambulance', phone: '192', color: '#FFC107', iconLib: 'FontAwesome5' },
  { label: 'Ligar 190', icon: 'police-car', phone: '190', color: '#1976D2', iconLib: 'MaterialCommunityIcons' },
  { label: 'Ligar 199', icon: 'lifebuoy', phone: '199', color: '#4CAF50', iconLib: 'MaterialCommunityIcons' },
];

export default function ContactsScreen() {
  const [messageText, setMessageText] = React.useState(
    'Olá <contato>, com o risco de alagamento na minha área, estou indo para a <localização>.'
  );

  const handleCall = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`).catch(err => {
      Alert.alert('Erro ao ligar', 'Não foi possível fazer a chamada. Verifique o número ou permissões.');
      console.error('Failed to open dialer:', err);
    });
  };

  const handleSendMessage = () => {
    Alert.alert('Mensagem Enviada', `Mensagem: "${messageText}"\n(Funcionalidade de envio para contatos precisa ser implementada.)`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Contatos de emergência</Text>
        {emergencyContacts.map((contact, index) => (
          <View key={index} style={styles.contactRow}>
            <View>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactPhone}>{contact.phone}</Text>
            </View>
            <TouchableOpacity onPress={() => handleCall(contact.phone)} style={styles.callIcon}>
              <MaterialCommunityIcons name="phone" size={24} color="#1E90FF" />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity onPress={() => alert('Adicionar contato (Ainda não implementado)')} style={styles.addContactButton}>
          <Text style={styles.addContactText}>+ Adicionar mais contatos</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Enviar Mensagem Rápida</Text>
        <TextInput
          style={styles.messageInput}
          multiline
          numberOfLines={4}
          value={messageText}
          onChangeText={setMessageText}
          placeholder="Digite sua mensagem de alerta..."
        />
        <CustomButton
          title="Enviar mensagem"
          onPress={handleSendMessage}
          buttonStyle={styles.sendMessageButton}
          textStyle={styles.sendMessageButtonText}
        />
      </View>

      <View style={styles.emergencyCallButtonsContainer}>
        {emergencyServices.map((service, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.emergencyCallButton, { backgroundColor: service.color }]}
            onPress={() => handleCall(service.phone)}
          >
            {service.iconLib === 'FontAwesome5' ? (
              <FontAwesome5 name={service.icon as any} size={30} color="#FFF" />
            ) : (
              <MaterialCommunityIcons name={service.icon as any} size={30} color="#FFF" />
            )}
            <Text style={styles.emergencyCallButtonText}>{service.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    width: width * 0.9,
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 20
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 10,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  contactPhone: {
    fontSize: 14,
    color: '#666',
  },
  callIcon: {
    padding: 5,
  },
  addContactButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  addContactText: {
    color: '#1E90FF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  messageInput: {
    height: 100,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 15,
    color: '#333',
  },
  sendMessageButton: {
    backgroundColor: '#D32F2F',
    paddingVertical: 12,
  },
  sendMessageButtonText: {
    fontSize: 16,
  },
  emergencyCallButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: width * 0.9,
    maxWidth: 400,
    marginTop: 10,
    gap: 10,
  },
  emergencyCallButton: {
    width: (width * 0.9 - 30) / 2,
    maxWidth: 190,
    aspectRatio: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  emergencyCallButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
});