let lastScroll = 0;
const navbar = document.getElementById("navbar");
const btn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

let menuOpen = false;

// togle menu
btn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
  menuOpen = !menuOpen;

  if (menuOpen) {
    navbar.classList.remove("nav-hide");
    navbar.classList.add("nav-show");
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
});

// scroll behavior
window.addEventListener("scroll", () => {
  if (menuOpen) return;

  let currentScroll = window.scrollY;

  if (Math.abs(currentScroll - lastScroll) < 10) return;

  if (currentScroll < 80) {
    navbar.classList.remove("nav-hide");
    navbar.classList.add("nav-show");
  } else if (currentScroll > lastScroll) {
    navbar.classList.add("nav-hide");
    navbar.classList.remove("nav-show");
  } else {
    navbar.classList.remove("nav-hide");
    navbar.classList.add("nav-show");
  }

  lastScroll = currentScroll;
});

document.addEventListener("click", (e) => {
  if (!menuOpen) return;

  const isClickInsideMenu = menu.contains(e.target);
  const isClickButton = btn.contains(e.target);

  if (!isClickInsideMenu && !isClickButton) {
    menu.classList.add("hidden");
    menuOpen = false;
    document.body.classList.remove("overflow-hidden");

    navbar.classList.remove("nav-hide");
    navbar.classList.add("nav-show");
  }
});

// Wa Btn
const buttons = document.querySelectorAll(".btn-wa");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const paket = btn.getAttribute("data-paket");

    const pesan = `Halo, saya mau pesan laundry paket ${paket}`;
    const nomor = "6289502191091";

    const url = `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;

    window.open(url, "_blank");
  });
});

// form Wa
const form = document.getElementById("form-order");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value;
  const alamat = document.getElementById("alamat").value;
  const paket = document.getElementById("paket").value;
  const berat = document.getElementById("berat").value;
  const total = totalEl.textContent;

  if (berat < 1) {
    alert("Minimal 1kg");
    return;
  }

  const nomor = "6289502191091";

  const pesan = `Halo, saya mau laundry:

Nama: ${nama}
Alamat: ${alamat}
Paket: ${paket}
Berat: ${berat} kg
Total: Rp ${total}`;

  const url = `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;

  window.open(url, "_blank");
  setTimeout(() => {
    form.reset();
  }, 500);
});

const paketSelect = document.getElementById("paket");
const beratInput = document.getElementById("berat");
const totalEl = document.getElementById("total");

const harga = {
  "Cuci Kering": 5000,
  "Cuci + Setrika": 7000,
  Express: 10000,
};

function hitungTotal() {
  const paket = paketSelect.value;
  const berat = parseFloat(beratInput.value) || 0;

  const total = harga[paket] * berat;

  totalEl.textContent = total.toLocaleString("id-ID");
}

// event realtime
paketSelect.addEventListener("change", hitungTotal);
beratInput.addEventListener("input", hitungTotal);
