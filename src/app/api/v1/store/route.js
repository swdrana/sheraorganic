import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { isStaff, unauthorized } from "@/app/backend/utils/apiAuth";
import { settingsUpdate, SettingsValidationError } from "@/app/utils/storeSettings";
import Setting from "@/app/backend/model/setting.model";
import connectDB from "@/app/utils/database";
import { NextResponse } from "next/server";
import { destroyImages, diffRemoved } from "@/app/backend/utils/cloudinaryServer";
import { revalidatePath, revalidateTag } from "next/cache";
import { getCachedSettingDoc } from "@/app/data/cachedData";

const revalidateSettings = () => {
  revalidateTag("settings");
  revalidatePath("/", "layout");
  revalidatePath("/about");
  revalidatePath("/contact");
  revalidatePath("/terms-condition");
};

const homeImageKeys = [
  "logo",
  "footer_logo",
  "footer_payment_incon_one",
  "footer_payment_incon_two",
  "footer_payment_incon_three",
  "footer_payment_incon_four",
  "slider_one_img",
  "slider_two_img",
  "slider_three_img",
  "feature_brand_banner_img",
  "home_banner_one_img",
  "home_banner_two_img",
  "weekly_best_deals_img",
  "client_one_img",
  "client_two_img",
  "client_three_img",
  "client_four_img",
  "client_five_img",
];
const aboutImageKeys = [
  "about_top_img",
  "our_work_ability_img",
  "why_choose_img",
  "about_banner_img",
];

// get all orders
export const GET = async () => {
  try {
    // served from the shared data cache; POST/PATCH call revalidateSettings()
    const storeCustomizationSetting = await getCachedSettingDoc();

    return NextResponse.json(
      { message: "successfully get all settings", storeCustomizationSetting },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "testing backend", error },
      { status: 404 }
    );
  }
};

// Creation and updates intentionally share exactly the same allow-list/auth path.
async function saveSettings(req) {
  const session = await getServerSession(authOptions);
  if (!isStaff(session)) return unauthorized();
  try {
    const { setting } = await req.json();
    if (!setting || typeof setting !== "object" || Array.isArray(setting)) {
      return NextResponse.json({ message: "Invalid settings" }, { status: 400 });
    }
    const $set = settingsUpdate(setting);
    await connectDB();
    const previousSetting = await Setting.findOne({ name: "storeCustomizationSetting" }).sort({ createdAt: 1 });
    await Setting.findOneAndUpdate(
      { name: "storeCustomizationSetting" },
      { $set },
      { new: true, upsert: true, setDefaultsOnInsert: true, sort: { createdAt: 1 } }
    );
    // Only delete an image when its leaf was explicitly replaced, not on an unrelated tab save.
    const imagePaths = [
      ...homeImageKeys.map((key) => `home.${key}`),
      ...aboutImageKeys.map((key) => `about.${key}`),
      "home.favicon", "brand.og_image", "brand.product_sidebar_banner_img",
    ];
    const removed = imagePaths.flatMap((path) => {
      if (!Object.hasOwn($set, `setting.${path}`)) return [];
      const [group, key] = path.split(".");
      return diffRemoved(previousSetting?.setting?.[group]?.[key], $set[`setting.${path}`]);
    });
    void destroyImages(removed);
    revalidateSettings();
    return NextResponse.json({ message: "store customization saved" });
  } catch (error) {
    if (error instanceof SettingsValidationError) {
      return NextResponse.json({ message: error.message, invalidFields: error.fields }, { status: 400 });
    }
    console.error("[settings] save failed:", error);
    return NextResponse.json({ message: "Unable to save settings" }, { status: 500 });
  }
}
export const POST = saveSettings;
export const PATCH = saveSettings;
