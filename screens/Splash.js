import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function Splash({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/energia.jpg')}
      style={styles.fundo}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Image source={require('../assets/raio.png')} style={styles.raio} />

        <Text style={styles.titulo}>Energia Segura</Text>
        <Text style={styles.subtitulo}>
          Registre e acompanhe quedas de energia causadas por desastres
        </Text>

        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('PanoramaGeral')}>
          <Text style={styles.botaoTexto}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 30,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  raio: {
    width: width * 0.2,
    height: width * 0.2,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    color: '#ddd',
    marginBottom: 30,
    textAlign: 'center',
  },
  botao: {
    backgroundColor: '#1976d2',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 14,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
