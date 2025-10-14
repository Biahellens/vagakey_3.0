import React, { useState, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

export default function DrawerComponent() {
  const [open, setOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const toggleMenu = () => {
    setOpen(!open);
    Animated.timing(slideAnim, {
      toValue: open ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [200, 0],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleMenu}>
        <MaterialCommunityIcons name="menu" size={28} color="#2B2E4E" />
      </TouchableOpacity>

      {open && (
        <Animated.View style={[styles.menu, { transform: [{ translateX }] }]}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              navigation.navigate('Menu');
              toggleMenu();
            }}
          >
            <Text style={styles.menuText}>Cadastro de Veículo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              navigation.navigate('Menu');
              toggleMenu();
            }}
          >
            <Text style={styles.menuText}>Carteira</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              navigation.navigate('Menu');
              toggleMenu();
            }}
          >
            <Text style={styles.menuText}>Recarga VKeys</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              navigation.navigate('Menu');
              toggleMenu();
            }}
          >
            <Text style={styles.menuText}>Seus Tickets</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              navigation.navigate('Menu');
              toggleMenu();
            }}
          >
            <Text style={styles.menuText}>Logout</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    left: 120
  },
  menu: {
    position: 'absolute',
    top: 40,
    right: 0,
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuText: {
    fontSize: 16,
    color: '#2B2E4E',
  },
});
