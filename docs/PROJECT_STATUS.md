# PROJECT STATUS — Shera Organic Storefront

> এটি প্রজেক্টের **চলমান মেমোরি** (repo-এর ভিতরেই, git-এ tracked, তাই যেকোনো কম্পিউটার থেকে
> এবং যেকোনো AI session — Codex / Claude / অন্য — সরাসরি পড়তে পারবে)।
>
> **নিয়ম:** প্রতিটি কাজের রাউন্ড শেষে এই ফাইল **হালনাগাদ** করতে হবে — পুরনো/অপ্রাসঙ্গিক
> অংশ **মুছে নতুন অবস্থা লেখো** (শুধু নিচে যোগ করে যেয়ো না)। আর্কিটেকচার / convention /
> gotcha বদলালে `AGENTS.md`-ও একই ভাবে হালনাগাদ করো। machine-local (`~/.claude`) মেমোরিতে
> এই প্রজেক্টের কিছু আলাদা করে রাখা হয় না — সব knowledge এখানেই।

শেষ হালনাগাদ: 2026-09-01

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

Round-2 verify checklist: `plan/client-check-list.md`।

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

## এখন কী বাকি

- **ক্লায়েন্ট/মালিকের ম্যানুয়াল যাচাই** (`plan/client-check-list.md` — মোবাইল ও ডেস্কটপ দুটোতেই):
  browser/session-নির্ভর জিনিসগুলো — নতুন card layout, cart popup, slider button live update,
  password eye toggle, multi-category page, review form + reminder + gift redemption।
- Vercel deploy-এর পর: production DB-তে পুরনো duplicate `Setting` doc থাকলে একবার
  `MONGODB_URI="<prod-uri>" node scripts/dedupe-settings.js` চালাতে হবে (`Setting.name` unique
  index কার্যকর করতে)। duplicate না থাকলে কিছু করার দরকার নেই।
- ক্লায়েন্ট feedback এলে → পরের রাউন্ড: `plan/implementation-plan.md` নতুন করে লেখা, এই ফাইল হালনাগাদ।
