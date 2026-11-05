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

**Two stores, one codebase (from 2026-11):** **মেহেদী (Mehedi)** = Shera Organic (sheraorganic.com,
ghanizbd.com redirects to it, grocery) and **রায়হান (Raihan)** = bdXmart/Nobomukh (nobomukh.com, tech). Each
deployment has its own env + MongoDB DB; nothing brand- or niche-specific may be hardcoded — it comes from
admin settings or env. Both run on `sw-app-01` Coolify and auto-deploy from `main`, so **one push = two
builds**. Each app needs `MONGODB_URI` at build time (the home page prerenders with that store's settings). When reporting to the owner, name the store by the friend ("মেহেদীর সাইট"). Plan:
`plan/multi-store-plan.md` (local).

**Mobile-first is the rule** — most users are on mobile. Fix/verify mobile layout first, desktop second.

## Stack & tooling

- Next.js `^14.2` App Router. React 18. `next-auth` v4 (credentials only). `react-use-cart` for cart.
  `react-hook-form`. `swiper` v8. `react-player` v2. `react-toastify`.
- **Styling: Bootstrap 5 SCSS is primary** (`src/assets/scss/main.scss` → compiled to
  `src/assets/css/main.css`, which **is committed**). After ANY `.scss` change run `npm run sass` and
  commit the regenerated `main.css`. Tailwind is also present but used sparingly (a few nav/footer bits).
  Swiper CSS is a static file: `public/css/swiper-bundle.min.css` (linked in `layout.js`).
- Scripts: `npm run dev` (may hit EMFILE — use `WATCHPACK_POLLING=true npm run dev`), `npm run build`
  (`next build` + `scripts/postbuild.js`), `npm run lint`, `npm test` (Vitest + React Testing Library),
  `npm run sass`.
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
  `product-details/[id]` (segment = product URL path, see "Product URLs"), `cart/`, `checkout/`, `my-account/`, `login/`, `singup/` (sic), `thank-you/[orderCode]`,
  `invoice/[invoiceNo]`, `blog/`, etc.
- `app/admin/**` — admin dashboard routes (`store-customization`, `product`, `order`, `customers`, …).
- `app/api/v1/**` — REST route handlers. `app/api/auth/[...nextauth]/route.js` exports `authOptions`.
- `app/components/store/**` — storefront components. `app/components/admin/**` — admin components.
- `app/backend/model/*.model.js` — Mongoose schemas. `app/backend/controllers/*` + `app/backend/actions/*`
  — server actions / fetch wrappers (note: some are client fetch wrappers despite the folder name).
- `app/hooks/*` — admin form hooks (`useStoreCustomize`, `useProductSubmit`, …).
- `app/components/store/hooks/*` — storefront hooks (`useAddToCart`, …).
- `app/data/cachedData.js` — the **only** public-data cache: `unstable_cache` loaders + `CACHE_TAGS`
  (see "Caching & data fetching"). `app/robots.js` / `app/sitemap.js` read it too.
- `app/controlers/*` (typo) AND `app/backend/controllers/*` — **two** parallel order controllers exist;
  `CheckoutBody` imports `createOrder` from the typo path, `useUserOrders` from the backend path.

## Key data & flows

### Settings (`Setting` model, single doc)

- `Setting { name: String, setting: {} (Mixed) }`, doc `name: "storeCustomizationSetting"`, nested
  `setting.home / about / contact / terms / faq / brand / tracking`.
- Storefront reads via `getCachedSettings()` (`cachedData.js`, tag `settings`); `GET /api/v1/store` serves
  the same cached doc. Client components read it through `useSetting()` (shared, one request per page).
- Admin edits via `useStoreCustomize.js` → `PATCH /api/v1/store` (`src/app/api/v1/store/route.js`).
  **POST and PATCH require a staff session and share the dotted `$set` allow-list** in
  `utils/storeSettings.js`. Never replace the Mixed `setting` object or write omitted leaves: saving Home
  must preserve brand/tracking, and vice versa. Image deletion also checks explicitly updated leaves.
  Malformed tracking IDs, email colour, Messenger username or WhatsApp number reject the whole write
  with HTTP 400 + `invalidFields` (no DB/image/cache side effects); only explicit empty strings clear them.
  Home fields retain the 4-touchpoint rule: `HomeCustomization.jsx` input, `useStoreCustomize.js`
  state/submit, load-effect/return, and the `storeSettings.js` dotted map (called by `store/route.js`).
- Site Settings tabs: `SiteSettings.jsx` edits only `setting.brand` or `setting.tracking` with the existing
  Cloudinary uploader. New group fields require all 4 touchpoints: UI, normalized keys/defaults,
  allow-list/validation, and load/save handling (currently generic over those keys).
- `utils/brand.js` is the pure brand contract: missing text is empty (never another shop's name), missing
  theme is `grocery`, banner defaults on only for grocery. `utils/theme.js` is owned by the decoration job.
  Root layout supplies initial settings via `SettingsContext` to avoid cross-brand hydration flashes.
  Absolute SEO/mail URLs use only `NEXT_PUBLIC_BASE_URL`; absent/invalid means omit, never a shop-domain fallback.
- Tracking: `utils/tracking.js` validates IDs server-side and before browser loading. Only fixed vendor
  templates, only when enabled/ID valid, loaded on first interaction, never loaded on `/admin`.
  `AnalyticsLoader` handles route PageViews globally; `utilities/facebookPixel.js` allow-lists product-only
  FB/GA4/dataLayer ecommerce params, drops all caller PII, and uses orderCode as Purchase eventID/transaction_id.
  Avoid configuring the same vendor both directly and inside GTM (duplicate events).
- `scripts/seed-brand-settings.mjs`: `MONGODB_URI` (preferred) or `MONGO_URI` + `--store=mehedi|raihan`, dry run by default. Apply requires
  `--apply --backup=<new-file.json>`; exclusive private backup first, then only missing brand/tracking leaves.
  **Seed BEFORE deploying this code** to preserve Mehedi's existing texts/IDs; saving the Brand tab
  before seeding makes empty values "set", so this missing-key-only seed will not fill them. No existing
  values are overwritten.
  Out-of-band seed writes use the normal 5-minute cache expiry (or a subsequent deployment).
- After a settings write you must `revalidateTag("settings")` + `revalidatePath("/", "layout")` or the
  static home page keeps serving stale data. (Round-2 R2-T4 adds this.)
- Product-picker admin fields store `{ name, id }` (joined/split on `"|"` in the `<select>`), e.g.
  `weekly_best_delas_product_*`. Category-picker fields store just the name string.

### Terms content

- Admin Quill saves HTML in `setting.terms.value`. Storefront `TermsContent` parses it only in an inert
  template after mount and rebuilds allow-listed React elements/attributes (never raw HTML injection).
  Keeps Quill lists, emphasis, alignment/fonts, safe links/images; empty content shows a neutral notice.

### Decoration themes (2026-11)

- `setting.brand.decoration_theme` = `grocery | tech | none`; `utils/theme.js` normalizes it,
  with missing/invalid values falling back to grocery. Root `layout.js` reads cached settings before
  rendering and seeds `components/store/theme/DecorThemeProvider`; use `useDecorTheme()` rather than
  fetching settings again or switching themes after mount. The hero preload follows the same theme.
- `theme/decorSets.js` owns per-slot image paths and original sizing; `<Decor slot="..." />` preserves
  grocery img attributes/classes/order, chooses isolated `/themes/tech/...` art, or omits niche art for
  none. Neutral backgrounds, circles, maps, textures, curves and borders remain in every theme.
  Use `reserveSpace` for in-flow images that must keep their box when hidden; tech replacement images
  use the original aspect ratio. Per-slot `techWidth` keeps small SVG art within 60px in either dimension
  and overrides grocery-only inline sizes. Numeric-string widths must be converted to CSS pixels.
  Never overwrite `/img` grocery art with tech assets. All themes share the WebP hero circle/preload.
- The supplied bdXmart checkout's icon library currently matches this checkout byte-for-byte. Live
  grocery counter icons therefore use actual tech/cart art. Tech's product counter uses an opaque
  foreground microchip icon; neutral hand/customer/delivery/cart art reuses `/img` originals. Its laptop
  login banner is neutral enough for grocery/tech and reuses the original; none hides it.
- Weekly deals use real `home.weekly_best_deals_img` images in every theme, optimized at 800px for
  Cloudinary (`grostore/` is the live store's real upload folder — never treat it as a placeholder). The legacy
  vegetables fallback is grocery-only. Missing tech/none images reserve the original banner box.
- Quick view uses `ProductMediaGallery` + `utils/productMedia.js`: product images only, video after the
  first image, no template fallback photos. Thumbnail borders follow `.swiper-slide-thumb-active`;
  `.swiper-slide-active` applies only outside `.swiper-thumbs` (product details uses Controller).
  Payment SVGs are local under `/img/payments/`.
- Admin picks the theme in Site settings (brand group); `normalizeBrand` validates it via `normalizeTheme`.

### Caching & data fetching (round 4 — CPU fix)

- **Server:** public data (products, categories, brands, attributes, settings, blogs, About stats) is read
  through `cachedData.js` loaders (`unstable_cache`, revalidate 300s, tags in `CACHE_TAGS`). The public GET
  routes (`api/v1/{products,categorys,brands,attributes,store,blogs}`, `products/[productId]`) return those
  loaders' output with the exact old JSON shape. **Every write path must call `revalidateTag(CACHE_TAGS.x)`**
  (API POST/PATCH/DELETE, server actions in `backend/actions/*`, review PUT, orders/signup → `stats`).
  A new write path without it = storefront stale for up to 5 min.
- Loaders throw on DB errors (never cached); pages use the `safe` wrappers (`getCachedProducts`, …).
- A reused build cache (Coolify keeps `.next/cache`) serves the previous build's data during prerender. When a
  loader's document shape changes, bump its key (settings is `store-setting-doc-v2`) or the static pages ship
  stale data until the next revalidation.
- Never add `export const dynamic = "force-dynamic"` to these routes: in Next 14 it sets
  `fetchCache: force-no-store`, which makes `unstable_cache` bypass the cache. Route files that also export
  POST/PATCH are already dynamic. Data-cache entries over 2MB are silently not cached (a `[cache]` warn logs
  at 1.5MB) — the full product list is ~110KB today.
- `product-details/[id]` reads `getCachedProductById` directly (no HTTP self-fetch). Home strips `description`
  from product props (ProductModal looks it up on demand).
- **Browser:** public hooks (`useSetting`, `useCategory`, `useBrand`, `useProducts`, `useAttributes`) go
  through `components/store/dataFetching/sharedFetch.js` (`useSharedData` / `fetchOnce`): one request per
  key, reused 5 min across client navigations, never reused after an `/admin` visit (`markAdminVisit` in
  `ClientLayout`). Don't add new per-component `useEffect` fetches of public data — add a shared hook.
- Hooks keep server-identical initial state (no hydration mismatch). Swiper `loop` must only switch on
  after mount (it clones slides client-side; see `home/Category.jsx`).
- `SessionProvider refetchOnWindowFocus={false}`. `utils/database.js` keeps one connection promise on `global`.
- Observability: `backend/utils/perf.js` `timed()` logs `[perf] label ms` when ≥ `PERF_SLOW_MS` (500) or
  always with `PERF_LOG=1`. `next.config` `removeConsole` keeps `error`/`warn`, so these reach Coolify logs.

### Auth

- `CredentialsProvider`, **plaintext password compare** (`user.password === password`). Owner decision
  (2026-10-08): keep plaintext passwords as-is — do not propose or implement hashing. Session exposes
  `session.user.{id, name, role}`. `authOptions` is exported from `[...nextauth]/route.js`; API routes
  use `getServerSession(authOptions)`. Client fetches that need the session cookie must send
  `credentials: "include"` (see `updateProductRating`).
- `backend/utils/apiAuth.js`: staff is an explicit allow-list: `Admin`, `CEO`, `Manager`, `Super Admin`,
  `Accountant`. `Customer`, `Driver`, `Security Guard`, missing and unknown roles are not staff. It also exports
  `canAccessUser` (self or staff), `unauthorized`, and server-action guards. Keep the same list in `middleware.js`.
  Staff-only: GET/POST `/api/v1/user`, GET `/api/v1/orders`, `/orders/by-date`, PATCH/DELETE `/orders/[id]`.
  Self-or-staff: `/api/v1/user/[id]` (GET/PATCH), `/api/v1/user-order/[id]`. User responses never include
  `password`. `middleware.js`: `/admin` is staff-only (customers → `/`).
- Catalog/admin writes for products, categories, brands, attributes, blogs, coupons and staff are staff-only in
  both route handlers and direct `"use server"` actions. Exceptions remain guest order POST, signup, verified
  review PUT, contact/subscribe mail, auth, and the separately maintained store-settings route.
- Staff GET list/detail require staff and exclude `password`; staff records use the `User` model in both
  routes and `staffUpdate`. Only `Admin`/`CEO` may create staff or change roles (other staff may submit
  an unchanged role); forbidden role changes return 403. The unused unrestricted `updateUser` action
  has been removed. Signup responses also omit passwords.
- The credentials provider uses `backend/utils/userLookup.js` — never put DB lookups that return secrets in a
  `"use server"` file (its exports become browser-callable actions).

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
- Order owner and review-gift redemption use only `getApiSession().user.id`; body `user` is ignored.
  A missing generated order code returns 500 before saving or redeeming a gift.
- `utils/phone.js` normalizes Bengali digits, separators and Bangladesh country prefix; checkout and
  order POST share its mobile validation. Orders store normalized `user_info.contact`; invalid optional
  emails become empty strings. Admin order search matches name, normalized phone or order code.
- `order.cart` is a `Mixed` array; items carry the full product doc + `_id`, `name`, `image[]`,
  `quantity`, `price`. "Delivered" status is set by admin only (`SelectStatus.jsx` → `PATCH /api/v1/orders/[orderId]`).

### Email (Gmail SMTP)

- `backend/utils/mailer.js` = the only sender (`sendMail`, `escapeHtml`, `isEmail`); env `GMAIL_USER` +
  `GMAIL_PASSWORD` (a Gmail **App Password**; a normal password fails with EAUTH 535).
- New order → `sendOrderConfirmation(order)` (`backend/utils/orderEmail.js`) fire-and-forget from `orders`
  POST; it never throws. Contact form → `recive-mail`, footer → `subscribe-gmail` (both to the shop inbox).
- Never add a route that sends to a caller-supplied `to` address (open relay); always escape user text in HTML.

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

### Product URLs (round 7 — SEO)

- `/product-details/<slug>`: `product.slug` is the admin "URL path" — unique, Bengali+English allowed,
  normalized by `slugify` (`utils/productUrl.js`: letters/digits of any script kept, everything else → `-`).
  Always link with `productPath(product)` (or `productPathEncoded` for sitemap/canonical/redirects — HTTP
  headers must be ASCII). Never build `/product-details/${id}` by hand.
- The page resolves the segment from the cached product list via `findProductByParam`: current slug →
  render; legacy Mongo id or an old slug in `product.slugHistory` → `permanentRedirect` to the current path.
- Server writes call `resolveProductSlug` (`backend/utils/productSlug.js`): unique among other products'
  current + historical slugs, never a bare 24-hex string. `productUpdate` pushes the previous slug into
  `slugHistory`. Admin drawer: "Same as title" checkbox (new products on; editing keeps the URL stable).
- `scripts/generate-product-slugs.mjs` (dry run / `--apply <backup.json>`) regenerated all slugs from
  titles on 2026-10-10.
- Per-product SEO: `seoTitle`, `seoDescription`, `seoKeywords` ([String]); admin "SEO" group with the
  `KeywordsInput` chip field (comma / Bengali comma / Enter = new chip). Server cleans them with
  `cleanSeo` (`backend/utils/productSeo.js`). Metadata falls back to name / description / legacy `tag`.
- Product page has `generateMetadata` (title/description/canonical/OG), Product + BreadcrumbList JSON-LD,
  the name as `h1`, and the slim `ProductBreadcrumb` instead of the big page banner.

### Multi-category (round-2)

- `product.category` (String, legacy) + `product.categories` ([String]). Use the helper
  `src/app/utils/productCategory.js` → `productCategoryList(p)` / `productMatchesCategory(p, normalized)`
  everywhere instead of `p.category === x`.

### Admin product variants

- `POST /api/v1/products` returns `{ message, product }`; create-flow hydration must read
  `response.product.variants`, never a top-level `response.variants`.
- `useProductSubmit` owns selected attribute IDs/options. `AttributeOptionTwo` is controlled by its
  `values` prop so Generate/Clear/Edit remain synchronized. Existing variant products hydrate selected
  attributes/options from their variant keys, and generation skips combinations already present.

## Known gotchas

- `src/assets/scss/base/_helpers.scss` forces `.vertical-product-card.trend_style .thumbnail { height: 250px }`
  (and `.next_style` 125px) — this clips card images. Round-2's new `.product-card-v2` class sidesteps it;
  don't reintroduce the old classes for the new card.
- About page spacing/decorations live in `pages/_about.scss`: preserve `.about-section` and
  `.service-section` when removing service templates; `AboutFeedback` also references `.feedback-slider-2`.
- `.card-btn` / `.product-btns` in `_product-card.scss` are hover-only (`visibility:hidden`) → invisible on
  touch. Any always-visible card button must not rely on those.
- Catalog/admin write routes and direct mutation server actions must call the shared staff authorization helpers
  before parsing input, connecting to MongoDB or changing cache state. Do not rely on middleware alone.
- `.env*.local` is ignored and `.env.local` is no longer tracked. Historical secrets were previously
  committed to GitHub; the owner still needs to rotate them outside the repository.
- Cloudinary API key/secret are exposed as `NEXT_PUBLIC_*` (browser bundle). Server delete helper prefers
  non-public `CLOUDINARY_*` but falls back to the public ones.
- `POST /api/v1/store` historically could create duplicate `Setting` docs; `findOne` has no `.sort()`.
  Round-2 makes PATCH an upsert + adds `.sort({ createdAt: 1 })` + unique index on `name`.
- Two order-controller files (`app/controlers/order.controler.js` typo, `app/backend/controllers/order.controller.js`).
- `product-details/[productId]/route.js` `PATCH` reads stale field names (`des`, `currentPrice`) that don't
  match the schema — the live admin update path is the `productUpdate` server action, not this PATCH.

## Working agreement

- **Every commit and push in this repo goes out as the repo owner only.** Author & committer =
  `swdrana <tctr2s@gmail.com>`, plain message, **NO `Co-Authored-By`, no AI/agent trailer, no
  "generated with" line — ever, anywhere.** GitHub must show the owner as the sole contributor.
  Never add a co-author, never change `git config user.*`, never open a PR from a bot identity.
- **One push per round — every push is a full Coolify build on a CPU-throttled shared VPS.** Do all work,
  `npm run build` + `lint` + `test` + local `next start` smoke tests first, then push once. Never push
  docs-only/fix-up commits separately (keep them local until the next real push).
- **Push only after the owner explicitly approves this round's work** (e.g. "verified, push it").
  Then `git push origin main` with the owner's own credentials/remote — nothing else changes. Do not
  open PRs or merge. If not explicitly told to push, commit locally and let the owner push.
- Per-task: run that task's manual test; don't block on browser-only checks — list them under
  "MANUAL VERIFY" and continue. Only a failing `npm run build` blocks progress.
- After any `.scss` change: `npm run sass`, stage `src/assets/css/main.css`.
- `plan/` is untracked scratch (implementation plan + client checklist) — never `git add` it.
- **Keep the repo memory current**: at the end of every work round update `docs/PROJECT_STATUS.md`
  (replace stale state, don't just append) and, if a convention/flow/gotcha changed, this file too.
  Both are tracked and travel with the repo — that is the project's only memory.

## History

Round-by-round status (done / in progress / planned) lives in **`docs/PROJECT_STATUS.md`** — keep it
there, not here.
