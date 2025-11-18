// main.js - xử lý tương tác chung

// Dữ liệu trích dẫn, bài viết, tôn giáo để chia sẻ giữa các trang
const quotes = [
  "Sự hiểu biết về niềm tin của người khác mở ra cơ hội đối thoại thay vì đối đầu.",
  "Tôn giáo nhắc chúng ta về ý nghĩa, nhưng trách nhiệm lựa chọn luôn thuộc về mỗi cá nhân.",
  "Khoa học trả lời câu hỏi ‘như thế nào’, tôn giáo và triết học giúp ta suy nghĩ về ‘vì sao’.",
];

const religionsData = [
  {
    name: "Phật giáo",
    origin: "Ấn Độ cổ đại, thế kỷ VI TCN",
    followers: "≈ 500 triệu",
    region: "Châu Á",
    description:
      "Nhấn mạnh con đường trung đạo, từ bi và trí tuệ để giải thoát khổ đau, thực hành thiền định và giới hạnh.",
    link: "religion-detail.html#phat-giao",
  },
  {
    name: "Kitô giáo",
    origin: "Trung Đông, thế kỷ I",
    followers: "≈ 2,3 tỷ",
    region: "Châu Âu",
    description:
      "Niềm tin vào Chúa Ba Ngôi, giáo huấn của Chúa Giê-su về tình yêu, tha thứ, và cứu rỗi qua đức tin.",
    link: "religion-detail.html#kito-giao",
  },
  {
    name: "Hồi giáo",
    origin: "Ả Rập, thế kỷ VII",
    followers: "≈ 1,9 tỷ",
    region: "Trung Đông",
    description:
      "Tin vào Thượng đế Allah, Kinh Qur’an và 5 trụ cột: tuyên tín, cầu nguyện, bố thí, chay Ramadan, hành hương.",
    link: "religion-detail.html#hoi-giao",
  },
  {
    name: "Hindu giáo",
    origin: "Tiểu lục địa Ấn Độ, hơn 3000 năm",
    followers: "≈ 1,2 tỷ",
    region: "Châu Á",
    description:
      "Hệ thống đa dạng với niềm tin vào dharma (bổn phận), nghiệp, luân hồi; tôn kính nhiều hình tượng thần linh.",
    link: "religion-detail.html#hindu-giao",
  },
  {
    name: "Do Thái giáo",
    origin: "Cận Đông cổ đại, hơn 3000 năm",
    followers: "≈ 15 triệu",
    region: "Trung Đông",
    description:
      "Tập trung vào giao ước giữa Thiên Chúa và dân Do Thái, đề cao luật Torah và truyền thống lễ nghi gia đình.",
    link: "religion-detail.html#do-thai-giao",
  },
  {
    name: "Khổng giáo",
    origin: "Trung Hoa cổ đại",
    followers: "≈ 6 triệu (ảnh hưởng văn hóa rộng)",
    region: "Châu Á",
    description:
      "Triết lý nhân, lễ, nghĩa, trí, tín; coi trọng đạo đức, giáo dục và trật tự xã hội hài hòa.",
    link: "religion-detail.html#khong-giao",
  },
  {
    name: "Thần đạo",
    origin: "Nhật Bản",
    followers: "≈ 90 triệu (theo thống kê văn hóa)",
    region: "Châu Á",
    description:
      "Tín ngưỡng thiên nhiên và tổ tiên, tôn kính kami; thực hành thanh tẩy, lễ hội và nghi thức tại đền.",
    link: "religion-detail.html#than-dao",
  },
  {
    name: "Sikh giáo",
    origin: "Punjab, thế kỷ XV",
    followers: "≈ 25 triệu",
    region: "Châu Á",
    description:
      "Dạy sống thẳng thắn, lao động chân chính, chia sẻ; tin vào một Đấng tối cao và 10 Guru khai sáng.",
    link: "religion-detail.html#sikh-giao",
  },
];

