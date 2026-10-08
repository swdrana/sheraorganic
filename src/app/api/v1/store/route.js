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

export const POST = async (req) => {
  connectDB();
  const data = await req.json();
  // console.log("setting data", data);
  try {
    await Setting.findOneAndUpdate(
      { name: "storeCustomizationSetting" },
      { $set: { ...data, name: "storeCustomizationSetting" } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    revalidateSettings();
    return NextResponse.json({ message: "store customization saved" });
  } catch (error) {
    return NextResponse.json({ message: "error", error });
  }
};

export const PATCH = async (req) => {
  connectDB();
  const data = await req.json();
  const { setting } = data;
  try {
    const previousSetting = await Setting.findOne({
      name: "storeCustomizationSetting",
    }).sort({ createdAt: 1 });
    await Setting.findOneAndUpdate(
      {
        name: "storeCustomizationSetting",
      },
      {
        $set: {
          name: "storeCustomizationSetting",
          // contact us
          "setting.contact.contact_office_address_one":
            setting?.contact?.contact_office_address_one,
          "setting.contact.contact_office_address_two":
            setting?.contact?.contact_office_address_two,
          "setting.contact.contact_emergency_call":
            setting?.contact?.contact_emergency_call,
          "setting.contact.contact_general_comunication":
            setting?.contact?.contact_general_comunication,

          // about top
          "setting.about.about_top_img": setting?.about?.about_top_img,
          "setting.about.about_top_quotes": setting?.about?.about_top_quotes,
          "setting.about.about_top_sub_title":
            setting?.about?.about_top_sub_title,
          "setting.about.about_top_title": setting?.about?.about_top_title,
          "setting.about.about_top_description":
            setting?.about?.about_top_description,
          "setting.about.about_top_mission": setting?.about?.about_top_mission,
          "setting.about.about_top_vision": setting?.about?.about_top_vision,
          "setting.about.about_top_mission_title":
            setting?.about?.about_top_mission_title,
          "setting.about.about_top_vision_title":
            setting?.about?.about_top_vision_title,
          "setting.about.about_top_brand_title":
            setting?.about?.about_top_brand_title,

          "setting.about.our_work_ability_title":
            setting?.about?.our_work_ability_title,
          "setting.about.our_work_ability_des":
            setting?.about?.our_work_ability_des,
          "setting.about.our_work_ability_img":
            setting?.about?.our_work_ability_img,

          // about-why-choose
          "setting.about.why_choose_img": setting?.about?.why_choose_img,
          "setting.about.why_choose_us_sub_title":
            setting?.about?.why_choose_us_sub_title,
          "setting.about.why_choose_us_title":
            setting?.about?.why_choose_us_title,
          "setting.about.why_choose_us_description":
            setting?.about?.why_choose_us_description,

          "setting.about.why_choose_one_title":
            setting?.about?.why_choose_one_title,
          "setting.about.why_choose_one_des":
            setting?.about?.why_choose_one_des,

          "setting.about.why_choose_two_title":
            setting?.about?.why_choose_two_title,
          "setting.about.why_choose_two_des":
            setting?.about?.why_choose_two_des,

          "setting.about.why_choose_three_title":
            setting?.about?.why_choose_three_title,
          "setting.about.why_choose_three_des":
            setting?.about?.why_choose_three_des,

          "setting.about.why_choose_four_title":
            setting?.about?.why_choose_four_title,
          "setting.about.why_choose_four_des":
            setting?.about?.why_choose_four_des,

          // about-banner
          "setting.about.about_banner_title":
            setting?.about?.about_banner_title,
          "setting.about.about_banner_des": setting?.about?.about_banner_des,
          "setting.about.about_banner_img": setting?.about?.about_banner_img,

          // Terms and conditions
          "setting.terms.value": setting?.terms?.value,

          // Navbar
          "setting.home.store_title": setting?.home?.store_title,
          "setting.home.gmail": setting?.home?.gmail,
          "setting.home.address": setting?.home?.address,
          "setting.home.phone": setting?.home?.phone,
          "setting.home.logo": setting?.home?.logo,
          "setting.home.favicon": setting?.home?.favIcon,

          "setting.home.footer_title": setting?.home?.footer_title,
          "setting.home.footer_copy_right": setting?.home?.footer_copy_right,
          "setting.home.footer_logo": setting?.home?.footer_logo,
          "setting.home.footer_payment_incon_one":
            setting?.home?.footer_payment_incon_one,
          "setting.home.footer_payment_incon_two":
            setting?.home?.footer_payment_incon_two,
          "setting.home.footer_payment_incon_three":
            setting?.home?.footer_payment_incon_three,
          "setting.home.footer_payment_incon_four":
            setting?.home?.footer_payment_incon_four,

          // social link
          "setting.home.hero_facebook_link": setting?.home?.hero_facebook_link,
          "setting.home.hero_youtube_link": setting?.home?.hero_youtube_link,
          "setting.home.hero_twitter_link": setting?.home?.hero_twitter_link,
          "setting.home.hero_linkdin_link": setting?.home?.hero_linkdin_link,

          // Main slider
          "setting.home.slider_one_description":
            setting?.home?.slider_one_description,
          "setting.home.slider_one_subtitle":
            setting?.home?.slider_one_subtitle,
          "setting.home.slider_one_title": setting?.home?.slider_one_title,
          "setting.home.slider_one_img": setting?.home?.slider_one_img,
          "setting.home.slider_one_btn_one_text": setting?.home?.slider_one_btn_one_text,
          "setting.home.slider_one_btn_one_link": setting?.home?.slider_one_btn_one_link,
          "setting.home.slider_one_btn_one_show": setting?.home?.slider_one_btn_one_show,
          "setting.home.slider_one_btn_two_text": setting?.home?.slider_one_btn_two_text,
          "setting.home.slider_one_btn_two_link": setting?.home?.slider_one_btn_two_link,
          "setting.home.slider_one_btn_two_show": setting?.home?.slider_one_btn_two_show,

          "setting.home.slider_two_description":
            setting?.home?.slider_two_description,
          "setting.home.slider_two_subtitle":
            setting?.home?.slider_two_subtitle,
          "setting.home.slider_two_title": setting?.home?.slider_two_title,
          "setting.home.slider_two_img": setting?.home?.slider_two_img,
          "setting.home.slider_two_btn_one_text": setting?.home?.slider_two_btn_one_text,
          "setting.home.slider_two_btn_one_link": setting?.home?.slider_two_btn_one_link,
          "setting.home.slider_two_btn_one_show": setting?.home?.slider_two_btn_one_show,
          "setting.home.slider_two_btn_two_text": setting?.home?.slider_two_btn_two_text,
          "setting.home.slider_two_btn_two_link": setting?.home?.slider_two_btn_two_link,
          "setting.home.slider_two_btn_two_show": setting?.home?.slider_two_btn_two_show,

          "setting.home.slider_three_description":
            setting?.home?.slider_three_description,
          "setting.home.slider_three_subtitle":
            setting?.home?.slider_three_subtitle,
          "setting.home.slider_three_title": setting?.home?.slider_three_title,
          "setting.home.slider_three_img": setting?.home?.slider_three_img,
          "setting.home.slider_three_btn_one_text": setting?.home?.slider_three_btn_one_text,
          "setting.home.slider_three_btn_one_link": setting?.home?.slider_three_btn_one_link,
          "setting.home.slider_three_btn_one_show": setting?.home?.slider_three_btn_one_show,
          "setting.home.slider_three_btn_two_text": setting?.home?.slider_three_btn_two_text,
          "setting.home.slider_three_btn_two_link": setting?.home?.slider_three_btn_two_link,
          "setting.home.slider_three_btn_two_show": setting?.home?.slider_three_btn_two_show,

          // Featured brand
          "setting.home.featured_brand_title":
            setting?.home?.featured_brand_title,
          "setting.home.featured_brand_description":
            setting?.home?.featured_brand_description,
          "setting.home.featured_brand_one": setting?.home?.featured_brand_one,
          "setting.home.featured_brand_two": setting?.home?.featured_brand_two,

          "setting.home.featured_brand_banner_sub_title":
            setting?.home?.featured_brand_banner_sub_title,
          "setting.home.featured_brand_banner_title":
            setting?.home?.featured_brand_banner_title,
          "setting.home.featured_brand_banner_description":
            setting?.home?.featured_brand_banner_description,
          "setting.home.feature_brand_banner_img":
            setting?.home?.feature_brand_banner_img,

          // Top trending product
          "setting.home.featured_trending_product_title":
            setting?.home?.featured_trending_product_title,
          "setting.home.featured_category_one":
            setting?.home?.featured_category_one,
          "setting.home.featured_category_two":
            setting?.home?.featured_category_two,
          "setting.home.featured_category_three":
            setting?.home?.featured_category_three,
          "setting.home.featured_category_four":
            setting?.home?.featured_category_four,
          "setting.home.featured_category_five":
            setting?.home?.featured_category_five,

          // BANNER one
          "setting.home.hone_banner_one_title":
            setting?.home?.hone_banner_one_title,
          "setting.home.hone_banner_one_des":
            setting?.home?.hone_banner_one_des,
          "setting.home.home_banner_one_img":
            setting?.home?.home_banner_one_img,

          "setting.home.hone_banner_two_title":
            setting?.home?.hone_banner_two_title,
          "setting.home.hone_banner_two_des":
            setting?.home?.hone_banner_two_des,
          "setting.home.home_banner_two_img":
            setting?.home?.home_banner_two_img,

          // Weekly best deals
          "setting.home.weekly_best_deals_end_time":
            setting?.home?.weekly_best_deals_end_time,
          "setting.home.weekly_best_deals_title":
            setting?.home?.weekly_best_deals_title,
          "setting.home.weekly_best_deals_banner_title":
            setting?.home?.weekly_best_deals_banner_title,
          "setting.home.weekly_best_deals_sub_title":
            setting?.home?.weekly_best_deals_sub_title,
          "setting.home.weekly_best_deals_offer_title":
            setting?.home?.weekly_best_deals_offer_title,
          "setting.home.weekly_best_deals_img":
            setting?.home?.weekly_best_deals_img,
          "setting.home.weekly_best_delas_product_one":
            setting?.home?.weekly_best_delas_product_one,
          "setting.home.weekly_best_delas_product_two":
            setting?.home?.weekly_best_delas_product_two,
          "setting.home.weekly_best_delas_product_three":
            setting?.home?.weekly_best_delas_product_three,
          "setting.home.weekly_best_delas_product_four":
            setting?.home?.weekly_best_delas_product_four,
          "setting.home.review_gift_enabled":
            setting?.home?.review_gift_enabled,
          "setting.home.review_gift_product":
            setting?.home?.review_gift_product,
          "setting.home.review_gift_min_order":
            setting?.home?.review_gift_min_order,
          "setting.home.review_gift_label": setting?.home?.review_gift_label,
          "setting.home.review_gift_note": setting?.home?.review_gift_note,

          // Our client say
          "setting.home.our_client_say_title":
            setting?.home?.our_client_say_title,
          "setting.home.client_one_name": setting?.home?.client_one_name,
          "setting.home.client_one_img": setting?.home?.client_one_img,
          "setting.home.client_one_comment": setting?.home?.client_one_comment,
          "setting.home.client_two_name": setting?.home?.client_two_name,
          "setting.home.client_two_img": setting?.home?.client_two_img,
          "setting.home.client_two_comment": setting?.home?.client_two_comment,
          "setting.home.client_three_name": setting?.home?.client_three_name,
          "setting.home.client_three_img": setting?.home?.client_three_img,
          "setting.home.client_three_comment":
            setting?.home?.client_three_comment,
          "setting.home.client_four_name": setting?.home?.client_four_name,
          "setting.home.client_four_img": setting?.home?.client_four_img,
          "setting.home.client_four_comment":
            setting?.home?.client_four_comment,
          "setting.home.client_five_name": setting?.home?.client_five_name,
          "setting.home.client_five_img": setting?.home?.client_five_img,
          "setting.home.client_five_comment":
            setting?.home?.client_five_comment,
        },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );
    const removedImages = [
      ...homeImageKeys.flatMap((key) =>
        diffRemoved(
          previousSetting?.setting?.home?.[key],
          setting?.home?.[key]
        )
      ),
      ...aboutImageKeys.flatMap((key) =>
        diffRemoved(
          previousSetting?.setting?.about?.[key],
          setting?.about?.[key]
        )
      ),
      ...diffRemoved(
        previousSetting?.setting?.home?.favicon,
        setting?.home?.favIcon
      ),
    ];
    void destroyImages(removedImages);
    revalidateSettings();
    return NextResponse.json({
      message: "store customization update successfully-2",
    });
  } catch (error) {
    console.log("error in store customization patch", error);
    return NextResponse.json({ message: "error", error });
  }
};
