export default function Marquee() {
  const text = 'Del Campo a tu Mesa — Carnes De Mi Campo — 100% Integrados — '

  return (
    <div className="overflow-hidden border-y border-dark-border bg-dark-soft py-5">
      <div className="marquee-track">
        {[...Array(4)].map((_, i) => (
          <span key={i} className="whitespace-nowrap font-heading text-3xl font-bold uppercase tracking-wider text-transparent sm:text-5xl"
            style={{ WebkitTextStroke: '1px rgba(45, 106, 79, 0.35)' }}>
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}
