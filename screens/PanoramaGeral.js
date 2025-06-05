import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PanoramaGeral({ navigation }) {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    const carregarDados = async () => {
      const dados = await AsyncStorage.getItem('eventos');
      if (dados) {
        setEventos(JSON.parse(dados));
      }
    };
    const focus = navigation.addListener('focus', carregarDados);
    return focus;
  }, [navigation]);

  const limparTudo = async () => {
    Alert.alert('Atenção', 'Deseja realmente limpar todos os registros?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Confirmar',
        onPress: async () => {
          await AsyncStorage.removeItem('eventos');
          setEventos([]);
        },
      },
    ]);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitulo}>🔌 Evento {index + 1}</Text>
      <Text style={styles.cardTexto}>📍 Local: {item.local}</Text>
      <Text style={styles.cardTexto}>⏱ Tempo: {item.tempo}</Text>
      <Text style={styles.cardTexto}>⚠ Prejuízo: {item.prejuizo}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📊 Panorama Geral dos Eventos</Text>

      <FlatList
        data={eventos}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <Text style={styles.vazio}>Nenhum evento registrado ainda.</Text>
        }
      />

      <View style={styles.botoes}>
        <TouchableOpacity
          style={[styles.botao, { backgroundColor: '#1976d2' }]}
          onPress={() => navigation.navigate('LocalizacaoAtingida')}
        >
          <Text style={styles.botaoTexto}>+ Nova Localização</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botao, { backgroundColor: '#d32f2f' }]}
          onPress={limparTudo}
        >
          <Text style={styles.botaoTexto}>🗑 Limpar Registros</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botao, { backgroundColor: '#388e3c' }]}
          onPress={() => navigation.navigate('Recomendacoes')}
        >
          <Text style={styles.botaoTexto}>📘 Ver Recomendações</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#e3f2fd' },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0d47a1',
    marginBottom: 20,
    textAlign: 'center',
  },
  vazio: { textAlign: 'center', color: '#555', marginTop: 40 },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardTitulo: { fontSize: 17, fontWeight: 'bold', marginBottom: 5, color: '#1976d2' },
  cardTexto: { fontSize: 15, marginBottom: 3 },
  botoes: { marginTop: 30, gap: 12 },
  botao: {
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
