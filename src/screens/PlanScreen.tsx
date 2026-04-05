import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ScrollView, Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface DiaPlan {
  dia: number;
  lecturas: string[];
}

interface Plan {
  id: string;
  nombre: string;
  dias: number;
  descripcion: string;
  emoji: string;
  color: string;
  diasPlan: DiaPlan[];
}

const PLAN_30: DiaPlan[] = [
  { dia: 1, lecturas: ['Mateo 1-2'] },
  { dia: 2, lecturas: ['Mateo 3-4'] },
  { dia: 3, lecturas: ['Mateo 5-6'] },
  { dia: 4, lecturas: ['Mateo 7-8'] },
  { dia: 5, lecturas: ['Mateo 9-10'] },
  { dia: 6, lecturas: ['Mateo 11-12'] },
  { dia: 7, lecturas: ['Mateo 13-14'] },
  { dia: 8, lecturas: ['Mateo 15-16'] },
  { dia: 9, lecturas: ['Mateo 17-18'] },
  { dia: 10, lecturas: ['Mateo 19-20'] },
  { dia: 11, lecturas: ['Mateo 21-22'] },
  { dia: 12, lecturas: ['Mateo 23-24'] },
  { dia: 13, lecturas: ['Mateo 25-26'] },
  { dia: 14, lecturas: ['Mateo 27-28'] },
  { dia: 15, lecturas: ['Marcos 1-2'] },
  { dia: 16, lecturas: ['Marcos 3-4'] },
  { dia: 17, lecturas: ['Marcos 5-6'] },
  { dia: 18, lecturas: ['Marcos 7-8'] },
  { dia: 19, lecturas: ['Marcos 9-10'] },
  { dia: 20, lecturas: ['Marcos 11-12'] },
  { dia: 21, lecturas: ['Marcos 13-14'] },
  { dia: 22, lecturas: ['Marcos 15-16'] },
  { dia: 23, lecturas: ['Lucas 1-2'] },
  { dia: 24, lecturas: ['Lucas 3-4'] },
  { dia: 25, lecturas: ['Lucas 5-6'] },
  { dia: 26, lecturas: ['Lucas 7-8'] },
  { dia: 27, lecturas: ['Lucas 9-10'] },
  { dia: 28, lecturas: ['Lucas 11-12'] },
  { dia: 29, lecturas: ['Lucas 13-14'] },
  { dia: 30, lecturas: ['Lucas 15-16'] },
];

const PLAN_60: DiaPlan[] = Array.from({ length: 60 }, (_, i) => ({
  dia: i + 1,
  lecturas: i < 30 ? PLAN_30[i].lecturas : [`Lucas ${17 + (i - 30) * 2}-${18 + (i - 30) * 2}`],
}));

const PLAN_90: DiaPlan[] = Array.from({ length: 90 }, (_, i) => ({
  dia: i + 1,
  lecturas: i < 30 ? PLAN_30[i].lecturas : [`Juan ${(i - 30) + 1}`],
}));

const PLANES: Plan[] = [
  {
    id: 'nt30', nombre: 'Nuevo Testamento', dias: 30,
    descripcion: 'Los Evangelios en 30 días', emoji: '✝️', color: '#C9A84C',
    diasPlan: PLAN_30,
  },
  {
    id: 'nt60', nombre: 'Evangelios', dias: 60,
    descripcion: 'Los 4 Evangelios completos', emoji: '📖', color: '#4FC3F7',
    diasPlan: PLAN_60,
  },
  {
    id: 'biblia90', nombre: 'Biblia Completa', dias: 90,
    descripcion: 'AT y NT en 90 días', emoji: '🌟', color: '#4CAF50',
    diasPlan: PLAN_90,
  },
];

interface ProgresoPlanes {
  [planId: string]: {
    inicio: string;
    completados: number[];
  };
}

