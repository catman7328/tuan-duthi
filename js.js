// Dữ liệu mô phỏng các ngành nghề
const CAREER_MAP = {
  A: [
    {
      trait: "logic",
      name: "Kỹ sư Phần mềm (IT)",
      desc: "Lập trình, thiết kế hệ thống, phù hợp với tư duy logic mạnh.",
      icon: "fa-laptop-code",
      color: "text-blue-500",
    },
    {
      trait: "detail",
      name: "Chuyên viên Dữ liệu (DA)",
      desc: "Làm việc với số liệu, phân tích xu hướng thị trường.",
      icon: "fa-chart-pie",
      color: "text-blue-500",
    },
    {
      trait: "creative",
      name: "Kỹ sư Cơ điện tử",
      desc: "Chế tạo robot, máy móc tự động hóa.",
      icon: "fa-robot",
      color: "text-blue-500",
    },
  ],
  B: [
    {
      trait: "detail",
      name: "Bác sĩ Đa khoa",
      desc: "Khám chữa bệnh, đòi hỏi sự cẩn thận và y đức.",
      icon: "fa-stethoscope",
      color: "text-green-500",
    },
    {
      trait: "social",
      name: "Điều dưỡng / Tâm lý học",
      desc: "Chăm sóc sức khỏe, tư vấn tâm lý cho bệnh nhân.",
      icon: "fa-user-nurse",
      color: "text-green-500",
    },
    {
      trait: "logic",
      name: "Công nghệ Sinh học",
      desc: "Nghiên cứu ứng dụng sinh học vào nông nghiệp, y dược.",
      icon: "fa-flask",
      color: "text-green-500",
    },
  ],
  C: [
    {
      trait: "social",
      name: "Báo chí / Truyền thông",
      desc: "Viết bài, phóng sự, đòi hỏi kỹ năng giao tiếp tốt.",
      icon: "fa-newspaper",
      color: "text-orange-500",
    },
    {
      trait: "logic",
      name: "Luật sư / Pháp chế",
      desc: "Tư vấn pháp lý, tranh tụng, lập luận logic vững chắc.",
      icon: "fa-scale-balanced",
      color: "text-orange-500",
    },
    {
      trait: "creative",
      name: "Quản trị Lữ hành",
      desc: "Thiết kế tour du lịch, khám phá văn hóa địa phương.",
      icon: "fa-plane-departure",
      color: "text-orange-500",
    },
  ],
  D: [
    {
      trait: "social",
      name: "Quản trị Nhân sự / PR",
      desc: "Tuyển dụng, đào tạo, giao tiếp công chúng.",
      icon: "fa-users",
      color: "text-purple-500",
    },
    {
      trait: "creative",
      name: "Marketing / Truyền thông",
      desc: "Sáng tạo nội dung, chạy chiến dịch quảng cáo.",
      icon: "fa-bullhorn",
      color: "text-purple-500",
    },
    {
      trait: "logic",
      name: "Phân tích Kinh doanh (BA)",
      desc: "Cầu nối giữa kinh doanh và công nghệ thông tin.",
      icon: "fa-briefcase",
      color: "text-purple-500",
    },
  ],
  OTHER: [
    {
      trait: "creative",
      name: "Thiết kế Đồ họa / Mỹ thuật",
      desc: "Thiết kế 2D/3D, UI/UX, yêu cầu óc thẩm mỹ cao.",
      icon: "fa-pen-nib",
      color: "text-pink-500",
    },
    {
      trait: "logic",
      name: "Kiến trúc sư",
      desc: "Thiết kế công trình, kết hợp giữa nghệ thuật và kỹ thuật.",
      icon: "fa-building",
      color: "text-pink-500",
    },
    {
      trait: "social",
      name: "Sư phạm Năng khiếu / Thể thao",
      desc: "Giảng dạy nghệ thuật, thể chất hoặc huấn luyện viên.",
      icon: "fa-microphone",
      color: "text-pink-500",
    },
  ],
};

