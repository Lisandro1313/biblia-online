const BASE_URL = 'https://bible-api.com';

export interface Versiculo {
  book_id: string;
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface CapituloResponse {
  reference: string;
  verses: Versiculo[];
  text: string;
  translation_id: string;
}

export async function getCapitulo(libroAbrev: string, capitulo: number): Promise<CapituloResponse> {
  const res = await fetch(`${BASE_URL}/${libroAbrev}+${capitulo}?translation=rvr1960`);
  if (!res.ok) throw new Error('No se pudo cargar el capítulo');
  return res.json();
}

export async function getVersiculo(referencia: string): Promise<CapituloResponse> {
  const res = await fetch(`${BASE_URL}/${encodeURIComponent(referencia)}?translation=rvr1960`);
  if (!res.ok) throw new Error('No se pudo cargar el versículo');
  return res.json();
}

// Versículos destacados hardcodeados para funcionar sin internet
export const VERSICULOS_DESTACADOS = [
  { ref: 'Juan 3:16', texto: 'Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.' },
  { ref: 'Filipenses 4:13', texto: 'Todo lo puedo en Cristo que me fortalece.' },
  { ref: 'Salmos 23:1', texto: 'El Señor es mi pastor; nada me faltará.' },
  { ref: 'Jeremías 29:11', texto: 'Porque yo sé los pensamientos que tengo acerca de vosotros, dice el Señor, pensamientos de paz, y no de mal.' },
  { ref: 'Proverbios 3:5', texto: 'Confía en el Señor con todo tu corazón, y no te apoyes en tu propia prudencia.' },
  { ref: 'Isaías 41:10', texto: 'No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios.' },
  { ref: 'Romanos 8:28', texto: 'Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien.' },
  { ref: 'Mateo 11:28', texto: 'Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.' },
  { ref: 'Salmos 46:1', texto: 'Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones.' },
  { ref: 'Josué 1:9', texto: 'Esfuérzate y sé valiente; no temas ni desmayes, porque el Señor tu Dios estará contigo.' },
];

export function getVersiculoDelDia() {
  const hoy = new Date();
  const idx = (hoy.getFullYear() * 365 + hoy.getMonth() * 30 + hoy.getDate()) % VERSICULOS_DESTACADOS.length;
  return VERSICULOS_DESTACADOS[idx];
}
