import React from 'react';
import { StyleSheet, Image, View, Linking } from 'react-native';
import { createNavigationContainerRef, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackHeaderProps } from '@react-navigation/native-stack';

// Telas
import HomeScreen from './screens/HomeScreen';
import VehicleScreen from './screens/VehicleScreen';
import RouteScreen from './screens/RouteScreen';
import { LoginScreen } from './screens/LoginScreen';
import { CreateAccountScreen } from './screens/CreateAccountScreen';
import { AllRightScreen, CreateAccountErrorScreen } from './screens/FeedbacksScreen';
import MenuScreen from './screens/MenuScreen';
import DrawerComponent from './components/Drawer';
import { RootStackParamList } from './types/navigation';
import { useEffect } from 'react';
import { supabase } from './supabaseClient';
import VehicleRegistrationScreen from './screens/VehicleRegistrationScreen';
import PaymentSetupScreen from './screens/PaymentSetupScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
export const navigationRef = createNavigationContainerRef<RootStackParamList>();
const screensWithCustomHeader = ['Menu'];

const CustomHeader = (props: NativeStackHeaderProps) => (
  <View style={{ height: 160, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
    <Image
      source={require('./assets/vagakeylogo.png')}
      style={{ width: 60, height: 60, resizeMode: 'cover' }}
    />
    <DrawerComponent />
  </View>
);

const Header = (props: NativeStackHeaderProps) => (
  <View style={{ height: 160, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
    <Image
      source={require('./assets/vagakeylogo.png')}
      style={{ width: 60, height: 60, resizeMode: 'cover' }}
    />
  </View>
);

export default function App() {

  useEffect(() => {
    const handleDeepLink = async (event: { url: string }) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session && navigationRef.isReady()) {
        navigationRef.navigate('Vehicle');
      }
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);

    (async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) await handleDeepLink({ url: initialUrl });
    })();

    return () => subscription.remove();
  }, []);


  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerTintColor: '#2B2E4E',
          headerTitleAlign: 'center',
          header: screensWithCustomHeader.includes(route.name)
            ? (props: NativeStackHeaderProps) => <CustomHeader {...props} />
            : (props: NativeStackHeaderProps) => <Header {...props} />
        })}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Vehicle" component={VehicleScreen} />
        <Stack.Screen name="RouteVehicle" component={RouteScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen name="AllRight" component={AllRightScreen} />
        <Stack.Screen name="CreateAccountError" component={CreateAccountErrorScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="VehicleRegistration" component={VehicleRegistrationScreen} />
        <Stack.Screen name="PaymentSetup" component={PaymentSetupScreen} />
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
