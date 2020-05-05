import React from 'react';
import { Button, Platform, Text } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

if (Platform.OS === 'web') {
  WebBrowser.maybeCompleteAuthSession();
}

const useProxy = true;

const redirectUri = AuthSession.makeRedirectUri({
  native: 'your.app://redirect',
  useProxy,
});

export default function App() {
  const discovery = AuthSession.useAutoDiscovery('https://demo.identityserver.io');
  
  // Create and load an auth request
  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: 'native.code',
      redirectUri,
      scopes: ['openid', 'profile', 'email', 'offline_access'],
    },
    discovery
  );

  return (
    <>
      <Button title="Login!" disabled={!request} onPress={() => promptAsync({ useProxy })} />
      {result && <Text>{JSON.stringify(result, null, 2)}</Text>}
    </>
  );
}