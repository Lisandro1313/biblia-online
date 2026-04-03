import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import InicioScreen from '../screens/InicioScreen';
import LibrosScreen from '../screens/LibrosScreen';
import CapitulosScreen from '../screens/CapitulosScreen';
import LecturaScreen from '../screens/LecturaScreen';

const Stack = createStackNavigator();

const screenOptions = {
  headerStyle: { backgroundColor: '#1a2a3a' },
  headerTintColor: '#C9A84C',
  headerTitleStyle: { fontWeight: '700' as const },
};

export default function BibliaStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Inicio" component={InicioScreen} options={{ title: '📖 Biblia RVR1960' }} />
      <Stack.Screen name="Libros" component={LibrosScreen} options={{ title: 'Libros' }} />
      <Stack.Screen name="Capitulos" component={CapitulosScreen} options={({ route }: any) => ({ title: route.params.libro.nombre })} />
      <Stack.Screen name="Lectura" component={LecturaScreen} options={{ title: 'Lectura' }} />
    </Stack.Navigator>
  );
}
