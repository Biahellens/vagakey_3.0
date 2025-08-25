import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Stack } from 'expo-router';

const initialRegion = {
  latitude: -23.55052,
  longitude: -46.633308,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const safePoints = [
  { latitude: -23.55052, longitude: -46.633308, title: 'Ponto Seguro 1', description: 'Ginásio Municipal' },
  { latitude: -23.552, longitude: -46.638, title: 'Centro de Apoio 1', description: 'Escola Pública', pinColor: 'green' },
  { latitude: -23.545, longitude: -46.625, title: 'Ponto Seguro 2', description: 'Praça Central' },
];

const safeRouteCoordinates = [
  { latitude: -23.550, longitude: -46.630 },
  { latitude: -23.548, longitude: -46.632 },
  { latitude: -23.545, longitude: -46.630 },
  { latitude: -23.543, longitude: -46.628 },
];

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Mapa de Rotas Seguras' }} />
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
        // provider="google" // Remova esta linha se estiver usando Expo Go e não tiver chaves de API específicas
      >
        {safePoints.map((point, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: point.latitude, longitude: point.longitude }}
            title={point.title}
            description={point.description}
            pinColor={point.pinColor || 'red'}
          />
        ))}
        <Polyline
          coordinates={safeRouteCoordinates}
          strokeColor="#0000FF"
          strokeWidth={4}
          tappable={true}
          onPress={() => console.log('Rota Segura Clicada')}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});