// TaskHub Logo Component (using PNG images)
// components/TaskHubLogo.tsx

import React from 'react';
import { View, Text, Image, StyleSheet, ViewStyle, ImageStyle } from 'react-native';
import colors from '../constants/colors';

interface TaskHubLogoProps {
  size?: number;
  showText?: boolean;
  textSize?: number;
  style?: ViewStyle;
  imageStyle?: ImageStyle;
}

export const TaskHubLogo: React.FC<TaskHubLogoProps> = ({
  size = 80,
  showText = true,
  textSize = 32,
  style,
  imageStyle,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Image
        source={require('../assets/images/icon.png')}
        style={[
          {
            width: size,
            height: size,
          },
          imageStyle,
        ]}
        resizeMode="contain"
      />
      {showText && (
        <Text style={[styles.text, { fontSize: textSize }]}>
          <Text style={styles.taskText}>Task</Text>
          <Text style={styles.hubText}>Hub</Text>
        </Text>
      )}
    </View>
  );
};

// Icon only component (no text)
export const TaskHubIcon: React.FC<{
  size?: number;
  style?: ImageStyle;
}> = ({ size = 64, style }) => {
  return (
    <Image
      source={require('../assets/images/icon.png')}
      style={[
        {
          width: size,
          height: size,
        },
        style,
      ]}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '700',
    marginTop: 12,
    letterSpacing: -1,
  },
  taskText: {
    color: colors.primary,
  },
  hubText: {
    color: colors.secondary,
  },
});