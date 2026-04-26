const CAREER_MAP = {
  A: [
    {
      trait: "logic",
      name: "IT / Phần mềm",
      desc: "Lập trình hệ thống",
      icon: "fa-code",
      color: "text-blue-500",
    },
    {
      trait: "creative",
      name: "Kỹ sư Robot",
      desc: "Chế tạo tự động hóa",
      icon: "fa-robot",
      color: "text-blue-500",
    },
    {
      trait: "detail",
      name: "Kế toán / Kiểm toán",
      desc: "Quản lý tài chính",
      icon: "fa-calculator",
      color: "text-blue-500",
    },
  ],
  B: [
    {
      trait: "detail",
      name: "Bác sĩ",
      desc: "Khám chữa bệnh",
      icon: "fa-user-md",
      color: "text-green-500",
    },
    {
      trait: "social",
      name: "Y tá / Điều dưỡng",
      desc: "Chăm sóc bệnh nhân",
      icon: "fa-plus-square",
      color: "text-green-500",
    },
    {
      trait: "logic",
      name: "Dược sĩ",
      desc: "Nghiên cứu thuốc",
      icon: "fa-pills",
      color: "text-green-500",
    },
  ],
  C: [
    {
      trait: "social",
      name: "Báo chí",
      desc: "Truyền thông đại chúng",
      icon: "fa-newspaper",
      color: "text-orange-500",
    },
    {
      trait: "logic",
      name: "Luật sư",
      desc: "Tư vấn pháp lý",
      icon: "fa-balance-scale",
      color: "text-orange-500",
    },
    {
      trait: "creative",
      name: "Du lịch",
      desc: "Quản trị lữ hành",
      icon: "fa-map-marked",
      color: "text-orange-500",
    },
  ],
  D: [
    {
      trait: "social",
      name: "PR / Nhân sự",
      desc: "Quan hệ công chúng",
      icon: "fa-users",
      color: "text-purple-500",
    },
    {
      trait: "creative",
      name: "Marketing",
      desc: "Sáng tạo quảng cáo",
      icon: "fa-ad",
      color: "text-purple-500",
    },
    {
      trait: "logic",
      name: "Kinh tế",
      desc: "Phân tích tài chính",
      icon: "fa-chart-line",
      color: "text-purple-500",
    },
  ],
  OTHER: [
    {
      trait: "creative",
      name: "Designer",
      desc: "Thiết kế đồ họa",
      icon: "fa-palette",
      color: "text-pink-500",
    },
  ],
};

const ALL_BLOCKS = [
  { code: "A00", subjects: "Toán, Lý, Hóa" },
  { code: "A01", subjects: "Toán, Lý, Anh" },
  { code: "B00", subjects: "Toán, Hóa, Sinh" },
  { code: "C00", subjects: "Văn, Sử, Địa" },
  { code: "D01", subjects: "Toán, Văn, Anh" },
];

let state = { block: "", traits: [] };

// --- DROPDOWN ---
const searchInput = document.getElementById("searchInput");
const dropdownList = document.getElementById("dropdownList");

if (searchInput) {
  searchInput.addEventListener("focus", () => {
    dropdownList.classList.remove("hidden");
    renderDropdown(ALL_BLOCKS);
  });
  searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toUpperCase();
    const filtered = ALL_BLOCKS.filter(
      (b) => b.code.includes(term) || b.subjects.includes(term),
    );
    renderDropdown(filtered);
  });
}

function renderDropdown(items) {
  dropdownList.innerHTML = items
    .map(
      (item) =>
        `<li onclick="selectBlock('${item.code}', '${item.subjects}')" class="p-3 hover:bg-blue-50 cursor-pointer border-b">${item.code} - ${item.subjects}</li>`,
    )
    .join("");
}

window.selectBlock = (code, subs) => {
  state.block = code;
  document.getElementById("displayCode").innerText = code;
  document.getElementById("displaySubjects").innerText = subs;
  document.getElementById("selectedBlockDisplay").classList.remove("hidden");
  searchInput.parentElement.classList.add("hidden");
  dropdownList.classList.add("hidden");
};

window.clearSelection = () => {
  state.block = "";
  document.getElementById("selectedBlockDisplay").classList.add("hidden");
  searchInput.parentElement.classList.remove("hidden");
};

window.toggleTrait = (id) => {
  const idx = state.traits.indexOf(id);
  if (idx > -1) state.traits.splice(idx, 1);
  else if (state.traits.length < 2) state.traits.push(id);
  ["logic", "creative", "social", "detail"].forEach((t) => {
    document.getElementById(`trait-${t}`).className = state.traits.includes(t)
      ? "trait-btn active p-3 border rounded-lg flex flex-col items-center"
      : "trait-btn p-3 border rounded-lg bg-white flex flex-col items-center";
  });
};

// --- SUBMIT ---
document.getElementById("careerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // LẤY TÊN: Ưu tiên lấy từ window.USER_NAME, nếu không có lấy từ data-attribute của body
  const name =
    window.USER_NAME || document.body.getAttribute("data-user") || "Thành viên";
  const year = document.getElementById("inputYear").value;

  if (!state.block) {
    document.getElementById("errorMsg").classList.remove("hidden");
    return;
  }

  // Tính toán kết quả
  const prefix = state.block.charAt(0);
  let careers = [...(CAREER_MAP[prefix] || CAREER_MAP["OTHER"])];
  careers.sort(
    (a, b) =>
      (state.traits.includes(b.trait) ? 1 : 0) -
      (state.traits.includes(a.trait) ? 1 : 0),
  );
  const top3 = careers.slice(0, 3);
  const resultStr = top3.map((c) => c.name).join(", ");

  // Hiển thị
  document.getElementById("resultName").innerText = name;
  document.getElementById("resultsContainer").innerHTML = top3
    .map(
      (c) => `
        <div class="bg-white p-6 rounded-xl shadow border-t-4 border-indigo-500">
            <i class="fa-solid ${c.icon} ${c.color} text-2xl mb-2"></i>
            <h3 class="font-bold">${c.name}</h3>
            <p class="text-sm text-slate-500">${c.desc}</p>
        </div>`,
    )
    .join("");
  document.getElementById("results-section").classList.remove("hidden");
  document
    .getElementById("results-section")
    .scrollIntoView({ behavior: "smooth" });

  // Gửi form ẩn
  document.getElementById("hideName").value = name;
  document.getElementById("hideYear").value = year;
  document.getElementById("hideBlock").value = state.block;
  document.getElementById("hideTraits").value = state.traits.join(", ");
  document.getElementById("hideResults").value = resultStr;

  fetch(document.getElementById("hiddenResultForm").action, {
    method: "POST",
    body: new FormData(document.getElementById("hiddenResultForm")),
    headers: { Accept: "application/json" },
  });
});

// Feedback
document
  .getElementById("feedbackForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    fetch(this.action, {
      method: "POST",
      body: new FormData(this),
      headers: { Accept: "application/json" },
    }).then(() => {
      this.classList.add("hidden");
      document.getElementById("feedbackSuccess").classList.remove("hidden");
    });
  });
