# PROJECT STATUS — Shera Organic Storefront

> এটি প্রজেক্টের **চলমান মেমোরি** (repo-এর ভিতরেই, git-এ tracked, তাই যেকোনো কম্পিউটার থেকে
> এবং যেকোনো AI session — Codex / Claude / অন্য — সরাসরি পড়তে পারবে)।
>
> **নিয়ম:** প্রতিটি কাজের রাউন্ড শেষে এই ফাইল **হালনাগাদ** করতে হবে — পুরনো/অপ্রাসঙ্গিক
> অংশ **মুছে নতুন অবস্থা লেখো** (শুধু নিচে যোগ করে যেয়ো না)। আর্কিটেকচার / convention /
> gotcha বদলালে `AGENTS.md`-ও একই ভাবে হালনাগাদ করো। machine-local (`~/.claude`) মেমোরিতে
> এই প্রজেক্টের কিছু আলাদা করে রাখা হয় না — সব knowledge এখানেই।

শেষ হালনাগাদ: 2026-11-03

---

## Job A — Brand & Tracking review follow-ups (2026-11-03, local; push হয়নি)

আগের কাজ `6154206`-এর উপর review fix; এক নতুন local commit, amend/push নয়। আগের configurable
brand/tracking, staff-only leaf updates, analytics privacy boundary ও missing-key seed অপরিবর্তিত আছে।

### হয়েছে
- Product description/SEO description না থাকলে আগের পণ্যভিত্তিক বাংলা invitation ফিরে এসেছে:
  `পণ্যের নাম — সাইটের নাম থেকে অর্ডার করুন।`; নাম খালি হলে brand অংশ থাকে না। Site meta description
  আর product fallback নয়। `utils/productMetadata.js`-এ regression-tested helper।
- `utils/storeSettings.js` + store API: ভুল tracking ID, colour, Messenger username বা WhatsApp নম্বরে
  পুরো POST/PATCH **400 + invalidFields**; DB connect/write, image delete বা cache invalidate হয় না।
  Explicit empty string দিয়ে clear করা যায়; omitted leaf অক্ষুণ্ণ থাকে। `SiteSettings` একই error/field list
  inline ও error toast-এ দেখায়; success বলে না।
- `OrderTracking`-এর শেষ GroStore এবং `#G-Store` বদলে configured নাম/neutral label; brand খালি হলে
  thank-you বাক্যের brand অংশ নেই। `UpdateProfile`-এর email example neutral; `MyAccountHome`-এর
  template avatar বদলে local `public/img/avatar-neutral.svg`।
- `TermsCondition` পুরনো commented template বাদ দিয়ে admin-এর Quill HTML (`setting.terms.value`)
  দেখায়। নতুন `TermsContent` inert template থেকে allow-listed React nodes বানায়; scripts/events/styles,
  executable URL ও unsafe embeds বাদ; emphasis/list/alignment/font/safe link/image রাখা হয়। Quill CSS
  lazy load; empty/Quill-empty content-এ ছোট neutral বাংলা notice। নতুন dependency যোগ হয়নি।
- `layout.js`-এ site-wide OG url বাদ; পণ্যের Breadcrumb JSON-LD-তে base URL না থাকলে `item` key-ই নেই।
- Client settings audit: **home** → nav/footer/invoice/login, **about** → AboutBody, **contact** → contact page,
  **terms** → TermsCondition/editor, **brand** → nav/sidebar/login/Brand tab, **tracking** → Tracking tab।
  Root context client navigation জুড়ে shared; ছয় group-ই fallback হিসেবে ব্যবহৃত। Group বাদ দিলে API fail/loading-এ
  page/tab-এর initial data হারাতে পারে, তাই unsafe payload trimming করা হয়নি। Analytics-এর normalized prop আগের মতো।
- Seed script এখন preferred `MONGODB_URI`, fallback `MONGO_URI` নেয়; header/help/AGENTS-এ **deploy-এর আগে seed**
  করার নির্দেশ। Brand tab আগে save করলে empty keys-ও “set” হয়, missing-only seed সেগুলো আর ভরবে না।
  শুধু `--help` এবং URI preference/preset preservation-এর pure tests চালানো হয়েছে; কোনো DB seed হয়নি।
