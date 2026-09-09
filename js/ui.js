/* ============================================================
   A&S VENTURES — UI HELPERS
   Navbar/footer are rendered by JS so every page shares one
   implementation instead of hand-duplicated markup.
   ============================================================ */

const ICONS = {
  menu: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`,
  close: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>`,
  cart: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
  heart: `<svg viewBox="0 0 24 24"><path d="M12 21s-6.7-4.35-9.3-8.1C.8 9.9 1.9 6 5.4 5.1 7.7 4.5 9.9 5.6 12 8c2.1-2.4 4.3-3.5 6.6-2.9 3.5.9 4.6 4.8 2.7 7.8C18.7 16.65 12 21 12 21z"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>`,
  empty: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a4 4 0 018 0v2"/></svg>`,
  star: `<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.8L5.7 21l1.7-7L2 9.2l7.1-.6z"/></svg>`,
  check: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`,
  checkCircle: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.5 2.5L16 9.5"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-6.5-5.6-6.5-11A6.5 6.5 0 0 1 18.5 10c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 4h3.6l1.4 4.2-2.1 1.5a12.5 12.5 0 0 0 6.9 6.9l1.5-2.1L20 15.9v3.6c0 .8-.7 1.4-1.5 1.3C9.4 19.9 4.1 14.6 3.2 5.5 3.1 4.7 3.7 4 4.5 4z"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M4 6.5l8 6 8-6"/></svg>`,
  message: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v11H8l-4 4V5z"/></svg>`,
  leaf: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 4C10 4 4 10 4 18v2h2c8 0 14-6 14-16z"/><path d="M8 20C10 14 14 10 20 6"/></svg>`,
  wheat: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21V5"/><path d="M12 6l-3-2M12 6l3-2M12 9l-3-2M12 9l3-2M12 12l-3-2M12 12l3-2M12 15l-3-2M12 15l3-2"/></svg>`,
  sprout: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21v-8"/><path d="M12 13C12 9 9 7 5 7c0 4 3 6 7 6z"/><path d="M12 11c0-4 3-6 7-6 0 4-3 6-7 6z"/></svg>`,
  fruit: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9c-4 0-7 3-7 6.5S8 21 12 21s7-2 7-5.5S16 9 12 9z"/><path d="M12 9c0-2.5 1-4 3-5"/></svg>`,
  tuber: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13c-1-3 1-6 4-6.5 1.5-2 4.5-2.3 6-.5 3 .5 5 3.5 4 6.5-1 3-4 5-8 5s-5-1.5-6-4.5z"/></svg>`,
  flask: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3"/><path d="M7.5 15h9"/></svg>`,
  paw: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="9" r="1.6"/><circle cx="12" cy="6.5" r="1.6"/><circle cx="17" cy="9" r="1.6"/><path d="M7 14c0-2 2-3 5-3s5 1 5 3-2 5-5 5-5-3-5-5z"/></svg>`,
  tractor: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="18" r="2.6"/><circle cx="18" cy="18" r="3.4"/><path d="M4 18h1M9 6h4l3 5h1.5a2 2 0 0 1 2 2v2M13 6v6H7l-2 3M9 6V4"/></svg>`,
  globe: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3z"/></svg>`,
  users: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3"/><path d="M2.5 20c0-3.3 2.9-6 6.5-6s6.5 2.7 6.5 6"/><circle cx="17.5" cy="9" r="2.5"/><path d="M14.5 14.2C17 14.6 19.5 16.5 19.5 20"/></svg>`,
  bolt: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4 14h6l-1 8 9-12h-6z"/></svg>`,
  trendingUp: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg>`,
  box: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8M12 13v8"/></svg>`,
  compass: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M15 9l-2 6-6 2 2-6 6-2z"/></svg>`,
  barChart: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V10M12 20V4M20 20v-7"/></svg>`,
  graduationCap: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9l10-4 10 4-10 4-10-4z"/><path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5"/><path d="M22 9v6"/></svg>`,
  logout: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/></svg>`,
  facebook: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="M22 12.06A10 10 0 1 0 10.4 22V14.9H7.9v-2.84h2.5v-2.17c0-2.47 1.47-3.84 3.72-3.84 1.08 0 2.21.19 2.21.19v2.43h-1.24c-1.23 0-1.61.76-1.61 1.55v1.84h2.75l-.44 2.84h-2.31V22A10 10 0 0 0 22 12.06z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.1"/><circle cx="17.4" cy="6.6" r="1"/></svg>`,
  tiktok: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="M16.3 3c.35 1.9 1.6 3.4 3.6 3.75v2.8c-1.3 0-2.6-.4-3.6-1.15v6.4a5.6 5.6 0 1 1-5.6-5.6c.28 0 .55.02.82.06v2.85a2.75 2.75 0 1 0 1.98 2.65V3h2.8z"/></svg>`,
  x: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4.5 4.5l15 15M19.5 4.5l-15 15"/></svg>`,
  whatsapp: `<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><path d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.8-1.26A9.5 9.5 0 1 0 12 2.5zm5.4 13.6c-.23.65-1.32 1.24-1.9 1.32-.5.08-1.05.11-1.7-.1-.4-.13-.9-.3-1.56-.58-2.75-1.19-4.55-3.99-4.68-4.18-.14-.18-1.1-1.47-1.1-2.8 0-1.34.7-1.99.95-2.26.24-.28.53-.34.7-.34h.51c.16 0 .38-.03.6.45.23.51.77 1.77.83 1.9.07.13.11.28.02.45-.09.18-.14.28-.27.43-.14.16-.28.35-.4.47-.13.13-.27.28-.12.55.16.28.7 1.19 1.53 1.94 1.05.95 1.95 1.24 2.22 1.38.28.14.44.12.6-.06.17-.19.72-.85.91-1.14.19-.28.38-.24.63-.14.26.09 1.65.79 1.93.93.28.14.47.21.54.32.07.13.07.72-.16 1.38z"/></svg>`
};

