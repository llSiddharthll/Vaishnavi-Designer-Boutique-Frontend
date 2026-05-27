const phrases = [
  "Bridal Lehenga",
  "Saree Blouse",
  "Party Wear",
  "Sangeet Outfit",
  "Saree Pre-stitching",
  "Fall & Pico",
  "Alterations",
  "Sharara Sets",
  "Anarkali",
  "Reception Gown",
  "Mehendi ka Joda",
  "Vidaai Saree",
];

export function Marquee() {
  const items = [...phrases, ...phrases];
  return (
    <section
      aria-hidden
      className="overflow-hidden border-y border-vdb-gold/30 bg-vdb-wine-deep py-4 sm:py-5"
    >
      <div className="vdb-marquee-track flex items-center gap-10 text-vdb-gold-soft sm:gap-12">
        {items.map((p, i) => (
          <span
            key={i}
            className="flex items-center gap-10 whitespace-nowrap font-accent text-xs uppercase tracking-[0.28em] sm:gap-12 sm:text-sm sm:tracking-[0.32em]"
          >
            {p}
            <span className="text-vdb-gold/60">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