const blogPosts = [
  {
    title: "Tôn giáo và khoa học: đối đầu hay đối thoại?",
    date: "12/04/2024",
    summary:
      "Khám phá cách khoa học và tôn giáo từng mâu thuẫn, nhưng cũng có nhiều cầu nối về đạo đức và mục đích sống.",
    link: "post-detail.html",
  },
  {
    title: "Khác biệt giữa tôn giáo tổ chức và tín ngưỡng dân gian",
    date: "28/03/2024",
    summary:
      "So sánh cấu trúc, giáo lý, và cách thực hành giữa các tôn giáo có hệ thống và tín ngưỡng dân gian linh hoạt.",
    link: "post-detail.html",
  },
  {
    title: "Những lễ hội tâm linh nổi bật khắp châu Á",
    date: "15/03/2024",
    summary:
      "Từ lễ hội Songkran Thái Lan đến Obon Nhật Bản, mỗi lễ hội mang thông điệp biết ơn và kết nối cộng đồng.",
    link: "post-detail.html",
  },
  {
    title: "5 khái niệm triết học lặp lại trong nhiều tôn giáo",
    date: "02/03/2024",
    summary:
      "Từ lòng từ bi đến công lý và niềm hy vọng, nhiều tôn giáo lớn đều nhấn mạnh những giá trị nhân văn chung.",
    link: "post-detail.html",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  handleMobileMenu();
  animateOnScroll();
  initQuotes();
  initReligionFilter();
  initFAQ();
  populateBlogs();
});

function handleMobileMenu() {
  const btn = document.querySelector(".hamburger");
  const menu = document.querySelector(".mobile-menu");
  if (!btn || !menu) return;
  btn.addEventListener("click", () => {
    menu.classList.toggle("show");
  });
}

// Nhẹ nhàng hiện phần tử khi cuộn
function animateOnScroll() {
  const items = document.querySelectorAll(".fade-up");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("in-view");
      });
    },
    { threshold: 0.2 }
  );
  items.forEach((el) => observer.observe(el));
}

function initQuotes() {
  const box = document.querySelector("#quote-of-day");
  if (!box) return;
  const text = quotes[Math.floor(Math.random() * quotes.length)];
  box.textContent = text;
}

function initReligionFilter() {
  const grid = document.querySelector("#religion-grid");
  const search = document.querySelector("#search-religion");
  const region = document.querySelector("#filter-region");
  if (!grid || !search || !region) return;

  const render = (data) => {
    grid.innerHTML = data
      .map(
        (r) => `
        <article class="card fade-up">
          <div class="tag">${r.region}</div>
          <h3>${r.name}</h3>
          <p><strong>Nơi khởi sinh:</strong> ${r.origin}</p>
          <p><strong>Số tín đồ:</strong> ${r.followers}</p>
          <p>${r.description}</p>
          <a class="btn secondary" href="${r.link}">Xem chi tiết</a>
        </article>
      `
      )
      .join("");
    animateOnScroll();
  };

  const applyFilter = () => {
    const term = search.value.toLowerCase();
    const regionValue = region.value;
    const filtered = religionsData.filter((r) => {
      const matchText = r.name.toLowerCase().includes(term) || r.description.toLowerCase().includes(term);
      const matchRegion = regionValue === "all" || r.region === regionValue;
      return matchText && matchRegion;
    });
    render(filtered);
  };

  search.addEventListener("input", applyFilter);
  region.addEventListener("change", applyFilter);
  render(religionsData);
}

function initFAQ() {
  const items = document.querySelectorAll(".faq-item");
  items.forEach((item) => {
    const question = item.querySelector(".faq-question");
    question?.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });
}

// Đổ dữ liệu bài viết vào trang chủ và trang blog
function populateBlogs() {
  const container = document.querySelector("#latest-posts");
  if (container) {
    container.innerHTML = blogPosts
      .slice(0, 3)
      .map(
        (b) => `
        <article class="card blog-card fade-up">
          <div class="meta">${b.date}</div>
          <h3>${b.title}</h3>
          <p>${b.summary}</p>
          <a class="btn secondary" href="${b.link}">Đọc thêm</a>
        </article>
      `
      )
      .join("");
    animateOnScroll();
  }

  const listPage = document.querySelector("#blog-list");
  if (listPage) {
    listPage.innerHTML = blogPosts
      .map(
        (b) => `
        <article class="card blog-card fade-up">
          <div class="meta">${b.date}</div>
          <h3>${b.title}</h3>
          <p>${b.summary}</p>
          <a class="btn secondary" href="${b.link}">Đọc thêm</a>
        </article>
      `
      )
      .join("");
    animateOnScroll();
  }
}
