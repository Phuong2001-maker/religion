// globe.js - tạo quả địa cầu 3D với marker theo khu vực
let scene, camera, renderer, globe, raycaster, mouse, tooltipEl;

const markers = [
  {
    name: "Châu Âu",
    lat: 54,
    lng: 15,
    religion: "Kitô giáo",
    desc: "Kitô giáo chiếm đa số với nhiều truyền thống Công giáo, Chính thống, Tin Lành.",
    color: "#f5a524",
  },
  {
    name: "Trung Đông",
    lat: 25,
    lng: 45,
    religion: "Hồi giáo",
    desc: "Hồi giáo chiếm ưu thế, đồng thời là nơi khởi sinh của Do Thái giáo và Kitô giáo.",
    color: "#22d3ee",
  },
  {
    name: "Nam Á",
    lat: 20,
    lng: 78,
    religion: "Hindu giáo & Phật giáo",
    desc: "Tiểu lục địa Ấn Độ là nôi của Hindu giáo, Phật giáo và Sikh giáo.",
    color: "#a78bfa",
  },
  {
    name: "Đông Á",
    lat: 35,
    lng: 105,
    religion: "Phật giáo, Đạo/Khổng giáo",
    desc: "Ảnh hưởng mạnh của Phật giáo Đại thừa, Khổng giáo và tín ngưỡng dân gian.",
    color: "#fb7185",
  },
  {
    name: "Bắc Mỹ",
    lat: 40,
    lng: -98,
    religion: "Kitô giáo đa hệ phái",
    desc: "Đa dạng hệ phái Kitô giáo và sự gia tăng các nhóm vô thần/không tôn giáo.",
    color: "#34d399",
  },
  {
    name: "Châu Phi",
    lat: 1,
    lng: 20,
    religion: "Kitô giáo & Hồi giáo",
    desc: "Kitô giáo mạnh ở phía Nam, Hồi giáo nổi trội ở Bắc và vùng Sahel.",
    color: "#f97316",
  },
];

function initGlobe() {
  const canvasWrap = document.querySelector("#globe-container");
  tooltipEl = document.querySelector(".tooltip");
  if (!canvasWrap) return;

  const width = canvasWrap.clientWidth;
  const height = 520;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 0, 5);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  canvasWrap.appendChild(renderer.domElement);

  const ambient = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambient);
  const dir = new THREE.DirectionalLight(0xffffff, 0.8);
  dir.position.set(5, 2, 5);
  scene.add(dir);

  const geometry = new THREE.SphereGeometry(1.4, 64, 64);
  const material = new THREE.MeshStandardMaterial({
    color: "#1e293b",
    emissive: "#111827",
    roughness: 0.65,
    metalness: 0.15,
    wireframe: false,
  });
  globe = new THREE.Mesh(geometry, material);
  scene.add(globe);

  // Thêm bề mặt lưới nhẹ để tạo cảm giác 3D có chi tiết
  const wire = new THREE.LineSegments(
    new THREE.EdgesGeometry(geometry, 0.1),
    new THREE.LineBasicMaterial({ color: "#334155", transparent: true, opacity: 0.35 })
  );
  globe.add(wire);

  // Marker
  const markerGeo = new THREE.SphereGeometry(0.04, 16, 16);
  markers.forEach((m) => {
    const markerMat = new THREE.MeshStandardMaterial({ color: m.color, emissive: m.color, emissiveIntensity: 0.5 });
    const mesh = new THREE.Mesh(markerGeo, markerMat);
    const { x, y, z } = latLngToVector3(m.lat, m.lng, 1.42);
    mesh.position.set(x, y, z);
    mesh.userData = m;
    globe.add(mesh);
  });

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  renderer.domElement.addEventListener("pointermove", onPointerMove);
  renderer.domElement.addEventListener("click", onPointerClick);
  window.addEventListener("resize", onResize);

  animate();
}

function latLngToVector3(lat, lng, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return {
    x: -(radius * Math.sin(phi) * Math.cos(theta)),
    y: radius * Math.cos(phi),
    z: radius * Math.sin(phi) * Math.sin(theta),
  };
}

function onPointerMove(event) {
  const bounds = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
  mouse.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
}

function onPointerClick() {
  showTooltip();
}

function showTooltip() {
  if (!tooltipEl) return;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(globe.children, false);
  const hit = intersects.find((i) => i.object.userData && i.object.userData.name);
  if (hit) {
    const { name, religion, desc, color } = hit.object.userData;
    tooltipEl.style.display = "block";
    tooltipEl.innerHTML = `<strong>${name}</strong><br>${religion}<br><small>${desc}</small>`;
    tooltipEl.style.borderColor = color;
    // đặt tooltip gần con trỏ
    tooltipEl.style.left = `${(mouse.x + 1) * 50}%`;
    tooltipEl.style.top = `${(1 - mouse.y) * 50}%`;
  } else {
    tooltipEl.style.display = "none";
  }
}

function animate() {
  requestAnimationFrame(animate);
  globe.rotation.y += 0.0015;
  renderer.render(scene, camera);
  showTooltip();
}

function onResize() {
  const canvasWrap = document.querySelector("#globe-container");
  if (!canvasWrap) return;
  const width = canvasWrap.clientWidth;
  const height = 520;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector("#globe-container")) {
    initGlobe();
  }
});
