import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { notifyError, notifySuccess } from "../utils/toast";
import {
  addStoreCustomizationSetting,
  getStoreCustomizationSetting,
  updateStoreCustomizationSetting,
} from "../backend/controllers/storecustomize.controller";

const useStoreCustomize = () => {
  // feature brand product
  const [featureBrandOne, setFeatureBrandOne] = useState("");
  const [featureBrandTwo, setFeatureBrandTwo] = useState("");
  // feature brand product
  const [isUpdate, setIsUpdate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSave, setIsSave] = useState(true);
  const [featureBandBannerImg, setFeatureBandBannerImg] = useState("");

  // navbar
  const [logo, setLogo] = useState("");
  const [favIcon, setFavIcon] = useState("");

  // footer
  const [footerLogo, setFooterLogo] = useState("");
  const [footerPaymentIconOne, setFooterPaymentIconOne] = useState("");
  const [footerPaymentIconTwo, setFooterPaymentIconTwo] = useState("");
  const [footerPaymentIconThree, setFooterPaymentIconThree] = useState("");
  const [footerPaymentIconFour, setFooterPaymentIconFour] = useState("");
  const [footerPaymentIconFive, setFooterPaymentIconFive] = useState("");

  // main slider
  const [sliderImageOne, setSliderImageOne] = useState("");
  const [sliderImageTwo, setSliderImageTwo] = useState("");
  const [sliderImageThree, setSliderImageThree] = useState("");

  // feature top tranding producut (category)
  const [featureCategoryOne, setFeatureCategoryOne] = useState("");
  const [featureCategoryTwo, setFeatureCategoryTwo] = useState("");
  const [featureCategoryThree, setFeatureCategoryThree] = useState("");
  const [featureCategoryFour, setFeatureCategoryFour] = useState("");
  const [featureCategoryFive, setFeatureCategoryFive] = useState("");

  // weekly best deals product
  const [weeklyBestDealsImg, setweeklyBestDealsImg] = useState({});
  const [weeklyBestDealsOne, setweeklyBestDealsOne] = useState({});
  const [weeklyBestDealsTwo, setweeklyBestDealsTwo] = useState({});
  const [weeklyBestDealsThree, setweeklyBestDealsThree] = useState({});
  const [weeklyBestDealsFour, setweeklyBestDealsFour] = useState({});

  // HOME banner
  const [homeBannerOneImg, setHomeBannerOneImg] = useState("");
  const [homeBannerTwoImg, setHomeBannerTwoImg] = useState("");

  // our client say
  const [clientOneImg, setClientOneImg] = useState("");
  const [clientTwoImg, setClientTwoImg] = useState("");
  const [clientThreeImg, setClientThreeImg] = useState("");
  const [clientFourImg, setClientFourImg] = useState("");
  const [clientFiveImg, setClientFiveImg] = useState("");

  // terms and condition
  const [termsValue, setTermsValue] = useState("");

  // about us
  const [aboutTopImg, setAboutTopImg] = useState("");
  const [aboutOurWorkAbilityImg, setAboutOurWorkAbilityImg] = useState("");
  const [aboutWhyChooseImg, setAboutWhyChooseImg] = useState("");
  const [aboutBannerImg, setAboutBannerImg] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log("data..in store customizat....", data);
    try {
      const storeCustomizationSettingData = {
        name: "storeCustomizationSetting",
        setting: {
          home: {
            // navbar
            logo: logo,
            favIcon: favIcon,
            store_title: data.store_title,
            phone: data.phone,
            gmail: data.gmail,
            address: data.address,

            // footer
            footer_title: data.footer_title,
            footer_copy_right: data.footer_copy_right,
            footer_logo: footerLogo,
            footer_payment_incon_one: footerPaymentIconOne,
            footer_payment_incon_two: footerPaymentIconTwo,
            footer_payment_incon_three: footerPaymentIconThree,
            footer_payment_incon_four: footerPaymentIconFour,

            // hero-social link
            hero_facebook_link: data.hero_facebook_link,
            hero_youtube_link: data.hero_youtube_link,
            hero_twitter_link: data.hero_twitter_link,
            hero_linkdin_link: data.hero_linkdin_link,

            // main slider
            slider_one_description: data.slider_one_description,
            slider_one_subtitle: data.slider_one_subtitle,
            slider_one_title: data.slider_one_title,
            slider_one_img: sliderImageOne,

            slider_two_description: data.slider_two_description,
            slider_two_subtitle: data.slider_two_subtitle,
            slider_two_title: data.slider_two_title,
            slider_two_img: sliderImageTwo,

            slider_three_description: data.slider_three_description,
            slider_three_subtitle: data.slider_three_subtitle,
            slider_three_title: data.slider_three_title,
            slider_three_img: sliderImageThree,

            // feature brand product
            featured_brand_title: data.featured_brand_title,
            featured_brand_description: data.featured_brand_description,
            featured_brand_one: featureBrandOne,
            featured_brand_two: featureBrandTwo,

            featured_brand_banner_sub_title:
              data.featured_brand_banner_sub_title,
            featured_brand_banner_title: data.featured_brand_banner_title,
            featured_brand_banner_description:
              data.featured_brand_banner_description,
            feature_brand_banner_img: featureBandBannerImg,

            // top trending product
            featured_trending_product_title:
              data.featured_trending_product_title,
            featured_category_one: featureCategoryOne,
            featured_category_two: featureCategoryTwo,
            featured_category_three: featureCategoryThree,
            featured_category_four: featureCategoryFour,
            featured_category_five: featureCategoryFive,

            // banner-1
            hone_banner_one_title: data.hone_banner_one_title,
            hone_banner_one_des: data.hone_banner_one_des,
            home_banner_one_img: homeBannerOneImg,

            hone_banner_two_title: data.hone_banner_two_title,
            hone_banner_two_des: data.hone_banner_two_des,
            home_banner_two_img: homeBannerTwoImg,

            // weekly best deals
            weekly_best_deals_end_time: data.weekly_best_deals_end_time,
            weekly_best_deals_title: data.weekly_best_deals_title,
            weekly_best_deals_banner_title: data.weekly_best_deals_banner_title,
            weekly_best_deals_sub_title: data.weekly_best_deals_sub_title,
            weekly_best_deals_offer_title: data.weekly_best_deals_offer_title,
            weekly_best_deals_img: weeklyBestDealsImg,
            weekly_best_delas_product_one: weeklyBestDealsOne,
            weekly_best_delas_product_two: weeklyBestDealsTwo,
            weekly_best_delas_product_three: weeklyBestDealsThree,
            weekly_best_delas_product_four: weeklyBestDealsFour,

            // our client say
            our_client_say_title: data.our_client_say_title,

            client_one_name: data.client_one_name,
            client_one_img: clientOneImg,
            client_one_comment: data.client_one_comment,

            client_two_name: data.client_two_name,
            client_two_img: clientTwoImg,
            client_two_comment: data.client_two_comment,

            client_three_name: data.client_three_name,
            client_three_img: clientThreeImg,
            client_three_comment: data.client_three_comment,

            client_four_name: data.client_four_name,
            client_four_img: clientFourImg,
            client_four_comment: data.client_four_comment,

            client_five_name: data.client_five_name,
            client_five_img: clientFiveImg,
            client_five_comment: data.client_five_comment,
          },
          about: {
            about_top_img: aboutTopImg,
            about_top_quotes: data.about_top_quotes,
            about_top_sub_title: data.about_top_sub_title,
            about_top_title: data.about_top_title,
            about_top_description: data.about_top_description,
            about_top_mission: data.about_top_mission,
            about_top_vision: data.about_top_vision,
            about_top_mission_title: data.about_top_mission_title,
            about_top_vision_title: data.about_top_vision_title,
            about_top_brand_title: data.about_top_brand_title,
            // word ability
            our_work_ability_title: data.our_work_ability_title,
            our_work_ability_des: data.our_work_ability_des,
            our_work_ability_img: aboutOurWorkAbilityImg,

            // WHY CHOSE US
            why_choose_img: aboutWhyChooseImg,
            why_choose_us_sub_title: data.why_choose_us_sub_title,
            why_choose_us_title: data.why_choose_us_title,
            why_choose_us_description: data.why_choose_us_description,

            why_choose_one_title: data.why_choose_one_title,
            why_choose_one_des: data.why_choose_one_des,
            why_choose_two_title: data.why_choose_two_title,
            why_choose_two_des: data.why_choose_two_des,
            why_choose_three_title: data.why_choose_three_title,
            why_choose_three_des: data.why_choose_three_des,
            why_choose_four_title: data.why_choose_four_title,
            why_choose_four_des: data.why_choose_four_des,

            // banner
            about_banner_title: data.about_banner_title,
            about_banner_des: data.about_banner_des,
            about_banner_img: aboutBannerImg,
          },
          contact: {
            contact_office_address_one: data.contact_office_address_one,
            contact_office_address_two: data.contact_office_address_two,
            contact_emergency_call: data.contact_emergency_call,
            contact_general_comunication: data.contact_general_comunication,
          },
        },
      };

      if (!isSave) {
        const res = await updateStoreCustomizationSetting(
          storeCustomizationSettingData
        );
        // console.log("res...", res);

        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
      } else {
        const res = await addStoreCustomizationSetting(
          storeCustomizationSettingData
        );
        // console.log("res..in add", res);

        setIsUpdate(true);
        setIsSubmitting(false);

        notifySuccess(res.message);
      }
    } catch (err) {
      // console.log("err..in", err);
      notifyError(err ? err?.response?.data?.message : err?.message);
      // setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const getStoreCustomizationData = async () => {
      try {
        const res = await getStoreCustomizationSetting();
        console.log("res in use store customization", res);

        // contact-us
        setValue(
          "contact_office_address_one",
          res?.storeCustomizationSetting?.setting?.contact
            ?.contact_office_address_one
        );
        setValue(
          "contact_office_address_two",
          res?.storeCustomizationSetting?.setting?.contact
            ?.contact_office_address_two
        );

        setValue(
          "contact_emergency_call",
          res?.storeCustomizationSetting?.setting?.contact
            ?.contact_emergency_call
        );
        setValue(
          "contact_general_comunication",
          res?.storeCustomizationSetting?.setting?.contact
            ?.contact_general_comunication
        );

        //  about us
        setValue(
          "our_work_ability_title",
          res?.storeCustomizationSetting?.setting?.about?.our_work_ability_title
        );
        setValue(
          "our_work_ability_des",
          res?.storeCustomizationSetting?.setting?.about?.our_work_ability_des
        );

        setAboutOurWorkAbilityImg(
          res?.storeCustomizationSetting?.setting?.about?.our_work_ability_img
        );

        setValue(
          "about_top_quotes",
          res?.storeCustomizationSetting?.setting?.about?.about_top_quotes
        );
        setValue(
          "about_top_sub_title",
          res?.storeCustomizationSetting?.setting?.about?.about_top_sub_title
        );
        setValue(
          "about_top_title",
          res?.storeCustomizationSetting?.setting?.about?.about_top_title
        );
        setValue(
          "about_top_description",
          res?.storeCustomizationSetting?.setting?.about?.about_top_description
        );
        setValue(
          "about_top_mission",
          res?.storeCustomizationSetting?.setting?.about?.about_top_mission
        );
        setValue(
          "about_top_vision",
          res?.storeCustomizationSetting?.setting?.about?.about_top_vision
        );
        setValue(
          "about_top_mission_title",
          res?.storeCustomizationSetting?.setting?.about
            ?.about_top_mission_title
        );
        setValue(
          "about_top_vision_title",
          res?.storeCustomizationSetting?.setting?.about?.about_top_vision_title
        );

        setAboutTopImg(
          res?.storeCustomizationSetting?.setting?.about?.about_top_img
        );

        setValue(
          "about_top_brand_title",
          res?.storeCustomizationSetting?.setting?.about?.about_top_brand_title
        );

        setAboutWhyChooseImg(
          res?.storeCustomizationSetting?.setting?.about?.why_choose_img
        );
        setValue(
          "why_choose_us_sub_title",
          res?.storeCustomizationSetting?.setting?.about
            ?.why_choose_us_sub_title
        );
        setValue(
          "why_choose_us_title",
          res?.storeCustomizationSetting?.setting?.about?.why_choose_us_title
        );
        setValue(
          "why_choose_us_description",
          res?.storeCustomizationSetting?.setting?.about
            ?.why_choose_us_description
        );
        setValue(
          "why_choose_one_title",
          res?.storeCustomizationSetting?.setting?.about?.why_choose_one_title
        );
        setValue(
          "why_choose_one_des",
          res?.storeCustomizationSetting?.setting?.about?.why_choose_one_des
        );
        setValue(
          "why_choose_two_title",
          res?.storeCustomizationSetting?.setting?.about?.why_choose_two_title
        );
        setValue(
          "why_choose_two_des",
          res?.storeCustomizationSetting?.setting?.about?.why_choose_two_des
        );
        setValue(
          "why_choose_three_title",
          res?.storeCustomizationSetting?.setting?.about?.why_choose_three_title
        );
        setValue(
          "why_choose_three_des",
          res?.storeCustomizationSetting?.setting?.about?.why_choose_three_des
        );
        setValue(
          "why_choose_four_title",
          res?.storeCustomizationSetting?.setting?.about?.why_choose_four_title
        );
        setValue(
          "why_choose_four_des",
          res?.storeCustomizationSetting?.setting?.about?.why_choose_four_des
        );

        // about - banner;
        setValue(
          "about_banner_title",
          res?.storeCustomizationSetting?.setting?.about?.about_banner_title
        );
        setValue(
          "about_banner_des",
          res?.storeCustomizationSetting?.setting?.about?.about_banner_des
        );
        setAboutBannerImg(
          res?.storeCustomizationSetting?.setting?.about?.about_banner_img
        );

        // navbar
        setValue(
          "store_title",
          res?.storeCustomizationSetting?.setting?.home?.store_title
        );

        setValue(
          "address",
          res?.storeCustomizationSetting?.setting?.home?.address
        );
        setValue("phone", res?.storeCustomizationSetting?.setting?.home?.phone);
        setValue("gmail", res?.storeCustomizationSetting?.setting?.home?.gmail);
        setLogo(res?.storeCustomizationSetting?.setting?.home?.logo);
        setFavIcon(res?.storeCustomizationSetting?.setting?.home?.favicon);

        // footer
        setValue(
          "footer_title",
          res?.storeCustomizationSetting?.setting?.home?.footer_title
        );

        setValue(
          "footer_copy_right",
          res?.storeCustomizationSetting?.setting?.home?.footer_copy_right
        );
        setFooterLogo(
          res?.storeCustomizationSetting?.setting?.home?.footer_logo
        );
        setFooterPaymentIconOne(
          res?.storeCustomizationSetting?.setting?.home
            ?.footer_payment_incon_one
        );
        setFooterPaymentIconFour(
          res?.storeCustomizationSetting?.setting?.home
            ?.footer_payment_incon_four
        );
        setFooterPaymentIconThree(
          res?.storeCustomizationSetting?.setting?.home
            ?.footer_payment_incon_three
        );
        setFooterPaymentIconTwo(
          res?.storeCustomizationSetting?.setting?.home
            ?.footer_payment_incon_two
        );

        // social link
        setValue(
          "hero_facebook_link",
          res?.storeCustomizationSetting?.setting?.home?.hero_facebook_link
        );

        setValue(
          "hero_youtube_link",
          res?.storeCustomizationSetting?.setting?.home?.hero_youtube_link
        );
        setValue(
          "hero_twitter_link",
          res?.storeCustomizationSetting?.setting?.home?.hero_twitter_link
        );
        setValue(
          "hero_linkdin_link",
          res?.storeCustomizationSetting?.setting?.home?.hero_linkdin_link
        );

        // main slider
        setValue(
          "slider_one_description",
          res?.storeCustomizationSetting?.setting?.home?.slider_one_description
        );
        setValue(
          "slider_one_subtitle",
          res?.storeCustomizationSetting?.setting?.home?.slider_one_subtitle
        );
        setValue(
          "slider_one_title",
          res?.storeCustomizationSetting?.setting?.home?.slider_one_title
        );
        setSliderImageOne(
          res?.storeCustomizationSetting?.setting?.home?.slider_one_img
        );

        setValue(
          "slider_two_description",
          res?.storeCustomizationSetting?.setting?.home?.slider_two_description
        );
        setValue(
          "slider_two_subtitle",
          res?.storeCustomizationSetting?.setting?.home?.slider_two_subtitle
        );
        setValue(
          "slider_two_title",
          res?.storeCustomizationSetting?.setting?.home?.slider_two_title
        );
        setSliderImageTwo(
          res?.storeCustomizationSetting?.setting?.home?.slider_two_img
        );

        setValue(
          "slider_three_description",
          res?.storeCustomizationSetting?.setting?.home
            ?.slider_three_description
        );
        setValue(
          "slider_three_subtitle",
          res?.storeCustomizationSetting?.setting?.home?.slider_three_subtitle
        );
        setValue(
          "slider_three_title",
          res?.storeCustomizationSetting?.setting?.home?.slider_three_title
        );
        setSliderImageThree(
          res?.storeCustomizationSetting?.setting?.home?.slider_three_img
        );

        // home -feature brand product
        setValue(
          "featured_brand_title",
          res?.storeCustomizationSetting?.setting?.home?.featured_brand_title
        );
        setValue(
          "featured_brand_description",
          res?.storeCustomizationSetting?.setting?.home
            ?.featured_brand_description
        );
        setFeatureBrandOne(
          res?.storeCustomizationSetting?.setting?.home?.featured_brand_one
        );
        setFeatureBrandTwo(
          res?.storeCustomizationSetting?.setting?.home?.featured_brand_two
        );

        setValue(
          "featured_brand_banner_sub_title",
          res?.storeCustomizationSetting?.setting?.home
            ?.featured_brand_banner_sub_title
        );
        setValue(
          "featured_brand_banner_title",
          res?.storeCustomizationSetting?.setting?.home
            ?.featured_brand_banner_title
        );
        setValue(
          "featured_brand_banner_description",
          res?.storeCustomizationSetting?.setting?.home
            ?.featured_brand_banner_description
        );
        setFeatureBandBannerImg(
          res?.storeCustomizationSetting?.setting?.home
            ?.feature_brand_banner_img
        );

        // home top trending product
        setValue(
          "featured_trending_product_title",
          res?.storeCustomizationSetting?.setting?.home
            ?.featured_trending_product_title
        );
        setFeatureCategoryOne(
          res?.storeCustomizationSetting?.setting?.home?.featured_category_one
        );
        setFeatureCategoryTwo(
          res?.storeCustomizationSetting?.setting?.home?.featured_category_two
        );
        setFeatureCategoryThree(
          res?.storeCustomizationSetting?.setting?.home?.featured_category_three
        );
        setFeatureCategoryFour(
          res?.storeCustomizationSetting?.setting?.home?.featured_category_four
        );
        setFeatureCategoryFive(
          res?.storeCustomizationSetting?.setting?.home?.featured_category_five
        );

        // banner -1
        setValue(
          "hone_banner_one_title",
          res?.storeCustomizationSetting?.setting?.home?.hone_banner_one_title
        );
        setValue(
          "hone_banner_one_des",
          res?.storeCustomizationSetting?.setting?.home?.hone_banner_one_des
        );
        setHomeBannerOneImg(
          res?.storeCustomizationSetting?.setting?.home?.home_banner_one_img
        );

        setValue(
          "hone_banner_two_title",
          res?.storeCustomizationSetting?.setting?.home?.hone_banner_two_title
        );
        setValue(
          "hone_banner_two_des",
          res?.storeCustomizationSetting?.setting?.home?.hone_banner_two_des
        );
        setHomeBannerTwoImg(
          res?.storeCustomizationSetting?.setting?.home?.home_banner_two_img
        );

        // weekly best deals product
        setValue(
          "weekly_best_deals_end_time",
          res?.storeCustomizationSetting?.setting?.home
            ?.weekly_best_deals_end_time
        );
        setValue(
          "weekly_best_deals_title",
          res?.storeCustomizationSetting?.setting?.home?.weekly_best_deals_title
        );
        setValue(
          "weekly_best_deals_banner_title",
          res?.storeCustomizationSetting?.setting?.home
            ?.weekly_best_deals_banner_title
        );
        setValue(
          "weekly_best_deals_sub_title",
          res?.storeCustomizationSetting?.setting?.home
            ?.weekly_best_deals_sub_title
        );
        setValue(
          "weekly_best_deals_offer_title",
          res?.storeCustomizationSetting?.setting?.home
            ?.weekly_best_deals_offer_title
        );
        setweeklyBestDealsImg(
          res?.storeCustomizationSetting?.setting?.home?.weekly_best_deals_img
        );
        setweeklyBestDealsOne(
          res?.storeCustomizationSetting?.setting?.home
            ?.weekly_best_delas_product_one
        );
        setweeklyBestDealsTwo(
          res?.storeCustomizationSetting?.setting?.home
            ?.weekly_best_delas_product_two
        );
        setweeklyBestDealsThree(
          res?.storeCustomizationSetting?.setting?.home
            ?.weekly_best_delas_product_three
        );
        setweeklyBestDealsFour(
          res?.storeCustomizationSetting?.setting?.home
            ?.weekly_best_delas_product_four
        );

        // our client say
        setValue(
          "our_client_say_title",
          res?.storeCustomizationSetting?.setting?.home?.our_client_say_title
        );

        setValue(
          "client_one_name",
          res?.storeCustomizationSetting?.setting?.home?.client_one_name
        );
        setValue(
          "client_one_comment",
          res?.storeCustomizationSetting?.setting?.home?.client_one_comment
        );
        setClientOneImg(
          res?.storeCustomizationSetting?.setting?.home?.client_one_img
        );

        setValue(
          "client_two_name",
          res?.storeCustomizationSetting?.setting?.home?.client_two_name
        );
        setValue(
          "client_two_comment",
          res?.storeCustomizationSetting?.setting?.home?.client_two_comment
        );
        setClientTwoImg(
          res?.storeCustomizationSetting?.setting?.home?.client_two_img
        );

        setValue(
          "client_three_name",
          res?.storeCustomizationSetting?.setting?.home?.client_three_name
        );
        setValue(
          "client_three_comment",
          res?.storeCustomizationSetting?.setting?.home?.client_three_comment
        );
        setClientThreeImg(
          res?.storeCustomizationSetting?.setting?.home?.client_three_img
        );

        setValue(
          "client_four_name",
          res?.storeCustomizationSetting?.setting?.home?.client_four_name
        );
        setValue(
          "client_four_comment",
          res?.storeCustomizationSetting?.setting?.home?.client_four_comment
        );
        setClientFourImg(
          res?.storeCustomizationSetting?.setting?.home?.client_four_img
        );

        setValue(
          "client_five_name",
          res?.storeCustomizationSetting?.setting?.home?.client_five_name
        );
        setValue(
          "client_five_comment",
          res?.storeCustomizationSetting?.setting?.home?.client_five_comment
        );
        setClientFiveImg(
          res?.storeCustomizationSetting?.setting?.home?.client_five_img
        );

        if (res) {
          setIsSave(false);
        }
      } catch (err) {
        console.log("error in use..-------------------", err);
        notifyError(err ? err?.response?.data?.message : err?.message);
      }
    };
    getStoreCustomizationData();
  }, [setValue]);

  return {
    handleSubmit,
    register,
    errors,
    onSubmit,
    // feature brnad
    featureBrandTwo,
    setFeatureBrandTwo,
    featureBrandOne,
    setFeatureBrandOne,
    featureBandBannerImg,
    setFeatureBandBannerImg,
    // top treanding category product
    featureCategoryOne,
    setFeatureCategoryOne,
    featureCategoryTwo,
    setFeatureCategoryTwo,
    featureCategoryThree,
    setFeatureCategoryThree,
    featureCategoryFour,
    setFeatureCategoryFour,
    featureCategoryFive,
    setFeatureCategoryFive,

    // home banner
    homeBannerOneImg,
    setHomeBannerOneImg,
    homeBannerTwoImg,
    setHomeBannerTwoImg,

    // weekly beast deals
    weeklyBestDealsOne,
    setweeklyBestDealsOne,
    weeklyBestDealsTwo,
    setweeklyBestDealsTwo,
    weeklyBestDealsThree,
    setweeklyBestDealsThree,
    weeklyBestDealsFour,
    setweeklyBestDealsFour,
    weeklyBestDealsImg,
    setweeklyBestDealsImg,

    // navbar
    logo,
    setLogo,
    favIcon,
    setFavIcon,

    // main slider
    sliderImageOne,
    setSliderImageOne,
    sliderImageTwo,
    setSliderImageTwo,
    sliderImageThree,
    setSliderImageThree,

    // client say
    clientOneImg,
    setClientOneImg,
    clientTwoImg,
    setClientTwoImg,
    clientThreeImg,
    setClientThreeImg,
    clientFourImg,
    setClientFourImg,
    clientFiveImg,
    setClientFiveImg,

    // terms
    termsValue,
    setTermsValue,

    // about
    aboutTopImg,
    setAboutTopImg,
    aboutOurWorkAbilityImg,
    setAboutOurWorkAbilityImg,
    aboutWhyChooseImg,
    setAboutWhyChooseImg,
    aboutBannerImg,
    setAboutBannerImg,

    // footer
    footerLogo,
    setFooterLogo,
    footerPaymentIconOne,
    setFooterPaymentIconOne,
    footerPaymentIconTwo,
    setFooterPaymentIconTwo,
    footerPaymentIconThree,
    setFooterPaymentIconThree,
    footerPaymentIconFour,
    setFooterPaymentIconFour,
    footerPaymentIconFive,
    setFooterPaymentIconFive,
  };
};

export default useStoreCustomize;
