// Give every product a unique URL path (`slug`) generated from its title.
//
//   MONGODB_URI=... node scripts/generate-product-slugs.mjs                 # dry run: prints the plan
//   MONGODB_URI=... node scripts/generate-product-slugs.mjs --apply out.json # backs up old slugs to out.json, then writes
//
// Older products keep the plain slug; a later duplicate title gets -2, -3, ... Only `slug` and
// `slugHistory` change.
import fs from "node:fs";
import mongoose from "mongoose";
import { slugify, uniqueSlug } from "../src/app/utils/productUrl.js";

const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
if (!mongoUri) throw new Error("Set MONGODB_URI (or MONGO_URI) before running this script.");

const apply = process.argv.includes("--apply");
const backupPath = process.argv[process.argv.indexOf("--apply") + 1];
if (apply && (!backupPath || backupPath.startsWith("--"))) {
  throw new Error("--apply needs a backup file path, e.g. --apply product-slugs-backup.json");
}

await mongoose.connect(mongoUri);
const collection = mongoose.connection.collection("products");
const products = await collection
  .find({}, { projection: { name: 1, slug: 1, createdAt: 1 } })
  .sort({ createdAt: 1, _id: 1 })
  .toArray();

const taken = [];
const plan = products.map((product) => {
  const next = uniqueSlug(slugify(product.name) || product.slug, taken);
  taken.push(next);
  return { _id: product._id, name: product.name, old: product.slug, next };
});

for (const row of plan) {
  console.log(`${row.old === row.next ? "  same " : "change "} ${row._id}  ${row.old ?? ""}  ->  ${row.next}`);
}
console.log(`${plan.filter((row) => row.old !== row.next).length} of ${plan.length} products change.`);

if (apply) {
  fs.writeFileSync(backupPath, JSON.stringify(plan.map(({ _id, name, old }) => ({ _id, name, slug: old })), null, 2), {
    mode: 0o600,
  });
  console.log(`Backup of old slugs written to ${backupPath}`);
  // Old slugs go to slugHistory so saved links redirect; a slug shared by several products is
  // ambiguous and is skipped (those links fall back to the id).
  const oldCounts = {};
  for (const row of plan) {
    const old = slugify(row.old);
    if (old) oldCounts[old] = (oldCounts[old] || 0) + 1;
  }
  const nextSlugs = new Set(plan.map((row) => row.next));
  const ops = plan
    .filter((row) => row.old !== row.next)
    .map((row) => {
      const old = slugify(row.old);
      const keep = old && oldCounts[old] === 1 && !nextSlugs.has(old);
      return {
        updateOne: {
          filter: { _id: row._id },
          update: { $set: { slug: row.next }, ...(keep ? { $addToSet: { slugHistory: old } } : {}) },
        },
      };
    });
  if (ops.length) {
    const result = await collection.bulkWrite(ops);
    console.log(`Updated ${result.modifiedCount} product(s).`);
  }
} else {
  console.log("Dry run only. Re-run with --apply <backup.json> to write.");
}

await mongoose.disconnect();
