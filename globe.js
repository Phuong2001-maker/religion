// globe.js - Globe sử dụng WebGL Earth (CDN) với marker màu và tooltip
// Tham khảo https://www.webglearth.com/, không cần tự dựng texture nặng.

const regions = [
  { name: "Bắc Âu", lat: 60, lng: 20, religion: "Kitô giáo (Tin Lành/Chính thống)", color: "#7dd3fc" },
  { name: "Tây Âu", lat: 50, lng: 5, religion: "Kitô giáo (Công giáo)", color: "#facc15" },
  { name: "Đông Âu", lat: 52, lng: 30, religion: "Chính thống giáo", color: "#f97316" },
  { name: "Bắc Phi", lat: 25, lng: 10, religion: "Hồi giáo", color: "#22d3ee" },
  { name: "Trung Phi", lat: 0, lng: 20, religion: "Kitô giáo & bản địa", color: "#a78bfa" },
  { name: "Nam Phi", lat: -20, lng: 20, religion: "Kitô giáo đa hệ phái", color: "#c084fc" },
  { name: "Trung Đông", lat: 27, lng: 45, religion: "Hồi giáo", color: "#0ea5e9" },
  { name: "Nam Á", lat: 20, lng: 78, religion: "Hindu giáo & Phật giáo", color: "#f472b6" },
  { name: "Đông Á", lat: 35, lng: 105, religion: "Phật giáo, Đạo/Khổng", color: "#fb7185" },
  { name: "Đông Nam Á", lat: 12, lng: 105, religion: "Phật giáo & Hồi giáo", color: "#22c55e" },
  { name: "Trung Á", lat: 45, lng: 70, religion: "Hồi giáo", color: "#06b6d4" },
  { name: "Bắc Mỹ", lat: 40, lng: -98, religion: "Kitô giáo đa hệ phái", color: "#34d399" },
  { name: "Nam Mỹ", lat: -15, lng: -60, religion: "Công giáo & Tin Lành", color: "#f59e0b" },
  { name: "Châu Đại Dương", lat: -25, lng: 135, religion: "Kitô giáo & bản địa", color: "#60a5fa" },
];

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("globe-container");
  if (!container || !window.WE) return;

  // Khởi tạo bản đồ 3D WebGL Earth
  const earth = new WE.map("globe-container", {
    sky: true,
    atmosphere: true,
    zoom: 2.4,
    scrollWheelZoom: true,
    dragging: true,
    tilting: true,
    zooming: true,
  });

  // Lớp tile (sử dụng OSM mặc định của WebGL Earth)
  WE.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap",
    minZoom: 1,
    maxZoom: 5,
  }).addTo(earth);

  // Di chuyển camera để thấy toàn cầu
  earth.setView([20, 0], 2.4);

  // Tạo marker màu (SVG inline) + popup tooltip
  regions.forEach((r) => {
    const icon = makeDotIcon(r.color);
    const marker = WE.marker([r.lat, r.lng], icon, 16, 16).addTo(earth);
    const html = `<strong>${r.name}</strong><br>${r.religion}`;
    marker.bindPopup(html, { closeButton: false });
    marker.element.addEventListener("mouseover", () => marker.openPopup());
    marker.element.addEventListener("mouseout", () => marker.closePopup());
  });

  // Neo tooltip theo mousemove để giống cảm giác nổi theo vị trí camera
  container.addEventListener("mousemove", () => {
    // WebGLEarth tự lo popup, không cần thủ công.
  });
});

// Tạo icon chấm màu dạng SVG data URI để không cần ảnh ngoài
function makeDotIcon(color) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="6" fill="${color}" stroke="white" stroke-width="1.3" />
    </svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}
