import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import MapView, { Marker, Polyline, Polygon } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomButton from '../components/Button';
import Header from '@/components/Header';

const { width, height } = Dimensions.get('window');

const initialRegion = {
  latitude: -23.55052,
  longitude: -46.633308,
  latitudeDelta: 0.03,
  longitudeDelta: 0.03,
};

const floodedAreaCoordinates = [
  { latitude: -23.548, longitude: -46.635 },
  { latitude: -23.552, longitude: -46.639 },
  { latitude: -23.555, longitude: -46.634 },
  { latitude: -23.550, longitude: -46.630 },
];

const safeRoutePath = [
  { latitude: -23.55052, longitude: -46.633308 },
  { latitude: -23.545, longitude: -46.630 },
  { latitude: -23.540, longitude: -46.628 },
  { latitude: -23.538, longitude: -46.625 },
];

export default function RouteScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.alertBox}>
        <MaterialCommunityIcons name="alert" size={30} color="#FFC107" />
        <View style={styles.alertTextContainer}>
          <Text style={styles.alertText}>Há riscos de alagamento na sua região</Text>
          <View style={styles.locationInfo}>
            <MaterialCommunityIcons name="map-marker" size={16} color="#555" />
            <Text style={styles.locationText}>São Paulo, SP</Text>
          </View>
        </View>
      </View>

      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
      >
        <Marker
          coordinate={initialRegion}
          title="Sua Localização"
          pinColor="blue"
        />
        <Marker
          coordinate={safeRoutePath[safeRoutePath.length - 1]}
          title="Destino Seguro"
          pinColor="green"
        />
        <Polygon
          coordinates={floodedAreaCoordinates}
          fillColor="rgba(255, 99, 71, 0.5)"
          strokeColor="rgba(255, 99, 71, 0.8)"
          strokeWidth={2}
        />
        <Polyline
          coordinates={safeRoutePath}
          strokeColor="#28a745"
          strokeWidth={5}
          geodesic={true}
        />
      </MapView>

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Traçar rota segura"
          onPress={() => alert('Traçar rota (Ainda não implementado)')}
          buttonStyle={styles.routeButton}
          textStyle={styles.buttonText}
        />
        <CustomButton
          title="EMITIR ALERTA"
          onPress={() => alert('Emitir Alerta (Ainda não implementado)')}
          buttonStyle={styles.alertButton}
          textStyle={styles.buttonText}
        />
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
  alertBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF8E1',
    borderRadius: 8,
    padding: 15,
    marginVertical: 15,
    width: width * 0.9,
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#FFC107',
  },
  alertTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  alertText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 5,
  },
  map: {
    width: width * 0.9,
    height: height * 0.5,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  buttonContainer: {
    marginTop: 20,
    width: width * 0.9,
    maxWidth: 400,
    gap: 15,
  },
  routeButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
  },
  alertButton: {
    backgroundColor: '#D32F2F',
    paddingVertical: 15,
  },
  buttonText: {
    fontSize: 18,
  },
});