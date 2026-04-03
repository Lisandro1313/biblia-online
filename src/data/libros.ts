export interface Libro {
  id: string;
  nombre: string;
  testamento: 'AT' | 'NT';
  capitulos: number;
  abrev: string;
}

export const LIBROS: Libro[] = [
  // ANTIGUO TESTAMENTO
  { id: 'genesis', nombre: 'Génesis', testamento: 'AT', capitulos: 50, abrev: 'Gn' },
  { id: 'exodo', nombre: 'Éxodo', testamento: 'AT', capitulos: 40, abrev: 'Ex' },
  { id: 'levitico', nombre: 'Levítico', testamento: 'AT', capitulos: 27, abrev: 'Lv' },
  { id: 'numeros', nombre: 'Números', testamento: 'AT', capitulos: 36, abrev: 'Nm' },
  { id: 'deuteronomio', nombre: 'Deuteronomio', testamento: 'AT', capitulos: 34, abrev: 'Dt' },
  { id: 'josue', nombre: 'Josué', testamento: 'AT', capitulos: 24, abrev: 'Jos' },
  { id: 'jueces', nombre: 'Jueces', testamento: 'AT', capitulos: 21, abrev: 'Jue' },
  { id: 'rut', nombre: 'Rut', testamento: 'AT', capitulos: 4, abrev: 'Rt' },
  { id: '1samuel', nombre: '1 Samuel', testamento: 'AT', capitulos: 31, abrev: '1S' },
  { id: '2samuel', nombre: '2 Samuel', testamento: 'AT', capitulos: 24, abrev: '2S' },
  { id: '1reyes', nombre: '1 Reyes', testamento: 'AT', capitulos: 22, abrev: '1R' },
  { id: '2reyes', nombre: '2 Reyes', testamento: 'AT', capitulos: 25, abrev: '2R' },
  { id: '1cronicas', nombre: '1 Crónicas', testamento: 'AT', capitulos: 29, abrev: '1Cr' },
  { id: '2cronicas', nombre: '2 Crónicas', testamento: 'AT', capitulos: 36, abrev: '2Cr' },
  { id: 'esdras', nombre: 'Esdras', testamento: 'AT', capitulos: 10, abrev: 'Esd' },
  { id: 'nehemias', nombre: 'Nehemías', testamento: 'AT', capitulos: 13, abrev: 'Neh' },
  { id: 'ester', nombre: 'Ester', testamento: 'AT', capitulos: 10, abrev: 'Est' },
  { id: 'job', nombre: 'Job', testamento: 'AT', capitulos: 42, abrev: 'Job' },
  { id: 'salmos', nombre: 'Salmos', testamento: 'AT', capitulos: 150, abrev: 'Sal' },
  { id: 'proverbios', nombre: 'Proverbios', testamento: 'AT', capitulos: 31, abrev: 'Pr' },
  { id: 'eclesiastes', nombre: 'Eclesiastés', testamento: 'AT', capitulos: 12, abrev: 'Ec' },
  { id: 'cantares', nombre: 'Cantares', testamento: 'AT', capitulos: 8, abrev: 'Cnt' },
  { id: 'isaias', nombre: 'Isaías', testamento: 'AT', capitulos: 66, abrev: 'Is' },
  { id: 'jeremias', nombre: 'Jeremías', testamento: 'AT', capitulos: 52, abrev: 'Jr' },
  { id: 'lamentaciones', nombre: 'Lamentaciones', testamento: 'AT', capitulos: 5, abrev: 'Lm' },
  { id: 'ezequiel', nombre: 'Ezequiel', testamento: 'AT', capitulos: 48, abrev: 'Ez' },
  { id: 'daniel', nombre: 'Daniel', testamento: 'AT', capitulos: 12, abrev: 'Dn' },
  { id: 'oseas', nombre: 'Oseas', testamento: 'AT', capitulos: 14, abrev: 'Os' },
  { id: 'joel', nombre: 'Joel', testamento: 'AT', capitulos: 3, abrev: 'Jl' },
  { id: 'amos', nombre: 'Amós', testamento: 'AT', capitulos: 9, abrev: 'Am' },
  { id: 'abdias', nombre: 'Abdías', testamento: 'AT', capitulos: 1, abrev: 'Abd' },
  { id: 'jonas', nombre: 'Jonás', testamento: 'AT', capitulos: 4, abrev: 'Jon' },
  { id: 'miqueas', nombre: 'Miqueas', testamento: 'AT', capitulos: 7, abrev: 'Mi' },
  { id: 'nahum', nombre: 'Nahúm', testamento: 'AT', capitulos: 3, abrev: 'Nah' },
  { id: 'habacuc', nombre: 'Habacuc', testamento: 'AT', capitulos: 3, abrev: 'Hab' },
  { id: 'sofonias', nombre: 'Sofonías', testamento: 'AT', capitulos: 3, abrev: 'Sof' },
  { id: 'hageo', nombre: 'Hageo', testamento: 'AT', capitulos: 2, abrev: 'Hag' },
  { id: 'zacarias', nombre: 'Zacarías', testamento: 'AT', capitulos: 14, abrev: 'Zac' },
  { id: 'malaquias', nombre: 'Malaquías', testamento: 'AT', capitulos: 4, abrev: 'Mal' },
  // NUEVO TESTAMENTO
  { id: 'mateo', nombre: 'Mateo', testamento: 'NT', capitulos: 28, abrev: 'Mt' },
  { id: 'marcos', nombre: 'Marcos', testamento: 'NT', capitulos: 16, abrev: 'Mr' },
  { id: 'lucas', nombre: 'Lucas', testamento: 'NT', capitulos: 24, abrev: 'Lc' },
  { id: 'juan', nombre: 'Juan', testamento: 'NT', capitulos: 21, abrev: 'Jn' },
  { id: 'hechos', nombre: 'Hechos', testamento: 'NT', capitulos: 28, abrev: 'Hch' },
  { id: 'romanos', nombre: 'Romanos', testamento: 'NT', capitulos: 16, abrev: 'Ro' },
  { id: '1corintios', nombre: '1 Corintios', testamento: 'NT', capitulos: 16, abrev: '1Co' },
  { id: '2corintios', nombre: '2 Corintios', testamento: 'NT', capitulos: 13, abrev: '2Co' },
  { id: 'galatas', nombre: 'Gálatas', testamento: 'NT', capitulos: 6, abrev: 'Ga' },
  { id: 'efesios', nombre: 'Efesios', testamento: 'NT', capitulos: 6, abrev: 'Ef' },
  { id: 'filipenses', nombre: 'Filipenses', testamento: 'NT', capitulos: 4, abrev: 'Fil' },
  { id: 'colosenses', nombre: 'Colosenses', testamento: 'NT', capitulos: 4, abrev: 'Col' },
  { id: '1tesalonicenses', nombre: '1 Tesalonicenses', testamento: 'NT', capitulos: 5, abrev: '1Ts' },
  { id: '2tesalonicenses', nombre: '2 Tesalonicenses', testamento: 'NT', capitulos: 3, abrev: '2Ts' },
  { id: '1timoteo', nombre: '1 Timoteo', testamento: 'NT', capitulos: 6, abrev: '1Ti' },
  { id: '2timoteo', nombre: '2 Timoteo', testamento: 'NT', capitulos: 4, abrev: '2Ti' },
  { id: 'tito', nombre: 'Tito', testamento: 'NT', capitulos: 3, abrev: 'Tit' },
  { id: 'filemon', nombre: 'Filemón', testamento: 'NT', capitulos: 1, abrev: 'Flm' },
  { id: 'hebreos', nombre: 'Hebreos', testamento: 'NT', capitulos: 13, abrev: 'He' },
  { id: 'santiago', nombre: 'Santiago', testamento: 'NT', capitulos: 5, abrev: 'Stg' },
  { id: '1pedro', nombre: '1 Pedro', testamento: 'NT', capitulos: 5, abrev: '1P' },
  { id: '2pedro', nombre: '2 Pedro', testamento: 'NT', capitulos: 3, abrev: '2P' },
  { id: '1juan', nombre: '1 Juan', testamento: 'NT', capitulos: 5, abrev: '1Jn' },
  { id: '2juan', nombre: '2 Juan', testamento: 'NT', capitulos: 1, abrev: '2Jn' },
  { id: '3juan', nombre: '3 Juan', testamento: 'NT', capitulos: 1, abrev: '3Jn' },
  { id: 'judas', nombre: 'Judas', testamento: 'NT', capitulos: 1, abrev: 'Jud' },
  { id: 'apocalipsis', nombre: 'Apocalipsis', testamento: 'NT', capitulos: 22, abrev: 'Ap' },
];

export type BibliaData = {
  [libroId: string]: {
    [capitulo: number]: string[];
  };
};