// Danh sách đa dạng các tổ hợp dựa theo dữ liệu thực tế
const ALL_BLOCKS = [
  { code: "A00", subjects: "Toán, Vật lí, Hóa học" },
  { code: "A01", subjects: "Toán, Vật lí, Tiếng Anh" },
  { code: "A02", subjects: "Toán, Vật lí, Sinh học" },
  { code: "A04", subjects: "Toán, Vật lí, Địa lí" },
  { code: "A07", subjects: "Toán, Lịch sử, Địa lí" },
  { code: "B00", subjects: "Toán, Hóa học, Sinh học" },
  { code: "B02", subjects: "Toán, Sinh học, Địa lí" },
  { code: "B08", subjects: "Toán, Sinh học, Tiếng Anh" },
  { code: "C00", subjects: "Ngữ văn, Lịch sử, Địa lí" },
  { code: "C01", subjects: "Ngữ văn, Toán, Vật lí" },
  { code: "C02", subjects: "Ngữ văn, Toán, Hóa học" },
  { code: "C04", subjects: "Ngữ văn, Toán, Địa lí" },
  { code: "D01", subjects: "Toán, Ngữ văn, Tiếng Anh" },
  { code: "D02", subjects: "Ngữ văn, Toán, Tiếng Nga" },
  { code: "D03", subjects: "Ngữ văn, Toán, Tiếng Pháp" },
  { code: "D04", subjects: "Ngữ văn, Toán, Tiếng Trung" },
  { code: "D06", subjects: "Ngữ văn, Toán, Tiếng Nhật" },
  { code: "D07", subjects: "Toán, Hóa học, Tiếng Anh" },
  { code: "D14", subjects: "Ngữ văn, Lịch sử, Tiếng Anh" },
  { code: "D15", subjects: "Ngữ văn, Địa lí, Tiếng Anh" },
  { code: "V00", subjects: "Toán, Vật lí, Vẽ Hình họa mỹ thuật" },
  { code: "V01", subjects: "Toán, Ngữ văn, Vẽ Hình họa mỹ thuật" },
  {
    code: "H00",
    subjects: "Ngữ văn, Năng khiếu vẽ NT1, Năng khiếu vẽ NT2",
  },
  { code: "M00", subjects: "Ngữ văn, Toán, Đọc diễn cảm, Hát" },
  { code: "T00", subjects: "Toán, Sinh học, Năng khiếu TDTT" },
  {
    code: "N00",
    subjects: "Ngữ văn, Năng khiếu Âm nhạc 1, Năng khiếu Âm nhạc 2",
  },
  { code: "X01", subjects: "Ngữ văn, Toán, GDKTPL" },
  { code: "X70", subjects: "Ngữ văn, Lịch sử, GDKTPL" },
  { code: "X74", subjects: "Ngữ văn, Địa lí, GDKTPL" },
  { code: "X78", subjects: "Ngữ văn, GDKTPL, Tiếng Anh" },
  { code: "Y09", subjects: "Ngữ văn, GDKTPL, Công nghệ nông nghiệp" },
  { code: "Y07", subjects: "Ngữ văn, GDKTPL, Tin học" },
  { code: "X64", subjects: "Ngữ văn, Hóa học, Công nghệ công nghiệp" },
  { code: "X65", subjects: "Ngữ văn, Hóa học, Công nghệ nông nghiệp" },
  { code: "X63", subjects: "Ngữ văn, Hóa học, Tin học" },
  { code: "X72", subjects: "Ngữ văn, Lịch sử, Công nghệ công nghiệp" },
  { code: "X73", subjects: "Ngữ văn, Lịch sử, Công nghệ nông nghiệp" },
  { code: "X68", subjects: "Ngữ văn, Sinh học, Công nghệ công nghiệp" },
  { code: "X69", subjects: "Ngữ văn, Sinh học, Công nghệ nông nghiệp" },
  { code: "X67", subjects: "Ngữ văn, Sinh học, Tin học" },
  { code: "X80", subjects: "Ngữ văn, Tiếng Anh, Công nghệ công nghiệp" },
  { code: "X81", subjects: "Ngữ văn, Tiếng Anh, Công nghệ nông nghiệp" },
  { code: "Y10", subjects: "Ngữ văn, Tin học, Công nghệ công nghiệp" },
  { code: "Y11", subjects: "Ngữ văn, Tin học, Công nghệ nông nghiệp" },
  { code: "X60", subjects: "Ngữ văn, Vật lí, Công nghệ công nghiệp" },
  { code: "DH1", subjects: "Ngữ văn, Địa lí, Tiếng Hàn" },
  { code: "X61", subjects: "Ngữ văn, Vật lí, Công nghệ nông nghiệp" },
  { code: "DH5", subjects: "Ngữ văn, Lịch sử, Tiếng Hàn" },
  { code: "X59", subjects: "Ngữ văn, Vật lí, Tin học" },
  { code: "X26", subjects: "Toán, Vật lí, Tin học" },
  { code: "AH4", subjects: "Toán, Sinh học, Tiếng Hàn" },
  // Hệ thống có thể mở rộng thêm hàng trăm tổ hợp khác vào mảng này...
];