- `src` আবার grep: বাকি নামগুলো seed fixtures/presets, Cloudinary/decorative asset URLs, non-visible CSS class,
  commented/unused login demo helpers অথবা অন্য job-এর checkout payment icons; live brand copy আর নেই।
  SCSS বদলায়নি; sass দরকার হয়নি। AGENTS ও এই tracked memory হালনাগাদ।

### যাচাই
- `npm run lint`: **exit 0**, আগের warning আছে। Tail: `info - Need to disable some ESLint rules? ...`
- `npx vitest run --pool=threads --poolOptions.threads.singleThread`: **16 files / 108 tests pass**।
  POST/PATCH-এর সব invalid field ও wrong type, side-effect-free reject, explicit clear/valid trim,
  toast error, Quill HTML sanitization/empty fallback, per-product description ও breadcrumb omission covered।
- `CIRCLE_NODE_TOTAL=2 npm run build`: **exit 0**, `.env`/DB ছাড়াই।
  Tail: `Postbuild: prerender-manifest.json already exists.`
- Local production `next start`: terms page **200**; synthetic local staff session দিয়ে বাস্তব local PATCH-এ
  malformed fields → **400**, সব invalid field ফেরে; DB access হয়নি। Real credentials/env file ব্যবহার হয়নি।
- Headless Chrome, synthetic session + intercepted local API: Brand form **320/390/1280px × light/dark = 6/6**
  overflow/control-bounds pass; 400 error field list inline + toast-এ দেখা গেছে। Terms-এর formatting/alignment,
  executable HTML/URL বাদ এবং empty notice pass। Terms/profile **320/390px × light/dark** layout pass;
  neutral avatar/email placeholder ও tracking-এর configured/empty prefix pass। Page exception/hydration warning **0**।
- সীমাবদ্ধতা: environment-free পুরনো user/brand fetch wrapper-এ missing `NEXT_PUBLIC_BASE_URL` console error;
  real customer/order data আনা যায়নি। Storefront **1280px**-এ আগের menu overflow terms/profile-এও আছে;
  পরিবর্তিত profile controls clipped নয়। নতুন Brand form-এ desktop overflow নেই।
- চালানো local server/browser বন্ধ করা হয়েছে; production server/DB, real env, remote বা checkout/decorative job-এর
  ফাইল স্পর্শ করা হয়নি।

### MANUAL VERIFY / পরের ধাপ
1. বাস্তব test DB/staff session-এ Brand/Tracking uploader → save/reload/cache এবং deliberate bad-value reject যাচাই।
2. বাস্তব customer order code দিয়ে tracking table-এর thank-you text; দুই দোকানের product SEO/canonical/schema,
   terms-এর নিজের rich text ও avatar/profile মোবাইল/desktop-এ মালিকের visual approval।
3. Owner-এর আলাদা অনুমোদনে **deploy-এর আগে** seed dry run/backup/apply; SMTP/vendor actual delivery আগের মতো বাকি।
4. পুরনো desktop menu overflow ও environment-dependent fetch wrapper এই scope-এর বাইরে; আলাদা কাজ লাগবে।

---

## ডেলিভারি ওয়ার্কফ্লো (স্থির)

1. মালিক (`swdrana`) `plan/implementation-plan.md` Codex-কে দেয়।
2. Codex সব টাস্ক implement করে, নিজে self-check চালায় (`npm run build` / `lint` / `sass` / `dev` smoke),
   **locally commit** করে (author `swdrana`, **কোনো `Co-Authored-By` / AI trailer নয়**), **push করে না**।
3. মালিক Codex-এর রিপোর্ট Claude-কে দেয়।
4. Claude verify করে (build / lint / regression / smoke)। সব সবুজ হলে মালিককে `git push` করতে বলে —
   **Claude নিজে push করে না**।

`plan/` ফোল্ডার git-এ **untracked** — কখনো `git add` করা হয় না। `docs/` এবং `AGENTS.md` tracked।

---

## বর্তমান রাউন্ড — Job B theme review follow-ups (স্থানীয়; push নয়)

