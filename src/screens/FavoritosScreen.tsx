import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Share } from 'react-native';
import { useFavoritos } from '../context/FavoritosContext';

export default function FavoritosScreen() {
  const { favoritos, toggleFavorito } = useFavoritos();

  if (favoritos.length === 0) {
    return (
      <View style={styles.vacio}>
        <Text style={styles.vacioEmoji}>☆</Text>
        <Text style={styles.vacioTexto}>No tenés favoritos aún</Text>
        <Text style={styles.vacioSub}>Tocá la estrella en un versículo para guardarlo</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mis favoritos</Text>
      <FlatList
        data={favoritos}
        keyExtractor={item => item.ref}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.ref}>{item.ref}</Text>
            <Text style={styles.texto}>{item.texto}</Text>
            <View style={styles.acciones}>
              <TouchableOpacity onPress={() => Share.share({ message: `"${item.texto}"\n— ${item.ref}` })}>
                <Text style={styles.accionBtn}>📤 Compartir</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => toggleFavorito(item)}>
                <Text style={styles.accionBtnEliminar}>🗑 Quitar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f1923' },
  titulo: {
    fontSize: 22, fontWeight: 'bold', color: '#C9A84C',
    paddingHorizontal: 16, paddingTop: 20, paddingBottom: 12,
  },
  card: {
    marginHorizontal: 16, marginBottom: 12,
    backgroundColor: '#1a2a3a', borderRadius: 14, padding: 18,
    borderLeftWidth: 3, borderLeftColor: '#C9A84C',
  },
  ref: { color: '#C9A84C', fontWeight: '700', fontSize: 14, marginBottom: 8 },
  texto: { color: '#e8e8f0', fontSize: 16, lineHeight: 24, fontStyle: 'italic' },
  acciones: { flexDirection: 'row', gap: 20, marginTop: 12 },
  accionBtn: { color: '#C9A84C', fontSize: 14, fontWeight: '600' },
  accionBtnEliminar: { color: '#E74C3C', fontSize: 14, fontWeight: '600' },
  vacio: { flex: 1, backgroundColor: '#0f1923', alignItems: 'center', justifyContent: 'center' },
  vacioEmoji: { fontSize: 60, color: '#C9A84C', marginBottom: 16 },
  vacioTexto: { fontSize: 20, color: '#ccc', fontWeight: '600' },
  vacioSub: { fontSize: 14, color: '#666', marginTop: 8, textAlign: 'center', paddingHorizontal: 40 },
});
