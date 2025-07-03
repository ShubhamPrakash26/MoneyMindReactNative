// app/_layout.jsx
import { Slot } from 'expo-router';
import { ClerkProvider } from '@clerk/clerk-expo';
import Constants from 'expo-constants';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import SafeScreen from '../components/SafeScreen';
import { StatusBar } from 'expo-status-bar';
export default function RootLayout() {
  console.log('🔑 Clerk Key:', Constants.expoConfig.extra.clerkKey);
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={Constants.expoConfig.extra.clerkKey}>
      <SafeScreen>
        <Slot />
      </SafeScreen>
      <StatusBar style='dark'/>
    </ClerkProvider>
  );
}