- আগের `b130529`-এর উপর একটিমাত্র নতুন commit: `fix: theme review follow-ups`; amend/push নয়।
- `decorSets.js` / `WeeklyBestDeals.jsx`: `/grostore/` থাকা saved seed URL unset হিসেবে গণ্য;
  মেহেদীর সাইটে আগের `/img/banner/vegetables.webp` ও alt অক্ষুণ্ণ। Real custom Cloudinary banner
  প্রতিটি theme-এ 800px optimized (400px box-এর 2x); tech/none-এ unset হলে আগের খালি box।
- `_shop.scss` / regenerated `main.css`: quick-view Thumbs gallery-তে শুধু
  `.swiper-slide-thumb-active` border পায়; strip-এর `.swiper-slide-active` ভুলভাবে আর highlight হয় না।
  Product-details-এর Controller gallery আগের active selector ব্যবহার করে।
- `HeroSwiper.jsx`: grocery-র তিন slide-এ ঠিক `alt="fruits"` ফেরত। Tech hero/preload এখন shared
  `/img/shapes/hero-circle-lg.webp`; অপ্রয়োজনীয় 41KB PNG বাদ।
- `Decor.jsx` / `decorSets.js`: numeric string width CSS-এ px পায়। প্রতিটি small tech SVG slot-এর
  `techWidth` audit করে সর্বোচ্চ 60px box (মূল aspect ratio রেখে), grocery-only inline size override।
  Counter 1-এর জন্য নিজস্ব opaque green foreground microchip SVG; faded background shape ব্যবহার হয় না।
- Byte-identical পাঁচটি tech duplicate সরানো: login-banner.jpg, icon-3.png, icon-4.png, hand-icon.svg,
  cart-color.svg। সংশ্লিষ্ট slots এখন `/img` originals ব্যবহার করে। Grocery asset বদলানো হয়নি।
- Regression: আসল Swiper + shipped thumbnail CSS দিয়ে gallery render, main slide change, Thumbs tap,
  video thumbnail selection ও একটিমাত্র highlight পরীক্ষা; theme/seed/custom-image/width/alt test যোগ।
- Gate: lint exit 0 (পুরনো warnings), single-thread Vitest ১২ file / ৬৫ test pass; production build
  exit 0, ৫৫/৫৫ page + postbuild successful। Command-only `MONGODB_URI=''`, localhost BASE_URL,
  `CIRCLE_NODE_TOTAL=2`; expected DB-unavailable logs। কোনো `.env` বা real DB/server ব্যবহার হয়নি।
- Production CSS-সহ isolated headless Chrome fixture: ৩৭৫px আগে, ১৪৪০px পরে, grocery/tech/none-এ
  ৩৩ section/container box একই; overflow/broken image ০। Rendered ৩৮টি small tech shape সর্বোচ্চ 60px।
  Grocery mobile screenshot baseline-এর byte-identical; desktop layout একই। Saved Grostore seed দিয়ে
  grocery vegetables fallback এবং root preload যাচাই। Hydrated gallery-তে main slide change ও actual
  mobile touch/desktop click-এ একটিমাত্র thumb highlight; strip active slide ভুল highlight পায় না।
- Local `next start`: `/`, `/about`, `/contact`, `/login`, `/singup`, `/checkout`, foreground microchip SVG
  ও shared hero WebP সব HTTP 200। নিজের server/Chrome বন্ধ করা হয়েছে; কোনো write request করা হয়নি।
- Sass: `npm run sass` main.css বানায়, কিন্তু পুরনো standalone `pages/my-account.scss`-এ undefined
  `$mint-chiffon` error দেয় এবং watch করে; watcher বন্ধ, ওই generated error CSS restore করা হয়েছে।
  `npx sass src/assets/scss/main.scss src/assets/css/main.css --no-source-map` exit 0 (deprecation warnings)।
- Scope: settings API/admin/metadata/SEO/email/Navbar বদলায়নি। Theme persistence/admin selector Job A-এর।
- MANUAL VERIFY: Job A integrate হলে বাস্তব settings/data দিয়ে grocery/tech/none fresh load ও navigation,
  real custom weekly image, quick-view video playback ও product switch; admin theme save/revalidation।

---

## Round 1 — সম্পন্ন, merge + push (commits `c3a88b3`, `51372f3`, `main`)

