// src/data/palmares.ts
export interface Campeon {
  año: number;
  nombre: string;
  era: string;
  edicion: number;
  categoria?: "masculino" | "femenino";
}
export interface EraCfg { name: string; period: string }
export interface RecRecord { nombre: string; victorias: number; periodo: string; era: string }

export const campeonesData: Campeon[] = [
  // Era Pionera (1922-1940) - 18 competencias
  { año: 1922, nombre: "Eugenio Gret", era: "pionera", edicion: 1 },
  { año: 1923, nombre: "Eugenio Gret", era: "pionera", edicion: 2 },
  { año: 1924, nombre: "Cosme Saavedra", era: "pionera", edicion: 3 },
  { año: 1925, nombre: "Cosme Saavedra", era: "pionera", edicion: 4 },
  { año: 1927, nombre: "Cosme Saavedra", era: "pionera", edicion: 5 },
  { año: 1928, nombre: "Cosme Saavedra", era: "pionera", edicion: 6 },
  { año: 1929, nombre: "Cosme Saavedra", era: "pionera", edicion: 7 },
  { año: 1930, nombre: "Cosme Saavedra", era: "pionera", edicion: 8 },
  { año: 1931, nombre: "Francisco Rodríguez", era: "pionera", edicion: 9 },
  { año: 1932, nombre: "Remigio Saavedra", era: "pionera", edicion: 10 },
  { año: 1933, nombre: "Mario Stefani", era: "pionera", edicion: 11 },
  { año: 1934, nombre: "Remigio Saavedra", era: "pionera", edicion: 12 },
  { año: 1935, nombre: "Mario Mathieu", era: "pionera", edicion: 13 },
  { año: 1936, nombre: "Mario Mathieu", era: "pionera", edicion: 14 },
  { año: 1937, nombre: "José González", era: "pionera", edicion: 15 },
  { año: 1938, nombre: "Mario Mathieu", era: "pionera", edicion: 16 },
  { año: 1939, nombre: "Mario Stefani", era: "pionera", edicion: 17 },
  { año: 1940, nombre: "Mario Mathieu", era: "pionera", edicion: 18 },

  // Renacimiento (1947-1961) - 14 competencias
  { año: 1947, nombre: "Óscar Giacché", era: "renacimiento", edicion: 19 },
  { año: 1948, nombre: "Miguel Sevillano", era: "renacimiento", edicion: 20 },
  { año: 1949, nombre: "Ceferino Perone", era: "renacimiento", edicion: 21 },
  { año: 1950, nombre: "Óscar Muleiro", era: "renacimiento", edicion: 22 },
  { año: 1951, nombre: "Saúl Crispin", era: "renacimiento", edicion: 23 },
  { año: 1952, nombre: "Dante Benvenuti", era: "renacimiento", edicion: 24 },
  { año: 1953, nombre: "Alfredo Figgini", era: "renacimiento", edicion: 25 },
  { año: 1954, nombre: "Humberto Varisco", era: "renacimiento", edicion: 26 },
  { año: 1956, nombre: "Rodolfo Caccavo", era: "renacimiento", edicion: 27 },
  { año: 1957, nombre: "Carlos Vázquez", era: "renacimiento", edicion: 28 },
  { año: 1958, nombre: "Ricardo Senn", era: "renacimiento", edicion: 29 },
  { año: 1959, nombre: "Duilio Biganzoli", era: "renacimiento", edicion: 30 },
  { año: 1960, nombre: "Carlos Vázquez", era: "renacimiento", edicion: 31 },
  { año: 1961, nombre: "Marcos Spaggiari", era: "renacimiento", edicion: 32 },

  // Era Moderna (1964-1983) - 15 competencias
  { año: 1964, nombre: "Carlos Álvarez", era: "moderna", edicion: 33 },
  { año: 1965, nombre: "Carlos Álvarez", era: "moderna", edicion: 34 },
  { año: 1966, nombre: "Eduardo Sánchez", era: "moderna", edicion: 35 },
  { año: 1967, nombre: "Héctor Gómez", era: "moderna", edicion: 36 },
  { año: 1968, nombre: "Saúl Alcántara", era: "moderna", edicion: 37 },
  { año: 1969, nombre: "Raúl Gómez", era: "moderna", edicion: 38 },
  { año: 1970, nombre: "Rodolfo Taddeo", era: "moderna", edicion: 39 },
  { año: 1971, nombre: "Raúl Gómez", era: "moderna", edicion: 40 },
  { año: 1972, nombre: "Ismael Torres", era: "moderna", edicion: 41 },
  { año: 1973, nombre: "Osvaldo Benvenuti", era: "moderna", edicion: 42 },
  { año: 1974, nombre: "Ricardo Jurado", era: "moderna", edicion: 43 },
  { año: 1975, nombre: "Oswaldo Frossasco", era: "moderna", edicion: 44 },
  { año: 1980, nombre: "Ricardo Jurado", era: "moderna", edicion: 45 },
  { año: 1981, nombre: "Omar Richeze", era: "moderna", edicion: 46 },
  { año: 1982, nombre: "Juan Carlos Ruarte", era: "moderna", edicion: 47 },

  // Era Contemporánea (1984-2010) - 27 competencias
  { año: 1984, nombre: "Luis Moyano", era: "contemporanea", edicion: 48 },
  { año: 1985, nombre: "Carlos Bodei", era: "contemporanea", edicion: 49 },
  { año: 1986, nombre: "Armando Robledo", era: "contemporanea", edicion: 50 },
  { año: 1987, nombre: "Alejandro Carrusca", era: "contemporanea", edicion: 51 },
  { año: 1988, nombre: "Marcelo Alexandre", era: "contemporanea", edicion: 52 },
  { año: 1989, nombre: "Jorge Sebastía", era: "contemporanea", edicion: 53 },
  { año: 1990, nombre: "Adrián García", era: "contemporanea", edicion: 54 },
  { año: 1991, nombre: "Marcelo Alexandre", era: "contemporanea", edicion: 55 },
  { año: 1992, nombre: "Luis Biera", era: "contemporanea", edicion: 56 },
  { año: 1993, nombre: "Pablo Pérez", era: "contemporanea", edicion: 57 },
  { año: 1994, nombre: "Rubén Priede", era: "contemporanea", edicion: 58 },
  { año: 1995, nombre: "Rubén Pegorín", era: "contemporanea", edicion: 59 },
  { año: 1996, nombre: "Gustavo Artacho", era: "contemporanea", edicion: 60 },
  { año: 1997, nombre: "Juan Curuchet", era: "contemporanea", edicion: 61 },
  { año: 1998, nombre: "Juan Curuchet", era: "contemporanea", edicion: 62 },
  { año: 1999, nombre: "Walter Pérez", era: "contemporanea", edicion: 63 },
  { año: 2000, nombre: "Juan Curuchet", era: "contemporanea", edicion: 64 },
  { año: 2001, nombre: "Edgardo Simon", era: "contemporanea", edicion: 65 },
  { año: 2002, nombre: "Ángel Darío Colla", era: "contemporanea", edicion: 66 },
  { año: 2003, nombre: "Juan Curuchet", era: "contemporanea", edicion: 67 },
  { año: 2004, nombre: "Alejandro González", era: "contemporanea", edicion: 68 },
  { año: 2005, nombre: "Pedro Prieto", era: "contemporanea", edicion: 69 },
  { año: 2006, nombre: "Matías Médici", era: "contemporanea", edicion: 70 },
  { año: 2007, nombre: "Ángel Darío Colla", era: "contemporanea", edicion: 71 },
  { año: 2008, nombre: "Gerardo Fernández", era: "contemporanea", edicion: 72 },
  { año: 2009, nombre: "Daniel Díaz", era: "contemporanea", edicion: 73 },
  { año: 2010, nombre: "Román Mastrángelo", era: "contemporanea", edicion: 74 },

  // Era Digital (2011-2019) - 9 competencias
  { año: 2011, nombre: "Leandro Messineo", era: "digital", edicion: 75 },
  { año: 2012, nombre: "Laureano Rosas", era: "digital", edicion: 76 },
  { año: 2013, nombre: "Fernando Antogna", era: "digital", edicion: 77 },
  { año: 2014, nombre: "Laureano Rosas", era: "digital", edicion: 78 },
  { año: 2015, nombre: "Juan Melivilo", era: "digital", edicion: 79 },
  { año: 2016, nombre: "Laureano Rosas", era: "digital", edicion: 80 },
  { año: 2017, nombre: "Román Mastrángelo", era: "digital", edicion: 81 },
  { año: 2018, nombre: "Julián Barrientos", era: "digital", edicion: 82 },
  { año: 2019, nombre: "Aníbal Borrajo", era: "digital", edicion: 83 },

  // Era Post-Pandemia (2022-2025) - 4 competencias
  { año: 2022, nombre: "Elbio Alborzen", era: "postpandemia", edicion: 85, categoria: "masculino" },
  { año: 2023, nombre: "Sergio Fredes", era: "postpandemia", edicion: 86, categoria: "masculino" },
  { año: 2023, nombre: "Maribel Aguirre", era: "postpandemia", edicion: 1, categoria: "femenino" },
  { año: 2024, nombre: "Omar Salim Azzem", era: "postpandemia", edicion: 87, categoria: "masculino" },
  { año: 2024, nombre: "Maribel Aguirre", era: "postpandemia", edicion: 2, categoria: "femenino" },
  { año: 2025, nombre: "Nicolás Traico", era: "postpandemia", edicion: 88, categoria: "masculino" },
];

