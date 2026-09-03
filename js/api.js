/* ============================================================
   A&S VENTURES — API LAYER
   All calls are relative (/api/...) so this file works unmodified
   once dropped into the Frontend/ folder served by server.js.
   ============================================================ */

const API_BASE = "https://a-s-ventures-backend.onrender.com/api";

function getToken() { return localStorage.getItem("asv_token"); }
function getUser() {
  try { return JSON.parse(localStorage.getItem("asv_user") || "null"); }
  catch (e) { return null; }
}
function setSession(token, user) {
  localStorage.setItem("asv_token", token);
  localStorage.setItem("asv_user", JSON.stringify(user));
}
function clearSession() {
  localStorage.removeItem("asv_token");
  localStorage.removeItem("asv_user");
}
function isLoggedIn() { return !!getToken(); }

/**
 * Core request helper.
 * @param {string} path - e.g. "/products"
 * @param {object} opts - { method, body, isForm, headers }
 */
async function apiRequest(path, opts = {}) {
  const headers = opts.headers || {};
  const token = getToken();
  if (token) headers["Authorization"] = "Bearer " + token;

  let body = opts.body;
  if (body && !opts.isForm) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(body);
  }

  let res;
  try {
    res = await fetch(API_BASE + path, {
      method: opts.method || "GET",
      headers,
      body
    });
  } catch (networkErr) {
    throw new Error("Can't reach the A&S Ventures server. Check your connection and try again.");
  }

  const pagination = {
    page: res.headers.get("X-Current-Page"),
    totalPages: res.headers.get("X-Total-Pages")
  };

  let data = null;
  const text = await res.text();
  if (text) {
    try { data = JSON.parse(text); } catch (e) { data = { message: text }; }
  }

  if (!res.ok) {
    const message = (data && data.message) || `Request failed (${res.status})`;
    const err = new Error(message);
    err.status = res.status;
    throw err;
  }

  if (data && typeof data === "object" && !Array.isArray(data)) {
    data.__pagination = pagination;
  }
  return data;
}

const API = {
  // ---- Auth ----
  register: (payload) => apiRequest("/auth/register", { method: "POST", body: payload }),
  login: (payload) => apiRequest("/auth/login", { method: "POST", body: payload }),

  // ---- Products ----
  getProducts: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiRequest("/products" + (qs ? `?${qs}` : ""));
  },
  getProduct: (id) => apiRequest(`/products/${id}`),
  createProduct: (formData) => apiRequest("/products", { method: "POST", body: formData, isForm: true }),
  deleteProduct: (id) => apiRequest(`/products/${id}`, { method: "DELETE" }),

  // ---- Cart ----
  getCart: () => apiRequest("/cart"),
  addToCart: (productId, quantity) => apiRequest("/cart", { method: "POST", body: { productId, quantity } }),
  removeFromCart: (cartId) => apiRequest(`/cart/${cartId}`, { method: "DELETE" }),

  // ---- Orders ----
  getMyOrders: () => apiRequest("/orders/my-orders"),
  getFarmerSales: () => apiRequest("/orders/farmer-sales"),
  confirmFarmerDetails: (orderId, payload) => apiRequest(`/orders/${orderId}/confirm`, { method: "PATCH", body: payload }),

  // ---- Payment ----
  initializePayment: (payload) => apiRequest("/payment/initialize", { method: "POST", body: payload }),
  verifyPayment: (transactionId) => apiRequest(`/payment/verify/${transactionId}`, { method: "POST" }),

  // ---- Transport ----
  getTransportPrices: () => apiRequest("/transport/prices"),
  getTransportPriceForState: (state) => apiRequest(`/transport/prices/${encodeURIComponent(state)}`),

  // ---- Farmer dashboard ----
  getFarmerDashboard: () => apiRequest("/farmer-dashboard"),
  updateOrderStatus: (orderId, status) => apiRequest(`/farmer-dashboard/${orderId}/status`, { method: "PATCH", body: { status } }),

  // ---- Admin ----
  getAdminDashboard: () => apiRequest("/admin/dashboard"),
  getAdminOrders: () => apiRequest("/admin/orders"),

  // ---- Profile ----
  getProfile: () => apiRequest("/profile"),
  uploadProfileImage: (formData) => apiRequest("/profile/upload-profile", { method: "POST", body: formData, isForm: true }),

  // ---- Contact ----
  sendContact: (payload) => apiRequest("/contact", { method: "POST", body: payload })
};