- Hero slider প্রতিটি বাটনের link / text / show-hide অ্যাডমিন থেকে নিয়ন্ত্রণ।
- মোবাইল হেডার: ৯-ডট / লোগো / সার্চ।
- "Our Top Category" carousel সব স্ক্রিনে + autoplay।
- মোবাইলে ২-কলাম product card + image পরিষ্কার করার প্রথম ধাপ।
- Product-details-এ প্রথম ছবির পরে ভিডিও স্লাইড (thumbnail-এ play আইকন)।
- Review: next-auth server verification + delivered-order চেক; `authOptions` export।
- Slide-in `CartDrawer` (add করলে খুলত — round-2 এ এটি বদলে popup হবে)।
- Guest checkout + ঠিকানা auto-save (ইমেইল ঐচ্ছিক)।
- Cloudinary image auto-delete (সব entity-তে replace/delete এ) — server-only `CLOUDINARY_*` env,
  `NEXT_PUBLIC_CLOUDINARY_*` fallback।
- ৯-ডট মেনু একটি Offcanvas-এ একত্র (`CategoryOffcanvas.jsx` ডিলিট)।
- `/products` price filter: number input + Apply + Reset + dynamic bounds।
- Cart-drawer backdrop z-index / opacity ফিক্স।

---

## Round 2 — সম্পন্ন, verified ও push (commit `869d540` + docs commit, `main`)

Codex implement করেছে; Claude verify করেছে (`npm run build` clean, 54/54 static; `npm run lint`
exit 0 warnings-only; `main.css` fresh compile-এর সাথে byte-identical); commit author/committer
`swdrana <tctr2s@gmail.com>`, কোনো AI trailer নেই। ক্লায়েন্ট-এর জন্য checklist: `plan/client-check-list.md`।

ক্রম: R2-T4 → R2-T5 → R2-T2 → R2-T1 → R2-T3 → R2-T9 → R2-T6 → R2-T7 → R2-T8।

1. **R2-T1** Product card পুরো redesign → নতুন self-contained `.product-card-v2`
   (`_product-card-v2.scss`); Add-to-Cart সবসময় দৃশ্যমান; image কাটা/ঝাপসা নয়; সব হোম section-এ
   একই vertical card (horizontal `FeatureBrandProductCard` / `WeeklyBestDealsCard` / `TrendingProductCard` বাদ)।
2. **R2-T2** "Our Top Category" carousel compact (মোবাইলে এক স্ক্রিনে ৩+ ক্যাটাগরি)।
3. **R2-T3** Add-to-cart → নিচে-ডানে ছোট popup (auto-dismiss), drawer আর auto খোলে না;
   মোবাইল bottom-nav Cart-এ ৳ total; desktop `FloatingCartButton`। নতুন `MainContextStore.cartPopup`।
4. **R2-T4** Settings cache ফিক্স: `/api/v1/store` PATCH-এর পর `revalidateTag("settings")` +
   `revalidatePath`; PATCH upsert; `useStoreCustomize` সবসময় PATCH (POST duplicate doc নয়);
   `Setting.name` unique।
5. **R2-T5** Login/Signup password show/hide → shared `PasswordInput.jsx`।
6. **R2-T6** Multi-category: `product.categories: [String]` + `src/app/utils/productCategory.js`
   helper; admin `MultiSelect`; ~৫টি category-matching consumer আপডেট।
7. **R2-T7** Review overhaul: `StarRatingInput.jsx` (interactive); product-details Reviews ট্যাবে
   inline ফর্ম (logged-in + delivered); Order History-তে "রিভিউ দিন"; `ReviewReminderModal` + Trigger
   (next-visit popup, ৩-দিন localStorage dismiss)।
8. **R2-T8** Gift-on-review, **সম্পূর্ণ admin-controlled**:
   `setting.home.review_gift_{enabled,product,min_order,label,note}` + `user.pendingGifts[]`;
   delivered পণ্যে প্রথম রিভিউতে gift grant; পরের অর্ডারের total ≥ min_order হলে ৳0 line auto যোগ +
   redeem; admin on/off সুইচ।
9. **R2-T9** মোবাইল হেডার: 3-dot ডানে, standalone search বাদ → search Offcanvas-এর ভিতরে;
   bottom-nav "Category" নতুন category-only `CategoryDrawer` খোলে (পুরো মেনু নয়)।

