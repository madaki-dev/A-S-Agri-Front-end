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
  check: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`
};

function escapeHtml(str){
  return String(str ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
function formatNaira(n){
  const num = Number(n) || 0;
  return "₦" + num.toLocaleString("en-NG", { maximumFractionDigits: 0 });
}
function formatDate(d){
  return new Date(d).toLocaleDateString("en-NG", { day:"numeric", month:"short", year:"numeric" });
}
function initials(name){
  if (!name) return "A";
  return name.trim().split(/\s+/).slice(0,2).map(w => w[0].toUpperCase()).join("");
}
function qs(name){ return new URLSearchParams(window.location.search).get(name); }

// ---------------- Toasts ----------------
function toast(message, type = "success"){
  let root = document.getElementById("toast-root");
  if (!root){
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
function openModal(innerHtml){
  closeModal();
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.id = "active-modal";
  overlay.innerHTML = `<div class="modal">${innerHtml}</div>`;
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeModal(); });
  document.body.appendChild(overlay);
  return overlay;
}
function closeModal(){
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

function currentPage(){
  return window.location.pathname.split("/").pop() || "index.html";
}

function dashboardHref(){
  const user = getUser();
  if (!user) return "login.html";
  if (user.role === "Admin") return "admin/dashboard.html";
  if (user.accountType === "Farmer") return "farmer/dashboard.html";
  return "buyer/dashboard.html";
}

function renderNavbar(rootPrefix = ""){
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
  if (user){
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
            ${user.accountType === "Buyer" ? `<a href="${rootPrefix}buyer/messages.html">Messages</a>` : ""}
            ${user.accountType === "Farmer" ? `<a href="${rootPrefix}farmer/messages.html">Messages</a>` : ""}
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
  if (menuBtn){
    menuBtn.addEventListener("click", () => renderMobileMenu(rootPrefix));
  }
  const avatarBtn = document.getElementById("nav-avatar-btn");
  if (avatarBtn){
    avatarBtn.addEventListener("click", () => {
      document.getElementById("nav-dropdown").classList.toggle("open");
    });
    document.addEventListener("click", (e) => {
      if (!avatarBtn.contains(e.target) && !document.getElementById("nav-dropdown").contains(e.target)){
        document.getElementById("nav-dropdown")?.classList.remove("open");
      }
    });
  }
  const logoutBtn = document.getElementById("nav-logout-btn");
  if (logoutBtn){
    logoutBtn.addEventListener("click", () => {
      clearSession();
      toast("You've been logged out.");
      setTimeout(() => window.location.href = rootPrefix + "index.html", 500);
    });
  }

  if (user && user.accountType === "Buyer"){
    API.getCart().then(cart => {
      const badge = document.getElementById("nav-cart-badge");
      if (!badge) return;
      const count = cart.reduce((s,i) => s + i.quantity, 0);
      if (count > 0){ badge.style.display = "flex"; badge.textContent = count; }
    }).catch(() => {});
  }
}

function renderMobileMenu(rootPrefix = ""){
  const user = getUser();
  const existing = document.getElementById("mobile-menu-el");
  if (existing){ existing.remove(); return; }

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

function renderFooter(rootPrefix = ""){
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
          <a href="#" aria-label="Facebook">f</a>
          <a href="#" aria-label="Instagram">ig</a>
          <a href="#" aria-label="TikTok">tt</a>
          <a href="#" aria-label="X">x</a>
          <a href="#" aria-label="WhatsApp">wa</a>
        </div>
      </div>
    </div>`;
}

function emptyState(title, body, iconKey = "empty"){
  return `<div class="empty-state">${ICONS[iconKey]}<h3>${escapeHtml(title)}</h3><p>${escapeHtml(body)}</p></div>`;
}

function skeletonGrid(count = 8){
  return `<div class="product-grid">${Array(count).fill('<div class="skeleton skeleton-card"></div>').join("")}</div>`;
}

// ---------------- Auth guard ----------------
function requireAuth(rootPrefix = "", accountType = null){
  if (!isLoggedIn()){
    window.location.href = rootPrefix + "login.html?next=" + encodeURIComponent(window.location.pathname);
    return null;
  }
  const user = getUser();
  if (accountType && user.accountType !== accountType && user.role !== "Admin"){
    toast("You don't have access to that page.", "error");
    window.location.href = rootPrefix + "index.html";
    return null;
  }
  if (accountType === "Admin" && user.role !== "Admin"){
    toast("Admins only.", "error");
    window.location.href = rootPrefix + "index.html";
    return null;
  }
  return user;
}

// ---------------- Dashboard sidebar ----------------
function renderDashSidebar(links, activeHref, rootPrefix = ""){
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
    <button id="dash-logout-btn">↩ Log out</button>
  `;
  document.getElementById("dash-logout-btn").addEventListener("click", () => {
    clearSession();
    window.location.href = rootPrefix + "index.html";
  });
  const closeBtn = document.getElementById("dash-sidebar-close");
  if (closeBtn) closeBtn.addEventListener("click", () => mount.classList.remove("open"));
}
function toggleDashSidebar(){
  document.getElementById("dash-sidebar")?.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", () => {
  const prefix = document.body.dataset.rootPrefix || "";
  renderNavbar(prefix);
  renderFooter(prefix);
});
