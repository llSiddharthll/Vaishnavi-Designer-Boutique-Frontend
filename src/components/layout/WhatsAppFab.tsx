import { MessageCircle } from "lucide-react";
import { waLink } from "@/lib/env";

export function WhatsAppFab() {
  return (
    <a
      href={waLink("Namaste! Vaishnavi Designer Boutique se baat karni hai.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      // Hidden on mobile (the bottom bar covers this); visible on md+
      className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-vdb-wine-deep/15 ring-1 ring-white/30 transition hover:scale-105 md:flex"
    >
      <MessageCircle size={26} />
    </a>
  );
}