### Round 2 এ যোগ হওয়া নতুন ফাইল (মূল)

`src/assets/scss/components/_product-card-v2.scss`; `src/app/components/store/common/nav/`
→ `CartPopup.jsx`, `FloatingCartButton.jsx`, `CategoryDrawer.jsx`;
`src/app/components/store/auth/PasswordInput.jsx`; `src/app/utils/productCategory.js`;
`src/app/components/store/common/others/` → `StarRatingInput.jsx`, `ReviewReminderModal.jsx`,
`ReviewReminderTrigger.jsx`; `src/app/components/store/productDetails/ProductReviewForm.jsx`;
`scripts/dedupe-settings.js`।
`MainContextStore` নতুন: `cartPopup`, `openCategoryDrawer`, `reviewReminder`।
`user.model.js` নতুন: `pendingGifts[]`। `setting.home` নতুন: `review_gift_*`।

---

## Round 3 — Admin Product category/variant fix, deployed (`e2fa12d`)

- Coolify application `cd4godxzi52rqcngcpudbhfy` read-only inspect করা হয়েছে: running container-এর
  `NEXT_PUBLIC_BASE_URL` canonical HTTPS, attribute/category API `200`; production DB mutate করা হয়নি।
- Git history ও production log count দিয়ে root cause নিশ্চিত: create API শুরু থেকেই `{ product }`
  ফেরায়, কিন্তু combination create flow top-level `res.variants.map(...)` চালাত। Successful save-এর পরে
  client `TypeError` করত। এটি env failure নয়; migration-এর পরে পুরনো pathটি দৃশ্যমান হয়েছে।
- Combination selection এখন controlled: Generate/Clear-এর পরে visible option clear, attribute deselect-এ
  stale values remove, existing edit-এ attributes/options hydrate, regeneration duplicate skip করে।
- Category required; drawer reset-এ stale legacy category clear হয়। Attribute API empty/error হলে `[]`
  fallback হওয়ায় drawer crash করে না।
- Minimal Vitest + React Testing Library setup এবং ৭টি regression test যোগ হয়েছে। `npm test` ৭/৭ pass,
  `npm run lint` exit 0 (pre-existing warnings), `npm run build` successful (54/54 static pages)।
- Coolify application env secret-safeভাবে local `.env.local`-এ sync; original local file secure temp backup;
  `.env*.local` ignored এবং `.env.local` Git index থেকে untracked। Credential rotation করা হয়নি।
- Owner-only commit `e2fa12d` `main`-এ push হয়েছে; Coolify webhook `200` পেয়ে auto-deploy সম্পন্ন করেছে।
  Production container commit match, storefront/attribute/category endpoints `200`, relevant runtime error `0`।

---

## Round 4 — CPU / duplicate-request fix + security (2026-10-08)

কারণ (audit): প্রতিটা store page-এ Navbar/NavbarTop/Offcanvas/Footer/CategoryDrawer আলাদা করে
`/api/v1/store` (৪×, `no-store`) ও `/api/v1/categorys` (৪–৫×) আনত; কোনো public API-তে cache ছিল না
(প্রতি request = full-collection DB query); `product-details` নিজের API-কে HTTP-তে ডাকত; `useProducts`-এ race;
home-এ `ProductPrefetcher` পুরো product list আবার নামাত; tab focus-এ session refetch; home-এর Category
Swiper `loop` hydration mismatch করে পুরো page client-এ re-render করাত (production-এও ছিল)।

করা হয়েছে:
- `cachedData.js` shared server cache + সব write path-এ `revalidateTag`; public GET route-এর JSON production-এর
  সাথে byte-identical যাচাই করা।
- `sharedFetch.js` দিয়ে client-side dedupe; ProductModal শুধু open হলে fetch; session focus-refetch বন্ধ।
- Browser request (headless Chrome, mobile): product-details ১৫ → ৬, home ১১ → ৩; DB query প্রতি request-এর
  বদলে ৫ মিনিটে একবার/admin edit-এ; local API ~২ms; home HTML ৫২০KB → ৩১৬KB; home hydration error ০।
