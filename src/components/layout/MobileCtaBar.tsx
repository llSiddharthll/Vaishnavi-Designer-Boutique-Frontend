import { MessageCircle, Phone } from "lucide-react";
import { siteEnv, waLink } from "@/lib/env";

export function MobileCtaBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-vdb-gold/30 bg-vdb-wine-deep text-vdb-cream shadow-[0_-8px_24px_rgba(74,15,35,0.18)] md:hidden"
      aria-label="Quick contact bar"
    >
      <a
        href={`tel:${siteEnv.phoneDisplay.replace(/\s+/g, "")}`}
        className="flex items-center justify-center gap-2 py-3.5 text-xs font-medium uppercase tracking-[0.18em]"
      >
        <Phone size={16} /> Call
      </a>
      <a
        href={waLink("Namaste! Vaishnavi Designer Boutique se baat karni hai.")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-[#25D366] py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-white"
      >
        <MessageCircle size={16} /> WhatsApp
      </a>
    </div>
  );
}
