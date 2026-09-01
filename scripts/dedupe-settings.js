const mongoose = require("mongoose");

const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error("Set MONGODB_URI (or MONGO_URI) before running this script.");
}

async function dedupeSettings() {
  await mongoose.connect(mongoUri);
  const collection = mongoose.connection.collection("settings");
  const documents = await collection
    .find({ name: "storeCustomizationSetting" })
    .sort({ createdAt: 1, _id: 1 })
    .toArray();

  if (documents.length <= 1) {
    console.log("No duplicate store customization settings found.");
    return;
  }

  const duplicateIds = documents.slice(1).map((document) => document._id);
  const result = await collection.deleteMany({ _id: { $in: duplicateIds } });
  console.log(`Removed ${result.deletedCount} duplicate setting document(s).`);
}

dedupeSettings()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
