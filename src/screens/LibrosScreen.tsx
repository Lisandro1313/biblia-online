import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native';
import { LIBROS } from '../data/libros';

export default function LibrosScreen({ navigation }: any) {
  const [busqueda, setBusqueda] = useState('');
  const [testamento, setTestamento] = useState<'AT' | 'NT' | 'todos'>('todos');

  const librosFiltrados = LIBROS.filter(l => {
    const matchBusqueda = l.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const matchTestamento = testamento === 'todos' || l.testamento === testamento;
    return matchBusqueda && matchTestamento;
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.buscador}
        placeholder="Buscar libro..."
        placeholderTextColor="#555"
        value={busqueda}
        onChangeText={setBusqueda}
      />

      <View style={styles.tabsRow}>
        {(['todos', 'AT', 'NT'] as const).map(t => (
          <TouchableOpacity
            key={t}
            style={[styles.tab, testamento === t && styles.tabActivo]}
            onPress={() => setTestamento(t)}
          >
            <Text style={[styles.tabText, testamento === t && styles.tabTextActivo]}>
              {t === 'todos' ? 'Todos' : t === 'AT' ? 'Antiguo' : 'Nuevo'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={librosFiltrados}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.libroItem}
            onPress={() => navigation.navigate('Capitulos', { libro: item })}
          >
            <View style={styles.libroAbrevBox}>
              <Text style={styles.libroAbrev}>{item.abrev}</Text>
            </View>
            <View style={styles.libroInfo}>
              <Text style={styles.libroNombre}>{item.nombre}</Text>
              <Text style={styles.libroCapitulos}>{item.capitulos} capítulos · {item.testamento === 'AT' ? 'Antiguo Testamento' : 'Nuevo Testamento'}</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f1923' },
  buscador: {
    margin: 16, backgroundColor: '#1a2a3a',
    borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12,
    color: '#fff', fontSize: 16, borderWidth: 1, borderColor: '#2a3a4a',
  },
  tabsRow: { flexDirection: 'row', marginHorizontal: 16, gap: 8, marginBottom: 12 },
  tab: {
    flex: 1, paddingVertical: 8, borderRadius: 10,
    backgroundColor: '#1a2a3a', alignItems: 'center',
  },
  tabActivo: { backgroundColor: '#C9A84C' },
  tabText: { color: '#888', fontWeight: '600', fontSize: 14 },
  tabTextActivo: { color: '#0f1923' },
  libroItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: '#1a2a3a',
  },
  libroAbrevBox: {
    width: 44, height: 44, borderRadius: 10,
    backgroundColor: '#1a2a3a', alignItems: 'center', justifyContent: 'center',
    marginRight: 14,
  },
  libroAbrev: { color: '#C9A84C', fontWeight: '700', fontSize: 13 },
  libroInfo: { flex: 1 },
  libroNombre: { color: '#fff', fontSize: 16, fontWeight: '600' },
  libroCapitulos: { color: '#666', fontSize: 13, marginTop: 2 },
  arrow: { color: '#444', fontSize: 22 },
});