export default function PlanScreen() {
  const [progreso, setProgreso] = useState<ProgresoPlanes>({});
  const [planActivo, setPlanActivo] = useState<Plan | null>(null);
  const [modalPlan, setModalPlan] = useState<Plan | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('biblia_planes').then(raw => {
      if (raw) setProgreso(JSON.parse(raw));
    });
  }, []);

  const guardar = async (nuevo: ProgresoPlanes) => {
    setProgreso(nuevo);
    await AsyncStorage.setItem('biblia_planes', JSON.stringify(nuevo));
  };

  const iniciarPlan = async (plan: Plan) => {
    const nuevo: ProgresoPlanes = {
      ...progreso,
      [plan.id]: { inicio: new Date().toISOString(), completados: [] },
    };
    await guardar(nuevo);
    setPlanActivo(plan);
    setModalPlan(null);
  };

  const toggleDia = async (planId: string, dia: number) => {
    const p = progreso[planId];
    if (!p) return;
    const completados = p.completados.includes(dia)
      ? p.completados.filter(d => d !== dia)
      : [...p.completados, dia];
    await guardar({ ...progreso, [planId]: { ...p, completados } });
  };

  const planSeleccionado = planActivo ?? PLANES.find(p => progreso[p.id]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.titulo}>📅 Planes de Lectura</Text>
        <Text style={styles.subtitulo}>Leé la Biblia de forma sistemática</Text>

        {/* Selector de planes */}
        <View style={styles.planesRow}>
          {PLANES.map(plan => {
            const p = progreso[plan.id];
            const completados = p?.completados.length ?? 0;
            const activo = planSeleccionado?.id === plan.id;
            return (
              <TouchableOpacity
                key={plan.id}
                style={[styles.planCard, activo && { borderColor: plan.color }]}
                onPress={() => {
                  if (p) setPlanActivo(plan);
                  else setModalPlan(plan);
                }}
              >
                <Text style={styles.planEmoji}>{plan.emoji}</Text>
                <Text style={[styles.planNombre, { color: plan.color }]}>{plan.nombre}</Text>
                <Text style={styles.planDias}>{plan.dias} días</Text>
                {p ? (
                  <Text style={styles.planPct}>
                    {completados}/{plan.dias}
                  </Text>
                ) : (
                  <Text style={styles.planIniciar}>Iniciar</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Detalle del plan activo */}
        {planSeleccionado && progreso[planSeleccionado.id] && (() => {
          const p = progreso[planSeleccionado.id];
          const completados = p.completados;
          const pct = Math.round((completados.length / planSeleccionado.dias) * 100);
          const diaActual = completados.length + 1;

          return (
            <View style={styles.detallePlan}>
              <View style={styles.detalleHeader}>
                <Text style={[styles.detalleNombre, { color: planSeleccionado.color }]}>
                  {planSeleccionado.emoji} {planSeleccionado.nombre}
                </Text>
                <Text style={styles.detallePct}>{pct}%</Text>
              </View>

              <View style={styles.progresoBarFondo}>
                <View style={[
                  styles.progresoBarRelleno,
                  { width: `${pct}%`, backgroundColor: planSeleccionado.color },
                ]} />
              </View>
              <Text style={styles.progresoTexto}>{completados.length} de {planSeleccionado.dias} días completados</Text>

              <Text style={styles.diasTitulo}>Lecturas diarias</Text>
              {planSeleccionado.diasPlan.map(dia => {
                const hecho = completados.includes(dia.dia);
                const esDiaActual = dia.dia === diaActual && !hecho;
                return (
                  <TouchableOpacity
                    key={dia.dia}
                    style={[
                      styles.diaFila,
                      hecho && styles.diaFilaHecha,
                      esDiaActual && { borderColor: planSeleccionado.color },
                    ]}
                    onPress={() => toggleDia(planSeleccionado.id, dia.dia)}
                  >
                    <View style={[styles.diaCheck, hecho && { backgroundColor: planSeleccionado.color, borderColor: planSeleccionado.color }]}>
                      {hecho && <Text style={styles.diaCheckIcon}>✓</Text>}
                    </View>
                    <View style={styles.diaInfo}>
                      <Text style={[styles.diaNro, esDiaActual && { color: planSeleccionado.color }]}>
                        Día {dia.dia} {esDiaActual ? '← hoy' : ''}
                      </Text>
                      <Text style={[styles.diaLectura, hecho && { textDecorationLine: 'line-through', color: '#555' }]}>
                        {dia.lecturas.join(' · ')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })()}
      </ScrollView>

      {/* Modal iniciar plan */}
      <Modal visible={!!modalPlan} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {modalPlan && (
              <>
                <Text style={styles.modalEmoji}>{modalPlan.emoji}</Text>
                <Text style={[styles.modalTitulo, { color: modalPlan.color }]}>{modalPlan.nombre}</Text>
                <Text style={styles.modalDesc}>{modalPlan.descripcion}</Text>
                <Text style={styles.modalDias}>{modalPlan.dias} días · una lectura diaria</Text>
                <TouchableOpacity
                  style={[styles.modalBtnIniciar, { backgroundColor: modalPlan.color }]}
                  onPress={() => iniciarPlan(modalPlan)}
                >
                  <Text style={styles.modalBtnIniciarText}>Comenzar plan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalBtnCancelar} onPress={() => setModalPlan(null)}>
                  <Text style={{ color: '#666' }}>Cancelar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f1923' },
  scroll: { padding: 16, paddingBottom: 40 },
  titulo: { fontSize: 22, fontWeight: '800', color: '#C9A84C', marginBottom: 4 },
  subtitulo: { fontSize: 14, color: '#666', marginBottom: 20 },

  planesRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  planCard: {
    flex: 1, backgroundColor: '#1a2a3a', borderRadius: 16,
    padding: 14, alignItems: 'center',
    borderWidth: 2, borderColor: '#2a3a4a',
  },
  planEmoji: { fontSize: 28, marginBottom: 6 },
  planNombre: { fontSize: 12, fontWeight: '700', textAlign: 'center' },
  planDias: { color: '#555', fontSize: 11, marginTop: 3 },
  planPct: { color: '#aaa', fontSize: 12, fontWeight: '600', marginTop: 4 },
  planIniciar: { color: '#C9A84C', fontSize: 11, marginTop: 4, fontWeight: '600' },

  detallePlan: { backgroundColor: '#1a2a3a', borderRadius: 18, padding: 16 },
  detalleHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  detalleNombre: { fontSize: 17, fontWeight: '800' },
  detallePct: { color: '#aaa', fontSize: 18, fontWeight: '700' },
  progresoBarFondo: { height: 8, backgroundColor: '#0f1923', borderRadius: 4, marginBottom: 6, overflow: 'hidden' },
  progresoBarRelleno: { height: '100%', borderRadius: 4 },
  progresoTexto: { color: '#666', fontSize: 12, marginBottom: 16 },
  diasTitulo: { color: '#888', fontSize: 13, fontWeight: '600', marginBottom: 10 },

  diaFila: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#0f1923', borderRadius: 12, padding: 12,
    marginBottom: 8, borderWidth: 1, borderColor: '#2a3a4a',
  },
  diaFilaHecha: { opacity: 0.6 },
  diaCheck: {
    width: 26, height: 26, borderRadius: 13,
    borderWidth: 2, borderColor: '#2a3a4a',
    alignItems: 'center', justifyContent: 'center',
  },
  diaCheckIcon: { color: '#0f1923', fontWeight: '900', fontSize: 14 },
  diaInfo: { flex: 1 },
  diaNro: { color: '#888', fontSize: 12 },
  diaLectura: { color: '#ddd', fontSize: 14, fontWeight: '600', marginTop: 2 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'flex-end' },
  modalCard: {
    backgroundColor: '#1a2a3a', borderTopLeftRadius: 28, borderTopRightRadius: 28,
    padding: 28, alignItems: 'center', gap: 8,
  },
  modalEmoji: { fontSize: 52 },
  modalTitulo: { fontSize: 22, fontWeight: '800' },
  modalDesc: { color: '#aaa', fontSize: 15, textAlign: 'center' },
  modalDias: { color: '#666', fontSize: 13 },
  modalBtnIniciar: {
    width: '100%', paddingVertical: 16, borderRadius: 14,
    alignItems: 'center', marginTop: 12,
  },
  modalBtnIniciarText: { color: '#0f1923', fontWeight: '800', fontSize: 16 },
  modalBtnCancelar: {
    paddingVertical: 12, paddingHorizontal: 24,
  },
});