function escapeHtml(str) {
  return String(str ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function formatNaira(n) {
  const num = Number(n) || 0;
  return "₦" + num.toLocaleString("en-NG", { maximumFractionDigits: 0 });
}
function formatDate(d) {
  return new Date(d).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
}
function initials(name) {
  if (!name) return "A";
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0].toUpperCase()).join("");
}
function qs(name) { return new URLSearchParams(window.location.search).get(name); }

// ---------------- Toasts ----------------
function toast(message, type = "success") {
  let root = document.getElementById("toast-root");
  if (!root) {
    root = document.createElement("div");
    root.id = "toast-root";
    document.body.appendChild(root);
  }
  const el = document.createElement("div");
  el.className = "toast" + (type === "error" ? " error" : "");
  el.textContent = message;
  root.appendChild(el);
  setTimeout(() => el.remove(), 3600);
}

// ---------------- Modal ----------------
function openModal(innerHtml) {
  closeModal();
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.id = "active-modal";
  overlay.innerHTML = `<div class="modal">${innerHtml}</div>`;
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeModal(); });
  document.body.appendChild(overlay);
  return overlay;
}
function closeModal() {
  const existing = document.getElementById("active-modal");
  if (existing) existing.remove();
}

// ---------------- Nav / Footer ----------------
const NAV_LINKS = [
  { href: "index.html", label: "Home" },
  { href: "marketplace.html", label: "Marketplace" },
  { href: "services.html", label: "Services" },
  { href: "about.html", label: "About" },
  { href: "contact.html", label: "Contact" }
];

function currentPage() {
  return window.location.pathname.split("/").pop() || "index.html";
}

function dashboardHref() {
  const user = getUser();
  if (!user) return "login.html";
  if (user.role === "Admin") return "admin/dashboard.html";
  if (user.accountType === "Farmer") return "farmer/dashboard.html";
  return "buyer/dashboard.html";
}

