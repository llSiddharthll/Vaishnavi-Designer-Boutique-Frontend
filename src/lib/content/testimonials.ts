export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
  service: string;
  rating: number; // 1-5
  featured?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Meri shaadi ka pura lehenga, blouse aur dupatta yahin se bana — start se end tak. Teen fittings, no rush, aakhri minute mein koi panga nahi. Embroidery exactly jaisi maine imagine ki thi waisi. Reception ke din sab pucha — kahaan se hai?",
    name: "Anushka Singh",
    detail: "Reception · Hazratganj",
    service: "Bridal Lehenga",
    rating: 5,
    featured: true,
  },
  {
    quote:
      "Teen saal se sirf yahin se blouse banwati hoon. Fit Lucknow mein sabse achha hai — Arti Ji meri baat sunti hain, fir design suggest karti hain.",
    name: "Pooja Mehrotra",
    detail: "Gomti Nagar · Regular",
    service: "Blouse Stitching",
    rating: 5,
  },
  {
    quote:
      "Banaras se saree li thi, ek hi din mein pre-stitch karke aisi tayyar ki ki maine bas pehni aur chal di. Saree pehnna pehli baar itna easy laga.",
    name: "Rashmi Kapoor",
    detail: "Aliganj · Festive",
    service: "Saree Pre-stitching",
    rating: 5,
  },
  {
    quote:
      "Sangeet ka outfit do hafte mein deliver kar diya — bilkul perfect fit. Mom bahut khush hain ki Lucknow mein aisi designer mil gayi.",
    name: "Sneha Verma",
    detail: "Indira Nagar · Sangeet",
    service: "Designer Dress",
    rating: 5,
  },
];
