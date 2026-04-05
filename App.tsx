import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import BibliaStack from './src/navigation/BibliaStack';
import FavoritosScreen from './src/screens/FavoritosScreen';
import BusquedaScreen from './src/screens/BusquedaScreen';
import PlanScreen from './src/screens/PlanScreen';
import { FavoritosProvider } from './src/context/FavoritosContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <FavoritosProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: '#1a2a3a',
              borderTopColor: '#2a3a4a',
              paddingBottom: 8,
              paddingTop: 6,
              height: 62,
            },
            tabBarActiveTintColor: '#C9A84C',
            tabBarInactiveTintColor: '#555',
            tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
          }}
        >
          <Tab.Screen
            name="BibliaBrowse"
            component={BibliaStack}
            options={{
              title: 'Biblia',
              tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>📖</Text>,
            }}
          />
          <Tab.Screen
            name="Favoritos"
            component={FavoritosScreen}
            options={{
              tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>⭐</Text>,
            }}
          />
          <Tab.Screen
            name="Buscar"
            component={BusquedaScreen}
            options={{
              title: 'Buscar',
              tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>🔍</Text>,
              headerShown: true,
              headerStyle: { backgroundColor: '#1a2a3a' },
              headerTintColor: '#C9A84C',
              headerTitleStyle: { fontWeight: '700' as const },
              headerTitle: '🔍 Buscar versículos',
            }}
          />
          <Tab.Screen
            name="Plan"
            component={PlanScreen}
            options={{
              title: 'Plan',
              tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>📅</Text>,
              headerShown: true,
              headerStyle: { backgroundColor: '#1a2a3a' },
              headerTintColor: '#C9A84C',
              headerTitleStyle: { fontWeight: '700' as const },
              headerTitle: '📅 Plan de Lectura',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </FavoritosProvider>
  );
}
