// Importerer nødvendige moduler og komponenter fra React Native og Firebase
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import auth from '@react-native-firebase/auth';

// Definerer LoginScreen komponenten
const LoginScreen = () => {
  // Opretter to tilstandsvariabler 'email' og 'password' ved hjælp af useState hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Funktion til at håndtere login-processen
  const handleLogin = async () => {
    try {
      // Forsøger at logge ind ved hjælp af indtastede email og password
      await auth().signInWithEmailAndPassword(email, password);
      // Brugeren er logget ind succesfuldt
    } catch (error) {
      // Håndterer login-fejl, hvis der opstår en fejl under login-processen
      console.error(error);
    }
  };

  // Renderer login-skærmen med to inputfelter (email og password) og en login-knap
  return (
    <View>
      <TextInput
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry  // Skjuler indtastede tegn for sikkerhed
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Button title="Login" onPress={handleLogin} />  // Login-knap, der udløser handleLogin funktionen ved tryk
    </View>
  );
};

// Eksporterer LoginScreen komponenten som standard eksport fra denne fil
export default LoginScreen;
