/* ================= DOM READY ================= */
document.addEventListener("DOMContentLoaded", () => {

  /* ===== JAM & TANGGAL ===== */
  function updateTime() {
    const waktuEl = document.getElementById("waktu");
    if (!waktuEl) return;

    const now = new Date();
    const jam =
      String(now.getHours()).padStart(2, "0") + "." +
      String(now.getMinutes()).padStart(2, "0");

    const tanggal = now.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    waktuEl.textContent = jam + " - " + tanggal;
  }

  updateTime();
  setInterval(updateTime, 1000);


  /* ===== NAVBAR SCROLL ===== */
  const navbar = document.querySelector(".glass-nav");
  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    });
  }


  /* ===== SCROLLSPY ===== */
  if (document.getElementById("mainNavbar") && typeof bootstrap !== "undefined") {
    new bootstrap.ScrollSpy(document.body, {
      target: "#mainNavbar",
      offset: 80
    });
  }


  /* ===== DRAG JAM + BATAS LAYAR + DOUBLE TAP RESET ===== */
  const dragItem = document.getElementById("time-container");
  if (dragItem) {

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
    let lastTap = 0;

    function resetTimePosition() {
      dragItem.style.left = "auto";
      dragItem.style.top = "auto";
      dragItem.style.right = "16px";
      dragItem.style.bottom = "16px";
    }

    dragItem.addEventListener("pointerdown", (e) => {
      const now = Date.now();

      // double click / double tap → reset posisi
      if (now - lastTap < 300) {
        resetTimePosition();
        return;
      }
      lastTap = now;

      isDragging = true;
      dragItem.setPointerCapture(e.pointerId);

      const rect = dragItem.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      dragItem.classList.remove("released");
      e.preventDefault();
    });

    document.addEventListener("pointermove", (e) => {
      if (!isDragging) return;

      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;

      const maxX = window.innerWidth - dragItem.offsetWidth;
      const maxY = window.innerHeight - dragItem.offsetHeight;

      dragItem.style.left = Math.max(8, Math.min(x, maxX - 8)) + "px";
      dragItem.style.top  = Math.max(8, Math.min(y, maxY - 8)) + "px";
      dragItem.style.right = "auto";
      dragItem.style.bottom = "auto";
    });

    document.addEventListener("pointerup", () => {
      if (!isDragging) return;
      isDragging = false;

      dragItem.classList.add("released");
      setTimeout(() => dragItem.classList.remove("released"), 250);
    });


    /* ===== TOMBOL CLOSE (X) ===== */
    const closeBtn = document.getElementById("close-time");
    if (closeBtn) {

      closeBtn.addEventListener("pointerdown", (e) => {
        e.stopPropagation();
        e.preventDefault();
        dragItem.style.display = "none";
      });

      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        dragItem.style.display = "none";
      });
    }
  }


  /* ===== MENU ACTIVE ===== */
  const currentPage = location.pathname.split("/").pop();
  document.querySelectorAll(".nav-link").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

});
