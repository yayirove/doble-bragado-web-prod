import React, { useState, useMemo, useEffect } from 'react';
import { X, Trophy, Star, Award } from 'lucide-react';

/**
 * Props:
 * - embedded?: boolean  -> cuando true, NO renderiza su overlay/trigger y muestra solo el contenido (header+filtros+grid+footer)
 * - defaultEra?: 'todas' | 'pionera' | 'renacimiento' | 'moderna' | 'contemporanea' | 'digital' | 'postpandemia'
 */
const TimelineGanadores = ({ embedded = false, defaultEra = 'todas' }) => {
  const [isOpen, setIsOpen] = useState(embedded ? true : false);
  const [selectedEra, setSelectedEra] = useState(defaultEra);

  // Data (contenido intacto)
  const allData = [
    {año: 1922, corredor: "Eugenio Gret", edicion: 1, tipo: "masculina"},
    {año: 1923, corredor: "Eugenio Gret", edicion: 2, tipo: "masculina"},
    {año: 1924, corredor: "Cosme Saavedra", edicion: 3, tipo: "masculina"},
    {año: 1925, corredor: "Cosme Saavedra", edicion: 4, tipo: "masculina"},
    {año: 1926, corredor: "No se disputó", edicion: null, tipo: "masculina"},
    {año: 1927, corredor: "Cosme Saavedra", edicion: 5, tipo: "masculina"},
    {año: 1928, corredor: "Cosme Saavedra", edicion: 6, tipo: "masculina"},
    {año: 1929, corredor: "Cosme Saavedra", edicion: 7, tipo: "masculina"},
    {año: 1930, corredor: "Cosme Saavedra", edicion: 8, tipo: "masculina"},
    {año: 1931, corredor: "Francisco Rodríguez", edicion: 9, tipo: "masculina"},
    {año: 1932, corredor: "Remigio Saavedra", edicion: 10, tipo: "masculina"},
    {año: 1933, corredor: "Mario Stefani", edicion: 11, tipo: "masculina"},
    {año: 1934, corredor: "Remigio Saavedra", edicion: 12, tipo: "masculina"},
    {año: 1935, corredor: "Mario Mathieu", edicion: 13, tipo: "masculina"},
    {año: 1936, corredor: "Mario Mathieu", edicion: 14, tipo: "masculina"},
    {año: 1937, corredor: "José González", edicion: 15, tipo: "masculina"},
    {año: 1938, corredor: "Mario Mathieu", edicion: 16, tipo: "masculina"},
    {año: 1939, corredor: "Mario Stefani", edicion: 17, tipo: "masculina"},
    {año: 1940, corredor: "Mario Mathieu", edicion: 18, tipo: "masculina"},
    {año: 1941, corredor: "No se disputó", edicion: null, tipo: "masculina"},
    {año: 1942, corredor: "Mario Mathieu", edicion: 19, tipo: "masculina"},
    {año: 1943, corredor: "No se disputó", edicion: null, tipo: "masculina"},

    {año: 1947, corredor: "Óscar Giacché", edicion: 20, tipo: "masculina"},
    {año: 1948, corredor: "Miguel Sevillano", edicion: 21, tipo: "masculina"},
    {año: 1949, corredor: "Ceferino Perone", edicion: 22, tipo: "masculina"},
    {año: 1950, corredor: "Óscar Muleiro", edicion: 23, tipo: "masculina"},
    {año: 1951, corredor: "Saúl Crispin", edicion: 24, tipo: "masculina"},
    {año: 1952, corredor: "Dante Benvenuti", edicion: 25, tipo: "masculina"},
    {año: 1953, corredor: "Alfredo Figgini", edicion: 26, tipo: "masculina"},
    {año: 1954, corredor: "Humberto Varisco", edicion: 27, tipo: "masculina"},
    {año: 1955, corredor: "No se disputó", edicion: null, tipo: "masculina"},
    {año: 1956, corredor: "Rodolfo Caccavo", edicion: 28, tipo: "masculina"},
    {año: 1957, corredor: "Carlos Vázquez", edicion: 29, tipo: "masculina"},
    {año: 1958, corredor: "Ricardo Senn", edicion: 30, tipo: "masculina"},
    {año: 1959, corredor: "Duilio Biganzoli", edicion: 31, tipo: "masculina"},
    {año: 1960, corredor: "Carlos Vázquez", edicion: 32, tipo: "masculina"},
    {año: 1961, corredor: "Marcos Spaggiari", edicion: 33, tipo: "masculina"},
    {año: 1962, corredor: "No se disputó", edicion: null, tipo: "masculina"},

    {año: 1964, corredor: "Carlos Álvarez", edicion: 34, tipo: "masculina"},
    {año: 1965, corredor: "Carlos Álvarez", edicion: 35, tipo: "masculina"},
    {año: 1966, corredor: "Eduardo Sánchez", edicion: 36, tipo: "masculina"},
    {año: 1967, corredor: "Héctor Gómez", edicion: 37, tipo: "masculina"},
    {año: 1968, corredor: "Saúl Alcántara", edicion: 38, tipo: "masculina"},
    {año: 1969, corredor: "Raúl Gómez", edicion: 39, tipo: "masculina"},
    {año: 1970, corredor: "Rodolfo Taddeo", edicion: 40, tipo: "masculina"},
    {año: 1971, corredor: "Raúl Gómez", edicion: 41, tipo: "masculina"},
    {año: 1972, corredor: "Ismael Torres", edicion: 42, tipo: "masculina"},
    {año: 1973, corredor: "Osvaldo Benvenuti", edicion: 43, tipo: "masculina"},
    {año: 1974, corredor: "Ricardo Jurado", edicion: 44, tipo: "masculina"},
    {año: 1975, corredor: "Oswaldo Frossasco", edicion: 45, tipo: "masculina"},
    {año: 1976, corredor: "No se disputó", edicion: null, tipo: "masculina"},
    {año: 1980, corredor: "Ricardo Jurado", edicion: 46, tipo: "masculina"},

    {año: 1981, corredor: "Omar Richeze", edicion: 47, tipo: "masculina"},
    {año: 1982, corredor: "Juan Carlos Ruarte", edicion: 48, tipo: "masculina"},
    {año: 1983, corredor: "No se disputó", edicion: null, tipo: "masculina"},
    {año: 1984, corredor: "Luis Moyano", edicion: 49, tipo: "masculina"},
    {año: 1985, corredor: "Carlos Bodei", edicion: 50, tipo: "masculina"},
    {año: 1986, corredor: "Armando Robledo", edicion: 51, tipo: "masculina"},
    {año: 1987, corredor: "Alejandro Carrusca", edicion: 52, tipo: "masculina"},
    {año: 1988, corredor: "Marcelo Alexandre", edicion: 53, tipo: "masculina"},
    {año: 1989, corredor: "Jorge Sebastía", edicion: 54, tipo: "masculina"},
    {año: 1990, corredor: "Adrián García", edicion: 55, tipo: "masculina"},
    {año: 1991, corredor: "Marcelo Alexandre", edicion: 56, tipo: "masculina"},
    {año: 1992, corredor: "Luis Biera", edicion: 57, tipo: "masculina"},
    {año: 1993, corredor: "Pablo Pérez", edicion: 58, tipo: "masculina"},
    {año: 1994, corredor: "Rubén Priede", edicion: 59, tipo: "masculina"},
    {año: 1995, corredor: "Rubén Pegorín", edicion: 60, tipo: "masculina"},
    {año: 1996, corredor: "Gustavo Artacho", edicion: 61, tipo: "masculina"},
    {año: 1997, corredor: "Juan Curuchet", edicion: 62, tipo: "masculina"},
    {año: 1998, corredor: "Juan Curuchet", edicion: 63, tipo: "masculina"},
    {año: 1999, corredor: "Walter Pérez", edicion: 64, tipo: "masculina"},
    {año: 2000, corredor: "Juan Curuchet", edicion: 65, tipo: "masculina"},

    {año: 2001, corredor: "Edgardo Simon", edicion: 66, tipo: "masculina"},
    {año: 2002, corredor: "Ángel Darío Colla", edicion: 67, tipo: "masculina"},
    {año: 2003, corredor: "Juan Curuchet", edicion: 68, tipo: "masculina"},
    {año: 2004, corredor: "Alejandro González", edicion: 69, tipo: "masculina"},
    {año: 2005, corredor: "Pedro Prieto", edicion: 70, tipo: "masculina"},
    {año: 2006, corredor: "Matías Médici", edicion: 71, tipo: "masculina"},
    {año: 2007, corredor: "Ángel Darío Colla", edicion: 72, tipo: "masculina"},
    {año: 2008, corredor: "Gerardo Fernández", edicion: 73, tipo: "masculina"},
    {año: 2009, corredor: "Daniel Díaz", edicion: 74, tipo: "masculina"},
    {año: 2010, corredor: "Román Mastrángelo", edicion: 75, tipo: "masculina"},
    {año: 2011, corredor: "Leandro Messineo", edicion: 76, tipo: "masculina"},
    {año: 2012, corredor: "Laureano Rosas", edicion: 77, tipo: "masculina"},
    {año: 2013, corredor: "Fernando Antogna", edicion: 78, tipo: "masculina"},
    {año: 2014, corredor: "Laureano Rosas", edicion: 79, tipo: "masculina"},
    {año: 2015, corredor: "Juan Melivilo", edicion: 80, tipo: "masculina"},
    {año: 2016, corredor: "Laureano Rosas", edicion: 81, tipo: "masculina"},
    {año: 2017, corredor: "Román Mastrángelo", edicion: 82, tipo: "masculina"},
    {año: 2018, corredor: "Julián Barrientos", edicion: 83, tipo: "masculina"},
    {año: 2019, corredor: "Aníbal Borrajo", edicion: 84, tipo: "masculina"},

    {año: 2020, corredor: "No se disputó", edicion: null, tipo: "masculina"},
    {año: 2021, corredor: "No se disputó", edicion: null, tipo: "masculina"},
    {año: 2022, corredor: "Elbio Alborzen", edicion: 85, tipo: "masculina"},
    {año: 2023, corredor: "Sergio Fredes", edicion: 86, tipo: "masculina"},
    {año: 2023, corredor: "Maribel Aguirre", edicion: 1, tipo: "femenina"},
    {año: 2024, corredor: "Omar Salim Azzem", edicion: 87, tipo: "masculina"},
    {año: 2024, corredor: "Maribel Aguirre", edicion: 2, tipo: "femenina"},
    {año: 2025, corredor: "Nicolás Traico", edicion: 88, tipo: "masculina"}
  ];

  // Eras (solo metadatos; color de botón ahora es uniforme)
  const eras = {
    todas:         { nombre: "Todas las Eras", años: [1922, 2025], descripcion: "104 años de historia" },
    pionera:       { nombre: "Era Pionera", años: [1922, 1940],     descripcion: "Los fundadores" },
    renacimiento:  { nombre: "Renacimiento", años: [1947, 1960],    descripcion: "Post-guerra" },
    moderna:       { nombre: "Era Moderna", años: [1964, 1980],     descripcion: "Consolidación" },
    contemporanea: { nombre: "Era Contemporánea", años: [1981,2000], descripcion: "Profesionalización" },
    digital:       { nombre: "Era Digital", años: [2001, 2019],     descripcion: "Era tecnológica" },
    postpandemia:  { nombre: "Post-Pandemia", años: [2020, 2025],   descripcion: "Nueva realidad" }
  };

  // Deep-link (?timeline&era=moderna)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const era = params.get('era');
    const wantsTimeline = params.has('timeline');
    if (era && eras[era]) setSelectedEra(era);
    if (!embedded && wantsTimeline) setIsOpen(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Lock scroll SOLO si usa overlay propio
  useEffect(() => {
    const onEsc = (e) => e.key === 'Escape' && !embedded && setIsOpen(false);
    if (!embedded && isOpen) {
      document.addEventListener('keydown', onEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onEsc);
      if (!embedded) document.body.style.overflow = '';
    };
  }, [isOpen, embedded]);

  // ---------- Estrellas PROGRESIVAS ----------
  // Mapa progresivo: para cada item (año/corredor/tipo/ed), cuántas victorias acumula hasta ese año (incluida la actual)
  const progressiveStarsMap = useMemo(() => {
    const counts = {}; // por corredor_tipo
    const prog = {};   // por item
    const items = [...allData].sort((a, b) => {
      if (a.año !== b.año) return a.año - b.año;
      // estabilizar por tipo/edicion para años iguales
      const ta = a.tipo.localeCompare(b.tipo);
      if (ta !== 0) return ta;
      const ea = (a.edicion ?? 0) - (b.edicion ?? 0);
      return ea;
    });

    for (const it of items) {
      if (it.corredor === "No se disputó") continue;
      const runnerKey = `${it.corredor}_${it.tipo}`;
      counts[runnerKey] = (counts[runnerKey] || 0) + 1;
      const id = `${it.año}_${it.corredor}_${it.tipo}_${it.edicion ?? 's'}`;
      prog[id] = counts[runnerKey]; // 1 en la primera victoria, 2 en la segunda, etc.
    }
    return prog;
  }, [allData]);

  const getProgressiveStars = (item) => {
    if (item.corredor === "No se disputó") return 0;
    const id = `${item.año}_${item.corredor}_${item.tipo}_${item.edicion ?? 's'}`;
    return progressiveStarsMap[id] || 0;
  };

  // Filtro por era
  const filteredData = useMemo(() => {
    if (selectedEra === 'todas') return allData;
    const era = eras[selectedEra];
    if (!era) return allData;
    return allData.filter(item => item.año >= era.años[0] && item.año <= era.años[1]);
  }, [selectedEra, allData]);

  // Estilo tarjetas
  const getCardStyle = (item) => {
    if (item.corredor === "No se disputó") {
      return "bg-gris text-grisclaro border-gris shadow-lg";
    }
    if (item.tipo === "femenina") {
      return "bg-gradient-to-br from-violeta to-rosa text-white border-rosa shadow-lg shadow-violeta/30";
    }
    // Masculinas: TODAS celestes
    return "bg-celeste text-white border-celeste shadow-lg shadow-celeste/30";
  };

  // Badge de era (se mantiene para referencia visual)
  const getEraBadgeColor = (año) => {
    if (año >= 1922 && año <= 1940) return "bg-amarillo";
    if (año >= 1947 && año <= 1960) return "bg-celeste";
    if (año >= 1964 && año <= 1980) return "bg-rosa";
    if (año >= 1981 && año <= 2000) return "bg-violeta";
    if (año >= 2001 && año <= 2019) return "bg-oscuro";
    if (año >= 2020 && año <= 2025) return "bg-gris";
    return "bg-gris";
  };

  // --------- UI Compartida ---------
  const Content = () => (
    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-oscuro text-white p-6 flex items-center justify-between">
        <div>
          <h2 id="timeline-title" className="text-xl md:text-3xl font-bold flex items-center gap-3">
            <Award className="w-6 md:w-8 h-6 md:h-8 text-amarillo" />
            <span className="hidden sm:inline">Timeline de Campeones</span>
            <span className="sm:hidden">Campeones</span>
          </h2>
          <p className="text-white/80 mt-1 text-sm md:text-base">104 años de historia ciclística</p>
        </div>
        {!embedded && (
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amarillo/40"
            aria-label="Cerrar timeline"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Filtros (botonera oscura, hover celeste, activa celeste) */}
      <div className="bg-grisclaro p-4 md:p-6 border-b border-white/20">
        <div className="flex flex-wrap gap-2 md:gap-3">
          {Object.entries(eras).map(([key, era]) => (
            <button
              key={key}
              onClick={() => { setSelectedEra(key); }}
              aria-pressed={selectedEra === key}
              className={`px-3 md:px-4 py-2 rounded-xl font-semibold text-xs md:text-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-amarillo/50 text-white
                ${selectedEra === key ? 'bg-celeste' : 'bg-oscuro hover:bg-celeste'}
              `}
            >
              <span className="block">{era.nombre}</span>
              {key !== 'todas' && (
                <span className="block text-[11px] opacity-80">
                  {era.años[0]}-{era.años[1]}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Grid (sin "ver más": mostramos TODO lo filtrado) */}
      <div className="p-4 md:p-6 overflow-y-auto max-h-[60vh]">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
          {filteredData.map((item) => {
            const stars = getProgressiveStars(item);
            return (
              <div
                key={`${item.año}_${item.tipo}_${item.edicion ?? 's'}`}
                className={`relative rounded-2xl p-3 md:p-4 border-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl cursor-pointer ${getCardStyle(item)}`}
                role="button"
                tabIndex={0}
                aria-label={`${item.año}: ${item.corredor}${item.edicion ? ` - Edición ${item.edicion}` : ' - Suspendida'}`}
                onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.click()}
              >
                {/* Era badge */}
                <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-sm ${getEraBadgeColor(item.año)}`} aria-hidden="true" />

                {/* Edición */}
                <div className="text-center mb-3">
                  {item.corredor === "No se disputó" ? (
                    <div className="text-lg md:text-2xl font-black text-white/80">
                      <X className="w-6 md:w-8 h-6 md:h-8 mx-auto" />
                    </div>
                  ) : (
                    <>
                      <div className="text-lg md:text-2xl font-black leading-none">#{item.edicion}</div>
                      {item.tipo === 'femenina' && (
                        <div className="text-xs font-bold mt-1 opacity-90 bg-white/20 rounded-full px-2 py-1">
                          FEMENINA
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Año */}
                <div className="text-center mb-3">
                  <div className="text-base md:text-xl font-black bg-black/10 rounded-lg py-1 px-2 text-white/95">
                    {item.año}
                  </div>
                </div>

                {/* Nombre */}
                <div className="text-center mb-3 flex-grow">
                  {item.corredor === "No se disputó" ? (
                    <div className="text-xs md:text-sm font-bold uppercase tracking-wider">SUSPENDIDA</div>
                  ) : (
                    <div className="text-xs md:text-sm font-bold leading-tight min-h-[2.5rem] flex items-center justify-center px-1">
                      <span className="text-center">{item.corredor}</span>
                    </div>
                  )}
                </div>

                {/* Estrellas progresivas */}
                <div className="flex justify-center gap-1 min-h-[24px] items-end">
                  {item.corredor !== "No se disputó" && stars > 0 && (
                    <div className="flex gap-1 flex-wrap justify-center">
                      {Array.from({ length: Math.min(stars, 6) }).map((_, i) => (
                        <Star key={i} className="w-3 md:w-4 h-3 md:h-4 fill-amarillo text-amarillo drop-shadow-sm" aria-hidden="true" />
                      ))}
                      {stars > 6 && (
                        <span className="text-xs font-bold text-amarillo ml-1">+{stars - 6}</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Glow */}
                {item.corredor !== "No se disputó" && (
                  <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-20 transition-opacity duration-200 bg-white pointer-events-none" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer stats: azul oscuro */}
      <div className="bg-oscuro p-4 md:p-6 border-t border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-xl md:text-2xl font-black text-celeste">88</div>
            <div className="text-xs md:text-sm text-white/80 font-semibold">Ediciones Masculinas</div>
          </div>
          <div>
            <div className="text-xl md:text-2xl font-black text-violeta">2</div>
            <div className="text-xs md:text-sm text-white/80 font-semibold">Ediciones Femeninas</div>
          </div>
          <div>
            <div className="text-xl md:text-2xl font-black text-amarillo">75+</div>
            <div className="text-xs md:text-sm text-white/80 font-semibold">Campeones Únicos</div>
          </div>
          <div>
            <div className="text-xl md:text-2xl font-black text-rosa">104</div>
            <div className="text-xs md:text-sm text-white/80 font-semibold">Años de Historia</div>
          </div>
        </div>

        {/* Leyenda */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex flex-wrap justify-center gap-4 text-xs md:text-sm text-white/90">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-celeste rounded" />
              <span>Masculina</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-br from-violeta to-rosa rounded" />
              <span>Femenina</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gris rounded" />
              <span>Suspendida</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-amarillo text-amarillo" />
              <span>Múltiples victorias (progresivo)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (embedded) return <Content />;

  // Variante con overlay propio (no la usás si embebés en el modal canónico)
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-3 bg-oscuro text-white hover:bg-celeste px-8 py-4 rounded-2xl font-bold text-lg transition-colors duration-150 focus:outline-none focus:ring-4 focus:ring-amarillo/40 shadow-lg font-sans"
        aria-label="Ver timeline completo de ganadores"
      >
        <Trophy className="w-6 h-6" />
        <span className="hidden sm:inline">Ver Timeline de Campeones</span>
        <span className="sm:hidden">Timeline</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="timeline-title"
        >
          <Content />
        </div>
      )}
    </>
  );
};

export default TimelineGanadores;
