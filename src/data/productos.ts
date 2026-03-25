export interface Producto {
  id: number
  nombre: string
  nombresAlternativos: string[]
  corte: string
  precio: number
  precioAnterior?: number
  imagen: string
  badge?: string
  descripcion: string
  ubicacion: string
  pedido: string
  coccion: string
  idealPara: string
  historia: string
  proTip: string
  metodos: string[]
}

export const productos: Producto[] = [
  {
    id: 1,
    nombre: 'Bife de Chorizo',
    nombresAlternativos: ['Bife Angosto', 'NY Strip', 'Sirloin Strip', 'Contre-filet'],
    corte: 'Novillo Premium',
    precio: 8500,
    imagen: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=800&q=80',
    descripcion: 'El corte insignia del asado argentino. Sabor intenso, grasa justa y una textura que se deshace en la boca.',
    ubicacion: 'Región dorso-lumbar. Músculo longissimus dorsi, sobre las 6 vértebras lumbares y las últimas 4 dorsales (torácicas 10 a 13). Limita con el bife ancho hacia adelante y el cuadril hacia atrás.',
    pedido: 'Pedilo deshuesado, de 2 dedos de espesor (4-5 cm), cortado parejo. Porción ideal: 300-400 g por persona. Que conserve la capa de grasa lateral intacta — es la que le da sabor y jugosidad.',
    coccion: 'Parrilla a brasa media-alta. Sacalo de la heladera 30 min antes, salá con sal gruesa justo antes de ponerlo. Cocción: 4-6 minutos por lado. Darlo vuelta una sola vez. Dejalo reposar 2-3 min antes de servir.',
    idealPara: 'El plato estrella del asado del domingo. Corte individual por excelencia. También excelente a la plancha o para una cena especial.',
    historia: 'Se llama "de chorizo" porque cuando el carnicero sacaba el lomo entero y lo metía en estoquinetes (fundas de algodón), colgado parecía un gran chorizo. El restaurante La Cabaña en Buenos Aires (1935) popularizó el nombre.',
    proTip: 'Nunca le saques la grasa lateral antes de cocinarlo. Se derrite con el calor y baña la carne. Hacé la diferencia entre un bife bueno y uno extraordinario.',
    metodos: ['Parrilla', 'Plancha', 'Sartén'],
  },
  {
    id: 2,
    nombre: 'Ojo de Bife',
    nombresAlternativos: ['Bife Ancho', 'Ribeye', 'Rib Eye Steak', 'Entrecôte', 'Scotch Fillet'],
    corte: 'Novillo Premium',
    precio: 9200,
    imagen: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=800&q=80',
    badge: 'Premium',
    descripcion: 'El rey del costillar. Veteado perfecto con grasa intramuscular (marbling) que se funde al cocinarse, generando un sabor incomparable.',
    ubicacion: 'Región dorsal, entre las costillas 6 a 9. Músculos longissimus dorsi, trapecio y dorsal ancho. Al estar en la parte alta del costillar, casi no trabaja — por eso es tan tierno.',
    pedido: 'Pedilo de 3-4 cm de espesor. Porción: 350-450 g. Si querés el Tomahawk (con hueso largo limpio), pedilo especial: 600-800 g con hueso. Buscá buen marmoleado (vetas blancas en la carne).',
    coccion: 'Parrilla a brasa fuerte. Sellá 4-5 min por lado a fuego fuerte para formar costra. Si hace falta, terminá en zona de calor moderado. Temp. interna: 55-60°C para punto medio. Reposar 5 min.',
    idealPara: 'La estrella absoluta de una parrillada premium. En versión Tomahawk, es un plato para compartir e impresionar.',
    historia: 'Se lo llama "ojo" por la forma redondeada del músculo al cortarlo transversalmente, que semeja un ojo. Con la sofisticación de la cultura parrillera, ganó su lugar como el rey del costillar.',
    proTip: 'Fijate que tenga grasa intramuscular visible (marbling). Al cocinarse se funde dentro de la fibra muscular y genera el sabor y jugosidad que ningún otro corte iguala.',
    metodos: ['Parrilla', 'Plancha', 'Horno'],
  },
  {
    id: 3,
    nombre: 'Entraña',
    nombresAlternativos: ['Entraña Fina', 'Inside Skirt Steak', 'Hampe', 'Bavette d\'aloyau'],
    corte: 'Corte Especial',
    precio: 7800,
    imagen: 'https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80',
    badge: 'Popular',
    descripcion: 'La vedette del asado entre los que saben. Fibras largas con sabor profundo, intenso y una textura única.',
    ubicacion: 'Porción muscular de las inserciones costales del diafragma. Se extiende desde la cara interna de las últimas costillas hasta la unión de la 8va costilla con su cartílago. Cada media res produce una sola entraña.',
    pedido: 'Pedila entera, con la membrana (cuerito) intacta. Encargala con anticipación porque se agota rápido (sale solo una por media res). Peso: 600-900 g. Siempre pedí la fina, no la gruesa.',
    coccion: 'Parrilla a brasa fuerte. Primero con el cuerito hacia abajo 25 min a fuego fuerte. Después dala vuelta 10-15 min a fuego moderado. El cuerito tiene que quedar crocante. Nunca la pinches.',
    idealPara: 'Parrilla pura y simple. También excelente a la plancha cortada en tiras, con limón o mostaza.',
    historia: 'El nombre viene del latín "intestina" (vísceras). En el siglo XX era un corte barato de los trabajadores portuarios del puerto de Buenos Aires. Hoy es uno de los cortes más codiciados y exportados.',
    proTip: 'Cocinala siempre con sus membranas puestas. El cuerito actúa como un sello a presión que mantiene los jugos adentro. Si la cocinás pelada, se reseca y pierde toda la gracia.',
    metodos: ['Parrilla', 'Plancha'],
  },
  {
    id: 4,
    nombre: 'Vacío',
    nombresAlternativos: ['Flank Steak', 'Bavette de flanchet', 'Babette', 'Thin Flank'],
    corte: 'Novillo',
    precio: 6500,
    imagen: 'https://images.unsplash.com/photo-1551028150-64b9f398f678?w=800&q=80',
    descripcion: 'El clásico del asado familiar. Doble textura: tierno por dentro, crocante por fuera. Un corte noble que premia la paciencia.',
    ubicacion: 'Región abdominal lateral. Músculos oblicuo externo e interno, recto abdominal y transverso. Entre las últimas costillas y el hueso de la cadera (ilion). Limita con el asado adelante y el cuadril atrás.',
    pedido: 'Pedilo entero, con el cuero (grasa externa) intacto — es fundamental para la parrilla. Grosor: 4-6 cm. Un vacío de ternera pesa 1,5-2,5 kg (ideal para 4-6 personas).',
    coccion: 'Parrilla a brasa suave, SIN llamas directas. Cuero hacia abajo primero (45 min). Después dar vuelta para terminar. Tiempo total: 1h a 1h30. Jamás pincharlo. Reposar 5-10 min tapado con aluminio.',
    idealPara: 'El clásico del asado familiar del domingo. También se prepara relleno (espinaca, queso, jamón), mechado o al horno.',
    historia: 'Uno de los cortes más antiguos de la tradición gaucha. Cuando se faenaba en el campo, era de los primeros en aparecer. Los gauchos lo asaban con cuero para protegerlo del fuego directo, técnica que sigue vigente.',
    proTip: 'El secreto es la paciencia: fuego bajo, tiempo largo. Meté la mano a 10 cm de la parrilla — si no aguantás más de 6 segundos, la temperatura está justa. Apurar un vacío con fuego fuerte es el error más común.',
    metodos: ['Parrilla', 'Horno', 'Relleno'],
  },
  {
    id: 5,
    nombre: 'Asado de Tira',
    nombresAlternativos: ['Tira de Asado', 'Short Ribs', 'Costillas', 'Flanken Cut Ribs'],
    corte: 'Novillo',
    precio: 5900,
    imagen: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80',
    descripcion: 'El alma del asado argentino. Costillas cortadas en tiras con hueso, carne y tradición en cada bocado.',
    ubicacion: 'Costillar completo, cortado transversalmente a través de las 13 costillas. Incluye músculos pectorales, recto del tórax, intercostales y serratos. El corte se hace transversal a las costillas.',
    pedido: 'Pedí la tira de 2 dedos de espesor (4-5 cm) para cocción lenta. Para versión rápida ("banderita"), 1 dedo. Fijate en el ancho del hueso: cuanto más finito, más joven el animal. Calculá 400-500 g/persona.',
    coccion: 'Parrilla a brasa suave/media. Huesos hacia abajo (transmiten calor y cocinan por debajo). Tres cuartos del tiempo así, agregar brasas cada 15-20 min. Tiempo total: 40 min a 1h. Salar solo con sal gruesa.',
    idealPara: 'El corte infaltable del asado argentino. Cumpleaños, feriados, domingos. También al horno o estofado.',
    historia: 'Nació de la necesidad gaucha de aprovechar los cortes con hueso que nadie quería. Cocinados lentamente sobre brasas, esos cortes "descartados" revelaron una terneza y sabor que los convirtieron en el emblema del asado.',
    proTip: 'Hacele cortes superficiales a lo largo del hueso antes de ponerlo en la parrilla. Facilita separar la carne en la mesa y permite que el calor penetre parejo. Solo necesita sal gruesa, nada más.',
    metodos: ['Parrilla', 'Horno', 'Estofado'],
  },
  {
    id: 6,
    nombre: 'Lomo',
    nombresAlternativos: ['Lomo Liso', 'Tenderloin', 'Filet Mignon', 'Solomillo', 'Psoas'],
    corte: 'Premium Select',
    precio: 12500,
    imagen: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=80',
    badge: 'Premium',
    descripcion: 'El corte más tierno de toda la res. Magro, delicado y excepcional. Para quienes buscan la máxima terneza.',
    ubicacion: 'Región sublumbar, debajo de la columna vertebral, detrás del riñón. Músculos psoas mayor, psoas menor e ilíaco. A lo largo de las 6 vértebras lumbares. El animal casi no lo ejercita, por eso es el más tierno.',
    pedido: 'Para parrilla: medallones de 3-4 cm de espesor, ~200 g cada uno. Pieza entera al horno: 2-3 kg. Pedile al carnicero que le saque el cordón y la telita de plata (aponeurosis), que se endurece al cocinarse.',
    coccion: 'Plancha o parrilla a fuego fuerte, "vuelta y vuelta": 5 min por lado máximo. Temp. interna: 50-55°C jugoso, 56-63°C a punto. Nunca pasarlo de punto — al tener poca grasa se reseca. Reposar 5 min.',
    idealPara: 'Medallones a la plancha, tournedos, chateaubriand, lomo al horno para fiestas, lomo Wellington. El corte de las ocasiones especiales.',
    historia: 'Siempre fue el corte de la clase alta argentina. Mientras el gaucho asaba tiras y vacío, el lomo era el corte de las estancias patronales y los clubes de Buenos Aires, servido con salsas elaboradas.',
    proTip: 'Por ser tan magro, envolvelo en panceta o untalo con manteca antes de cocinarlo. Eso compensa la falta de grasa propia y evita que se reseque. La diferencia es enorme.',
    metodos: ['Plancha', 'Parrilla', 'Horno'],
  },
]

