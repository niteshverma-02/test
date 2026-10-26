import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.identity.name} — ${profile.role}`;
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
          justifyContent: "space-between",
          padding: 72,
          background: "#0a1020",
          color: "#f5f1ea",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28 }}>
          <div style={{ width: 18, height: 18, background: "#ff7a59" }} />
          {profile.availability.label}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 132, fontWeight: 900, letterSpacing: -4, lineHeight: 0.9, textTransform: "uppercase" }}>{`${profile.identity.name}.`}</div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 56, fontWeight: 700, letterSpacing: -2 }}>
            <div style={{ display: "flex", background: "#ff7a59", color: "#ffffff", padding: "0 18px" }}>{profile.tagline}</div>
          </div>
        </div>
        <div style={{ fontSize: 28, color: "#a9b1c6" }}>{`${profile.role} · SEO · AEO · GEO`}</div>
      </div>
    ),
    size,
  );
}
