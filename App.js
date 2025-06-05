import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Splash from './screens/Splash';
import PanoramaGeral from './screens/PanoramaGeral';
import LocalizacaoAtingida from './screens/LocalizacaoAtingida';
import TempoInterrupcao from './screens/TempoInterrupcao';
import PrejuizosCausados from './screens/PrejuizosCausados';
import Recomendacoes from './screens/Recomendacoes';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="PanoramaGeral" component={PanoramaGeral} options={{ headerShown: true, title: 'Panorama Geral' }} />
        <Stack.Screen name="LocalizacaoAtingida" component={LocalizacaoAtingida} options={{ title: 'Localização Atingida' }} />
        <Stack.Screen name="TempoInterrupcao" component={TempoInterrupcao} options={{ title: 'Tempo de Interrupção' }} />
        <Stack.Screen name="PrejuizosCausados" component={PrejuizosCausados} options={{ title: 'Prejuízos Causados' }} />
        <Stack.Screen name="Recomendacoes" component={Recomendacoes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
