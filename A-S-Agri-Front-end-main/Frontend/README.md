# A&S Ventures — Frontend

A complete, static HTML/CSS/JS frontend for the A&S Ventures agricultural
marketplace, built to drop directly into the `Frontend/` folder your
`server.js` already serves (`express.static(path.join(__dirname, "..", "Frontend"))`).

## Setup

1. Copy everything in this folder into your project's `Frontend/` directory
   (replacing/merging with what's there now).
2. Run your existing backend (`node server.js`) — no changes needed. Every
   API call in the frontend is a **relative** `/api/...` path, so it talks
   to whichever server is actually serving the page. No CORS, no base URL
   to configure.
3. Visit `http://localhost:3000/` — `express.static` serves `index.html`
   for the root route automatically, ahead of your JSON test route.

## Structure

```
Frontend/
  css/style.css          — full design system (colors, type, components)
  js/api.js               — fetch wrapper for every backend route
  js/extras.js             — localStorage-backed prototype layer (see below)
  js/ui.js                 — navbar/footer rendering, toasts, modals, auth guard
  js/product-card.js       — shared product card renderer
  index.html, marketplace.html, product.html, services.html, about.html,
  contact.html, login.html, signup.html, cart.html, checkout.html,
  payment-success.html
  farmer/  — dashboard, products, orders, upload-product, messages, profile
  buyer/   — dashboard, orders, favorites, messages, profile
  admin/   — dashboard (sales overview, all orders, seller verification)
```

## What's wired to your real backend

Everything except the items below talks directly to your existing routes:
auth, product CRUD + image upload (Cloudinary via your existing multer
route), cart, checkout → Flutterwave → verify → order creation, transport
pricing by state, farmer dashboard + order status updates + payout
confirmation, admin dashboard + all-orders, profile + avatar upload,
contact form → Resend email.

## Prototype-only features (`js/extras.js`)

You asked for these to be built now with the backend to follow, so they're
fully functional in the UI but stored in **localStorage on the visitor's
device only** — nothing here syncs across devices or users yet. Each has a
`TODO (backend)` comment in `extras.js` describing the minimal schema/route
needed to make it real:

- **Multiple product images + a price unit** (per bag / kg / ton / crate /
  bunch). Your `Product` schema currently has one `image` field and no
  unit field. The upload form collects several images and a unit, uploads
  the first image to your real endpoint (unchanged), and stores the rest
  + the unit locally, merged back in wherever a product is displayed.
- **Buyer favorites/saved products**
- **Buyer ↔ seller messaging** (per-product conversations)
- **Seller ratings** (buyers rate a seller after a Delivered order)
- **Verified-seller badge**, togglable from the admin dashboard's Sellers
  tab (there's no `verified` field or admin route for it yet, so the admin
  view derives the seller list from current product listings rather than
  a real user list)

## Other things worth knowing about your backend as it stands

- `register.js`, not `authController.js`, is where `register`/`login`
  live — `authRoutes.js` already points at it correctly, this is just a
  naming note.
- `buyerRoutes.js` and `farmerRoutes.js` aren't mounted in `server.js` and
  `buyerRoutes.js` is missing its `express.Router()` setup — the frontend
  doesn't depend on either, it uses `farmer-dashboard`, `orders`, `cart`,
  and `payment` routes instead, which are all mounted correctly.
- `login`'s response includes the full `user` document, including the
  hashed `password` field (`register.js`, the `login` handler) — worth
  adding `.select("-password")` there like the profile route already
  does.
- Several `.populate(..., "fullname phone")` calls (in `adminController.js`
  and `farmerDashboardController.js`) use `fullname` (lowercase n) but the
  `User` schema field is `fullName` — so that populated field won't come
  through. The frontend already falls back gracefully (`fullname ||
  fullName || "Buyer"`), but it's worth fixing the casing backend-side.
- Right after a signup with an email in `ADMIN_EMAILS`, the registration
  response's `role` is captured *before* the admin promotion is saved, so
  the very first redirect may send them to the buyer/farmer dashboard
  instead of admin — logging in again picks up the correct role, since
  `login` re-fetches the user fresh.
- `transportRoutes.js`'s `POST /` and `PATCH /:id` have no auth guard —
  currently anyone can create or edit transport pricing.

## Deliberately left out of this pass

Two brief items with no backend hook and no explicit go-ahead were left
out to keep scope focused: **product condition** and **delivery
availability** as listing fields. Happy to add them (frontend-only, same
pattern as images/price-unit) on request.

## Placeholder content

Hero and section imagery uses Unsplash stock photos and the contact page
uses placeholder phone/email/location details — swap both for your real
brand photography and contact info before launch.
