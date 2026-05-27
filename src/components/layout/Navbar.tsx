"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-vdb-gold/20 bg-vdb-cream/90 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3" aria-label="Vaishnavi Designer Boutique — Home">
          <Image src="/logo.png" alt="Vaishnavi Designer Boutique" width={40} height={40} priority className="sm:h-11 sm:w-11" />
          <span className="font-display text-base leading-none text-vdb-wine-deep sm:text-lg">
            Vaishnavi <span className="italic text-vdb-gold">Designer</span> Boutique
          </span>
        </Link>

        <ul className="hidden items-center gap-7 text-sm tracking-wide text-vdb-ink md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="vdb-link uppercase">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="hidden rounded-full border border-vdb-wine px-5 py-2 text-xs uppercase tracking-[0.18em] text-vdb-wine transition hover:bg-vdb-wine hover:text-vdb-ivory md:inline-block"
        >
          Visit Book Karein
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 flex h-11 w-11 items-center justify-center text-vdb-wine-deep md:hidden"
          aria-label={open ? "Menu band karein" : "Menu kholiye"}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {open && (
        <div className="fixed inset-x-0 top-[64px] z-40 h-[calc(100vh-64px-56px)] overflow-y-auto bg-vdb-cream md:hidden">
          <ul className="flex flex-col gap-1 px-5 py-6">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block border-b border-vdb-gold/15 py-4 font-display text-2xl text-vdb-wine-deep"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-6">
              <Link
                href="/contact"
                className="block rounded-full bg-vdb-wine px-6 py-3.5 text-center text-xs uppercase tracking-[0.2em] text-vdb-ivory"
                onClick={() => setOpen(false)}
              >
                Visit Book Karein
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
