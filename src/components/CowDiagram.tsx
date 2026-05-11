import { useId, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export interface CutRegion {
  id: string
  name: string
  path: string
  description: string
}

/**
 * Professional cow silhouette — CC0 1.0 Public Domain
 * Source: openclipart.org/detail/251035 (Firkin)
 * ViewBox: 0 0 640 597 — profile view, head on left, rump on right
 */
export const cowOutline =
  "m 172.28125,0.4609375 c -2.85111,0.6498252 -4.23555,2.657234 -4.09384,3.2928151 " +
  "C 166.40954,5.6724965 168.0016,9.7073033 169,12 l 4.47656,3.177734 " +
  "c 1.80899,1.494382 0.52149,0.371094 0.52149,0.371094 l 1.2875,1.123288 " +
  "c 0.73239,0.823893 -0.26848,0.06985 0.59531,0.702884 " +
  "0.62195,0.569901 1.26585,1.120787 1.9082,1.671875 " +
  "5.68014,7.453141 22.49077,24.783181 16.22071,33.634766 " +
  "-1.56,2.204 -4.49993,2.505906 -6.91993,1.753906 " +
  "-8.14,-2.531 -13.01984,-4.967703 -22.08984,-4.345703 " +
  "-19.4,1.328 -38.75,0.880125 -58,1.953125 " +
  "-6.52,0.364 -10.107,5.860578 -16,6.892578 " +
  "C 84.696,60.039547 75.298,54.6225 70,51.6875 " +
  "59.236,45.7225 52.876578,34.377 55.517578,22 " +
  "c 0.949,-4.45 4.311938,-8.569469 4.835938,-12.9804688 " +
  "0.462,-3.8827999 -3.149469,-5.0430499 -6.355469,-4.90625 " +
  "C 40.389047,4.6941814 37.236516,25.446 35.728516,36 " +
  "31.929516,62.587 49.637,88.738 76,95 l -1,5 " +
  "c -23.162,-7.534 -43.034,-4.958217 -62,11.30078 " +
  "-5.7497,4.93 -15.6068125,14.05969 -12.2578125,22.67969 " +
  "2.5915,6.68 12.0048125,8.9007 18.2578125,10.2207 " +
  "18.008,3.79 35.012,3.28883 53,-0.20117 " +
  "-0.005,8.14 -0.660906,17.6 -4.378906,25 " +
  "-7.905,15.72 -26.09475,34.57953 -14.96875,54.76953 " +
  "2.126,3.86 6.976656,2.77031 10.347656,4.82031 " +
  "14.057,8.53 25.338,11.5 42,7.75 " +
  "4.41,-1 14.55937,-7.73898 18.60938,-5.45898 " +
  "2.82997,1.59 4.26062,6.36914 5.64062,9.11914 " +
  "4.03,8.07 8.47,15.92 12.5,24 " +
  "10.9,21.8 22.6,43.2 33.5,65 " +
  "4.4159,8.84139 10.74004,18.2343 13.72656,27.74609 " +
  "1e-4,0.015 -9e-5,0.03 0,0.0449 " +
  "-0.14249,6.37834 0.13524,12.73206 0.66602,19.07031 " +
  "-0.41768,4.49985 -0.78597,8.98532 -0.22266,13.13867 " +
  "2.76925,20.28699 8.30929,41.85703 9.05664,62.60352 " +
  "0.12393,6.66245 -0.14335,13.34293 -1,20.05078 " +
  "-2.79132,22.51785 -10.22093,44.04479 -17.96484,65.33593 " +
  "C 172.45099,549.71203 162.05009,561.23926 158,575 l 21,5 1,1 " +
  "c 9.09,0 30.15086,3.21953 36.38086,-5.23047 " +
  "4.85738,-6.58049 1.02583,-18.24724 0.32812,-27.81641 " +
  "0.14974,-0.004 0.29949,-0.008 0.44922,-0.0117 " +
  "-0.3139,-2.13788 -0.53257,-4.82741 -0.0762,-7.2168 " +
  "0.13898,-0.57585 0.30596,-1.13447 0.51758,-1.66406 " +
  "2.09,-5.21 9.3407,-3.6311 10.9707,-9.1211 " +
  "1.6,-5.41 -0.64101,-12.46945 -1.29101,-17.93945 " +
  "-0.98,-8.32 -0.75946,-17.64 -0.18946,-26 " +
  "1.58627,-23.13301 9.78486,-46.25394 10.01172,-69.27344 " +
  "0.052,-0.33482 0.10874,-0.66902 0.16016,-1.0039 " +
  "0.42257,-5.22194 0.2977,-11.1416 -1.69336,-16.14063 " +
  "-0.17388,-0.861 -0.36107,-1.72139 -0.56836,-2.58203 " +
  "17.46,2.35 34.58,0.28 51,-7 " +
  "20.3,47.11 63.90977,86.53 48.25977,143 " +
  "-2.08,7.49 -6.04016,13.87 -8.91016,21 " +
  "-1.43,3.57 -0.86922,7.7 -2.94922,11 " +
  "-5.56,8.82 -14.58039,14.93 -18.40039,25 " +
  "15.05,8.55 30.62,7.48065 47,4.39062 " +
  "4.68,-0.87999 12.95039,-1.47984 16.40039,-5.08984 " +
  "1.86,-1.95 1.38914,-4.87086 2.61914,-7.13086 " +
  "1.44,-2.63 4.19117,-4.25945 5.20117,-7.18945 " +
  "C 377.7007,567.78047 373.38,555.32 372,548 " +
  "c 21.64,-1.9 11.56,-25.89 8,-40 " +
  "-6.66,-26.33 -12.99086,-52.75 -19.88086,-79 " +
  "-3.79,-14.41 -9.20914,-29.23 -11.11914,-44 " +
  "20.75,1.64 41.95,1.6 62,-5 " +
  "7.84,-2.58 15.6,-5.57 23,-9.25 " +
  "2.74,-1.36 7.36008,-4.87984 10.58008,-4.08984 " +
  "2.86,0.72 5.27992,4.19078 7.41992,6.05078 " +
  "6.01,5.24 17.8307,10.02992 21.9707,16.66992 " +
  "2.57,4.12 -0.40109,11.51898 3.62891,14.95898 " +
  "4.95,4.22 9.32039,-7.22984 10.40039,-10.33984 " +
  "4.25,4.24 7.79,8.31 14,9 l 1,-18 " +
  "c 7.6,1.17 10.67039,10.46992 17.90039,11.41992 " +
  "8.83,1.16 3.13898,-17.29 4.70899,-21.25 " +
  "C 526.90936,371.87992 530.71,369.62 533,367 l 1,0 " +
  "c 15.82,29.73 17.02,55.16 9.5,88 " +
  "-3.21,14.03 -7.67064,20.12992 -16.14062,31.16992 " +
  "C 525.26936,488.88992 525.97,490.72 528,493 l 0,1 -11,13 " +
  "c 6.68,3.88 12.36,5 20,5 L 522.38086,528 521,536.29102 509,552 l 0,1 " +
  "c 21.05,15.03 41.12,11.62 62,-1 " +
  "-3.67,-9.03 -5.59012,-22.87008 0.0898,-31.83008 " +
  "3.71,-5.86 12.13969,-9.18992 11.67969,-17.16992 " +
  "-0.5,-8.72 -4.44047,-17.14 -4.73047,-26 " +
  "-0.58,-18.08 5.2018,-38.65 9.8418,-56 " +
  "3.57,-13.33 14.0782,-25.17 15.9082,-39 " +
  "1.24,-9.42 -5.63836,-18.03 -7.31836,-27 " +
  "-2.27,-12.1 1.35922,-26.19 3.94922,-38 " +
  "5.73,-26.08 13.99016,-52.32 16.41016,-79 " +
  "1.19,-13.14 -0.82024,-28.62 -1.74024,-42 " +
  "C 613.92988,179.19 611.7,160.25 604,145 " +
  "c 13.03,12.62 14.83984,32 16.08984,49 " +
  "2.82,38.53 -0.66968,79.8 -6.67968,118 " +
  "-3.45,21.94 -20.93016,52.31953 4.58984,69.51953 " +
  "4.56,3.07 8.6,-0.45937 12,-3.60937 " +
  "7.62,-7.09 11.30039,-14.61016 8.40039,-24.91016 " +
  "-2.8,-9.98 -10.75104,-18.6 -12.04101,-29 " +
  "-1.83002,-14.86 3.53078,-32.06 4.55078,-47 " +
  "3.34,-48.66 6.98007,-104.24 -16.16993,-149 " +
  "C 598.99023,97.536 566.71,91.238625 535,92.015625 " +
  "c -29.93,0.733 -58.92,9.925005 -88,15.374995 " +
  "-22.08,4.13 -45.58,5.26954 -68,5.26954 " +
  "-24.88,0 -50.19,-0.87032 -75,-2.57032 " +
  "-9.22,-0.63 -18.85,1.07149 -28,-0.22851 " +
  "-7.51,-1.07 -14.51,-7.32164 -22,-9.43164 " +
  "C 236.59,95.513683 220.26,97.536 203,102 " +
  "202.62,94.708 208.33094,93.545031 212.96094,88.957031 " +
  "218.14094,83.821031 222.55039,76.931 224.90039,70 " +
  "235.92039,37.484 204.76,3.498375 173,0.484375 " +
  "172.7475,0.4604294 172.50846,0.4528104 172.28125,0.4609375 Z"

/**
 * Argentine beef cuts mapped onto the 640×597 CC0 cow silhouette.
 * Coordinate reference: head LEFT (x≈50–200), body (x≈200–530),
 * rump/tail RIGHT (x≈530–640), back y≈92–120, belly y≈380–420.
 */
export const cuts: CutRegion[] = [
  {
    id: 'cogote',
    name: 'Cogote',
    path: 'M 216,96 L 285,96 L 288,148 L 285,218 L 216,218 L 213,150 Z',
    description: 'Zona del cuello. Rico en colágeno y tejido conectivo. Músculos cervicales.',
  },
  {
    id: 'paleta',
    name: 'Paleta',
    path: 'M 283,96 L 372,97 L 376,150 L 372,222 L 364,282 L 336,308 L 305,305 L 280,280 L 276,224 L 274,150 Z',
    description: 'Zona delantera superior. Músculos supraespinoso, infraespinoso y subescapular del hombro.',
  },
  {
    id: 'pecho',
    name: 'Pecho',
    path: 'M 218,222 L 282,220 L 282,280 L 338,308 L 380,314 L 382,370 L 370,428 L 284,430 L 240,406 L 216,372 L 212,300 Z',
    description: 'Zona inferior delantera. Músculos pectorales profundos. Entre las patas delanteras.',
  },
  {
    id: 'ojo-de-bife',
    name: 'Ojo de Bife',
    path: 'M 348,97 L 446,98 L 449,152 L 445,172 L 348,170 L 344,152 Z',
    description: 'Región dorsal, entre costillas 6 a 9. Músculo longissimus dorsi, trapecio y dorsal ancho.',
  },
  {
    id: 'bife-de-chorizo',
    name: 'Bife de Chorizo',
    path: 'M 443,98 L 515,100 L 519,150 L 515,175 L 443,173 L 439,152 Z',
    description: 'Región dorso-lumbar. Músculo longissimus dorsi, sobre las 6 vértebras lumbares y últimas 4 dorsales.',
  },
  {
    id: 'lomo',
    name: 'Lomo',
    path: 'M 440,175 L 518,177 L 521,224 L 518,272 L 440,270 L 436,226 Z',
    description: 'Región sublumbar, debajo de la columna. Músculos psoas mayor, psoas menor e ilíaco. El menos ejercitado del animal.',
  },
  {
    id: 'asado-de-tira',
    name: 'Asado de Tira',
    path: 'M 314,168 L 448,170 L 446,224 L 440,270 L 432,342 L 418,402 L 342,405 L 318,378 L 308,314 L 300,244 L 298,194 Z',
    description: 'Costillar completo, cortado transversalmente a las 13 costillas. Músculos pectorales e intercostales.',
  },
  {
    id: 'entrana',
    name: 'Entraña',
    path: 'M 400,272 L 490,274 L 492,315 L 490,358 L 400,360 L 396,316 Z',
    description: 'Porción muscular del diafragma. Inserciones costales desde cara interna de últimas costillas. Una sola por media res.',
  },
  {
    id: 'vacio',
    name: 'Vacío',
    path: 'M 474,205 L 556,211 L 575,258 L 582,322 L 575,384 L 540,405 L 490,400 L 474,360 L 467,294 L 464,250 Z',
    description: 'Región abdominal lateral. Músculos oblicuos, recto abdominal y transverso. Entre últimas costillas y cadera.',
  },
  {
    id: 'cuadril',
    name: 'Cuadril',
    path: 'M 510,100 L 576,107 L 602,150 L 606,202 L 598,260 L 564,270 L 533,262 L 513,222 L 507,160 Z',
    description: 'Zona de la cadera posterior. Músculo glúteo medio y bíceps femoral.',
  },
]

interface Props {
  /** 'display' = modo normal de la landing (hover + tooltip).
   *  'selector' = modo admin: click selecciona un corte, se resalta en dorado. */
  mode?: 'display' | 'selector'
  activeCut?: string
  onCutClick?: (id: string) => void
  /** Solo válido en mode='selector': el cut_id actualmente seleccionado */
  selectedCut?: string
  onSelect?: (cutId: string) => void
  interactive?: boolean
}

export default function CowDiagram({
  mode = 'display',
  activeCut,
  onCutClick,
  selectedCut,
  onSelect,
  interactive = true,
}: Props) {
  const uid = useId().replace(/:/g, '')
  const clipId = `cowClip-${uid}`
  const [hovered, setHovered] = useState<string | null>(null)
  const tooltipCut = cuts.find(c => c.id === hovered)

  const isSelector = mode === 'selector'

  return (
    <div className="relative w-full">
      {isSelector && (
        <p className="mb-2 text-center text-[10px] uppercase tracking-[0.25em] text-dorado/50">
          Hacé click en la zona del corte
        </p>
      )}
      <svg viewBox="0 0 640 430" className="w-full" style={{ maxHeight: isSelector ? '38vh' : '52vh' }}>
        <defs>
          <clipPath id={clipId}>
            <path d={cowOutline} />
          </clipPath>
        </defs>

        <path
          d={cowOutline}
          fill={isSelector ? 'rgba(192,144,64,0.06)' : 'rgba(45,106,79,0.07)'}
          stroke={isSelector ? 'rgba(192,144,64,0.22)' : 'rgba(45,106,79,0.28)'}
          strokeWidth="1.4"
          strokeLinejoin="round"
        />

        <circle cx="85" cy="98" r="4.5" fill={isSelector ? 'rgba(192,144,64,0.45)' : 'rgba(45,106,79,0.55)'} />

        <g clipPath={`url(#${clipId})`}>
          {cuts
            .filter(cut => (!isSelector && !interactive) ? cut.id === activeCut : true)
            .map((cut) => {
              const isActive = isSelector ? selectedCut === cut.id : activeCut === cut.id
              const isHover = hovered === cut.id

              // Colores según modo
              const fill = isSelector
                ? isActive ? '#C09040' : isHover ? '#D4A84E' : '#C09040'
                : isActive ? '#2d6a4f' : isHover ? '#40916c' : '#2d6a4f'

              const stroke = isSelector
                ? isActive ? '#F0E8D6' : isHover ? '#D4A84E' : 'rgba(192,144,64,0.2)'
                : isActive ? '#d8f3dc' : isHover ? '#40916c' : 'rgba(45,106,79,0.25)'

              const opacity = isActive ? 0.8 : isHover ? 0.45 : isSelector ? 0.1 : 0.13

              return (
                <motion.path
                  key={cut.id}
                  d={cut.path}
                  initial={{ opacity: 0 }}
                  animate={{ opacity }}
                  transition={{ duration: 0.2 }}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={isActive ? 1.5 : 0.8}
                  style={{ cursor: isSelector || interactive ? 'pointer' : 'default' }}
                  onMouseEnter={() => (isSelector || interactive) && setHovered(cut.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => {
                    if (isSelector) {
                      onSelect?.(cut.id)
                    } else if (interactive) {
                      onCutClick?.(cut.id)
                    }
                  }}
                />
              )
            })}
        </g>

        {/* Label connector — muestra corte activo o hovered */}
        {(activeCut || selectedCut || hovered) && (() => {
          const cut = cuts.find(c => c.id === (hovered || selectedCut || activeCut))
          if (!cut) return null
          const nums = (cut.path.match(/[\d.]+/g) || []).map(Number)
          const xs = nums.filter((_, i) => i % 2 === 0)
          const ys = nums.filter((_, i) => i % 2 === 1)
          const cx = xs.reduce((a, b) => a + b, 0) / xs.length
          const cy = ys.reduce((a, b) => a + b, 0) / ys.length
          const lx = cx - 80
          const ly = Math.max(28, cy - 50)
          const lineColor = isSelector ? '#C09040' : '#d8f3dc'
          const dotColor = isSelector ? '#C09040' : '#d8f3dc'

          return (
            <g>
              <line x1={cx} y1={cy} x2={lx} y2={ly}
                stroke={lineColor} strokeWidth="0.6" strokeDasharray="4,3" />
              <circle cx={cx} cy={cy} r="4" fill={dotColor} opacity="0.7" />
              <text
                x={lx - 5} y={ly - 4}
                fill={lineColor} fontSize="14" fontWeight="700"
                textAnchor="end"
                fontFamily="Inter, sans-serif"
              >
                {cut.name}
              </text>
            </g>
          )
        })()}
      </svg>

      {/* Tooltip — solo en modo display */}
      <AnimatePresence>
        {!isSelector && interactive && tooltipCut && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 border border-dark-border bg-dark-card/95 px-4 py-2.5 text-center backdrop-blur-sm"
          >
            <p className="font-heading text-sm font-bold text-campo">{tooltipCut.name}</p>
            <p className="mt-0.5 max-w-[240px] text-[10px] leading-relaxed text-cream/50">
              {tooltipCut.description}
            </p>
          </motion.div>
        )}
        {/* En modo selector: label del corte seleccionado bajo el diagrama */}
        {isSelector && selectedCut && !hovered && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-1 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-dorado"
          >
            {cuts.find(c => c.id === selectedCut)?.name}
          </motion.p>
        )}
        {isSelector && hovered && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-1 text-center text-[11px] uppercase tracking-[0.18em] text-dorado/60"
          >
            {cuts.find(c => c.id === hovered)?.name}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
