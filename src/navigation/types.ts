import type { Libro } from '../data/libros';

export type BibliaStackParamList = {
  Inicio: undefined;
  Libros: undefined;
  Capitulos: { libro: Libro };
  Lectura: { libro: Libro; capitulo: number };
};
