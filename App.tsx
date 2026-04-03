import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import BibliaStack from './src/navigation/BibliaStack';
import FavoritosScreen from './src/screens/FavoritosScreen';
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
        </Tab.Navigator>
      </NavigationContainer>
    </FavoritosProvider>
  );
}
