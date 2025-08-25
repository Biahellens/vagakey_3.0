import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function Header() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
      <Image source={require('../assets/splash-icon.png')} style={styles.logo} />
      <Text style={styles.headerTitle}>NOAH</Text>
      <Text style={styles.headerSubtitle}>Núcleo de operação e apoio em havocs</Text>
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
    resizeMode: 'contain',
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E90FF',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
});