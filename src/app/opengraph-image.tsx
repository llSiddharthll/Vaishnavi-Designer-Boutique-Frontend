import { ImageResponse } from "next/og";

export const alt = "Vaishnavi Designer Boutique — Best Designer Boutique in Lucknow";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #4A0F23 0%, #6B1733 100%)",
          color: "#FBF7F1",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* gold inset frame */}
        <div
          style={{
            position: "absolute",
            inset: 28,
            border: "2px solid rgba(201,162,75,0.55)",
            borderRadius: 18,
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#C9A24B",
            marginBottom: 28,
          }}
        >
          Jankipuram · Lucknow
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 78,
            lineHeight: 1.05,
            fontWeight: 700,
            color: "#FBF7F1",
            maxWidth: 980,
          }}
        >
          Vaishnavi Designer Boutique
        </div>
        <div
          style={{
            display: "flex",
            width: 120,
            height: 4,
            background: "#C9A24B",
            margin: "30px 0",
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 40,
            color: "#E8D9A8",
            fontStyle: "italic",
          }}
        >
          Lucknow&apos;s best designer boutique · 4.9★
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "rgba(251,247,241,0.85)",
            marginTop: 22,
            letterSpacing: 1,
          }}
        >
          Bridal Lehenga · Saree Blouse · Party Wear · Alterations
        </div>
      </div>
    ),
    { ...size },
  );
}
