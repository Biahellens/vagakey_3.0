import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
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
          headerTintColor: '#2B2E4E',
          headerTitleAlign: 'center',
          header: () => (
            <View style={{ height: 160, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
              <Image
                source={require('./assets/vagakeylogo.png')}
                style={{ width: 60, height: 60, resizeMode: 'cover' }}
              />
            </View>
          )
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
    width: 80,
    height: 80,
  },
});
