import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LocalizacaoAtingida({ navigation }) {
  const [cep, setCep] = useState('');
  const [localInfo, setLocalInfo] = useState(null);
  const [carregando, setCarregando] = useState(false);

  const buscarCEP = async (valor) => {
    const cepLimpo = valor.replace(/\D/g, '');
    setCep(cepLimpo);
    setLocalInfo(null);

    if (cepLimpo.length === 8) {
      Keyboard.dismiss();
      setCarregando(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const data = await response.json();

        if (data.erro) {
          Alert.alert('CEP não encontrado', 'Verifique o CEP digitado.');
          setLocalInfo(null);
        } else {
          const localCompleto = `${data.bairro}, ${data.localidade} - ${data.uf}`;
          setLocalInfo(localCompleto);
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível buscar o endereço.');
      }
      setCarregando(false);
    }
  };

  const salvarLocal = async () => {
    if (!localInfo) {
      Alert.alert('Erro', 'Digite um CEP válido.');
      return;
    }

    const dadosAntigos = await AsyncStorage.getItem('evento_temp');
    const temp = dadosAntigos ? JSON.parse(dadosAntigos) : {};
    const novosDados = { ...temp, local: localInfo };

    await AsyncStorage.setItem('evento_temp', JSON.stringify(novosDados));
    navigation.navigate('TempoInterrupcao');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📍 Localização Atingida</Text>

      <Text style={styles.label}>Digite o CEP da área afetada:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 01001000"
        keyboardType="numeric"
        maxLength={8}
        value={cep}
        onChangeText={buscarCEP}
      />

      {carregando && <ActivityIndicator size="small" color="#1976d2" style={{ marginTop: 10 }} />}

      {localInfo && (
        <Text style={styles.localInfo}>
          📌 Local Detectado: <Text style={{ fontWeight: 'bold' }}>{localInfo}</Text>
        </Text>
      )}

      <TouchableOpacity
        style={[styles.botao, { backgroundColor: localInfo ? '#1976d2' : '#ccc' }]}
        onPress={salvarLocal}
        disabled={!localInfo}
      >
        <Text style={styles.botaoTexto}>Avançar ➡️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0d47a1',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  localInfo: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
  botao: {
    marginTop: 40,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});