function renderNavbar(rootPrefix = "") {
  const mount = document.getElementById("navbar");
  if (!mount) return;
  const user = getUser();
  const page = currentPage();

  const links = NAV_LINKS.map(l => {
    const href = rootPrefix + l.href;
    const active = page === l.href ? " active" : "";
    return `<a href="${href}" class="${active}">${l.label}</a>`;
  }).join("");

  let actionsHtml;
  if (user) {
    actionsHtml = `
      <div class="navbar__actions">
        ${user.accountType === "Buyer" ? `
        <a href="${rootPrefix}cart.html" class="btn-icon navbar__cart" aria-label="Cart">
          ${ICONS.cart}
          <span class="navbar__cart-badge" id="nav-cart-badge" style="display:none">0</span>
        </a>` : ""}
        <div class="navbar__user">
          <button class="navbar__avatar" id="nav-avatar-btn" aria-label="Account menu">${initials(user.fullName)}</button>
          <div class="navbar__dropdown" id="nav-dropdown">
            <div style="padding:10px 12px 6px;font-size:.8rem;color:var(--ink-soft)">Signed in as<br><strong style="color:var(--ink)">${escapeHtml(user.fullName)}</strong></div>
            <a href="${rootPrefix}${dashboardHref()}">Dashboard</a>
            ${user.accountType === "Farmer" ? `<a href="${rootPrefix}farmer/upload-product.html">Upload product</a>` : ""}
            <button id="nav-logout-btn">Log out</button>
          </div>
        </div>
      </div>`;
  } else {
    actionsHtml = `
      <div class="navbar__actions">
        <a href="${rootPrefix}login.html" class="btn btn-ghost btn-sm">Log in</a>
        <a href="${rootPrefix}signup.html" class="btn btn-primary btn-sm">Join A&amp;S</a>
      </div>`;
  }

  mount.innerHTML = `
    <div class="container navbar__row">
      <a href="${rootPrefix}index.html" class="navbar__logo">
        <span class="mark">A&amp;S</span> A&amp;S Ventures
      </a>
      <nav class="navbar__links">${links}</nav>
      ${actionsHtml}
      <button class="navbar__menu-btn" id="nav-menu-btn" aria-label="Open menu">${ICONS.menu}</button>
    </div>`;

  const menuBtn = document.getElementById("nav-menu-btn");
  if (menuBtn) {
    menuBtn.addEventListener("click", () => renderMobileMenu(rootPrefix));
  }
  const avatarBtn = document.getElementById("nav-avatar-btn");
  if (avatarBtn) {
    avatarBtn.addEventListener("click", () => {
      document.getElementById("nav-dropdown").classList.toggle("open");
    });
    document.addEventListener("click", (e) => {
      if (!avatarBtn.contains(e.target) && !document.getElementById("nav-dropdown").contains(e.target)) {
        document.getElementById("nav-dropdown")?.classList.remove("open");
      }
    });
  }
  const logoutBtn = document.getElementById("nav-logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      clearSession();
      toast("You've been logged out.");
      setTimeout(() => window.location.href = rootPrefix + "index.html", 500);
    });
  }

  if (user && user.accountType === "Buyer") {
    API.getCart().then(cart => {
      const badge = document.getElementById("nav-cart-badge");
      if (!badge) return;
      const count = cart.reduce((s, i) => s + i.quantity, 0);
      if (count > 0) { badge.style.display = "flex"; badge.textContent = count; }
    }).catch(() => { });
  }
}

function renderMobileMenu(rootPrefix = "") {
  const user = getUser();
  const existing = document.getElementById("mobile-menu-el");
  if (existing) { existing.remove(); return; }

  const el = document.createElement("div");
  el.className = "mobile-menu open";
  el.id = "mobile-menu-el";
  const links = NAV_LINKS.map(l => `<a href="${rootPrefix}${l.href}">${l.label}</a>`).join("");
  el.innerHTML = `
    <div class="mobile-menu__top">
      <a href="${rootPrefix}index.html" class="navbar__logo"><span class="mark">A&amp;S</span> A&amp;S Ventures</a>
      <button id="mobile-close-btn" aria-label="Close menu">${ICONS.close}</button>
    </div>
    ${links}
    <div style="margin-top:28px;display:flex;flex-direction:column;gap:12px">
      ${user ? `
        <a href="${rootPrefix}${dashboardHref()}" class="btn btn-primary btn-block">Dashboard</a>
        <button id="mobile-logout-btn" class="btn btn-ghost btn-block">Log out</button>
      ` : `
        <a href="${rootPrefix}login.html" class="btn btn-ghost btn-block">Log in</a>
        <a href="${rootPrefix}signup.html" class="btn btn-primary btn-block">Join A&amp;S</a>
      `}
    </div>`;
  document.body.appendChild(el);
  document.getElementById("mobile-close-btn").addEventListener("click", () => el.remove());
  const logout = document.getElementById("mobile-logout-btn");
  if (logout) logout.addEventListener("click", () => { clearSession(); window.location.href = rootPrefix + "index.html"; });
}

