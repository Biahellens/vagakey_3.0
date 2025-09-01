import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import VehicleScreen from './screens/VehicleScreen';
import RouteScreen from './screens/RouteScreen';
import ContactsScreen from './screens/ContactsScreen';
import { StyleSheet, Image, Dimensions } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

export default function App() {
  const [step, setStep] = useState(0);

  // Array de telas que você quer navegar
  const screens = [
    <HomeScreen key="home" />,
    <VehicleScreen key="vehicle" />,
    <RouteScreen key="rota" />,
    <ContactsScreen key="contatos" />
  ];

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16, alignItems: "center", width: "100%", height: 100 }}>

        {step > 1 ? (
          <TouchableOpacity
            onPress={() => setStep((prev) => Math.max(prev - 1, 0))}
            disabled={step === 0}
            style={{
              width: 40,
              height: 40,
              borderRadius: 100,
              backgroundColor: step === 1 ? "#D9D9D9" : "#2B2E4E",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color={step === 1 ? "#2B2E4E" : "#EEEEEE"} />
          </TouchableOpacity>
        ) : (<MaterialCommunityIcons name="arrow-left" size={24} color="#ffff" />)}
        <Image source={require('./assets/vagakeylogo.png')} style={styles.logo} />
        <TouchableOpacity
          onPress={() => setStep((prev) => Math.min(prev + 1, screens.length - 1))}
          disabled={step === screens.length - 1}
          style={{
            width: 40,
            height: 40,
            borderRadius: 100,
            backgroundColor: "#2B2E4E",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons name="arrow-right" size={24} color="#EEEEEE" />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        {screens[step]}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: width,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    height: 160,
  },
  logo: {
    width: 60,
    height: 60,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
});
