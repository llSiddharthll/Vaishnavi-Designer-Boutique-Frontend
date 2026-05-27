export type Overview = {
  inquiries: {
    total: number;
    byStatus: Record<string, number>;
    lastWeek: number;
    prevWeek: number;
    trendPct: number;
    series: { date: string; count: number }[];
    byService: { service: string; count: number }[];
  };
  blogs: {
    total: number;
    published: number;
    draft: number;
    recent: { id: number; title: string; status: string; updatedAt: string }[];
  };
  recentInquiries: {
    id: number;
    name: string;
    service: string | null;
    status: string;
    createdAt: string;
  }[];
};

export type InquiryStatus = "new" | "contacted" | "closed";

export type Inquiry = {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  service: string | null;
  message: string | null;
  preferred_date: string | null;
  status: InquiryStatus;
  notes: string | null;
  created_at: string;
};

export type BlogRow = {
  id: number;
  title: string;
  slug: string;
  status: "draft" | "published";
  updated_at: string;
  published_at: string | null;
};