function renderFooter(rootPrefix = "") {
  const mount = document.getElementById("footer");
  if (!mount) return;
  mount.innerHTML = `
    <div class="container">
      <div class="footer__grid">
        <div class="footer__brand">
          <a href="${rootPrefix}index.html" class="navbar__logo"><span class="mark">A&amp;S</span> A&amp;S Ventures</a>
          <p>A smarter agricultural marketplace connecting farmers, sellers and buyers across Nigeria.</p>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><a href="${rootPrefix}about.html">About</a></li>
            <li><a href="${rootPrefix}services.html">Services</a></li>
            <li><a href="${rootPrefix}contact.html">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4>Marketplace</h4>
          <ul>
            <li><a href="${rootPrefix}marketplace.html">Browse products</a></li>
            <li><a href="${rootPrefix}signup.html">Sell products</a></li>
            <li><a href="${rootPrefix}marketplace.html">Categories</a></li>
          </ul>
        </div>
        <div>
          <h4>Support</h4>
          <ul>
            <li><a href="${rootPrefix}contact.html">Help center</a></li>
            <li><a href="${rootPrefix}contact.html">FAQs</a></li>
            <li><a href="${rootPrefix}contact.html">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Privacy policy</a></li>
            <li><a href="#">Terms of service</a></li>
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        <small>© 2026 A&amp;S Ventures. All rights reserved.</small>
        <div class="footer__social">
          <a href="https://www.facebook.com/share/18DQmC7gsq/?mibextid=wwXIfr" aria-label="Facebook" style="font-size:15px">${ICONS.facebook}</a>
          <a href="https://www.instagram.com/as_venturesofficial?utm_source=qr" aria-label="Instagram" style="font-size:15px">${ICONS.instagram}</a>
          <a href="https://www.tiktok.com/@as_venturesofficial?_r=1&_t=ZS-98liMpWv9Ae" aria-label="TikTok" style="font-size:15px">${ICONS.tiktok}</a>
          <a href="https://x.com/asventures_?s=21" aria-label="X" style="font-size:14px">${ICONS.x}</a>
          <a href="https://wa.me/2348023799337" aria-label="WhatsApp" style="font-size:15px">${ICONS.whatsapp}</a>
        </div>
      </div>
    </div>`;
}

function emptyState(title, body, iconKey = "empty") {
  return `<div class="empty-state">${ICONS[iconKey]}<h3>${escapeHtml(title)}</h3><p>${escapeHtml(body)}</p></div>`;
}

function skeletonGrid(count = 8) {
  return `<div class="product-grid">${Array(count).fill('<div class="skeleton skeleton-card"></div>').join("")}</div>`;
}

// ---------------- Auth guard ----------------
function requireAuth(rootPrefix = "", accountType = null) {
  if (!isLoggedIn()) {
    window.location.href = rootPrefix + "login.html?next=" + encodeURIComponent(window.location.pathname);
    return null;
  }
  const user = getUser();
  if (accountType && user.accountType !== accountType && user.role !== "Admin") {
    toast("You don't have access to that page.", "error");
    window.location.href = rootPrefix + "index.html";
    return null;
  }
  if (accountType === "Admin" && user.role !== "Admin") {
    toast("Admins only.", "error");
    window.location.href = rootPrefix + "index.html";
    return null;
  }
  return user;
}

// ---------------- Dashboard sidebar ----------------
function renderDashSidebar(links, activeHref, rootPrefix = "") {
  const mount = document.getElementById("dash-sidebar");
  if (!mount) return;
  const user = getUser();
  const itemsHtml = links.map(l => {
    if (l.divider) return `<div class="divider" style="opacity:.3"></div>`;
    const active = activeHref === l.href ? " active" : "";
    return `<a href="${rootPrefix}${l.href}" class="${active}">${l.icon || ""} ${l.label}</a>`;
  }).join("");
  mount.innerHTML = `
    <div class="flex-between" style="margin-bottom:22px">
      <a href="${rootPrefix}index.html" class="navbar__logo" style="color:#fff"><span class="mark">A&amp;S</span></a>
      <button id="dash-sidebar-close" class="navbar__menu-btn" style="display:none;color:#fff">${ICONS.close}</button>
    </div>
    <div style="margin-bottom:20px">
      <div style="font-size:.8rem;color:#9FB29F">Signed in as</div>
      <strong style="color:#fff">${escapeHtml(user?.fullName || "")}</strong>
    </div>
    ${itemsHtml}
    <div class="divider" style="opacity:.3"></div>
    <button id="dash-logout-btn"><span style="display:inline-flex;vertical-align:-3px;margin-right:6px;font-size:15px">${ICONS.logout}</span>Log out</button>
  `;
  document.getElementById("dash-logout-btn").addEventListener("click", () => {
    clearSession();
    window.location.href = rootPrefix + "index.html";
  });
  const closeBtn = document.getElementById("dash-sidebar-close");
  if (closeBtn) closeBtn.addEventListener("click", () => mount.classList.remove("open"));
}
function toggleDashSidebar() {
  document.getElementById("dash-sidebar")?.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", () => {
  const prefix = document.body.dataset.rootPrefix || "";
  renderNavbar(prefix);
  renderFooter(prefix);
});
