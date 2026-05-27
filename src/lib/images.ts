// Central image registry. All URLs verified live.
// Source: Unsplash (free for commercial use, no attribution required).
// Replace any of these with real boutique photos via the admin Cloudinary upload
// flow — same key, swap the URL.

function u(id: string, w = 1400, q = 75): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;
}

export const img = {
  // Heroes
  heroLehenga: u("1645862755924-9f4e7f200b83", 1600), // red & gold lehenga
  heroBride: u("1762201698238-bf412e297016", 1600), // bride on steps
  heroSareeFlower: u("1752469135696-f87983c56f2b", 1600), // saree, flower
  heroRedSari: u("1717835806988-3739f9e55926", 1600), // red & gold sari

  // Service tiles + headers
  whiteRedLehenga: u("1693336429270-094637e16d38", 1400),
  redWhiteWedding: u("1722952908681-944d47e45853", 1400),
  greenSaree: u("1745482036066-5d215ed6b910", 1400),

  // Atelier / craft mood
  fabric1: u("1481325545291-94394fe1cf95", 1400),
  fabric2: u("1616756141603-6d37d5cde2a2", 1400),
  fabric3: u("1616756351484-798f37bdffa0", 1400),
  sewing1: u("1466027397211-20d0f2449a3f", 1400),
  sewing2: u("1626274890657-e28d5b65b04b", 1400),
  sewing3: u("1560796952-f1c9b838544c", 1400),
} as const;

export type ImgKey = keyof typeof img;

// Per-service image (used by /services and /services/[slug])
export const serviceImage: Record<string, string> = {
  "lehenga-design": img.heroBride,
  "saree-blouse-stitching": img.heroRedSari,
  "dress-design": img.whiteRedLehenga,
  "saree-draping-pleating": img.greenSaree,
  alterations: img.sewing2,
};

// 8 images for the gallery grid
export const galleryImages: { src: string; label: string }[] = [
  { src: img.heroBride, label: "Bridal lehenga · Lucknow" },
  { src: img.heroRedSari, label: "Red & gold sari" },
  { src: img.whiteRedLehenga, label: "Sangeet lehenga" },
  { src: img.greenSaree, label: "Saree pleating" },
  { src: img.heroLehenga, label: "Bridal trousseau" },
  { src: img.heroSareeFlower, label: "Party saree" },
  { src: img.redWhiteWedding, label: "Reception look" },
  { src: img.fabric2, label: "Hand-picked fabric" },
];

// Blog default cover
export const blogDefaultCover = img.fabric2;
