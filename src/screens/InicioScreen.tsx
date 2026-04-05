import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { getVersiculoDelDia, VERSICULOS_DESTACADOS } from '../data/bibliaApi';
import type { StackScreenProps } from '@react-navigation/stack';
import type { BibliaStackParamList } from '../navigation/types';

type Props = StackScreenProps<BibliaStackParamList, 'Inicio'>;

export default function InicioScreen({ navigation }: Props) {
  const versiculo = getVersiculoDelDia();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>📖 Biblia</Text>
      <Text style={styles.subtitulo}>Reina Valera 1960</Text>

      {/* Versículo del día */}
      <View style={styles.versiculoDiaCard}>
        <Text style={styles.versiculoDiaLabel}>✨ Versículo del día</Text>
        <Text style={styles.versiculoDiaTexto}>"{versiculo.texto}"</Text>
        <Text style={styles.versiculoDiaRef}>— {versiculo.ref}</Text>
      </View>

      {/* Botón leer */}
      <TouchableOpacity style={styles.btnLeer} onPress={() => navigation.navigate('Libros')}>
        <Text style={styles.btnLeerText}>📚  Leer la Biblia completa</Text>
      </TouchableOpacity>

      {/* Versículos populares */}
      <Text style={styles.seccionTitulo}>Versículos populares</Text>
      {VERSICULOS_DESTACADOS.map((v, i) => (
        <View key={i} style={styles.versiculoCard}>
          <Text style={styles.versiculoRef}>{v.ref}</Text>
          <Text style={styles.versiculoTexto}>{v.texto}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f1923' },
  content: { paddingBottom: 40 },
  titulo: {
    fontSize: 28, fontWeight: 'bold', color: '#C9A84C',
    textAlign: 'center', paddingTop: 24,
  },
  subtitulo: {
    fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 20,
  },
  versiculoDiaCard: {
    margin: 16, backgroundColor: '#1a2a3a',
    borderRadius: 18, padding: 22,
    borderLeftWidth: 4, borderLeftColor: '#C9A84C',
  },
  versiculoDiaLabel: { fontSize: 13, color: '#C9A84C', fontWeight: '700', marginBottom: 10 },
  versiculoDiaTexto: {
    fontSize: 18, color: '#e8e8f0', lineHeight: 28, fontStyle: 'italic',
  },
  versiculoDiaRef: { fontSize: 14, color: '#888', marginTop: 12, fontWeight: '600' },
  btnLeer: {
    marginHorizontal: 16, backgroundColor: '#C9A84C',
    paddingVertical: 16, borderRadius: 14, alignItems: 'center', marginBottom: 24,
  },
  btnLeerText: { color: '#0f1923', fontSize: 17, fontWeight: '700' },
  seccionTitulo: {
    fontSize: 16, color: '#C9A84C', fontWeight: '700',
    marginLeft: 16, marginBottom: 12,
  },
  versiculoCard: {
    marginHorizontal: 16, marginBottom: 10,
    backgroundColor: '#1a2a3a', borderRadius: 12, padding: 16,
  },
  versiculoRef: { fontSize: 13, color: '#C9A84C', fontWeight: '600', marginBottom: 6 },
  versiculoTexto: { fontSize: 15, color: '#ccc', lineHeight: 22 },
});
