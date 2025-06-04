import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import axios from 'axios';

export default function LoginScreen() {
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email: 'tucorreo@ejemplo.com',
        password: '12345678',
      });

      Alert.alert('Token', response.data.access_token);
    } catch (error) {
      console.error(error.response?.data || error.message);
      Alert.alert('Error', 'Credenciales incorrectas o fallo de red');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Login</Text>
      <Button title="Iniciar sesión" onPress={handleLogin} />
    </View>
  );
}