- DB: cached connection, Order index (`orderCode`, `user+createdAt`, `clientToken`, `createdAt`)।
- Security: user/order API staff/self-only, password কোনো response-এ নেই, `/admin` staff-only,
  order status PATCH staff-only, `getUserByEmail` "use server" থেকে সরানো।
- `robots.js` + `sitemap.js`; `next.config` cleanup (Next 15-only key বাদ, `remotePatterns`, error/warn log রাখা)।
- About page-এর সংখ্যা server-side `countDocuments` (আগে browser সব order/user নামাত)।
- Codex (read-only review) এর ৪টি finding fix করা হয়েছে।

VPS পর্যবেক্ষণ (2026-10-08): app container ~০.৬৫% CPU; সার্ভার load ৩৪–৩৯ (২ core), CPU steal ~৮৫%,
একসাথে ৩টি Coolify build (`coolify-helper`) চলছিল — slowness-এর মূল কারণ সার্ভার-স্তরে (build/অন্য app),
আমাদের app নয়।

## Round 5 — Admin "Edit Product" white screen + crash hardening (2026-10-10)

- কারণ: description editor (react-quill / Quill 1.3) কিছু saved description (২৫টির মধ্যে ১০টি) import করতে
  গিয়ে `IndexSizeError: splitText` দিত; react-quill এটা React commit-এর ভিতরে করত → পুরো admin page সাদা।
  এটি পুরনো bug (editor কোড শুরু থেকে অপরিবর্তিত), round 4-এর পরিবর্তন থেকে নয়।
- Fix: `DescriptionInput` এখন Quill সরাসরি চালায় (uncontrolled, product-প্রতি remount), import ব্যর্থ হলে
  DOM fallback; খালি description-এ আগের product-এর লেখা আর থেকে যায় না। Blog/Terms editor-এ
  `EditorErrorBoundary` (crash হলে HTML textarea)। `app/error.js` + ঠিক করা `global-error.js` — crash হলে সাদা
  page-এর বদলে "আবার চেষ্টা করুন"।
- Codex audit (`.codex-10`) + review (`.codex-2`, `.codex-9`) থেকে guard: product-details hook order,
  `image?.[0]`, wishlist localStorage parse, blog list, profile form, home featured brand/category,
  order search, tag parse, null variant।
- যাচাই: build/lint/test সবুজ; local production build-এ admin (auth বাদ দেওয়া throwaway copy) — আগে crash
  হওয়া product সহ edit drawer খোলে, description লোড হয়, typing চলে, product বদলালে সঠিক description,
  নতুন product-এ খালি।
- Deploy নিয়ম: প্রতি round-এ একবারই push (`AGENTS.md` + `.agent/DEPLOY_RULES.md`)।

## Round 6 — অর্ডার কনফার্মেশন ইমেইল + mail fix (2026-10-10)

- নতুন অর্ডার save হলে customer-কে বাংলা অর্ডার ইমেইল যায় (পণ্য, পরিমাণ, দাম, মোট, ঠিকানা, ইনভয়েস লিংক):
  `backend/utils/orderEmail.js` (`buildOrderEmail` + `sendOrderConfirmation`), `orders` POST থেকে background-এ
  — mail fail হলে order আটকায় না, শুধু `[mail]` error log। প্রাপক: checkout-এর email, খালি থাকলে
  লগইন করা user-এর account email; কোনোটাই না থাকলে পাঠানো হয় না। idempotent repeat (একই clientToken)-এ
  আবার যায় না।
- `backend/utils/mailer.js`: একটাই pooled Gmail transporter, `escapeHtml`, `isEmail`।
- Contact form (`recive-mail`) — `responseHeaders is not defined` crash ঠিক, HTML escape, visitor address `replyTo`-তে।
  Subscribe route-ও একই helper-এ। `send-email` route মুছে ফেলা হয়েছে (যে কেউ shop-এর Gmail দিয়ে যেকোনো
  ঠিকানায় mail পাঠাতে পারত; কোথাও ব্যবহার হতো না)।
- Env: client-এর নতুন Gmail App Password — `GMAIL_USER`/`GMAIL_PASSWORD` local `.env.local` + Coolify-তে
  বসানো (value শুধু `.agent/mehedi/private.md`-এ, repo-তে নয়)। SMTP login যাচাই হয়েছে।

