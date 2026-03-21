import { useEffect } from 'react';
import { router } from 'expo-router';
import { View, ActivityIndicator, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../constants/colors';

export default function Index() {
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Check if user is authenticated
      const token = await AsyncStorage.getItem('userToken');
      
      // Add a small delay for smooth transition
      setTimeout(() => {
        if (token) {
          // User is authenticated, go to main app (tabs)
          router.replace('/');
        } else {
          // User is not authenticated, go to login
          router.replace('/(auth)/login');
        }
      }, 1000);
    } catch (error) {
      console.error('Error checking auth:', error);
      router.replace('/(auth)/login');
    }
  };

  return (
    <View style={styles.container}>
      {/* TaskHub Logo */}
      <Image
        source={require('../assets/images/icon (1).png')}
        style={styles.logo}
        resizeMode="contain"
      />
      
      {/* Loading Indicator */}
      <ActivityIndicator 
        size="large" 
        color={colors.primary} 
        style={styles.loader}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  loader: {
    marginTop: 20,
  },
});