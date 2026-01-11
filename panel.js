const input = document.getElementById("search");
const resultsEl = document.getElementById("results");

let allData = [];
let selectedIndex = 0;

// Load tất cả dữ liệu
async function loadData() {
  const sources = [
    { type: "Mã chương", file: "ma_chuong.json" },
    { type: "Mã NDKT", file: "ndkt.json" },
    { type: "Mã Kho bạc", file: "kho_bac.json" },
    { type: "Mã QHNS", file: "qhns.json" },
    { type: "Địa bàn hành chính", file: "dbhc.json" },
    { type: "Ngân hàng", file: "ngan_hang.json" }
  ];

  for (const s of sources) {
    const res = await fetch(`data/${s.file}`);
    const json = await res.json();
    json.forEach(item => {
      allData.push({
        ...item,
        type: s.type
      });
    });
  }
}

loadData();

function render(list) {
  resultsEl.innerHTML = "";
  list.forEach((item, i) => {
    const div = document.createElement("div");
    div.className = "result" + (i === selectedIndex ? " active" : "");
    div.innerHTML = `
      <b>${item.code}</b> - ${item.name}
      <div class="type">${item.type}</div>
    `;
    div.onclick = () => copy(item.code);
    resultsEl.appendChild(div);
  });
}

function copy(text) {
  navigator.clipboard.writeText(text);
}

input.addEventListener("input", () => {
  const q = input.value.toLowerCase();
  selectedIndex = 0;

  const matches = allData.filter(d =>
    d.code.includes(q) || d.name.toLowerCase().includes(q)
  );

  render(matches);
});

input.addEventListener("keydown", (e) => {
  const items = document.querySelectorAll(".result");

  if (e.key === "ArrowDown") {
    selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
  }

  if (e.key === "ArrowUp") {
    selectedIndex = Math.max(selectedIndex - 1, 0);
  }

  if (e.key === "Enter" && items[selectedIndex]) {
    items[selectedIndex].click();
  }

  render([...items].map((_, i) => allData[i]));
});
