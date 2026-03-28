import { router } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  Image,
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

        {/* Spacer to reduce "full stretched" feeling */}
        <View style={styles.middleSpace} />

        {/* Bottom Buttons */}
        <View style={styles.bottomContainer}>
          
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push('/(auth)/register')}
          >
            <Text style={styles.primaryText}>Get Started</Text>
          </TouchableOpacity>

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
    backgroundColor: 'rgba(0,0,0,0.4)', // lighter since bg already has text
  },

  topContainer: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  logo: {
    width: 45,
    height: 45,
  },

  middleSpace: {
    flex: 1,
  },

  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 80, // 👈 pushed up from bottom
  },

  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },

  primaryText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },

  secondaryButton: {
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  secondaryText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});