// Trạng thái ứng dụng
let state = {
  block: "",
  traits: [],
};

// --- Logic Tìm kiếm Dropdown Tổ hợp ---
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
  if (items.length === 0) {
    dropdownList.innerHTML =
      '<li class="p-4 text-slate-500 text-center text-sm">Không tìm thấy tổ hợp phù hợp</li>';
    return;
  }

  items.forEach((item) => {
    const li = document.createElement("li");
    li.className =
      "p-3 hover:bg-blue-50 cursor-pointer border-b border-slate-50 last:border-0 transition-colors flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3";
    li.innerHTML = `
                  <span class="font-bold text-blue-600 w-12 shrink-0">${item.code}</span>
                  <span class="text-slate-700 text-sm">${item.subjects}</span>
              `;
    li.onmousedown = () => selectBlock(item); // Dùng mousedown để kích hoạt trước khi ô input bị mất focus (blur)
    dropdownList.appendChild(li);
  });
}

searchInput.addEventListener("focus", () => {
  dropdownList.classList.remove("hidden");
  if (searchInput.value === "") renderDropdown(ALL_BLOCKS);
});

searchInput.addEventListener("blur", () => {
  // Độ trễ nhỏ để sự kiện click (mousedown) trên danh sách kịp xử lý
  setTimeout(() => dropdownList.classList.add("hidden"), 200);
});

searchInput.addEventListener("input", (e) => {
  const term = removeAccents(e.target.value.toLowerCase().trim());

  const filtered = ALL_BLOCKS.filter((b) => {
    const normSubjects = removeAccents(b.subjects.toLowerCase());
    const normCode = b.code.toLowerCase();
    return normCode.includes(term) || normSubjects.includes(term);
  });
  dropdownList.classList.remove("hidden");
  renderDropdown(filtered);
});

function selectBlock(item) {
  state.block = item.code;
  searchInput.value = "";
  dropdownList.classList.add("hidden");
  searchInput.parentElement.classList.add("hidden"); // Ẩn ô tìm kiếm

  document.getElementById("displayCode").innerText = item.code;
  document.getElementById("displaySubjects").innerText = item.subjects;
  selectedBlockDisplay.classList.remove("hidden"); // Hiện bảng thông tin tổ hợp đã chọn

  document.getElementById("errorMsg").classList.add("hidden");
}

function clearSelection() {
  state.block = "";
  selectedBlockDisplay.classList.add("hidden"); // Ẩn bảng hiển thị
  searchInput.parentElement.classList.remove("hidden"); // Hiện lại ô tìm kiếm
  searchInput.focus();
}
// ----------------------------------------

// Hàm xử lý chọn tính cách
function toggleTrait(traitId) {
  const index = state.traits.indexOf(traitId);
  if (index > -1) {
    // Đã có -> xóa đi
    state.traits.splice(index, 1);
  } else {
    // Chưa có -> thêm vào (tối đa 2)
    if (state.traits.length < 2) {
      state.traits.push(traitId);
    } else {
      return; // Không làm gì nếu đã chọn đủ 2
    }
  }
  updateTraitsUI();
}

