import { router } from 'expo-router';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import colors from '../constants/colors';

export default function Index() {
  return (
    <ImageBackground
      source={require('../assets/images/background-image.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Overlay */}
      <View style={styles.overlay}>
        
        {/* Top Logo */}
        <View style={styles.topContainer}>
          <Image
            source={require('../assets/images/icon (1).png')}
            style={styles.logo}
          />
        </View>

        {/* Center Content */}
        <View style={styles.centerContent}>
          <Text style={styles.title}>TaskHub</Text>

          <Text style={styles.subtitle}>
            Organize your tasks effortlessly
          </Text>
          <Text style={styles.subtitle}>
            Stay focused. Stay productive.
          </Text>
          <Text style={styles.subtitle}>
            Turn ideas into action.
          </Text>
        </View>

        {/* Bottom Buttons */}
        <View style={styles.bottomContainer}>
          
          {/* Get Started / Sign Up */}
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push('/(auth)/signup')}
          >
            <Text style={styles.primaryText}>Get Started</Text>
          </TouchableOpacity>

          {/* Login */}
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push('/(auth)/login')}
          >
            <Text style={styles.secondaryText}>Login</Text>
          </TouchableOpacity>

        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'space-between',
  },

  topContainer: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  logo: {
    width: 50,
    height: 50,
  },

  centerContent: {
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.text.inverse,
    marginBottom: 20,
  },

  subtitle: {
    fontSize: 16,
    color: colors.text.tertiary,
    textAlign: 'center',
    marginBottom: 6,
  },

  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },

  primaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  secondaryButton: {
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  secondaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
