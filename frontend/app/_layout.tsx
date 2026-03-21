import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    // Load vector icon fonts
    'Ionicons': require('@expo/vector-icons/Fonts/Ionicons.ttf'),
    'AntDesign': require('@expo/vector-icons/Fonts/AntDesign.ttf'),
    'Entypo': require('@expo/vector-icons/Fonts/Entypo.ttf'),
    'EvilIcons': require('@expo/vector-icons/Fonts/EvilIcons.ttf'),
    'Feather': require('@expo/vector-icons/Fonts/Feather.ttf'),
    'FontAwesome': require('@expo/vector-icons/Fonts/FontAwesome.ttf'),
    'FontAwesome5_Brands': require('@expo/vector-icons/Fonts/FontAwesome5_Brands.ttf'),
    'FontAwesome5_Regular': require('@expo/vector-icons/Fonts/FontAwesome5_Regular.ttf'),
    'FontAwesome5_Solid': require('@expo/vector-icons/Fonts/FontAwesome5_Solid.ttf'),
    'Fontisto': require('@expo/vector-icons/Fonts/Fontisto.ttf'),
    'MaterialCommunityIcons': require('@expo/vector-icons/Fonts/MaterialCommunityIcons.ttf'),
    'MaterialIcons': require('@expo/vector-icons/Fonts/MaterialIcons.ttf'),
    'Octicons': require('@expo/vector-icons/Fonts/Octicons.ttf'),
    'SimpleLineIcons': require('@expo/vector-icons/Fonts/SimpleLineIcons.ttf'),
    'Zocial': require('@expo/vector-icons/Fonts/Zocial.ttf'),
  });

  useEffect(() => {
    async function hideSplash() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    hideSplash();
  }, [fontsLoaded]);

  // Handle font loading error
  if (!fontsLoaded && !fontError) {
    return null;
  }

  if (fontError) {
    console.error('Error loading fonts:', fontError);
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#FFFFFF' },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}