function updateTraitsUI() {
  const allTraits = ["logic", "creative", "social", "detail"];
  allTraits.forEach((traitId) => {
    // Sửa lại dòng này với cặp dấu backticks ` `
    const el = document.getElementById(`trait-${traitId}`);

    if (state.traits.includes(traitId)) {
      el.className =
        "trait-btn flex flex-col items-center justify-center p-3 rounded-lg border transition-all bg-amber-100 border-amber-400 text-amber-800 font-medium";
    } else {
      el.className =
        "trait-btn flex flex-col items-center justify-center p-3 rounded-lg border transition-all bg-white border-slate-200 text-slate-600 hover:bg-slate-50";
    }
  });
}

// Xử lý Form Submit chính
document.getElementById("careerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("inputName").value;

  if (!state.block) {
    document.getElementById("errorMsg").classList.remove("hidden");
    return;
  }

  // Phân tích ngành nghề dựa trên nhóm Khối (A, B, C, D...)
  const blockPrefix = state.block.charAt(0);

  // Lấy danh sách ngành nghề tương ứng, nếu khối lạ (V, H, M...) thì đưa vào nhóm 'OTHER'
  let baseCareers = CAREER_MAP[blockPrefix] || CAREER_MAP["OTHER"];

  let suggestions = [...baseCareers];

  // Ưu tiên theo tính cách
  if (state.traits.length > 0) {
    suggestions.sort((a, b) => {
      const aMatch = state.traits.includes(a.trait) ? 1 : 0;
      const bMatch = state.traits.includes(b.trait) ? 1 : 0;
      return bMatch - aMatch;
    });
  }

  const topResults = suggestions.slice(0, 3);

  // Render kết quả
  document.getElementById("resultName").innerText = name;
  const container = document.getElementById("resultsContainer");
  container.innerHTML = "";

  topResults.forEach((career) => {
    const card = `
                  <div class="bg-white rounded-xl p-6 shadow-lg border-t-4 border-indigo-500 hover:-translate-y-1 transition-transform duration-300">
                      <div class="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                          <i class="fa-solid ${career.icon} text-xl ${career.color}"></i>
                      </div>
                      <h3 class="text-lg font-bold text-slate-800 mb-2">${career.name}</h3>
                      <p class="text-slate-600 text-sm leading-relaxed">${career.desc}</p>
                  </div>
              `;
    container.innerHTML += card;
  });

  // Hiển thị section kết quả
  const resultSection = document.getElementById("results-section");
  resultSection.classList.remove("hidden");
  resultSection.classList.add("animate-fade-in-up");

  // Cuộn xuống
  setTimeout(() => {
    resultSection.scrollIntoView({ behavior: "smooth" });
  }, 100);
});

// Xử lý Form Feedback gửi về Gmail qua Formspree
document
  .getElementById("feedbackForm")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Chặn load lại trang

    const form = e.target;
    const data = new FormData(form);
    const feedbackForm = document.getElementById("feedbackForm");
    const successMsg = document.getElementById("feedbackSuccess");

    // Hiệu ứng nút bấm khi đang gửi (tùy chọn)
    const btn = form.querySelector("button");
    const originalBtnText = btn.innerHTML;
    btn.innerHTML = "Đang gửi...";
    btn.disabled = true;

    // Gửi dữ liệu đi
    fetch(form.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // Thành công: Ẩn form, hiện thông báo
          feedbackForm.classList.add("hidden");
          successMsg.classList.remove("hidden");
          form.reset();

          // Sau 5 giây hiện lại form để người khác có thể gửi tiếp nếu muốn
          setTimeout(() => {
            feedbackForm.classList.remove("hidden");
            successMsg.classList.add("hidden");
            btn.innerHTML = originalBtnText;
            btn.disabled = false;
          }, 5000);
        } else {
          alert("Rất tiếc, có lỗi xảy ra. Hãy kiểm tra lại link Formspree!");
          btn.innerHTML = originalBtnText;
          btn.disabled = false;
        }
      })
      .catch((error) => {
        alert("Lỗi kết nối mạng rồi bạn ơi!");
        btn.innerHTML = originalBtnText;
        btn.disabled = false;
      });
  });
