//MOBILE MENU
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("closeMenu");
const overlay = document.getElementById("menuOverlay");
const activeOpacityClass = "opacity-50";

if (!menuBtn) console.error("menuBtn TIDAK ditemukan di HTML");
if (!mobileMenu) console.error("mobileMenu TIDAK ditemukan di HTML");
if (!closeMenu) console.error("closeMenu TIDAK ditemukan di HTML");
if (!overlay) console.error("menuOverlay TIDAK ditemukan di HTML");

function lockScroll() {
  const scrollY = window.scrollY;
  document.body.dataset.scrollLock = scrollY;

  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = "100%";
}

function unlockScroll() {
  const scrollY = document.body.dataset.scrollLock || 0;

  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";

  window.scrollTo(0, parseInt(scrollY));
}

function openMenu() {
  lockScroll(); // Kunci posisi layar
  document.body.classList.add("body-no-scroll");

  mobileMenu.classList.remove("translate-x-full");
  overlay.classList.remove("hidden");

  requestAnimationFrame(() => overlay.classList.remove("opacity-0"));
  overlay.classList.add(activeOpacityClass);
}

function hideMenu() {
  mobileMenu.classList.add("translate-x-full");
  overlay.classList.remove(activeOpacityClass);
  overlay.classList.add("opacity-0");

  setTimeout(() => overlay.classList.add("hidden"), 300);

  unlockScroll(); // Kembalikan posisi scroll
  document.body.classList.remove("body-no-scroll");
}

menuBtn?.addEventListener("click", openMenu);
closeMenu?.addEventListener("click", hideMenu);
overlay?.addEventListener("click", hideMenu);

document.querySelectorAll(".mobile-nav").forEach((link) => {
  link.addEventListener("click", hideMenu);
});


// Reusable Slider Function
function createSlider({ wrapperId, prevBtnId, nextBtnId }) {
  const wrapper = document.getElementById(wrapperId);
  const prevBtn = document.getElementById(prevBtnId);
  const nextBtn = document.getElementById(nextBtnId);

  if (!wrapper) {
    console.error("Wrapper not found:", wrapperId);
    return;
  }

  let index = 0;
  const totalSlides = wrapper.children.length;

  // Smooth animation
  wrapper.style.transition = "transform 0.7s cubic-bezier(0.25, 0.1, 0.25, 1)";

  function updateSlide() {
    wrapper.style.transform = `translateX(-${index * 100}%)`;
  }

  function next() {
    index = (index + 1) % totalSlides;
    updateSlide();
  }

  function prev() {
    index = (index - 1 + totalSlides) % totalSlides;
    updateSlide();
  }

  if (nextBtn) nextBtn.addEventListener("click", next);
  if (prevBtn) prevBtn.addEventListener("click", prev);

  return { next, prev };
}

// =======================================================
// INI CONTOH CARA MENGGUNAKAN SLIDER UNTUK TESTIMONI
// =======================================================
createSlider({
  wrapperId: "testimonialWrapper",
  prevBtnId: "prevBtn",
  nextBtnId: "nextBtn"
});

// =======================================================
// INI CONTOH CARA MENGGUNAKAN SLIDER UNTUK BRAND LOGO
// =======================================================
createSlider({
  wrapperId: "serviceWrapper",
  prevBtnId: "servicePrev",
  nextBtnId: "serviceNext"
});

// =======================================================
// INI CONTOH CARA MENGGUNAKAN SLIDER UNTUK GALLERY
// =======================================================
createSlider({
  wrapperId: "gallerySlider",
  prevBtnId: "prevBtnGallery",
  nextBtnId: "nextBtnGallery"  
});

