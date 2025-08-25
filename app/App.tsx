import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import VehicleScreen from './screens/VehicleScreen';
import RouteScreen from './screens/RouteScreen';
import ContactsScreen from './screens/ContactsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

function VehicleStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Vehicle" component={VehicleScreen} />
    </Stack.Navigator>
  );
}

function RouteStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Rota" component={RouteScreen} />
    </Stack.Navigator>
  );
}

function ContactsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Contatos" component={ContactsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#1E90FF',
          tabBarInactiveTintColor: '#888',
          tabBarStyle: {
            backgroundColor: '#FFF',
            height: 80,
            paddingBottom: 5,
            paddingTop: 8,
            borderTopWidth: 1,
            borderTopColor: '#E0E0E0',
          },
        }}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeStack}
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="alert-circle" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="VehicleTab"
          component={VehicleStack}
          options={{
            title: 'VehicleScreen',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="medical-bag" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="RotaTab"
          component={RouteStack}
          options={{
            title: 'Rota',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="route" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="ContatosTab"
          component={ContactsStack}
          options={{
            title: 'Contatos',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="phone" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}