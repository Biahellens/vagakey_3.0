// PaymentSetupScreen.tsx
import React, { useState } from 'react';
import { View, Text, Alert, TextInput, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import {
  CardField,
  useConfirmSetupIntent,
  CardFieldInput,
} from '@stripe/stripe-react-native';
import { RootStackParamList } from '@/types/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, "PaymentSetup">;

type CreateSetupIntentResponse = {
  client_secret: string;
  customerId?: string;
};

export default function PaymentSetupScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [cardDetails, setCardDetails] = useState<CardFieldInput.Details | null>(null);
  const [loading, setLoading] = useState(false);
  const { confirmSetupIntent } = useConfirmSetupIntent();

  async function createSetupIntentOnServer(): Promise<CreateSetupIntentResponse> {
    // substitua pela URL do seu backend
    const res = await fetch('https://seu-backend.com/create-setup-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ /* opcional: customerId */ }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Erro do servidor: ${res.status} ${text}`);
    }

    const json = (await res.json()) as CreateSetupIntentResponse;
    if (!json.client_secret) throw new Error('Resposta inválida do servidor: client_secret ausente');
    return json;
  }

  async function onSaveCard() {
    if (!cardDetails?.complete) {
      Alert.alert('Erro', 'Preencha os dados do cartão corretamente');
      return;
    }
    setLoading(true);
    try {
      const { client_secret: clientSecret } = await createSetupIntentOnServer();

      const { setupIntent, error } = await confirmSetupIntent(clientSecret, {
        paymentMethodType: 'Card',
        paymentMethodData: {
          billingDetails: {
            name: name || undefined,
          },
        },
      });

      if (error) {
        console.error('confirmSetupIntent error', error);
        Alert.alert('Erro ao salvar cartão', error.message ?? 'Erro desconhecido');
        setLoading(false);
        return;
      }

      // sucesso
      const paymentMethodId = setupIntent?.paymentMethod;
      console.log('SetupIntent status:', setupIntent?.status);
      console.log('Saved payment method id:', paymentMethodId);
      Alert.alert('Sucesso', 'Cartão salvo com sucesso!');
      // aqui você pode enviar paymentMethodId para seu backend se quiser persistir relacionamento
    } catch (err: any) {
      console.error('onSaveCard catch', err);
      Alert.alert('Erro', err.message ?? 'Erro inesperado');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de cartão</Text>

      <TextInput
        placeholder="Nome no cartão"
        value={name}
        onChangeText={setName}
        style={styles.input}
        autoCapitalize="words"
      />

      <CardField
        postalCodeEnabled={false}
        placeholders={{ number: '4242 4242 4242 4242' }}
        cardStyle={{
          backgroundColor: '#EEEEEE',
          textColor: '#1A1F71',
          placeholderColor: '#999999',
          borderColor: '#EEEEEE',
          borderWidth: 1,
          borderRadius: 8,
          fontSize: 16,
          fontFamily: 'System',
          cursorColor: '#1A1F71',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 20,
        }}
        onCardChange={(card) => setCardDetails(card)}
      />

      <Text style={styles.linkText}>Suas informações estão protegidas com criptografia de ponta.</Text>

      <View style={styles.button}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <TouchableOpacity style={styles.button} onPress={onSaveCard}>
            <Text style={styles.buttonText}>Salvar cartão</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "flex-start", alignItems: "center", backgroundColor: "#fff", padding: 20, paddingTop: 40 },
  title: { fontSize: 24, marginBottom: 20, fontWeight: "600" },
  input: { width: "100%", height: 50, borderWidth: 1, borderColor: "#ccc", borderRadius: 10, paddingHorizontal: 10, marginTop: 12 },
  button: { width: "100%", height: 60, backgroundColor: "#022743", borderRadius: 20, justifyContent: "center", alignItems: "center", marginTop: 20 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "500" },
  linkText: { color: "#0054B0", marginTop: 15, marginBottom: 15, fontSize: 14, textAlign: "center" },

});