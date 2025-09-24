import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importando suas telas
import HomeScreen from './screens/HomeScreen';
import VehicleScreen from './screens/VehicleScreen';
import RouteScreen from './screens/RouteScreen';
import ContactsScreen from './screens/ContactsScreen';
import { LoginScreen } from './screens/LoginScreen';
import { CreateAccountScreen } from './screens/CreateAccountScreen';

const { width } = Dimensions.get('window');
const Stack = createNativeStackNavigator();

export default function App() {
  const [step, setStep] = useState(0);

  // Array de telas para navegação customizada
  type ScreenNames = "Home" | "CreateAccount" | "Login" | "Vehicle" | "RouteVehicle" | "Contacts";

  const screens: { name: ScreenNames; component: React.ComponentType<any> }[] = [
    { name: "Home", component: HomeScreen },
    { name: "CreateAccount", component: CreateAccountScreen },
    { name: "Login", component: LoginScreen },
    { name: "Vehicle", component: VehicleScreen },
    { name: "RouteVehicle", component: RouteScreen },
    { name: "Contacts", component: ContactsScreen },
  ];


  return (
    <NavigationContainer>
      {/* Header com botões de avançar/voltar */}
      <View style={styles.header}>
        {step > 0 ? (
          <TouchableOpacity
            onPress={() => setStep((prev) => Math.max(prev - 1, 0))}
            style={[styles.navButton, { backgroundColor: step === 1 ? "#D9D9D9" : "#2B2E4E" }]}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={24}
              color={step === 1 ? "#2B2E4E" : "#EEEEEE"}
            />
          </TouchableOpacity>
        ) : (
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        )}

        <Image source={require('./assets/vagakeylogo.png')} style={styles.logo} />

        <TouchableOpacity
          onPress={() => setStep((prev) => Math.min(prev + 1, screens.length - 1))}
          style={styles.navButton}
        >
          <MaterialCommunityIcons name="arrow-right" size={24} color="#EEEEEE" />
        </TouchableOpacity>
      </View>

      {/* Stack Navigator */}
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={screens[step].name}
      >
        {screens.map((screen, index) => (
          <Stack.Screen key={screen.name} name={screen.name} component={screen.component} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: "center",
    width: "100%",
    height: 100,
  },
  logo: {
    width: 60,
    height: 60,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: "#2B2E4E",
    justifyContent: "center",
    alignItems: "center",
  },
});