export const erasConfig: Record<string, EraCfg> = {
  pionera: { name: "Era Pionera", period: "1922-1940" },
  renacimiento: { name: "Renacimiento", period: "1947-1961" },
  moderna: { name: "Era Moderna", period: "1964-1983" },
  contemporanea: { name: "Contemporánea", period: "1984-2010" },
  digital: { name: "Era Digital", period: "2011-2019" },
  postpandemia: { name: "Post-Pandemia", period: "2022-2025" },
};

export const recordCampeones: RecRecord[] = [
  { nombre: "Cosme Saavedra", victorias: 6, periodo: "1924-1930", era: "pionera" },
  { nombre: "Mario Mathieu", victorias: 5, periodo: "1935-1942", era: "pionera" },
  { nombre: "Juan Curuchet", victorias: 4, periodo: "1997-2003", era: "contemporanea" },
  { nombre: "Laureano Rosas", victorias: 3, periodo: "2012-2016", era: "digital" },
];

export const recordEtapas = [
  { nombre: "Ángel Darío Colla", etapas: 29, destacado: true },
  { nombre: "Laureano Rosas", etapas: 23, destacado: false },
  { nombre: "Fernando Antogna", etapas: 10, destacado: false },
  { nombre: "Juan Curuchet", etapas: 7, destacado: false },
  { nombre: "Walter Pérez", etapas: 7, destacado: false },
];

// Conveniencia para "Nueva Generación"
export const nuevaGeneracionData: Campeon[] = [
  campeonesData.find((c) => c.año === 2025 && c.categoria === "masculino"),
  campeonesData.find((c) => c.año === 2024 && c.categoria === "femenino"),
  campeonesData.find((c) => c.año === 2024 && c.categoria === "masculino"),
  campeonesData.find((c) => c.año === 2023 && c.categoria === "femenino"),
  campeonesData.find((c) => c.año === 2023 && c.categoria === "masculino"),
  campeonesData.find((c) => c.año === 2022 && c.categoria === "masculino"),
].filter(Boolean) as Campeon[];
