import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

interface CustomButtonProps {
  title: string;
  onPress?: () => void;
  iconName?: keyof typeof MaterialCommunityIcons.glyphMap | keyof typeof FontAwesome5.glyphMap;
  iconLib?: 'MaterialCommunityIcons' | 'FontAwesome5';
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconColor?: string;
  iconSize?: number;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  iconName,
  iconLib = 'MaterialCommunityIcons',
  buttonStyle,
  textStyle,
  iconColor = '#FFF',
  iconSize = 20,
  disabled = false,
}) => {
  const IconComponent = iconLib === 'MaterialCommunityIcons' ? MaterialCommunityIcons : FontAwesome5;

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
    >
      {iconName && (
        <IconComponent name={iconName as any} size={iconSize} color={iconColor} style={styles.icon} />
      )}
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  disabledButton: {
    backgroundColor: '#A0A0A0',
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;