## Round 7 — Product page: SEO URL + উপরের ফাঁকা জায়গা কমানো (2026-10-10)

- Product details-এর উপরের বড় "Product Details" banner বাদ, তার জায়গায় এক লাইনের breadcrumb
  (Home › Products › Category › Product); মোবাইলে product এখন header-এর ঠিক নিচ থেকে শুরু।
- URL: `/product-details/<URL path>` — ID নেই। প্রতিটা product-এর unique "URL path" (বাংলা+ইংরেজি)।
  Admin-এ "URL path" ফিল্ড + "Same as title" টিক (টিক দিলে title থেকে auto; না দিলে title বদলালেও URL একই)।
  ২৫টা product-এর URL title থেকে তৈরি (পুরনো slug backup: `.agent/mehedi/backups/product-slugs-before-*.json`)।
  পুরনো ID link ও পুরনো slug (cart/wishlist-এ জমা) 308 redirect হয়।
- Admin-এ product-প্রতি "SEO" অংশ: SEO title, SEO description, SEO keywords/tags (কমা দিলেই আলাদা chip);
  খালি থাকলে নাম/description ব্যবহার হয়।
- SEO: প্রতিটা product-এর আলাদা title/description/canonical/OG, Product + Breadcrumb schema, h1, sitemap-এ নতুন URL।
- Codex: `.codex-2` admin form, `.codex-8` server slug, `.codex-10` link audit, `.codex-9` final review।
- বাকি ঝুঁকি: একই মুহূর্তে দুইজন admin save করলে slug duplicate হতে পারে (unique DB index নেই)।

## Round 8 / Job C — Security hardening + template cleanup (2026-11-03)

- Products, categories, brands, attributes, blogs, coupons ও staff-এর সব mutation API এখন explicit staff
  session ছাড়া `401`; direct mutation/revalidation server action-ও নিজের ভিতরে session যাচাই করে। Guest order,
  signup, verified review, contact/subscribe mail ও auth exception অপরিবর্তিত; store settings আলাদা job-এর scope।
- Staff allow-list এখন শুধু `Admin`, `CEO`, `Manager`, `Super Admin`, `Accountant`; `Customer`, `Driver`,
  `Security Guard`, unknown/missing role admin access পায় না। API helper ও middleware—দুইটির regression test আছে।
- Seed endpoint ও শুধু seed-এ ব্যবহৃত demo data সরানো হয়েছে। অচল services/team/campaign/standalone wishlist,
  blog-grid, alternate shop-grid, sample home/about এবং admin test/coming-soon template code সরানো হয়েছে। Live
  My Account wishlist এবং product list-view-এর ব্যবহৃত `ProductListCard` রাখা হয়েছে।
- Template icon assets ও SCSS cleanup করা হয়েছে; review-তে ধরা About styles regression নিচের fix round-এ ঠিক হয়েছে।
- সব route-এ HSTS, SAMEORIGIN frame policy, `nosniff`, এবং strict-origin referrer policy যোগ হয়েছে।
- Category/coupon client controller আর missing `NEXT_PUBLIC_BASE_URL`-এ module import-এর সময় throw করে না;
  তাই env/DB ছাড়াও safe fallbacks দিয়ে production build শেষ হয়।

## Job C fix round — cleanup review (2026-11-03, local only)

- `_services.scss` থেকে মূল `.service-section` ও `.about-section` blocks হুবহু `_about.scss`-এ ফেরানো হয়েছে;
  অবশিষ্ট সব deleted selector `src`-তে খোঁজা হয়েছে। `AboutFeedback`-এ থাকা `.feedback-slider-2`-ও ফেরানো হয়েছে।
  `.faq-section`, `.service-nav`, `.download-box`, `.team-card`/children, `.wishlist-table`/children এবং
  `.stock-btn`-এর matching parent usage নেই; nested generic class অন্য parent-এ থাকায় সেই rules প্রযোজ্য নয়।
  Dark theme-এর removed wishlist selectors-ও একইভাবে unused। `npm run sass` দিয়ে `main.css` তৈরি, watcher বন্ধ।
