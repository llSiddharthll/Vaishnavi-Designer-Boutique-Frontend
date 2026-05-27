"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { siteEnv } from "@/lib/env";

const formSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(80),
  phone: z
    .string()
    .min(7, "Phone number is too short")
    .regex(/^[0-9 +()-]+$/, "Use digits, spaces, + ( ) -"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  service: z.string().optional(),
  message: z.string().max(2000).optional(),
  preferredDate: z.string().optional(),
  hp: z.string().max(0).optional(),
});
type FormValues = z.infer<typeof formSchema>;

const services = [
  "Lehenga Design",
  "Saree Blouse Stitching",
  "Designer Dress / Party Wear",
  "Saree Pre-Stitching / Pleating",
  "Fall Pico / Alterations",
  "Other",
];

export function InquiryForm({ defaultService }: { defaultService?: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { service: defaultService ?? "" },
  });
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [errMsg, setErrMsg] = useState<string>("");

  async function onSubmit(values: FormValues) {
    try {
      setErrMsg("");
      const res = await fetch(`${siteEnv.apiBaseUrl}/inquiries`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || "Request failed");
      }
      setStatus("ok");
      reset({ service: defaultService ?? "" });
    } catch (e) {
      setStatus("err");
      setErrMsg(e instanceof Error ? e.message : "Something went wrong");
    }
  }

  const labelCls = "block text-xs uppercase tracking-[0.18em] text-vdb-muted mb-1.5";
  const inputCls =
    "w-full rounded-md border border-vdb-gold/40 bg-vdb-ivory px-4 py-3 text-sm text-vdb-ink outline-none transition focus:border-vdb-wine focus:ring-1 focus:ring-vdb-wine/30";
  const errCls = "mt-1 text-xs text-vdb-wine";

  if (status === "ok") {
    return (
      <div className="rounded-lg border border-vdb-gold/40 bg-vdb-ivory p-8 text-center">
        <p className="font-display text-2xl text-vdb-wine-deep">Shukriya!</p>
        <p className="mt-2 text-sm text-vdb-muted">
          Aapka message mil gaya hai. Hum WhatsApp pe ek din ke andar reply karenge.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="vdb-link mt-4 inline-block text-xs uppercase tracking-[0.18em] text-vdb-wine"
        >
          Ek aur message bhejiye
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="grid gap-5 rounded-xl border border-vdb-gold/30 bg-vdb-ivory/70 p-6 backdrop-blur-sm sm:p-8"
    >
      {/* honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        {...register("hp")}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="if-name">Aapka Naam *</label>
          <input id="if-name" {...register("name")} className={inputCls} placeholder="Anushka Singh" />
          {errors.name && <p className={errCls}>{errors.name.message}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="if-phone">Phone / WhatsApp *</label>
          <input id="if-phone" inputMode="tel" {...register("phone")} className={inputCls} placeholder="+91 …" />
          {errors.phone && <p className={errCls}>{errors.phone.message}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="if-email">Email (optional)</label>
          <input id="if-email" type="email" {...register("email")} className={inputCls} placeholder="you@email.com" />
          {errors.email && <p className={errCls}>{errors.email.message}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="if-service">Kaunsi service</label>
          <select id="if-service" {...register("service")} className={inputCls}>
            <option value="">Service chunein</option>
            {services.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls} htmlFor="if-date">Pasandida visit date (optional)</label>
        <input id="if-date" type="date" {...register("preferredDate")} className={inputCls} />
      </div>

      <div>
        <label className={labelCls} htmlFor="if-message">Apni baat batayiye</label>
        <textarea
          id="if-message"
          rows={4}
          {...register("message")}
          className={inputCls}
          placeholder="Event ki date, fabric ka idea, kuch reference — jo bhi humein help karega."
        />
      </div>

      {status === "err" && (
        <p className="text-sm text-vdb-wine">Submit nahi ho paaya: {errMsg}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center rounded-full bg-vdb-wine px-7 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-vdb-ivory transition hover:bg-vdb-wine-deep disabled:opacity-50"
      >
        {isSubmitting ? "Bhej rahe hain…" : "Inquiry Bhejiye"}
      </button>
      <p className="text-[11px] text-vdb-muted">
        Submit karne ka matlab — aap apne diye gaye phone / WhatsApp pe contact ke liye sehmat hain.
      </p>
    </form>
  );
}
