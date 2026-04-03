import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Libro } from '../data/libros';

export default function CapitulosScreen({ route, navigation }: any) {
  const libro: Libro = route.params.libro;
  const capitulos = Array.from({ length: libro.capitulos }, (_, i) => i + 1);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{libro.nombre}</Text>
      <Text style={styles.subtitulo}>{libro.capitulos} capítulos</Text>
      <FlatList
        data={capitulos}
        keyExtractor={item => item.toString()}
        numColumns={5}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.capBtn}
            onPress={() => navigation.navigate('Lectura', { libro, capitulo: item })}
          >
            <Text style={styles.capNum}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f1923' },
  titulo: {
    fontSize: 22, fontWeight: 'bold', color: '#C9A84C',
    textAlign: 'center', paddingTop: 20,
  },
  subtitulo: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 20 },
  grid: { paddingHorizontal: 16, gap: 10 },
  capBtn: {
    flex: 1, margin: 4, aspectRatio: 1,
    backgroundColor: '#1a2a3a', borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: '#2a3a4a',
  },
  capNum: { color: '#C9A84C', fontSize: 18, fontWeight: '700' },
});
