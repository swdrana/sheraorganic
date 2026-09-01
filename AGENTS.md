# AGENTS.md — Shera Organic Storefront

> Project reference for AI agents (Codex / Claude / etc). Read this first before touching code so you
> don't have to re-derive the architecture each session. Keep it short and current — update it when a
> convention or major flow changes.
>
> **This repo carries its own memory** — no machine-local notes. This file = architecture / conventions
> / gotchas (stable). `docs/PROJECT_STATUS.md` = what's done / in progress / planned (volatile — update
> it every work round, replacing stale content). Read both at the start of a session.

## What this is

Grostore-based **Next.js 14 (App Router) + MongoDB (Mongoose)** e-commerce storefront + admin panel for
"Shera Organic" (organic grocery, Bangladesh). Live at https://sheraorganic.com (Vercel). Primary UI
language for customer-facing copy is **Bengali**; code identifiers are English.

**Mobile-first is the rule** — most users are on mobile. Fix/verify mobile layout first, desktop second.

## Stack & tooling

- Next.js `^14.2` App Router. React 18. `next-auth` v4 (credentials only). `react-use-cart` for cart.
  `react-hook-form`. `swiper` v8. `react-player` v2. `react-toastify`.
- **Styling: Bootstrap 5 SCSS is primary** (`src/assets/scss/main.scss` → compiled to
  `src/assets/css/main.css`, which **is committed**). After ANY `.scss` change run `npm run sass` and
  commit the regenerated `main.css`. Tailwind is also present but used sparingly (a few nav/footer bits).
  Swiper CSS is a static file: `public/css/swiper-bundle.min.css` (linked in `layout.js`).
- Scripts: `npm run dev` (may hit EMFILE — use `WATCHPACK_POLLING=true npm run dev`), `npm run build`
  (`next build` + `scripts/postbuild.js`), `npm run lint`, `npm run sass`.
- Images: **Cloudinary**, stored as raw `secure_url` strings. `product.image` is a `[String]` array.
  `src/app/utils/cloudinary.js` → `optimizeCloudinaryUrl(url, width=400, quality=80)` injects
  `w_,q_,f_auto` after `/upload/` (no height/crop). Server-side delete helper:
  `src/app/backend/utils/cloudinaryServer.js` (`destroyImages`, `diffRemoved`) — reads server-only
  `CLOUDINARY_*` env, falls back to `NEXT_PUBLIC_CLOUDINARY_*`.

## Directory map (`src/`)

- `middleware.js` — next-auth guard. `matcher: ["/admin/:path*", "/my-account"]` (checkout is public / guest).
- `app/page.js` — storefront home (RSC, statically prerendered). `app/layout.js` — root layout + metadata.
- `app/ClientLayout.jsx` — mounts chrome (Navbar / Footer / Offcanvas / CartDrawer / ProductModal / …)
  inside providers when `isStorePage`.
- `app/(store)/**` — storefront pages: `products/`, `products/[slug]` (search/category via `=`-split slug),
  `product-details/[id]`, `cart/`, `checkout/`, `my-account/`, `login/`, `singup/` (sic), `thank-you/[orderCode]`,
  `invoice/[invoiceNo]`, `blog/`, etc.
- `app/admin/**` — admin dashboard routes (`store-customization`, `product`, `order`, `customers`, …).
- `app/api/v1/**` — REST route handlers. `app/api/auth/[...nextauth]/route.js` exports `authOptions`.
- `app/components/store/**` — storefront components. `app/components/admin/**` — admin components.
- `app/backend/model/*.model.js` — Mongoose schemas. `app/backend/controllers/*` + `app/backend/actions/*`
  — server actions / fetch wrappers (note: some are client fetch wrappers despite the folder name).
- `app/hooks/*` — admin form hooks (`useStoreCustomize`, `useProductSubmit`, …).
- `app/components/store/hooks/*` — storefront hooks (`useAddToCart`, …).
- `app/data/cachedData.js` — `unstable_cache`-wrapped RSC data loaders (`getCachedSettings`, `getCachedProducts`, …).
- `app/controlers/*` (typo) AND `app/backend/controllers/*` — **two** parallel order controllers exist;
  `CheckoutBody` imports `createOrder` from the typo path, `useUserOrders` from the backend path.

## Key data & flows

### Settings (`Setting` model, single doc)

- `Setting { name: String, setting: {} (Mixed) }`, doc `name: "storeCustomizationSetting"`, nested
  `setting.home / about / contact / terms / faq`.
- Storefront reads via `getCachedSettings()` (`unstable_cache`, `revalidate: 60`, `tags: ["settings"]`).
- Admin edits via `useStoreCustomize.js` → `PATCH /api/v1/store` (`src/app/api/v1/store/route.js`).
  **PATCH uses an explicit dotted `$set` allow-list** — a new `setting.home.*` key MUST be added there
  or it will not persist on update. Adding a field = 4 touchpoints: `HomeCustomization.jsx` (input),
  `useStoreCustomize.js` (state + `onSubmit` + load-effect `setValue` + hook return), `store/route.js`
  PATCH `$set` map.
- After a settings write you must `revalidateTag("settings")` + `revalidatePath("/", "layout")` or the
  static home page keeps serving stale data. (Round-2 R2-T4 adds this.)
- Product-picker admin fields store `{ name, id }` (joined/split on `"|"` in the `<select>`), e.g.
  `weekly_best_delas_product_*`. Category-picker fields store just the name string.

### Auth

- `CredentialsProvider`, **plaintext password compare** (`user.password === password`). Session exposes
  `session.user.{id, name, role}`. `authOptions` is exported from `[...nextauth]/route.js`; API routes
  use `getServerSession(authOptions)`. Client fetches that need the session cookie must send
  `credentials: "include"` (see `updateProductRating`).

