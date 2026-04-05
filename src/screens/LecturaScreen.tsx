import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  FlatList, Share, ActivityIndicator,
} from 'react-native';
import { getCapitulo, Versiculo } from '../data/bibliaApi';
import { useFavoritos } from '../context/FavoritosContext';
import type { StackScreenProps } from '@react-navigation/stack';
import type { BibliaStackParamList } from '../navigation/types';

type Props = StackScreenProps<BibliaStackParamList, 'Lectura'>;

export default function LecturaScreen({ route, navigation }: Props) {
  const { libro, capitulo } = route.params;
  const [versiculos, setVersiculos] = useState<Versiculo[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const { toggleFavorito, esFavorito } = useFavoritos();

  useEffect(() => {
    navigation.setOptions({ title: `${libro.abrev} ${capitulo}` });
    setCargando(true);
    setError(false);
    getCapitulo(libro.abrev, capitulo)
      .then(data => {
        setVersiculos(data.verses);
        setCargando(false);
      })
      .catch(() => {
        setError(true);
        setCargando(false);
      });
  }, [libro, capitulo]);

  const compartirVersiculo = (v: Versiculo) => {
    Share.share({
      message: `"${v.text.trim()}"\n— ${libro.nombre} ${capitulo}:${v.verse}\n\nDescargá Biblia RVR1960`,
    });
  };

  const irCapitulo = (delta: number) => {
    const nuevo = capitulo + delta;
    if (nuevo >= 1 && nuevo <= libro.capitulos) {
      navigation.replace('Lectura', { libro, capitulo: nuevo });
    }
  };

  return (
    <View style={styles.container}>
      {/* Controles */}
      <View style={styles.controles}>
        <TouchableOpacity onPress={() => setFontSize(s => Math.max(14, s - 2))} style={styles.ctrlBtn}>
          <Text style={styles.ctrlText}>A-</Text>
        </TouchableOpacity>
        <Text style={styles.ctrlRef}>{libro.nombre} {capitulo}</Text>
        <TouchableOpacity onPress={() => setFontSize(s => Math.min(28, s + 2))} style={styles.ctrlBtn}>
          <Text style={styles.ctrlText}>A+</Text>
        </TouchableOpacity>
      </View>

      {cargando && (
        <View style={styles.centrado}>
          <ActivityIndicator size="large" color="#C9A84C" />
          <Text style={styles.cargandoText}>Cargando...</Text>
        </View>
      )}

      {error && (
        <View style={styles.centrado}>
          <Text style={styles.errorText}>Sin conexión. Verificá tu internet.</Text>
        </View>
      )}

      {!cargando && !error && (
        <FlatList
          data={versiculos}
          keyExtractor={item => item.verse.toString()}
          contentContainerStyle={styles.lista}
          renderItem={({ item }) => {
            const ref = `${libro.nombre} ${capitulo}:${item.verse}`;
            const fav = esFavorito(ref);
            return (
              <View style={styles.versiculoRow}>
                <Text style={styles.versiculoNum}>{item.verse}</Text>
                <View style={styles.versiculoBody}>
                  <Text style={[styles.versiculoTexto, { fontSize }]}>{item.text.trim()}</Text>
                  <View style={styles.versiculoAcciones}>
                    <TouchableOpacity
                      onPress={() => toggleFavorito({ ref, texto: item.text.trim() })}
                    >
                      <Text style={{ fontSize: 20 }}>{fav ? '⭐' : '☆'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => compartirVersiculo(item)}>
                      <Text style={{ fontSize: 18 }}>📤</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
      )}

      {/* Navegación entre capítulos */}
      <View style={styles.navRow}>
        <TouchableOpacity
          style={[styles.navBtn, capitulo === 1 && styles.navBtnDisabled]}
          onPress={() => irCapitulo(-1)}
          disabled={capitulo === 1}
        >
          <Text style={styles.navBtnText}>‹ Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navBtn, capitulo === libro.capitulos && styles.navBtnDisabled]}
          onPress={() => irCapitulo(1)}
          disabled={capitulo === libro.capitulos}
        >
          <Text style={styles.navBtnText}>Siguiente ›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f1923' },
  controles: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 10,
    backgroundColor: '#1a2a3a', borderBottomWidth: 1, borderBottomColor: '#2a3a4a',
  },
  ctrlBtn: {
    backgroundColor: '#0f1923', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8,
  },
  ctrlText: { color: '#C9A84C', fontWeight: '700', fontSize: 15 },
  ctrlRef: { color: '#C9A84C', fontWeight: '700', fontSize: 16 },
  centrado: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  cargandoText: { color: '#888', fontSize: 15 },
  errorText: { color: '#E74C3C', fontSize: 16, textAlign: 'center', paddingHorizontal: 30 },
  lista: { paddingVertical: 12, paddingHorizontal: 16 },
  versiculoRow: {
    flexDirection: 'row', marginBottom: 16, gap: 10,
  },
  versiculoNum: {
    color: '#C9A84C', fontWeight: '700', fontSize: 13,
    minWidth: 28, paddingTop: 3,
  },
  versiculoBody: { flex: 1 },
  versiculoTexto: { color: '#e8e8f0', lineHeight: 28 },
  versiculoAcciones: {
    flexDirection: 'row', gap: 16, marginTop: 8, justifyContent: 'flex-end',
  },
  navRow: {
    flexDirection: 'row', gap: 12, padding: 12,
    backgroundColor: '#1a2a3a', borderTopWidth: 1, borderTopColor: '#2a3a4a',
  },
  navBtn: {
    flex: 1, backgroundColor: '#C9A84C',
    paddingVertical: 13, borderRadius: 12, alignItems: 'center',
  },
  navBtnDisabled: { backgroundColor: '#2a3a4a' },
  navBtnText: { color: '#0f1923', fontWeight: '700', fontSize: 15 },
});
