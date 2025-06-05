import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TempoInterrupcao({ navigation }) {
  const [tempo, setTempo] = useState('');
  const [unidade, setUnidade] = useState('hora');

  const avancar = async () => {
    const valor = tempo.trim();
    if (!valor || isNaN(valor)) {
      Alert.alert('Erro', 'Informe um tempo válido.');
      return;
    }

    const tempoFinal = `${valor} ${parseInt(valor) === 1 ? unidade : unidade + 's'}`;

    const dadosAntigos = await AsyncStorage.getItem('evento_temp');
    const temp = dadosAntigos ? JSON.parse(dadosAntigos) : {};
    const novosDados = { ...temp, tempo: tempoFinal };

    await AsyncStorage.setItem('evento_temp', JSON.stringify(novosDados));
    navigation.navigate('PrejuizosCausados');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.titulo}>⏱ Tempo de Interrupção</Text>

      <Text style={styles.label}>Informe o tempo:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ex: 4"
        value={tempo}
        onChangeText={setTempo}
      />

      <View style={styles.unidades}>
        <TouchableOpacity
          style={[
            styles.opcao,
            unidade === 'hora' && styles.opcaoSelecionada,
          ]}
          onPress={() => setUnidade('hora')}
        >
          <Text style={styles.opcaoTexto}>Horas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.opcao,
            unidade === 'dia' && styles.opcaoSelecionada,
          ]}
          onPress={() => setUnidade('dia')}
        >
          <Text style={styles.opcaoTexto}>Dias</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.botao} onPress={avancar}>
        <Text style={styles.botaoTexto}>Avançar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e3f2fd', padding: 20, justifyContent: 'center' },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0d47a1',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: { fontSize: 16, marginBottom: 8 },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  unidades: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20, gap: 10 },
  opcao: {
    backgroundColor: '#bbdefb',
    padding: 10,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  opcaoSelecionada: { backgroundColor: '#1976d2' },
  opcaoTexto: { color: '#fff', fontWeight: 'bold' },
  botao: {
    backgroundColor: '#1976d2',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