export const ofertas = [
  { id: 7, nombre: 'Costillar de Cerdo', nombresAlternativos: ['Spare Ribs'], corte: 'Cerdo', precio: 4200, precioAnterior: 5800, imagen: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80', badge: '-28%' },
  { id: 8, nombre: 'Pack Asado Familiar', nombresAlternativos: ['Mix Parrillero'], corte: 'Mix Premium', precio: 15900, precioAnterior: 21000, imagen: 'https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80', badge: '-24%' },
  { id: 9, nombre: 'Pollo de Campo', nombresAlternativos: ['Pollo Campero'], corte: 'Entero', precio: 3500, precioAnterior: 4500, imagen: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=800&q=80', badge: '-22%' },
]

export const sucursales = [
  { id: 1, nombre: 'Casa Central - Mayorista', direccion: 'Elpidio González 320, Dorrego - Guaymallén, Mendoza', telefono: '261 640-1013', horario: 'Lun-Sáb 8:00-20:00' },
  { id: 2, nombre: 'Sucursal Elpidio', direccion: 'Elpidio González 488, Dorrego - Guaymallén, Mendoza', telefono: '261 207-2559', horario: 'Lun-Sáb 8:00-20:00' },
  { id: 3, nombre: 'La Bonita - Chacras de Coria', direccion: 'Besares 833, Chacras de Coria - Luján, Mendoza', telefono: '261 468-4818', horario: 'Lun-Sáb 8:00-20:00' },
  { id: 4, nombre: 'Liniers Green Market', direccion: 'Liniers 1051, Chacras de Coria - Luján, Mendoza', telefono: '261 680-0320', horario: 'Lun-Dom 8:00-21:00' },
  { id: 5, nombre: 'Sucursal Rodríguez Peña', direccion: 'Rodríguez Peña 1412, Dorrego - Guaymallén, Mendoza', telefono: '261 609-2179', horario: 'Lun-Sáb 8:00-20:00' },
  { id: 6, nombre: 'Sobremonte Market', direccion: 'Viamonte, Luján de Cuyo, Mendoza', telefono: '261 633-4412', horario: 'Lun-Dom 8:00-21:00' },
]
