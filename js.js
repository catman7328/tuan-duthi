// 1. Dữ liệu ngành nghề
const CAREER_MAP = {
  A: [
    {
      trait: "logic",
      name: "Kỹ sư Phần mềm (IT)",
      desc: "Lập trình, thiết kế hệ thống.",
      icon: "fa-laptop-code",
      color: "text-blue-500",
    },
    {
      trait: "detail",
      name: "Chuyên viên Dữ liệu (DA)",
      desc: "Phân tích số liệu thị trường.",
      icon: "fa-chart-pie",
      color: "text-blue-500",
    },
    {
      trait: "creative",
      name: "Kỹ sư Cơ điện tử",
      desc: "Chế tạo robot, máy móc tự động.",
      icon: "fa-robot",
      color: "text-blue-500",
    },
  ],
  B: [
    {
      trait: "detail",
      name: "Bác sĩ Đa khoa",
      desc: "Khám chữa bệnh, y đức.",
      icon: "fa-stethoscope",
      color: "text-green-500",
    },
    {
      trait: "social",
      name: "Điều dưỡng / Tâm lý học",
      desc: "Chăm sóc sức khỏe tâm lý.",
      icon: "fa-user-nurse",
      color: "text-green-500",
    },
    {
      trait: "logic",
      name: "Công nghệ Sinh học",
      desc: "Nghiên cứu ứng dụng sinh học.",
      icon: "fa-flask",
      color: "text-green-500",
    },
  ],
  C: [
    {
      trait: "social",
      name: "Báo chí / Truyền thông",
      desc: "Viết bài, phóng sự truyền thông.",
      icon: "fa-newspaper",
      color: "text-orange-500",
    },
    {
      trait: "logic",
      name: "Luật sư / Pháp chế",
      desc: "Tư vấn pháp lý, tranh tụng.",
      icon: "fa-scale-balanced",
      color: "text-orange-500",
    },
    {
      trait: "creative",
      name: "Quản trị Lữ hành",
      desc: "Thiết kế tour du lịch.",
      icon: "fa-plane-departure",
      color: "text-orange-500",
    },
  ],
  D: [
    {
      trait: "social",
      name: "Quản trị Nhân sự / PR",
      desc: "Tuyển dụng, đào tạo nhân sự.",
      icon: "fa-users",
      color: "text-purple-500",
    },
    {
      trait: "creative",
      name: "Marketing / Truyền thông",
      desc: "Sáng tạo nội dung quảng cáo.",
      icon: "fa-bullhorn",
      color: "text-purple-500",
    },
    {
      trait: "logic",
      name: "Phân tích Kinh doanh (BA)",
      desc: "Cầu nối kinh doanh và IT.",
      icon: "fa-briefcase",
      color: "text-purple-500",
    },
  ],
  OTHER: [
    {
      trait: "creative",
      name: "Thiết kế Đồ họa / Mỹ thuật",
      desc: "Thiết kế 2D/3D, UI/UX.",
      icon: "fa-pen-nib",
      color: "text-pink-500",
    },
    {
      trait: "logic",
      name: "Kiến trúc sư",
      desc: "Thiết kế công trình xây dựng.",
      icon: "fa-building",
      color: "text-pink-500",
    },
    {
      trait: "social",
      name: "Sư phạm / Năng khiếu",
      desc: "Giảng dạy nghệ thuật, thể chất.",
      icon: "fa-microphone",
      color: "text-pink-500",
    },
  ],
};

// 2. Danh sách tổ hợp môn
const ALL_BLOCKS = [
  { code: "A00", subjects: "Toán, Vật lí, Hóa học" },
  { code: "A01", subjects: "Toán, Vật lí, Tiếng Anh" },
  { code: "B00", subjects: "Toán, Hóa học, Sinh học" },
  { code: "C00", subjects: "Ngữ văn, Lịch sử, Địa lí" },
  { code: "D01", subjects: "Toán, Ngữ văn, Tiếng Anh" },
  { code: "V00", subjects: "Toán, Vật lí, Vẽ" },
];

let state = { block: "", traits: [] };

// --- Logic Dropdown ---
const searchInput = document.getElementById("searchInput");
const dropdownList = document.getElementById("dropdownList");
const selectedBlockDisplay = document.getElementById("selectedBlockDisplay");

function removeAccents(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

function renderDropdown(items) {
  dropdownList.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.className =
      "p-3 hover:bg-blue-50 cursor-pointer border-b border-slate-50 flex gap-3";
    li.innerHTML = `<span class="font-bold text-blue-600">${item.code}</span><span class="text-sm">${item.subjects}</span>`;
    li.onmousedown = () => selectBlock(item);
    dropdownList.appendChild(li);
  });
}

searchInput.addEventListener("focus", () => {
  dropdownList.classList.remove("hidden");
  if (searchInput.value === "") renderDropdown(ALL_BLOCKS);
});

searchInput.addEventListener("blur", () =>
  setTimeout(() => dropdownList.classList.add("hidden"), 200),
);

