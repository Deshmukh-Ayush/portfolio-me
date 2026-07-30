import { ImageResponse } from "next/og";

export const alt = "UI Design — Ayush Deshmukh";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0a",
          padding: "60px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#ffffff",
            }}
          />
          <span style={{ fontSize: "20px", color: "#a3a3a3" }}>
            Ayush Deshmukh
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.1,
            }}
          >
            UI Design
          </div>
          <div style={{ fontSize: "24px", color: "#737373" }}>
            Figma concepts & visual explorations
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#525252",
            fontSize: "18px",
          }}
        >
          <span>everywhereayush.in</span>
          <span>Design Engineer</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
