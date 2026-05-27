export type Service = {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  heroIntro: string;
  whoFor: string[];
  process: { title: string; body: string }[];
  fabricNotes: string;
  faqs: { q: string; a: string }[];
  seo: { title: string; description: string };
  relatedSlugs: string[];
  turnaround: string; // e.g. "6–8 hafte"
  badge?: string; // e.g. "Bridal speciality"
};

export const services: Service[] = [
  {
    slug: "lehenga-design",
    name: "Bridal & Party Lehenga Design",
    shortName: "Lehenga",
    tagline: "Shaadi se sangeet tak — har lehenga aapke naap pe banta hai.",
    description:
      "Flared circular skirts, mermaid silhouettes, traditional kalidar panel — har lehenga aapke body, aapke fabric, aur aapke function ke hisaab se ban-ta hai. Final stitch se pehle do baar muslin trial — taaki fit ekdum perfect baithe.",
    heroIntro:
      "Bridal-grade construction, party-friendly weight, aur aisi inner lining ki aap aaraam se dance kar sakein.",
    whoFor: [
      "Brides planning a Lucknow wedding 8–10 weeks out",
      "Sangeet, mehendi and reception guests",
      "Anyone who wants a designer lehenga without the designer markup",
    ],
    process: [
      { title: "Consultation", body: "References, body measurements across three points, budget honesty." },
      { title: "Fabric & sketch", body: "We pull options from our library and draft the silhouette together." },
      { title: "Muslin trial", body: "A test garment to lock the fit before we cut the real fabric." },
      { title: "Embroidery & finishing", body: "Zardozi, gota, dabka, or machine — whichever fits the brief." },
      { title: "Final fitting", body: "Full-look trial 10 days before your event with seam allowance for last-minute fit changes." },
    ],
    fabricNotes:
      "Velvets in winter; raw silk and chanderi for daytime; net, organza, georgette and tissue for sangeet glamour. We source from Lucknow, Banaras and Surat depending on the piece.",
    faqs: [
      {
        q: "How long does a bridal lehenga take?",
        a: "Eight to ten weeks for a fully-embroidered piece. Less than eight weeks and the embroidery quality suffers.",
      },
      {
        q: "Can I bring my own fabric?",
        a: "Yes — bring it in for assessment first; we will check weight, drape and quantity before quoting.",
      },
      {
        q: "Do you do destination wedding fittings?",
        a: "We handle all fittings at our Lucknow atelier. We can courier the finished lehenga anywhere within India.",
      },
    ],
    seo: {
      title: "Lehenga Designer in Lucknow — Bridal & Party Lehenga Stitching",
      description:
        "Custom bridal and party lehenga designer in Lucknow. Hand-fitted across two muslin trials. Velvets, silks, georgette, organza. Vaishnavi Designer Boutique.",
    },
    relatedSlugs: ["saree-blouse-stitching", "dress-design"],
    turnaround: "6–8 hafte",
    badge: "Bridal Speciality",
  },
  {
    slug: "saree-blouse-stitching",
    name: "Saree Blouse Stitching & Fitting",
    shortName: "Blouse",
    tagline: "Saree ka asli look blouse se aata hai — wahi hum perfect banate hain.",
    description:
      "Padded, unpadded, princess-cut, corseted, backless, high-neck — Lucknow mein jo bhi blouse style chal raha hai, hum sab silaai karte hain. Neckline aur sleeves aapke body ke hisaab se decide hote hain, kisi template book se nahi.",
    heroIntro:
      "Zyada-tar customers pehle blouse banwane aati hain. Phir wapas nahi jatin kisi aur tailor ke paas.",
    whoFor: [
      "Saree lovers tired of ill-fitting tailor-made blouses",
      "Brides ordering blouses to match their lehenga or bridal saree",
      "Anyone who needs a quick alteration on a blouse bought elsewhere",
    ],
    process: [
      { title: "Measurements", body: "Twelve points; we keep them on file for repeat clients." },
      { title: "Neckline & back design", body: "Picked together based on face shape, body type and the saree." },
      { title: "Lining choice", body: "Cotton, satin or net — depending on the outer fabric." },
      { title: "First fitting", body: "Muslin trial; adjustments marked." },
      { title: "Final stitch", body: "Final pressing, hook setup, and detachable padding if requested." },
    ],
    fabricNotes:
      "Raw silk and brocade for bridal; cotton and chanderi for daily wear; net and georgette for parties. We always recommend a cotton lining for breathable wear.",
    faqs: [
      { q: "How long does a single blouse take?", a: "Seven to ten working days for fresh stitching; same day to one day for alterations." },
      { q: "Do you do padded blouses?", a: "Yes, with detachable foam cups so the blouse can be washed normally." },
      { q: "Can you copy a blouse I already own?", a: "Yes — bring it along and we will trace the pattern." },
    ],
    seo: {
      title: "Blouse Stitching in Lucknow — Designer Saree Blouse Tailor",
      description:
        "Designer saree blouse stitching in Lucknow. Padded, princess-cut, backless, high-neck and bridal blouse designs. Hand-fitted at Vaishnavi Designer Boutique.",
    },
    relatedSlugs: ["lehenga-design", "saree-draping-pleating"],
    turnaround: "7–10 din",
    badge: "Most Loved",
  },
  {
    slug: "dress-design",
    name: "Designer Dress & Party Wear",
    shortName: "Dresses",
    tagline: "Sangeet, engagement, ya cocktail — har event ka apna outfit.",
    description:
      "Sangeet looks, engagement gowns, cocktail dresses, indo-western flares — sab kuch scratch se aapke body aur event ke hisaab se ban-ta hai. Pastel sharara sets, corseted blouses with traditional skirts, aur statement-sleeve gowns is season ke most-requested styles hain.",
    heroIntro: "Event ke liye banaye gaye outfits, rack se nahi nikale gaye.",
    whoFor: [
      "Anyone with a sangeet, engagement, cocktail or reception coming up",
      "Mothers and sisters of the bride dressing for ceremonies",
      "Working women who want a few designer pieces in their wardrobe",
    ],
    process: [
      { title: "Brief", body: "Tell us the event, the mood, the comfort level." },
      { title: "Silhouette", body: "Corset, A-line, kalidar, mermaid, gown — we pick the one that fits the brief." },
      { title: "Fabric", body: "Tissue, organza, velvet, georgette — chosen to suit the season." },
      { title: "First fitting", body: "Muslin run, sleeve length test." },
      { title: "Final", body: "Pressed, packed, ready 10 days out." },
    ],
    fabricNotes:
      "Velvet for winter weddings, tissue and organza for sangeets, georgette and chiffon for cocktail evenings.",
    faqs: [
      { q: "Can you do western gowns too?", a: "Yes — fully western, indo-western, or full-traditional. Just tell us the event." },
      { q: "How much fabric do I need?", a: "We measure, then source — usually 4–6 metres depending on flare." },
    ],
    seo: {
      title: "Designer Dress & Party Wear in Lucknow — Custom Stitching",
      description:
        "Custom-designed party wear, sangeet gowns, indo-western dresses and sharara sets stitched in Lucknow at Vaishnavi Designer Boutique.",
    },
    relatedSlugs: ["lehenga-design", "saree-blouse-stitching"],
    turnaround: "2–4 hafte",
    badge: "Event Ready",
  },
  {
    slug: "saree-draping-pleating",
    name: "Saree Draping, Pleating & Pre-stitched Sarees",
    shortName: "Saree",
    tagline: "Saree leke aaiye, function ke liye ready hoke jaaiye.",
    description:
      "Classic Nivi drape se le ke modern ready-to-wear pre-stitched saree, pleating, fall & pico finishing, aur event ke din draping ki help — sab yahin hota hai. Function ke morning ka ek ghanta pleating bach jaata hai.",
    heroIntro:
      "Dulhanon ko especially pasand — kyunki shaadi ke baad ke events mein pleating ka time nahi hota.",
    whoFor: [
      "Brides wanting pre-stitched sarees for reception or muh dikhai",
      "Working women short on time on event mornings",
      "Anyone who has trouble pleating their own saree",
    ],
    process: [
      { title: "Bring the saree", body: "And the petticoat — we fit both together." },
      { title: "Choose the drape", body: "Nivi, Bengali, Gujarati, mermaid, dhoti." },
      { title: "Stitch & shape", body: "Permanent pleats, attached fall, secured pallu." },
      { title: "Final fit", body: "Worn once for trial; alterations the same day." },
    ],
    fabricNotes: "Works best with georgette, chiffon and lightweight silks. Heavy Banarasi may need extra structure.",
    faqs: [
      { q: "Does pre-stitching damage the saree?", a: "No — we use removable stitches that can be opened later by hand." },
      { q: "Do you do fall and pico the same day?", a: "Yes, in most cases." },
    ],
    seo: {
      title: "Saree Pre-stitching, Draping & Fall Pico in Lucknow",
      description:
        "Saree pre-stitching, draping and fall-pico finishing in Lucknow. Ready-to-wear sarees stitched at Vaishnavi Designer Boutique.",
    },
    relatedSlugs: ["saree-blouse-stitching", "alterations"],
    turnaround: "1–2 din",
    badge: "Quick Service",
  },
  {
    slug: "alterations",
    name: "Alterations & Wardrobe Care",
    shortName: "Alterations",
    tagline: "Jo kapde aapko pasand hain, unhe theek karwa lijiye.",
    description:
      "Resizing, taking in, letting out, fall and pico, hem-shortening, lining replacement, hook resets, aur bahar se khareedi gayi blouses-lehengas ka quick fix — sab yahin. Zyada-tar kaam same-day se le ke do din mein ho jaata hai.",
    heroIntro: "Chhota lagne wala kaam jo aapke wardrobe ke har kapde ki umar badha deta hai.",
    whoFor: [
      "Weight-shift fittings (up or down)",
      "Vintage sarees and family heirloom pieces",
      "Anyone who bought a blouse or lehenga elsewhere and needs it to fit",
    ],
    process: [
      { title: "Walk-in", body: "Bring the garment; we assess and quote on the spot." },
      { title: "Pin and mark", body: "We mark adjustments while you wear the piece." },
      { title: "Stitch", body: "Most jobs return within 48 hours." },
    ],
    fabricNotes: "We can work on any fabric — silk, georgette, cotton, net, organza, chiffon.",
    faqs: [
      { q: "How fast can you alter a blouse?", a: "Same day for simple alterations; up to 48 hours for major resizing." },
      { q: "Do you do men's alterations too?", a: "No — women's wear only." },
    ],
    seo: {
      title: "Boutique Alterations & Fall Pico in Lucknow — Same-Day Service",
      description:
        "Same-day blouse and saree alterations, fall pico and resizing in Lucknow at Vaishnavi Designer Boutique.",
    },
    relatedSlugs: ["saree-blouse-stitching", "saree-draping-pleating"],
    turnaround: "Same day – 48h",
    badge: "Same Day",
  },
];

export function serviceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
