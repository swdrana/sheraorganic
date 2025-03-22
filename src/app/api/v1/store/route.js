import Setting from "@/app/backend/model/setting.model";
import connectDB from "@/app/utils/database";
import { NextResponse } from "next/server";

// get all orders
export const GET = async () => {
  connectDB();
  try {
    // get orders from the server
    const storeCustomizationSetting = await Setting.findOne({
      name: "storeCustomizationSetting",
    });

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
    const newStoreCustomizationSetting = new Setting(data);
    const storeCustomizationSetting = await newStoreCustomizationSetting.save();
    return NextResponse.json({ message: "store customization" });
  } catch (error) {
    return NextResponse.json({ message: "error", error });
  }
};

export const PATCH = async (req) => {
  connectDB();
  const data = await req.json();
  const { setting } = data;
  console.log("setting in store route=========", setting);
  try {
    const storeCustomizationSetting = await Setting.findOneAndUpdate(
      {
        name: "storeCustomizationSetting",
      },
      {
        $set: {
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

          "setting.home.slider_two_description":
            setting?.home?.slider_two_description,
          "setting.home.slider_two_subtitle":
            setting?.home?.slider_two_subtitle,
          "setting.home.slider_two_title": setting?.home?.slider_two_title,
          "setting.home.slider_two_img": setting?.home?.slider_two_img,

          "setting.home.slider_three_description":
            setting?.home?.slider_three_description,
          "setting.home.slider_three_subtitle":
            setting?.home?.slider_three_subtitle,
          "setting.home.slider_three_title": setting?.home?.slider_three_title,
          "setting.home.slider_three_img": setting?.home?.slider_three_img,

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
      }
    );
    return NextResponse.json({
      message: "store customization update successfully-2",
    });
  } catch (error) {
    console.log("error in store customization patch", error);
    return NextResponse.json({ message: "error", error });
  }
};
