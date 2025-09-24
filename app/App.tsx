import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// Telas
import HomeScreen from './screens/HomeScreen';
import VehicleScreen from './screens/VehicleScreen';
import RouteScreen from './screens/RouteScreen';
import ContactsScreen from './screens/ContactsScreen';
import { LoginScreen } from './screens/LoginScreen';
import { CreateAccountScreen } from './screens/CreateAccountScreen';
import { AllRightScreen, CreateAccountErrorScreen } from './screens/FeedbacksScreen';
import { RootStackParamList } from './types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#2B2E4E' },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Image
              source={require('./assets/vagakeylogo.png')}
              style={styles.logo}
            />
          ),
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Vehicle" component={VehicleScreen} />
        <Stack.Screen name="RouteVehicle" component={RouteScreen} />
        <Stack.Screen name="AllRight" component={AllRightScreen} />
        <Stack.Screen name="CreateAccountError" component={CreateAccountErrorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 60,
    height: 60,
  },
});
