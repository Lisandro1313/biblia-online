import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  FlatList, ActivityIndicator, Keyboard,
} from 'react-native';
import { VERSICULOS_DESTACADOS } from '../data/bibliaApi';

interface Resultado {
  ref: string;
  texto: string;
  local: boolean;
}

export default function BusquedaScreen() {
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState<Resultado[]>([]);
  const [cargando, setCargando] = useState(false);
  const [buscado, setBuscado] = useState(false);

  const buscar = async () => {
    if (!query.trim()) return;
    Keyboard.dismiss();
    setBuscado(true);
    setCargando(true);
    setResultados([]);

    // Búsqueda local en versículos populares
    const termino = query.toLowerCase();
    const locales: Resultado[] = VERSICULOS_DESTACADOS
      .filter(v => v.texto.toLowerCase().includes(termino) || v.ref.toLowerCase().includes(termino))
      .map(v => ({ ref: v.ref, texto: v.texto, local: true }));

    setResultados(locales);
    setCargando(false);
  };

  const limpiar = () => {
    setQuery('');
    setResultados([]);
    setBuscado(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder="Buscar en la Biblia..."
          placeholderTextColor="#555"
          returnKeyType="search"
          onSubmitEditing={buscar}
          autoCorrect={false}
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={limpiar} style={styles.limpiarBtn}>
            <Text style={styles.limpiarText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity style={styles.btnBuscar} onPress={buscar}>
        <Text style={styles.btnBuscarText}>🔍 Buscar</Text>
      </TouchableOpacity>

      {cargando && (
        <View style={styles.centrado}>
          <ActivityIndicator color="#C9A84C" />
        </View>
      )}

      {!cargando && buscado && resultados.length === 0 && (
        <View style={styles.centrado}>
          <Text style={styles.sinResultados}>Sin resultados para "{query}"</Text>
          <Text style={styles.sinResultadosSub}>Probá con otra palabra o referencia</Text>
        </View>
      )}

      {!cargando && resultados.length > 0 && (
        <FlatList
          data={resultados}
          keyExtractor={(item, i) => i.toString()}
          contentContainerStyle={styles.lista}
          ListHeaderComponent={
            <Text style={styles.contadorResultados}>
              {resultados.length} resultado{resultados.length !== 1 ? 's' : ''} para "{query}"
            </Text>
          }
          renderItem={({ item }) => (
            <View style={styles.resultadoCard}>
              <Text style={styles.resultadoRef}>{item.ref}</Text>
              <Text style={styles.resultadoTexto}>{item.texto}</Text>
            </View>
          )}
        />
      )}

      {!buscado && (
        <View style={styles.sugerencias}>
          <Text style={styles.sugerenciasTitle}>Palabras frecuentes</Text>
          <View style={styles.chips}>
            {['amor', 'paz', 'fe', 'esperanza', 'Dios', 'poder', 'vida', 'luz'].map(p => (
              <TouchableOpacity
                key={p}
                style={styles.chip}
                onPress={() => { setQuery(p); }}
              >
                <Text style={styles.chipText}>{p}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f1923', padding: 16 },
  searchBox: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#1a2a3a', borderRadius: 14,
    borderWidth: 1, borderColor: '#2a3a4a',
    paddingHorizontal: 14, marginBottom: 10,
  },
  input: { flex: 1, color: '#fff', fontSize: 16, paddingVertical: 14 },
  limpiarBtn: { padding: 6 },
  limpiarText: { color: '#666', fontSize: 16 },
  btnBuscar: {
    backgroundColor: '#C9A84C', borderRadius: 14,
    paddingVertical: 14, alignItems: 'center', marginBottom: 16,
  },
  btnBuscarText: { color: '#0f1923', fontWeight: '700', fontSize: 16 },
  centrado: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  sinResultados: { color: '#aaa', fontSize: 17, textAlign: 'center' },
  sinResultadosSub: { color: '#555', fontSize: 14 },
  lista: { paddingBottom: 40 },
  contadorResultados: { color: '#888', fontSize: 13, marginBottom: 12 },
  resultadoCard: {
    backgroundColor: '#1a2a3a', borderRadius: 14, padding: 16,
    marginBottom: 10, borderLeftWidth: 3, borderLeftColor: '#C9A84C',
  },
  resultadoRef: { color: '#C9A84C', fontWeight: '700', fontSize: 13, marginBottom: 6 },
  resultadoTexto: { color: '#ddd', fontSize: 15, lineHeight: 22 },
  sugerencias: { marginTop: 16 },
  sugerenciasTitle: { color: '#555', fontSize: 13, marginBottom: 10 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    backgroundColor: '#1a2a3a', borderRadius: 20,
    paddingHorizontal: 16, paddingVertical: 9,
    borderWidth: 1, borderColor: '#2a3a4a',
  },
  chipText: { color: '#C9A84C', fontSize: 14 },
});
