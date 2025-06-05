import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PrejuizosCausados({ navigation }) {
  const [prejuizo, setPrejuizo] = useState('');

  const salvarPrejuizo = async () => {
    if (!prejuizo.trim()) {
      Alert.alert('Erro', 'Descreva os prejuízos causados!');
      return;
    }

    const dadosAntigos = await AsyncStorage.getItem('evento_temp');
    const temp = dadosAntigos ? JSON.parse(dadosAntigos) : {};
    const novosDados = { ...temp, prejuizo };

    const eventosExistentes = await AsyncStorage.getItem('eventos');
    const lista = eventosExistentes ? JSON.parse(eventosExistentes) : [];

    lista.push(novosDados);
    await AsyncStorage.setItem('eventos', JSON.stringify(lista));
    await AsyncStorage.removeItem('evento_temp');

    navigation.reset({
      index: 0,
      routes: [{ name: 'PanoramaGeral' }],
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={60}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.titulo}>⚠ Prejuízos Causados</Text>

        <Text style={styles.label}>Descreva os prejuízos:</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Ex: Alimentos perdidos, equipamentos queimados, comércio fechado..."
          multiline
          numberOfLines={6}
          value={prejuizo}
          onChangeText={setPrejuizo}
        />

        <TouchableOpacity style={styles.botao} onPress={salvarPrejuizo}>
          <Text style={styles.botaoTexto}>Finalizar Registro ✅</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3f2fd',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0d47a1',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  textArea: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  botao: {
    backgroundColor: '#388e3c',
    padding: 16,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
