(function () {
  var cfg = window.SALON || {};

  // 予約・Instagramボタン: URL未設定なら「準備中」表示
  document.querySelectorAll("[data-link]").forEach(function (el) {
    var url = cfg[el.dataset.link + "Url"];
    if (url) {
      el.href = url;
      el.target = "_blank";
      el.rel = "noopener";
    } else if (!el.closest("#contact")) {
      el.href = "#contact"; // URL未設定のあいだは予約セクションへ誘導
    } else {
      el.removeAttribute("href");
      el.setAttribute("aria-disabled", "true");
      el.classList.add("is-pending");
    }
  });

  // ギャラリー
  var grid = document.getElementById("gallery-grid");
  var photos = window.GALLERY || [];
  var dlg = document.getElementById("lightbox");
  var lbImg = document.getElementById("lightbox-img");
  var lbCap = document.getElementById("lightbox-cap");
  var current = 0;

  if (photos.length) {
    photos.forEach(function (p, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "g-item";
      b.setAttribute("aria-label", (p.title || p.alt || "写真") + "を拡大");
      var img = document.createElement("img");
      img.src = p.src;
      img.alt = p.alt || p.title || "";
      img.loading = "lazy";
      b.appendChild(img);
      b.addEventListener("click", function () { open(i); });
      grid.appendChild(b);
    });
  } else {
    for (var n = 1; n <= 8; n++) {
      var d = document.createElement("div");
      d.className = "g-item g-placeholder";
      d.textContent = "写真準備中";
      grid.appendChild(d);
    }
  }

  function show(i) {
    current = (i + photos.length) % photos.length;
    var p = photos[current];
    lbImg.src = p.src;
    lbImg.alt = p.alt || p.title || "";
    lbCap.textContent = p.title || "";
  }
  function open(i) {
    show(i);
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", "");
  }
  function close() { if (dlg.close) dlg.close(); else dlg.removeAttribute("open"); }
  document.getElementById("lb-close").addEventListener("click", close);
  document.getElementById("lb-prev").addEventListener("click", function () { show(current - 1); });
  document.getElementById("lb-next").addEventListener("click", function () { show(current + 1); });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) close(); });
  document.addEventListener("keydown", function (e) {
    if (!dlg.open) return;
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });

  // 今日の営業時間をハイライト
  var today = new Date().getDay(); // 0=日
  var row = document.querySelector('[data-dow~="' + today + '"]');
  if (row) row.classList.add("is-today");

  // スマホ固定バー: ページ先頭では隠す
  var bar = document.querySelector(".fixed-bar");
  function onScroll() { bar.classList.toggle("show", window.scrollY > 400); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // メニュー開閉
  var tgl = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");
  tgl.addEventListener("click", function () {
    var o = nav.classList.toggle("open");
    tgl.setAttribute("aria-expanded", o);
  });
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") { nav.classList.remove("open"); tgl.setAttribute("aria-expanded", "false"); }
  });
})();
