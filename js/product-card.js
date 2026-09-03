/* ============================================================
   PRODUCT CARD — shared renderer
   ============================================================ */

const CATEGORY_ICONS = {
  Grains: "🌾", Vegetables: "🥬", Fruits: "🍌", Tubers: "🍠",
  Seeds: "🌱", Fertilizers: "🧪", Livestock: "🐐", "Farm Inputs": "🚜", Other: "🌿"
};

function productImageSrc(product){
  const meta = Extras.getProductMeta(product._id);
  if (meta && meta.images && meta.images.length) return meta.images[0];
  return product.image || "";
}

function productPriceLabel(product){
  const meta = Extras.getProductMeta(product._id);
  const unit = meta && meta.priceUnit ? meta.priceUnit : null;
  return unit
    ? `${formatNaira(product.sellingPrice)} <span>/ ${escapeHtml(unit)}</span>`
    : `${formatNaira(product.sellingPrice)}`;
}

function productCardHtml(product, rootPrefix = ""){
  const user = getUser();
  const isBuyer = user && user.accountType === "Buyer";
  const fav = isBuyer && Extras.isFavorite(user._id, product._id);
  const farmerName = product.farmer && product.farmer.fullName ? product.farmer.fullName : "A&S seller";
  const verified = product.farmer && Extras.isVerified(product.farmer._id);
  const img = productImageSrc(product);

  return `
  <article class="product-card" data-id="${product._id}">
    <div class="product-card__media">
      ${img ? `<img src="${img}" alt="${escapeHtml(product.productName)}" loading="lazy">` : `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:2.4rem">${CATEGORY_ICONS[product.category] || "🌿"}</div>`}
      <span class="badge product-card__category">${CATEGORY_ICONS[product.category] || ""} ${escapeHtml(product.category)}</span>
      ${isBuyer ? `
      <button class="product-card__fav ${fav ? "active" : ""}" data-fav-id="${product._id}" aria-label="Save product">
        ${ICONS.heart}
      </button>` : ""}
    </div>
    <div class="product-card__body">
      <div class="product-card__name">${escapeHtml(product.productName)}</div>
      <div class="product-card__meta">
        <span>${escapeHtml(farmerName)}</span>${verified ? `<span class="badge badge--verified">${ICONS.check} Verified</span>` : ""}
      </div>
      <div class="product-card__meta">📍 ${escapeHtml(product.location)} · ${product.stock} available</div>
      <div class="product-card__price">${productPriceLabel(product)}</div>
    </div>
    <div class="product-card__footer">
      <a href="${rootPrefix}product.html?id=${product._id}" class="btn btn-secondary btn-sm btn-block">View product</a>
    </div>
  </article>`;
}

function renderProductGrid(container, products, rootPrefix = ""){
  if (!products.length){
    container.innerHTML = emptyState("No products found", "Try a different search term or clear your filters.");
    return;
  }
  container.innerHTML = `<div class="product-grid">${products.map(p => productCardHtml(p, rootPrefix)).join("")}</div>`;
  bindFavButtons(container);
}

function bindFavButtons(container){
  container.querySelectorAll("[data-fav-id]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const user = getUser();
      if (!user){ toast("Log in as a buyer to save products.", "error"); return; }
      const nowFav = Extras.toggleFavorite(user._id, btn.dataset.favId);
      btn.classList.toggle("active", nowFav);
      toast(nowFav ? "Saved to your favorites." : "Removed from favorites.");
    });
  });
}
