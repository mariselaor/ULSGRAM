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
      Alert.alert('Token', response.data.token);
    } catch (error) {
      Alert.alert('Error', 'Credenciales incorrectas');
    }
  };

  return (
    <View>
      <Text>Login</Text>
      <Button title="Iniciar sesión" onPress={handleLogin} />
    </View>
  );
}