- Staff list/detail GET এখন staff-only এবং `select("-password")`; detail-এর undefined `Staff` বদলে সঠিক
  `User` model। অন্য API/action user reads audit হয়েছে: existing user reads password বাদ দেয়; signup
  success response থেকেও password বাদ দেওয়া হয়েছে। Unused unrestricted `user.action.js` মুছে ফেলা হয়েছে।
- Staff create শুধু Admin/CEO; staff PATCH, `staffUpdate` ও user PATCH-এ অন্য role-এর role change 403।
  একই role পাঠিয়ে normal edit চলবে। `staffUpdate` routes-এর মতো `User` model ব্যবহার করে।
- HSTS-এ `max-age=31536000` রাখা, `includeSubDomains` বাদ।
- Route regression tests: anonymous product write 401 ও input/DB/cache untouched, staff write save/cache
  invalidation; staff GET guard/projection; privileged/non-privileged role changes।
- Local verification: lint exit 0 (existing warnings), single-thread Vitest 69/69 pass, production build exit 0
  (46/46 static pages; MONGODB_URI unset, expected DB fallback errors)। Local `next start`-এ `/about` 200,
  anonymous staff list/detail GET ও product POST 401; চারটিতেই HSTS max-age only। Production-mode auth
  smoke-এ শুধু command-scoped dummy NEXTAUTH_SECRET/NEXTAUTH_URL ব্যবহার হয়েছে; কোনো env file বানানো হয়নি।
  Server/watcher বন্ধ; production DB/server ছোঁয়া হয়নি; কোনো push করা হয়নি।
- MANUAL VERIFY: mobile আগে, desktop পরে `/about` spacing/decorations; Admin/CEO staff create/role edit,
  Manager/Accountant-এর normal edit/status এবং forbidden role edit UI।

## এখন কী বাকি

- **বর্তমান Job B review follow-ups:** সাতটি finding ঠিক করা হয়েছে; একটিমাত্র নতুন local commit, push নয়।
  Job A-এর settings/admin integration ও বাস্তব data দিয়ে manual verification বাকি।

- **Round 7 যাচাই:** live-এ কয়েকটা product খুলে URL/breadcrumb দেখা; Google Search Console-এ sitemap আবার submit।

- **Round 6 যাচাই:** live-এ email দিয়ে একটা test order → inbox/spam-এ অর্ডার ইমেইল আসে কিনা; Contact form থেকে একটা message।

- **ম্যানুয়াল যাচাই:** Admin > Product-এ category select, নতুন combination create, Generate-এর পরে
  selector clear, existing variant product edit/hydration, deselect/regenerate এবং duplicate না হওয়া।
- **ক্লায়েন্ট/মালিকের ম্যানুয়াল যাচাই** (মোবাইল ও ডেস্কটপ দুটোতেই): browser/session-নির্ভর জিনিসগুলো —
  নতুন card layout, cart popup, slider button live update,
  password eye toggle, multi-category page, review form + reminder + gift redemption।
- **সার্ভার:** Coolify-তে আটকে থাকা deployment cancel; server-এর concurrent build ১-এ নামানো; provider-এর
  CPU steal/throttle যাচাই; অন্য AI-এর push কমানো।
- Round 4 ম্যানুয়াল যাচাই: admin-এ category/brand/product/settings edit → storefront-এ সাথে সাথে দেখা যায়;
  লগইন করা customer-এর my-account/order history/checkout ঠিক; admin customers/orders page ঠিক।
- `/products` grid এখনো client-side filter। Store-settings write guard আলাদা multi-store job-এর scope।
- **মালিকের সিদ্ধান্ত (2026-10-08):** password যেমন আছে (plaintext) তেমনই থাকবে — hashing/migration
  প্রস্তাব বা পরিবর্তন করা হবে না।
- পুরনো: production DB-তে পুরনো duplicate `Setting` doc থাকলে একবার
  `MONGODB_URI="<prod-uri>" node scripts/dedupe-settings.js` চালাতে হবে (`Setting.name` unique
  index কার্যকর করতে)। duplicate না থাকলে কিছু করার দরকার নেই।
- ক্লায়েন্ট feedback এলে → পরের রাউন্ডের scope ঠিক করে এই ফাইল হালনাগাদ।
