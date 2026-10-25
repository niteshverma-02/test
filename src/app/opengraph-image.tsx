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
          background: "#0d0710",
          color: "#fdf0f5",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28 }}>
          <div style={{ width: 18, height: 18, borderRadius: 9999, background: "#ff6b9d" }} />
          {profile.availability.label}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 132, fontWeight: 800, letterSpacing: -6, lineHeight: 0.95, textTransform: "uppercase" }}>{`${profile.identity.name}.`}</div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 56, fontWeight: 700, letterSpacing: -2 }}>
            <div style={{ display: "flex", background: "#ff6b9d", color: "#ffffff", padding: "0 18px", borderRadius: 8 }}>{profile.tagline}</div>
          </div>
        </div>
        <div style={{ fontSize: 28, color: "#c49ab0" }}>{`${profile.role} · Strategy · Content · Branding`}</div>
      </div>
    ),
    size,
  );
}
