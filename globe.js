// globe.js - Globe tương tác WebGL Earth với tooltip số liệu cao cấp

const regions = [
  {
    name: "Bắc Âu",
    lat: 60,
    lng: 20,
    color: "#f5a524",
    dominant: "Kitô giáo (Tin Lành & Chính thống)",
    followers: "108 triệu tín đồ (khoảng 85% Kitô)",
    trend: "Đầu tư cho an sinh xã hội và giáo hội đồng hành cộng đồng gần gũi.",
    highlights: "Stockholm, Oslo, Copenhagen"
  },
  {
    name: "Tây Âu",
    lat: 50,
    lng: 5,
    color: "#f5a524",
    dominant: "Kitô giáo (Công giáo & Tin lành)",
    followers: "330 triệu tín đồ (khoảng 70% Công giáo)",
    trend: "Giữ di sản lịch sử trong khi đẩy mạnh cộng đồng xanh.",
    highlights: "Paris, Madrid, Rome"
  },
  {
    name: "Đông Âu",
    lat: 52,
    lng: 30,
    color: "#34d399",
    dominant: "Kitô giáo Chính thống & Tin lành bảo thủ",
    followers: "250 triệu tín đồ",
    trend: "Tăng cường giáo xứ địa phương cùng giá trị truyền thống.",
    highlights: "Moscow, Kiev, Sofia"
  },
  {
    name: "Bắc Phi",
    lat: 25,
    lng: 10,
    color: "#22d3ee",
    dominant: "Hồi giáo Sunni",
    followers: "210 triệu (Ai Cập, Algeria, Tunisia)",
    trend: "Duy trì giáo dục và hành hương quốc tế",
    highlights: "Cairo, Tunis, Casablanca"
  },
  {
    name: "Trung Phi",
    lat: 0,
    lng: 20,
    color: "#f97316",
    dominant: "Kitô giáo hòa hợp tín ngưỡng bản địa",
    followers: "150 triệu",
    trend: "Kết hợp lễ hội dân gian với hoạt động mục vụ đô thị.",
    highlights: "Kinshasa, Brazzaville"
  },
  {
    name: "Nam Phi",
    lat: -20,
    lng: 20,
    color: "#f97316",
    dominant: "Kitô giáo và tín ngưỡng bản địa",
    followers: "70 triệu",
    trend: "Thánh ca cộng đồng và giáo xứ đảo mở rộng.",
    highlights: "Cape Town, Johannesburg"
  },
  {
    name: "Trung Đông",
    lat: 27,
    lng: 45,
    color: "#22d3ee",
    dominant: "Hồi giáo Sunni & Shia",
    followers: "200 triệu",
    trend: "Giữ di sản hành hương và xây dựng hạ tầng hiện đại.",
    highlights: "Riyadh, Tehran, Baghdad"
  },
  {
    name: "Nam Á",
    lat: 20,
    lng: 78,
    color: "#a78bfa",
    dominant: "Hindu giáo ưu thế",
    followers: "1,1 tỉ Hindu tại Ấn Độ",
    trend: "Lan tỏa lễ hội, đền đài và mạng lưới từ thiện.",
    highlights: "Delhi, Varanasi, Mumbai"
  },
  {
    name: "Đông Á",
    lat: 35,
    lng: 105,
    color: "#fb7185",
    dominant: "Phật giáo & tín ngưỡng Đông Á",
    followers: "360 triệu (Trung Quốc, Nhật Bản, Hàn Quốc)",
    trend: "Kết hợp Phật & Thần đạo trong đô thị hiện đại.",
    highlights: "Bắc Kinh, Tokyo, Seoul"
  },
  {
    name: "Đông Nam Á",
    lat: 12,
    lng: 105,
    color: "#a78bfa",
    dominant: "Phật giáo & Hồi giáo",
    followers: "280 triệu Phật + 60 triệu Hồi",
    trend: "Đa dạng cộng đồng, trung tâm đền thờ liên tôn.",
    highlights: "Bangkok, Jakarta, Kuala Lumpur"
  },
  {
    name: "Trung Á",
    lat: 45,
    lng: 70,
    color: "#22d3ee",
    dominant: "Hồi giáo",
    followers: "110 triệu",
    trend: "Đô thị hóa đồng thời giữ nguyên vẹn lễ giáo truyền thống.",
    highlights: "Tashkent, Almaty, Ashgabat"
  },
  {
    name: "Bắc Mỹ",
    lat: 40,
    lng: -98,
    color: "#34d399",
    dominant: "Kitô giáo bảo thủ & Tin lành",
    followers: "250 triệu",
    trend: "Giáo hội địa phương kết nối thành phố đa sắc tộc.",
    highlights: "New York, Toronto, Mexico City"
  },
  {
    name: "Nam Mỹ",
    lat: -15,
    lng: -60,
    color: "#f5a524",
    dominant: "Kitô giáo Công giáo & Tin lành",
    followers: "420 triệu",
    trend: "Âm nhạc giáo hội, lễ hội và kỹ thuật số hóa thánh ca.",
    highlights: "São Paulo, Buenos Aires, Lima"
  },
  {
    name: "Châu Đại Dương",
    lat: -25,
    lng: 135,
    color: "#f97316",
    dominant: "Kitô giáo & tín ngưỡng bản địa",
    followers: "30 triệu",
    trend: "Giáo xứ đảo với lễ hội cộng đồng và di sản bản địa.",
    highlights: "Sydney, Auckland, Suva"
  }
];

