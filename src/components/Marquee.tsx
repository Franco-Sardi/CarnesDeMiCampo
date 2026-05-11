const items = [
  'Cortes Selectos',
  'Hereford × Angus',
  'Mendoza',
  '100% Integrado',
  'Del Campo',
  'Artesanal',
  'Premium',
  'Tradición',
]

export default function Marquee() {
  const text = items.map(t => `${t}  ·  `).join('')

  return (
    <div className="overflow-hidden border-y border-dark-border bg-dark-soft py-5">
      <div className="marquee-track">
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="whitespace-nowrap font-display text-lg font-light italic tracking-wide text-transparent sm:text-2xl"
            style={{ WebkitTextStroke: '1px rgba(192, 144, 64, 0.28)' }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}