searchInput.addEventListener("input", (e) => {
  const term = removeAccents(e.target.value.toLowerCase().trim());
  const filtered = ALL_BLOCKS.filter(
    (b) =>
      removeAccents(b.code.toLowerCase()).includes(term) ||
      removeAccents(b.subjects.toLowerCase()).includes(term),
  );
  renderDropdown(filtered);
});

function selectBlock(item) {
  state.block = item.code;
  searchInput.value = "";
  searchInput.parentElement.classList.add("hidden");
  document.getElementById("displayCode").innerText = item.code;
  document.getElementById("displaySubjects").innerText = item.subjects;
  selectedBlockDisplay.classList.remove("hidden");
  document.getElementById("errorMsg").classList.add("hidden");
}

function clearSelection() {
  state.block = "";
  selectedBlockDisplay.classList.add("hidden");
  searchInput.parentElement.classList.remove("hidden");
}

// --- Logic Tính cách ---
function toggleTrait(traitId) {
  const index = state.traits.indexOf(traitId);
  if (index > -1) state.traits.splice(index, 1);
  else if (state.traits.length < 2) state.traits.push(traitId);
  updateTraitsUI();
}

function updateTraitsUI() {
  ["logic", "creative", "social", "detail"].forEach((t) => {
    const el = document.getElementById(`trait-${t}`);
    if (!el) return;
    el.className = state.traits.includes(t)
      ? "trait-btn active flex flex-col items-center justify-center p-3 rounded-lg border bg-amber-100 border-amber-400 text-amber-800 font-medium"
      : "trait-btn flex flex-col items-center justify-center p-3 rounded-lg border bg-white border-slate-200 text-slate-600";
  });
}

// --- XỬ LÝ GỬI EMAIL VÀ KẾT QUẢ ---
document.getElementById("careerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("inputName").value;
  const year = document.getElementById("inputYear").value;

  if (!state.block) {
    document.getElementById("errorMsg").classList.remove("hidden");
    return;
  }

  // 1. TÍNH TOÁN NGÀNH NGHỀ THẬT (KHÔNG CÒN BỊ CỐ ĐỊNH)
  const blockPrefix = state.block.charAt(0);
  let baseCareers = CAREER_MAP[blockPrefix] || CAREER_MAP["OTHER"];
  let suggestions = [...baseCareers];

  // Sắp xếp theo tính cách
  if (state.traits.length > 0) {
    suggestions.sort(
      (a, b) =>
        (state.traits.includes(b.trait) ? 1 : 0) -
        (state.traits.includes(a.trait) ? 1 : 0),
    );
  }
  const topResults = suggestions.slice(0, 3);
  const resultNamesString = topResults.map((r) => r.name).join(", "); // Đây là danh sách ngành thật

  // 2. HIỂN THỊ LÊN MÀN HÌNH
  document.getElementById("resultName").innerText = name;
  const container = document.getElementById("resultsContainer");
  container.innerHTML = "";
  topResults.forEach((career) => {
    container.innerHTML += `
            <div class="bg-white rounded-xl p-6 shadow-lg border-t-4 border-indigo-500">
                <div class="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                    <i class="fa-solid ${career.icon} text-xl ${career.color}"></i>
                </div>
                <h3 class="text-lg font-bold text-slate-800 mb-2">${career.name}</h3>
                <p class="text-slate-600 text-sm">${career.desc}</p>
            </div>`;
  });
  document.getElementById("results-section").classList.remove("hidden");
  document
    .getElementById("results-section")
    .scrollIntoView({ behavior: "smooth" });

  // 3. CẬP NHẬT FORM ẨN VÀ GỬI ĐI NGAY LẬP TỨC
  const hideForm = document.getElementById("hiddenResultForm");
  document.getElementById("hideName").value = name;
  document.getElementById("hideYear").value = year;
  document.getElementById("hideBlock").value = state.block;
  document.getElementById("hideTraits").value =
    state.traits.join(", ") || "Không chọn";
  document.getElementById("hideResults").value = resultNamesString; // Gửi kết quả thật

  // Dùng FormData để đảm bảo dữ liệu được đóng gói đầy đủ trước khi gửi
  const formData = new FormData(hideForm);

  fetch(hideForm.action, {
    method: "POST",
    body: formData,
    headers: { Accept: "application/json" },
  })
    .then((response) => {
      if (response.ok) console.log("Email kết quả đã được gửi thành công!");
      else console.error("Lỗi gửi email Formspree.");
    })
    .catch((error) => console.error("Lỗi mạng:", error));
});

// Feedback Form Logic (Phần dưới cùng)
document
  .getElementById("feedbackForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const btn = e.target.querySelector("button");
    btn.innerHTML = "Đang gửi...";
    btn.disabled = true;

    fetch(e.target.action, {
      method: "POST",
      body: new FormData(e.target),
      headers: { Accept: "application/json" },
    }).then(() => {
      document.getElementById("feedbackForm").classList.add("hidden");
      document.getElementById("feedbackSuccess").classList.remove("hidden");
    });
  });
