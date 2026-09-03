/* ============================================================
   A&S VENTURES — FRONTEND-ONLY EXTRAS LAYER
   ------------------------------------------------------------
   Everything in this file is a PROTOTYPE STAND-IN for features
   that don't exist in the real backend yet. It's all stored in
   localStorage on this device only — nothing here is synced to
   other users or devices.

   TODO (backend): once these are real API endpoints, replace the
   read/write calls below with API.* calls and delete the
   localStorage plumbing. Each section says exactly what the
   backend would need.

   Covers:
   - Extra product images + a price unit (per bag / per kg / etc)
     TODO (backend): add `images: [String]` and `priceUnit: String`
     to the Product schema; multer/cloudinary already support
     multiple files via upload.array("images").
   - Buyer favorites/saved products
     TODO (backend): a Favorite model { buyer, product } + routes,
     same shape as Cart.js.
   - Buyer <-> seller messaging
     TODO (backend): a Conversation/Message model + routes,
     ideally with sockets for live delivery.
   - Seller ratings + verified badge
     TODO (backend): a Rating model { buyer, farmer, order, stars,
     comment }, and a `verified: Boolean` field on User, settable
     by an admin route.
   ============================================================ */

const Extras = (() => {
  const KEYS = {
    productMeta: "asv_x_product_meta",   // { [productId]: { images:[dataURL,...], priceUnit } }
    favorites:   "asv_x_favorites",      // { [buyerId]: [productId,...] }
    conversations: "asv_x_conversations",// [{ id, productId, productName, farmerId, farmerName, buyerId, buyerName, messages:[{from,text,ts}] }]
    ratings:     "asv_x_ratings",        // { [farmerId]: [{buyerId, buyerName, orderId, stars, comment, ts}] }
    verified:    "asv_x_verified"        // { [farmerId]: true }
  };

  function read(key, fallback){
    try{
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    }catch(e){ return fallback; }
  }
  function write(key, value){
    try{ localStorage.setItem(key, JSON.stringify(value)); }
    catch(e){ console.warn("Extras storage full or unavailable", e); }
  }

  // ---------------- Product meta (images + unit) ----------------
  function getProductMeta(productId){
    const all = read(KEYS.productMeta, {});
    return all[productId] || null;
  }
  function setProductMeta(productId, meta){
    const all = read(KEYS.productMeta, {});
    all[productId] = { ...(all[productId]||{}), ...meta };
    write(KEYS.productMeta, all);
  }
  // helper: convert File -> base64 dataURL so it survives reloads
  function fileToDataURL(file){
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // ---------------- Favorites ----------------
  function getFavorites(buyerId){
    const all = read(KEYS.favorites, {});
    return all[buyerId] || [];
  }
  function isFavorite(buyerId, productId){
    return getFavorites(buyerId).includes(productId);
  }
  function toggleFavorite(buyerId, productId){
    const all = read(KEYS.favorites, {});
    const list = all[buyerId] || [];
    const idx = list.indexOf(productId);
    if (idx >= 0) list.splice(idx, 1); else list.push(productId);
    all[buyerId] = list;
    write(KEYS.favorites, all);
    return idx < 0; // true if now favorited
  }

  // ---------------- Messaging ----------------
  function getConversations(userId){
    const all = read(KEYS.conversations, []);
    return all.filter(c => c.buyerId === userId || c.farmerId === userId)
      .sort((a,b) => lastTs(b) - lastTs(a));
  }
  function lastTs(conv){
    if (!conv.messages.length) return 0;
    return new Date(conv.messages[conv.messages.length-1].ts).getTime();
  }
  function getConversation(id){
    return read(KEYS.conversations, []).find(c => c.id === id) || null;
  }
  function startOrGetConversation({ productId, productName, farmerId, farmerName, buyerId, buyerName }){
    const all = read(KEYS.conversations, []);
    let conv = all.find(c => c.productId === productId && c.buyerId === buyerId && c.farmerId === farmerId);
    if (!conv){
      conv = {
        id: "conv_" + Date.now() + "_" + Math.random().toString(36).slice(2,7),
        productId, productName, farmerId, farmerName, buyerId, buyerName,
        messages: []
      };
      all.push(conv);
      write(KEYS.conversations, all);
    }
    return conv;
  }
  function sendMessage(conversationId, from, text){
    const all = read(KEYS.conversations, []);
    const conv = all.find(c => c.id === conversationId);
    if (!conv) return null;
    conv.messages.push({ from, text, ts: new Date().toISOString() });
    write(KEYS.conversations, all);
    return conv;
  }

  // ---------------- Ratings & verification ----------------
  function getRatings(farmerId){
    const all = read(KEYS.ratings, {});
    return all[farmerId] || [];
  }
  function getAverageRating(farmerId){
    const list = getRatings(farmerId);
    if (!list.length) return null;
    const sum = list.reduce((s,r) => s + r.stars, 0);
    return Math.round((sum / list.length) * 10) / 10;
  }
  function addRating(farmerId, rating){
    const all = read(KEYS.ratings, {});
    const list = all[farmerId] || [];
    list.push({ ...rating, ts: new Date().toISOString() });
    all[farmerId] = list;
    write(KEYS.ratings, all);
  }
  function hasRated(farmerId, buyerId, orderId){
    return getRatings(farmerId).some(r => r.buyerId === buyerId && r.orderId === orderId);
  }

  function isVerified(farmerId){
    const all = read(KEYS.verified, {});
    return !!all[farmerId];
  }
  function setVerified(farmerId, value){
    const all = read(KEYS.verified, {});
    all[farmerId] = value;
    write(KEYS.verified, all);
  }

  return {
    getProductMeta, setProductMeta, fileToDataURL,
    getFavorites, isFavorite, toggleFavorite,
    getConversations, getConversation, startOrGetConversation, sendMessage,
    getRatings, getAverageRating, addRating, hasRated,
    isVerified, setVerified
  };
})();