### Cart & add-to-cart

- `react-use-cart`. `src/app/components/store/hooks/useAddToCart.js` → `handelAddItem(product)` (callers
  pass `id: product._id`). Item identity = `product.id`.
- `MainContextStore` (`src/app/components/store/provider/MainContextStore.js`, hook `useMainContext()`)
  holds UI toggles: `openProductModal`/`productDetails`, `openOffcanvas`, `openCartDrawer`
  plus `cartPopup`, `openCategoryDrawer`, and `reviewReminder`.
- Add-to-cart opens `CartPopup` (4-second mini confirmation), not `CartDrawer`; explicit cart controls
  open the drawer. `FloatingCartButton` is desktop-only and FooterNav shows the mobile cart total.
- FooterNav Category opens the category-only `CategoryDrawer`; general search/account/site navigation
  belongs to `Offcanvas`.
- Drawers reuse SCSS `.offcanvas_menu(.active)` / `.offcanvas-close`. **Do NOT use the theme's
  `.offcanvas-backdrop` class** — it is opaque near-black with z-index above the panel; use an inline
  `rgba(0,0,0,0.5)` backdrop at z-index 1090 and the panel at z-index 1100 (see `CartDrawer.jsx`).

### Orders / checkout

- Guest checkout is enabled (no login required). `Order.user` is `ref: "User"`, `required: false`.
- `POST /api/v1/orders` — validates `cart/user_info/total`, idempotent via `clientToken`, returns
  `{ order: { orderCode } }` on 201. `CheckoutBody` checks `res?.order?.orderCode` for success.
- `order.cart` is a `Mixed` array; items carry the full product doc + `_id`, `name`, `image[]`,
  `quantity`, `price`. "Delivered" status is set by admin only (`SelectStatus.jsx` → `PATCH /api/v1/orders/[orderId]`).

### Reviews

- `product.ratings[]` subdocs: `{ user (ObjectId), productId, name, rating (1-5), comment, reviewDate }`
  + `product.averageRating`. One review per user per product (upsert in the PUT handler).
- `PUT /api/v1/products/[productId]` = the only review write. Requires session; requires a **Delivered**
  order containing the product; validates `rating` int 1-5 + non-empty `comment`; recomputes
  `averageRating` (rounded to 1 dp).
- `StartRating.jsx` (filename typo, export `StarRating`) is **display-only, integer, no half-stars, not
  interactive**. `StarRatingInput.jsx` captures input; product details, order history, and
  `ReviewReminder` reuse the verified-purchase endpoint. Reminder dismissal is per-user for three days.

### Review gifts

- `setting.home.review_gift_*` controls enablement, gift product, minimum order, label, and note.
- A first review for each delivered product appends one `user.pendingGifts` entry. A qualifying later
  order redeems at most one and injects an `isGift: true`, ৳0 order cart line server-side.
- `.product-card-v2` is the canonical storefront grid card; the specialized trending/feature/weekly card
  components were removed.

### Multi-category (round-2)

- `product.category` (String, legacy) + `product.categories` ([String]). Use the helper
  `src/app/utils/productCategory.js` → `productCategoryList(p)` / `productMatchesCategory(p, normalized)`
  everywhere instead of `p.category === x`.

## Known gotchas

- `src/assets/scss/base/_helpers.scss` forces `.vertical-product-card.trend_style .thumbnail { height: 250px }`
  (and `.next_style` 125px) — this clips card images. Round-2's new `.product-card-v2` class sidesteps it;
  don't reintroduce the old classes for the new card.
- `.card-btn` / `.product-btns` in `_product-card.scss` are hover-only (`visibility:hidden`) → invisible on
  touch. Any always-visible card button must not rely on those.
- `.env.local` is **tracked in git** — secrets (Mongo URI, Cloudinary key+secret, Gmail app password,
  NEXTAUTH_SECRET) are already on GitHub. Pre-existing; flag to the owner, don't fix silently.
- Cloudinary API key/secret are exposed as `NEXT_PUBLIC_*` (browser bundle). Server delete helper prefers
  non-public `CLOUDINARY_*` but falls back to the public ones.
- `POST /api/v1/store` historically could create duplicate `Setting` docs; `findOne` has no `.sort()`.
  Round-2 makes PATCH an upsert + adds `.sort({ createdAt: 1 })` + unique index on `name`.
- Two order-controller files (`app/controlers/order.controler.js` typo, `app/backend/controllers/order.controller.js`).
- `product-details/[productId]/route.js` `PATCH` reads stale field names (`des`, `currentPrice`) that don't
  match the schema — the live admin update path is the `productUpdate` server action, not this PATCH.

## Working agreement

- **Commits: author is the repo owner (`swdrana`), plain message, NO `Co-Authored-By` / AI trailer.**
- **Do not `git push` / open PRs / merge.** Finish work, run the self-checks, commit locally, report,
  and let the owner push.
- Per-task: run that task's manual test; don't block on browser-only checks — list them under
  "MANUAL VERIFY" and continue. Only a failing `npm run build` blocks progress.
- After any `.scss` change: `npm run sass`, stage `src/assets/css/main.css`.
- `plan/` is untracked scratch (implementation plan + client checklist) — never `git add` it.
- **Keep the repo memory current**: at the end of every work round update `docs/PROJECT_STATUS.md`
  (replace stale state, don't just append) and, if a convention/flow/gotcha changed, this file too.
  Both are tracked and travel with the repo — that is the project's only memory.

## History

Round-by-round status (done / in progress / planned) lives in **`docs/PROJECT_STATUS.md`** — keep it
there, not here. Round 1 is merged & pushed; Round 2 is implemented and locally committed pending owner
verification/push.
