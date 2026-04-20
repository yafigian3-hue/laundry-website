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

  // ignore gerakan kecil
  if (Math.abs(currentScroll - lastScroll) < 10) return;

  // kalau masih di atas → selalu tampil
  if (currentScroll < 80) {
    navbar.classList.remove("nav-hide");
    navbar.classList.add("nav-show");
  }
  // scroll ke bawah
  else if (currentScroll > lastScroll) {
    navbar.classList.add("nav-hide");
    navbar.classList.remove("nav-show");
  }
  // scroll ke atas
  else {
    navbar.classList.remove("nav-hide");
    navbar.classList.add("nav-show");
  }

  lastScroll = currentScroll;
});

document.addEventListener("click", (e) => {
    if (!menuOpen) return;

    const isClickInsideMenu = menu.contains(e.target);
    const isClickButton = btn.contains(e.target);

    if (!isClickButton && !isClickButton) {
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
