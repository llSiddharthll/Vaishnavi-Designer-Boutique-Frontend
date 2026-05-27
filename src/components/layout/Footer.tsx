import Link from "next/link";
import Image from "next/image";
import { Instagram, Phone, MessageCircle, MapPin, Clock, Mail } from "lucide-react";
import { siteEnv, waLink } from "@/lib/env";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-vdb-gold/20 bg-vdb-wine-deep text-vdb-cream">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Vaishnavi Designer Boutique" width={56} height={56} />
            <span className="font-display text-2xl text-vdb-gold-soft">
              Vaishnavi <span className="italic">Designer</span> Boutique
            </span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-7 text-vdb-cream/80">
            Lucknow ka women's wear atelier. Custom lehenga, designer blouse,
            party-wear dress, saree pre-stitching, fall pico aur alterations —
            sab kuch aapke naap pe, aapki pasand se, aapke event ke liye.
          </p>
        </div>

        <div>
          <h4 className="font-accent text-sm uppercase tracking-[0.24em] text-vdb-gold">Visit</h4>
          <address className="mt-4 space-y-3 not-italic text-sm leading-6 text-vdb-cream/85">
            <p className="flex items-start gap-2"><MapPin size={16} className="mt-1 shrink-0" />{siteEnv.addressLine1}, {siteEnv.addressLine2}</p>
            <p className="flex items-center gap-2"><Clock size={16} />{siteEnv.hours}</p>
            <p className="flex items-center gap-2"><Phone size={16} /><a href={`tel:${siteEnv.phoneDisplay.replace(/\s+/g, "")}`} className="vdb-link">{siteEnv.phoneDisplay}</a></p>
            {siteEnv.phoneAltDisplay && (
              <p className="flex items-center gap-2"><Phone size={16} className="opacity-60" /><a href={`tel:${siteEnv.phoneAltDisplay.replace(/\s+/g, "")}`} className="vdb-link text-vdb-cream/70">{siteEnv.phoneAltDisplay}</a></p>
            )}
            <p className="flex items-center gap-2"><Mail size={16} /><a href={`mailto:${siteEnv.email}`} className="vdb-link">{siteEnv.email}</a></p>
          </address>
        </div>

        <div>
          <h4 className="font-accent text-sm uppercase tracking-[0.24em] text-vdb-gold">Wander</h4>
          <ul className="mt-4 space-y-2 text-sm text-vdb-cream/85">
            <li><Link href="/services/lehenga-design" className="vdb-link">Lehenga Design</Link></li>
            <li><Link href="/services/saree-blouse-stitching" className="vdb-link">Blouse Stitching</Link></li>
            <li><Link href="/services/dress-design" className="vdb-link">Party Wear</Link></li>
            <li><Link href="/services/saree-draping-pleating" className="vdb-link">Saree Pre-Stitching</Link></li>
            <li><Link href="/services/alterations" className="vdb-link">Alterations</Link></li>
            <li><Link href="/blog" className="vdb-link">Journal</Link></li>
          </ul>
          <div className="mt-5 flex items-center gap-4">
            <a href={siteEnv.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-vdb-gold-soft hover:text-vdb-gold">
              <Instagram size={20} />
            </a>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-vdb-gold-soft hover:text-vdb-gold">
              <MessageCircle size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-vdb-cream/10">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 text-xs text-vdb-cream/60 sm:px-8">
          <p>© {year} Vaishnavi Designer Boutique · Lucknow</p>
          <p className="font-accent italic">Pyaar se silaai.</p>
        </div>
      </div>
    </footer>
  );
}