const isMobileView = () => window.matchMedia("(max-width: 768px)").matches;

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("globe-container");
  if (!container || !window.WE) return;

  const canvasWrap = container.parentElement;
  const tooltip = canvasWrap?.querySelector(".tooltip");

  const earth = new WE.map("globe-container", {
    sky: true,
    atmosphere: true,
    zoom: 2.4,
    scrollWheelZoom: true,
    dragging: true,
    tilting: true,
    zooming: true,
  });

  WE.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
    minZoom: 1,
    maxZoom: 5,
  }).addTo(earth);

  earth.setView([20, 0], 2.4);

  regions.forEach((region) => {
    const icon = makeDotIcon(region.color);
    const marker = WE.marker([region.lat, region.lng], icon, 18, 18).addTo(earth);
    marker.element.style.zIndex = "0";

    marker.element.addEventListener("mouseenter", (event) => {
      showTooltip(region, event, tooltip, canvasWrap);
    });

    marker.element.addEventListener("mousemove", (event) => {
      positionTooltip(event, tooltip, canvasWrap);
    });

    marker.element.addEventListener("mouseleave", () => {
      hideTooltip(tooltip);
    });

    marker.element.addEventListener("touchstart", (event) => {
      event.preventDefault();
      showTooltip(region, event, tooltip, canvasWrap);
    });

    marker.element.addEventListener("touchmove", (event) => {
      positionTooltip(event, tooltip, canvasWrap);
    });

    marker.element.addEventListener("touchend", () => {
      hideTooltip(tooltip);
    });
  });

});

function showTooltip(region, event, tooltip, wrapper) {
  if (!tooltip || !wrapper) return;
  tooltip.classList.toggle("tooltip--mobile", isMobileView());
  tooltip.innerHTML = `
    <strong>${region.name}</strong>
    <p><strong>Ưu thế:</strong> ${region.dominant}</p>
    <p><strong>Số tín đồ:</strong> ${region.followers}</p>
    <p><strong>Xu hướng:</strong> ${region.trend}</p>
    <p><strong>Nổi bật:</strong> ${region.highlights}</p>
  `;
  tooltip.style.opacity = "1";
  positionTooltip(event, tooltip, wrapper);
}

function positionTooltip(event, tooltip, wrapper) {
  if (!tooltip || !wrapper) return;
  const rect = wrapper.getBoundingClientRect();
  if (isMobileView()) {
    tooltip.style.transform = "translate(-50%, -4%)";
    tooltip.style.left = `${rect.width / 2}px`;
    tooltip.style.top = `${rect.height * 0.1}px`;
    return;
  }
  const pointer = event.touches ? event.touches[0] : event;
  const left = Math.min(Math.max(pointer.clientX - rect.left, 40), rect.width - 40);
  const top = Math.min(Math.max(pointer.clientY - rect.top, 40), rect.height - 20);
  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;
  tooltip.style.transform = "translate(-50%, -110%)";
}

function hideTooltip(tooltip) {
  if (!tooltip) return;
  tooltip.style.opacity = "0";
}

function makeDotIcon(color) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="6" fill="${color}" stroke="white" stroke-width="1.5" />
    </svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}
