import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function Recomendacoes({ navigation }) {
  const orientacoes = [
    'Tenha lanternas e pilhas acessíveis.',
    'Evite abrir geladeiras e freezers desnecessariamente.',
    'Desligue equipamentos elétricos para evitar danos ao retorno da energia.',
    'Evite estocar grandes quantidades de alimentos perecíveis sem backup.',
    'Mantenha um carregador portátil carregado.',
    'Monte um kit de emergência com água, alimentos não perecíveis e primeiros socorros.',
    'Use aplicativos offline para se comunicar em emergências.',
    'Instale sistemas de energia alternativa, como painéis solares.',
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📌 Recomendações</Text>

      <ScrollView contentContainerStyle={styles.scroll}>
        {orientacoes.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.texto}>• {item}</Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.goBack()}>
        <Text style={styles.botaoTexto}>⬅ Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e3f2fd', padding: 20 },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0d47a1',
    marginTop: 40,
    marginBottom: 20,
    textAlign: 'center',
  },

  scroll: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  texto: {
    fontSize: 16,
    color: '#333',
  },
  botao: {
    backgroundColor: '#1976d2',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
