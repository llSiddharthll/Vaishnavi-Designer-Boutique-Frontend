import Link from "next/link";

export default function NotFound() {
  return (
    <section className="vdb-grain relative flex min-h-[60vh] items-center justify-center bg-vdb-cream py-24">
      <div className="mx-auto max-w-lg px-5 text-center sm:px-8">
        <p className="font-accent text-xs uppercase tracking-[0.32em] text-vdb-gold">404</p>
        <h1 className="mt-4 font-display text-5xl text-vdb-wine-deep sm:text-6xl">
          That thread <span className="italic text-vdb-wine">unraveled.</span>
        </h1>
        <p className="mt-5 text-base leading-7 text-vdb-muted">
          We could not find the page you were looking for. Head back home, or
          start with our services.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="rounded-full bg-vdb-wine px-6 py-2.5 text-xs uppercase tracking-[0.18em] text-vdb-ivory transition hover:bg-vdb-wine-deep">
            Home
          </Link>
          <Link href="/services" className="rounded-full border border-vdb-wine px-6 py-2.5 text-xs uppercase tracking-[0.18em] text-vdb-wine transition hover:bg-vdb-wine hover:text-vdb-ivory">
            Browse services
          </Link>
        </div>
      </div>
    </section>
  );
}
