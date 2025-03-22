"use client";
import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Uploader from "../../imageUploader/Uploader";
import useStoreCustomize from "@/app/hooks/useStoreCustomize";
import ContentTitle from "../common/ContentTitle";
import ContentSubtitle from "../common/ContentSubtitle";
import InputLabel from "../common/InputLabel";
import TextInput from "../common/TextInput";
import MenuInput from "../common/MenuInput";
import TextAreaInput from "../common/TextAreaInput";
import { CiSettings } from "react-icons/ci";
import SwitchToggle from "../../form/switch/SwitchToggle";
import { getAllCategories } from "@/app/backend/controllers/category.controller";
import { readyToParentAndChildrenCategory } from "@/app/hooks/random";
import { getAllProducts } from "@/app/backend/controllers/product.controller";
import usebrands from "../../featch/brands";

const HomeCustomization = () => {
  const {
    handleSubmit,
    onSubmit,
    errors,
    register,

    // navbar
    logo,
    setLogo,
    favIcon,
    setFavIcon,

    // feature brand
    featureBrandTwo,
    setFeatureBrandTwo,
    featureBrandOne,
    setFeatureBrandOne,
    featureBandBannerImg,
    setFeatureBandBannerImg,

    // feature top tending prodcut
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
    // weekly best deals
    weeklyBestDealsOne,
    setweeklyBestDealsOne,
    weeklyBestDealsTwo,
    setweeklyBestDealsTwo,
    weeklyBestDealsThree,
    setweeklyBestDealsThree,
    weeklyBestDealsFour,
    setweeklyBestDealsFour,
    setweeklyBestDealsImg,
    weeklyBestDealsImg,

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

    // home banner-1
    homeBannerOneImg,
    setHomeBannerOneImg,
    homeBannerTwoImg,
    setHomeBannerTwoImg,

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
  } = useStoreCustomize();
  //    console.log('errors in home customization',errors)
  // console.log('allowCategories',allowCategories)
  // console.log("erros", errors);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllCategories();
      // console.log('res..in',res )
      setCategories(res);
      setLoading(false);
    };

    fetchData();
  }, []);

  // console.log("categoryList", categoryList);
  const [products, setProducts] = useState([]);
  const flashSaleProduct = products?.filter((p) => p.flashSale === true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllProducts();
      // console.log('res..in',res )
      setProducts(res);
      setLoading(false);
    };

    fetchData();
  }, []);
  // console.log('product..',products)
  // console.log('featureProductOne...',featureProductOne)

  const [selectedProducts, setSelectedProducts] = useState([]);
  // console.log("selectedProducts..", selectedProducts);

  const handleSelectChange = (e) => {
    const selectedProduct = JSON.parse(e.target.value);

    // Check if the product is already selected
    if (
      !selectedProducts.some((product) => product._id === selectedProduct._id)
    ) {
      setSelectedProducts([...selectedProducts, selectedProduct]);
    }
  };

  // feature brnad
  const { brands, brandLoading } = usebrands();
  // console.log("weeklyBestDealsOne", weeklyBestDealsOne);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="relative">
        {/* submite button */}
        <div className="sticky top-2 z-20 flex justify-end">
          <button
            type="submit"
            className="rounded-md bg-brand px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Update
          </button>
        </div>
        {/* Navbar */}
        <div className="bg-white inline-block min-w-full align-middle  pt-5 pb-8 px-8 rounded-lg mt-8">
          <ContentTitle title="Navbar" />
          <div className="grid grid-cols-12 gap-4">
            <InputLabel labelText="Store Title" />
            <TextInput
              register={register}
              name="store_title"
              placeholder="Store Title"
              errors={errors}
              errorMessage="this is required"
            />
            <InputLabel labelText="Gmail" />
            <TextInput
              register={register}
              name="gmail"
              placeholder="Your Gmail"
              errors={errors}
              errorMessage="this is required"
            />
            <InputLabel labelText="Address" />
            <TextInput
              register={register}
              name="address"
              placeholder="Your address"
              errors={errors}
              errorMessage="this is required"
            />
            <InputLabel labelText="Phone" />
            <TextInput
              register={register}
              name="phone"
              placeholder="Phone"
              errors={errors}
              errorMessage="this is required"
            />
            <InputLabel labelText="Logo" />
            <div className="col-span-12 xl:col-span-10">
              <Uploader setImageUrl={setLogo} imageUrl={logo} />
            </div>
            <InputLabel labelText="Favicon" />
            <div className="col-span-12 xl:col-span-10">
              <Uploader setImageUrl={setFavIcon} imageUrl={favIcon} />
            </div>
          </div>
        </div>
        {/* ======= main slider ======== */}
        <div className="bg-white inline-block min-w-full align-middle  pt-5 pb-8 px-8 rounded-lg mt-8">
          {/* <h4 className="text-2xl font-extrabold pb-4 border-b mb-4">Main Slider</h4> */}
          <ContentTitle title="Main Slider" />
          <Tabs>
            <TabList className=" border-b-0 rounded-lg inline-flex items-center flex-wrap">
              <Tab className="px-3 py-1 rounded-lg  cursor-pointer outline-none">
                Slider 1
              </Tab>
              <Tab className="px-3 py-1 rounded-lg  cursor-pointer outline-none">
                Slider 2
              </Tab>
              <Tab className="px-3 py-1 rounded-lg  cursor-pointer outline-none">
                Slider 3
              </Tab>
            </TabList>

            <TabPanel>
              <div className="grid grid-cols-12 gap-4 mt-8">
                <InputLabel labelText="Slider Images" />
                <div className="col-span-12 xl:col-span-10">
                  <Uploader
                    setImageUrl={setSliderImageOne}
                    imageUrl={sliderImageOne}
                  />
                </div>
                <InputLabel labelText="Slider Sub Title" />
                <TextInput
                  register={register}
                  name="slider_one_subtitle"
                  placeholder="Summer sale-20%"
                  errors={errors}
                  errorMessage="slider subtitle is required"
                />
                <InputLabel labelText="Slider Title" />
                <TextInput
                  register={register}
                  name="slider_one_title"
                  placeholder="Smart Watch collection"
                  errors={errors}
                  errorMessage="slider title is required"
                />
                <InputLabel labelText="Slider Description" />
                <TextAreaInput
                  register={register}
                  name="slider_one_description"
                  placeholder="slider description"
                  errors={errors}
                  errorMessage="slider description is required"
                />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="grid grid-cols-12 gap-4 mt-8">
                <InputLabel labelText="Slider Images" />
                <div className="col-span-12 xl:col-span-10">
                  <Uploader
                    setImageUrl={setSliderImageTwo}
                    imageUrl={sliderImageTwo}
                  />
                </div>
                <InputLabel labelText="Slider Sub Title" />
                <TextInput
                  register={register}
                  name="slider_two_subtitle"
                  placeholder="Summer sale-20%"
                  errors={errors}
                  errorMessage="slider subtitle is required"
                />
                <InputLabel labelText="Slider Title" />
                <TextInput
                  register={register}
                  name="slider_two_title"
                  placeholder="Smart Watch collection"
                  errors={errors}
                  errorMessage="slider title is required"
                />
                <InputLabel labelText="Slider Description" />
                <TextAreaInput
                  register={register}
                  name="slider_two_description"
                  placeholder="slider description"
                  errors={errors}
                  errorMessage="slider description is required"
                />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="grid grid-cols-12 gap-4 mt-8">
                <InputLabel labelText="Slider Images" />
                <div className="col-span-12 xl:col-span-10">
                  <Uploader
                    setImageUrl={setSliderImageThree}
                    imageUrl={sliderImageThree}
                  />
                </div>
                <InputLabel labelText="Slider Sub Title" />
                <TextInput
                  register={register}
                  name="slider_three_subtitle"
                  placeholder="Summer sale-20%"
                  errors={errors}
                  errorMessage="slider subtitle is required"
                />
                <InputLabel labelText="Slider Title" />
                <TextInput
                  register={register}
                  name="slider_three_title"
                  placeholder="Smart Watch collection"
                  errors={errors}
                  errorMessage="slider title is required"
                />
                <InputLabel labelText="Slider Description" />
                <TextAreaInput
                  register={register}
                  name="slider_three_description"
                  placeholder="slider description"
                  errors={errors}
                  errorMessage="slider description is required"
                />
              </div>
            </TabPanel>
          </Tabs>
        </div>

        {/* Hero social link */}
        <div className="bg-white inline-block min-w-full align-middle  pt-5 pb-8 px-8 rounded-lg mt-8">
          <ContentTitle title="Social Link" />
          <div className="grid grid-cols-12 gap-4">
            <InputLabel labelText="Facebook" />
            <TextInput
              register={register}
              name="hero_facebook_link"
              placeholder="Your facebook link"
              errors={errors}
              errorMessage="this is required"
            />
            <InputLabel labelText="Youtube" />
            <TextInput
              register={register}
              name="hero_youtube_link"
              placeholder="youtube link"
              errors={errors}
              errorMessage="this  is required"
            />
            <InputLabel labelText="Twitter" />
            <TextInput
              register={register}
              name="hero_twitter_link"
              placeholder="Twitter link"
              errors={errors}
              errorMessage="this is required"
            />

            <InputLabel labelText="Linkdin" />
            <TextInput
              register={register}
              name="hero_linkdin_link"
              placeholder="Linkdin link"
              errors={errors}
              errorMessage="this is required is required"
            />
          </div>
        </div>
        {/* Feature brand products */}
        <div className="bg-white inline-block min-w-full align-middle  pt-5 pb-8 px-8 rounded-lg mt-8">
          <ContentTitle title="Featured Brands Products" />
          <div className="grid grid-cols-12 gap-4">
            <InputLabel labelText="Title" />
            <TextInput
              register={register}
              name="featured_brand_title"
              placeholder="Feature brand title"
              errors={errors}
              errorMessage="this is required"
            />

            <InputLabel labelText="Description" />
            <TextAreaInput
              register={register}
              name="featured_brand_description"
              placeholder="description"
              errors={errors}
              errorMessage="this is required"
            />

            <InputLabel labelText="Banner Title" />
            <TextInput
              register={register}
              name="featured_brand_banner_title"
              placeholder="Feature banner title"
              errors={errors}
              errorMessage="this is required"
            />

            <InputLabel labelText="Banner Description" />
            <TextAreaInput
              register={register}
              name="featured_brand_banner_description"
              placeholder="description"
              errors={errors}
              errorMessage="this is required"
            />

            <InputLabel labelText="Banner Image" />
            <div className="col-span-12 xl:col-span-10">
              <Uploader
                setImageUrl={setFeatureBandBannerImg}
                imageUrl={featureBandBannerImg}
              />
            </div>

            <InputLabel labelText="Feature brand-1" />
            <div className="col-span-12 xl:col-span-10">
              <div className="w-full rounded-lg bg-slate-500 bg-opacity-5 border border-gray-400 px-4 py-3 focus:ring-0 outline-none">
                <select
                  value={featureBrandOne}
                  onChange={(e) => setFeatureBrandOne(e.target.value)}
                  className="bg-transparent block w-full py-1 rounded-md border-0  sm:text-sm sm:leading-6"
                >
                  <option hidden value="">
                    Select Feature brand-1
                  </option>
                  {brands?.map((brand, i) => (
                    <option key={i}>{brand?.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <InputLabel labelText="Feature brand-2" />
            <div className="col-span-12 xl:col-span-10">
              <div className="w-full rounded-lg bg-slate-500 bg-opacity-5 border border-gray-400 px-4 py-3 focus:ring-0 outline-none">
                <select
                  value={featureBrandTwo}
                  onChange={(e) => setFeatureBrandTwo(e.target.value)}
                  className="bg-transparent block w-full rounded-md border-0 py-1 sm:text-sm sm:leading-6"
                >
                  <option hidden value="">
                    Select Feature brand-2
                  </option>
                  {brands?.map((c, i) => (
                    <option key={i}>{c?.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Top Trending Products*/}
        <div className="bg-white inline-block min-w-full align-middle  pt-5 pb-8 px-8 rounded-lg mt-8">
          <ContentTitle title="Top Trending Products" />
          <div className="grid grid-cols-12 gap-4">
            <InputLabel labelText="Title" />
            <TextInput
              register={register}
              name="featured_trending_product_title"
              placeholder="Feature trending products"
              errors={errors}
              errorMessage="this is required"
            />

            <InputLabel labelText="Feature category-1" />
            <div className="col-span-12 xl:col-span-10">
              <div className="w-full rounded-lg bg-slate-500 bg-opacity-5 border border-gray-400 px-4 py-3 focus:ring-0 outline-none">
                <select
                  value={featureCategoryOne}
                  onChange={(e) => setFeatureCategoryOne(e.target.value)}
                  className="bg-transparent block w-full rounded-md border-0 py-1 sm:text-sm sm:leading-6"
                >
                  <option hidden value="">
                    Select Feature category-1
                  </option>
                  {categories?.map((brand, i) => (
                    <option key={i}>{brand?.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <InputLabel labelText="Feature category-2" />
            <div className="col-span-12 xl:col-span-10">
              <div className="w-full rounded-lg bg-slate-500 bg-opacity-5 border border-gray-400 px-4 py-3 focus:ring-0 outline-none">
                <select
                  value={featureCategoryTwo}
                  onChange={(e) => setFeatureCategoryTwo(e.target.value)}
                  className="bg-transparent block w-full rounded-md border-0 py-1 sm:text-sm sm:leading-6"
                >
                  <option hidden value="">
                    Select Feature category-2
                  </option>
                  {categories?.map((c, i) => (
                    <option key={i}>{c?.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <InputLabel labelText="Feature category-3" />
            <div className="col-span-12 xl:col-span-10">
              <div className="w-full rounded-lg bg-slate-500 bg-opacity-5 border border-gray-400 px-4 py-3 focus:ring-0 outline-none">
                <select
                  value={featureCategoryThree}
                  onChange={(e) => setFeatureCategoryThree(e.target.value)}
                  className="bg-transparent block w-full rounded-md border-0 py-1 sm:text-sm sm:leading-6"
                >
                  <option hidden value="">
                    Select Feature category-3
                  </option>
                  {categories?.map((c, i) => (
                    <option key={i}>{c?.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <InputLabel labelText="Feature category-4" />
            <div className="col-span-12 xl:col-span-10">
              <div className="w-full rounded-lg bg-slate-500 bg-opacity-5 border border-gray-400 px-4 py-3 focus:ring-0 outline-none">
                <select
                  value={featureCategoryFour}
                  onChange={(e) => setFeatureCategoryFour(e.target.value)}
                  className="bg-transparent block w-full rounded-md border-0 py-1 sm:text-sm sm:leading-6"
                >
                  <option hidden value="">
                    Select Feature category-4
                  </option>
                  {categories?.map((c, i) => (
                    <option key={i}>{c?.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <InputLabel labelText="Feature category-5" />
            <div className="col-span-12 xl:col-span-10">
              <div className="w-full rounded-lg bg-slate-500 bg-opacity-5 border border-gray-400 px-4 py-3 focus:ring-0 outline-none">
                <select
                  value={featureCategoryFive}
                  onChange={(e) => setFeatureCategoryFive(e.target.value)}
                  className="bg-transparent block w-full rounded-md border-0 py-1 sm:text-sm sm:leading-6"
                >
                  <option hidden value="">
                    Select Feature category-5
                  </option>
                  {categories?.map((c, i) => (
                    <option key={i}>{c?.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        {/* banner one */}
        <div className="bg-white inline-block min-w-full align-middle  pt-5 pb-8 px-8 rounded-lg mt-8">
          <ContentTitle title="Banner-1" />
          <div className="grid grid-cols-12 gap-4">
            <InputLabel labelText="Image" />
            <div className="col-span-12 xl:col-span-10">
              <Uploader
                setImageUrl={setHomeBannerOneImg}
                imageUrl={homeBannerOneImg}
              />
            </div>
            <InputLabel labelText="Title" />
            <TextInput
              register={register}
              name="hone_banner_one_title"
              placeholder="title"
              errors={errors}
              errorMessage="this is required"
            />

            <InputLabel labelText="Description" />

            <TextAreaInput
              register={register}
              name="hone_banner_one_des"
              placeholder="description"
              errors={errors}
              errorMessage="this is required"
            />
          </div>
        </div>
        {/* Weekly best deals */}
        <div className="bg-white inline-block min-w-full align-middle  pt-5 pb-8 px-8 rounded-lg mt-8">
          <ContentTitle title="Weekly best deals" />
          <div className="grid grid-cols-12 gap-4">
            <InputLabel labelText="End Time" />
            <div className="col-span-12 xl:col-span-10">
              <input
                {...register(`weekly_best_deals_end_time`, {
                  required: "weekly_best_deals_end_time",
                })}
                label="weekly best deals End Time"
                name="weekly_best_deals_end_time"
                type="date"
                placeholder="Flash sale Validity Time"
              />
              {errors.weekly_best_deals_end_time?.type === "required" && (
                <p className="text-red-400 font-bold mt-1">
                  weekly best deals end time is required
                </p>
              )}
            </div>
            <InputLabel labelText="Title" />
            <TextInput
              register={register}
              name="weekly_best_deals_title"
              placeholder="weekly best deals"
              errors={errors}
              errorMessage="weekly best deals is required"
            />
            <InputLabel labelText="Sub Title" />
            <TextInput
              register={register}
              name="weekly_best_deals_sub_title"
              placeholder="weekly best deals sub title"
              errors={errors}
              errorMessage="weekly best deals is required"
            />
            <InputLabel labelText="Banner Title" />
            <TextInput
              register={register}
              name="weekly_best_deals_banner_title"
              placeholder="weekly best deals"
              errors={errors}
              errorMessage="weekly best deals is required"
            />

            <InputLabel labelText="Offer Title" />
            <TextInput
              register={register}
              name="weekly_best_deals_offer_title"
              placeholder="weekly best deals offer"
              errors={errors}
              errorMessage="weekly best deals is required"
            />

            <InputLabel labelText="Weekly best delals Image" />
            <div className="col-span-12 xl:col-span-10">
              <Uploader
                setImageUrl={setweeklyBestDealsImg}
                imageUrl={weeklyBestDealsImg}
              />
            </div>

            {/* Select weekly best deals product-1 */}
            <InputLabel labelText="Flash slider product-1" />
            <div className="col-span-12 xl:col-span-10">
              <div className="w-full rounded-lg bg-slate-500 bg-opacity-5 border border-gray-400 px-4 py-3 focus:ring-0 outline-none">
                <select
                  value={
                    weeklyBestDealsOne?.name && weeklyBestDealsOne?.id
                      ? `${weeklyBestDealsOne.name}|${weeklyBestDealsOne.id}`
                      : ""
                  }
                  onChange={(e) => {
                    const [name, id] = e.target.value.split("|");
                    setweeklyBestDealsOne({ name, id });
                  }}
                  className="bg-transparent block w-full rounded-md border-0 py-1 sm:text-sm sm:leading-6"
                >
                  <option hidden value="">
                    Select weekly best deals product-1
                  </option>
                  {flashSaleProduct?.map((p) => (
                    <option key={p._id} value={`${p.name}|${p._id}`}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Select weekly best deals product-2 */}
            <InputLabel labelText="Flash slider product-2" />
            <div className="col-span-12 xl:col-span-10">
              <div className="w-full rounded-lg bg-slate-500 bg-opacity-5 border border-gray-400 px-4 py-3 focus:ring-0 outline-none">
                <select
                  value={
                    weeklyBestDealsTwo?.name && weeklyBestDealsTwo?.id
                      ? `${weeklyBestDealsTwo.name}|${weeklyBestDealsTwo.id}`
                      : ""
                  }
                  onChange={(e) => {
                    const [name, id] = e.target.value.split("|");
                    setweeklyBestDealsTwo({ name, id });
                  }}
                  className="bg-transparent block w-full rounded-md border-0 py-1 sm:text-sm sm:leading-6"
                >
                  <option hidden value="">
                    Select weekly best deals product-2
                  </option>
                  {flashSaleProduct?.map((p) => (
                    <option key={p._id} value={`${p.name}|${p._id}`}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Select weekly best deals product-3 */}
            <InputLabel labelText="Flash slider product-3" />
            <div className="col-span-12 xl:col-span-10">
              <div className="w-full rounded-lg bg-slate-500 bg-opacity-5 border border-gray-400 px-4 py-3 focus:ring-0 outline-none">
                <select
                  value={
                    weeklyBestDealsThree?.name && weeklyBestDealsThree?.id
                      ? `${weeklyBestDealsThree.name}|${weeklyBestDealsThree.id}`
                      : ""
                  }
                  onChange={(e) => {
                    const [name, id] = e.target.value.split("|");
                    setweeklyBestDealsThree({ name, id });
                  }}
                  className="bg-transparent block w-full rounded-md border-0 py-1 sm:text-sm sm:leading-6"
                >
                  <option hidden value="">
                    Select weekly best deals product-3
                  </option>
                  {flashSaleProduct?.map((p) => (
                    <option key={p._id} value={`${p.name}|${p._id}`}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Select weekly best deals product-4 */}
            <InputLabel labelText="Flash slider product-4" />
            <div className="col-span-12 xl:col-span-10">
              <div className="w-full rounded-lg bg-slate-500 bg-opacity-5 border border-gray-400 px-4 py-3 focus:ring-0 outline-none">
                <select
                  value={
                    weeklyBestDealsFour?.name && weeklyBestDealsFour?.id
                      ? `${weeklyBestDealsFour.name}|${weeklyBestDealsFour.id}`
                      : ""
                  }
                  onChange={(e) => {
                    const [name, id] = e.target.value.split("|");
                    setweeklyBestDealsFour({ name, id });
                  }}
                  className="bg-transparent block w-full rounded-md border-0 py-1 sm:text-sm sm:leading-6"
                >
                  <option hidden value="">
                    Select weekly best deals product-4
                  </option>
                  {flashSaleProduct?.map((p) => (
                    <option key={p._id} value={`${p.name}|${p._id}`}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        {/* banner two */}
        <div className="bg-white inline-block min-w-full align-middle  pt-5 pb-8 px-8 rounded-lg mt-8">
          <ContentTitle title="Banner-2" />
          <div className="grid grid-cols-12 gap-4">
            <InputLabel labelText="Image" />
            <div className="col-span-12 xl:col-span-10">
              <Uploader
                setImageUrl={setHomeBannerTwoImg}
                imageUrl={homeBannerTwoImg}
              />
            </div>
            <InputLabel labelText="Title" />
            <TextInput
              register={register}
              name="hone_banner_two_title"
              placeholder="title"
              errors={errors}
              errorMessage="this is required"
            />

            <InputLabel labelText="Description" />

            <TextAreaInput
              register={register}
              name="hone_banner_two_des"
              placeholder="description"
              errors={errors}
              errorMessage="this is required"
            />
          </div>
        </div>
        {/* Our client say*/}
        <div className="bg-white inline-block min-w-full align-middle  pt-5 pb-8 px-8 rounded-lg mt-8">
          <ContentTitle title="Our Clients Say" />
          <div className="grid grid-cols-12 gap-4 mb-5">
            <InputLabel labelText="Title" />
            <TextInput
              register={register}
              name="our_client_say_title"
              placeholder="client say title"
              errors={errors}
              errorMessage="weekly best deals is required"
            />
          </div>
          <Tabs>
            <TabList className=" border-b-0 rounded-lg inline-flex items-center flex-wrap">
              <Tab className="px-3 py-1 rounded-lg  cursor-pointer outline-none">
                client 1
              </Tab>
              <Tab className="px-3 py-1 rounded-lg  cursor-pointer outline-none">
                client 2
              </Tab>
              <Tab className="px-3 py-1 rounded-lg  cursor-pointer outline-none">
                client 3
              </Tab>
              <Tab className="px-3 py-1 rounded-lg  cursor-pointer outline-none">
                client 4
              </Tab>
              <Tab className="px-3 py-1 rounded-lg  cursor-pointer outline-none">
                client 5
              </Tab>
            </TabList>

            <TabPanel>
              <div className="grid grid-cols-12 gap-4 mt-8">
                <InputLabel labelText="Name" />
                <TextInput
                  register={register}
                  name="client_one_name"
                  placeholder="client name"
                  errors={errors}
                  errorMessage="weekly best deals is required"
                />

                <InputLabel labelText="Avatar" />
                <div className="col-span-12 xl:col-span-10">
                  <Uploader
                    setImageUrl={setClientOneImg}
                    imageUrl={clientOneImg}
                  />
                </div>
                <InputLabel labelText="Comment" />
                <TextAreaInput
                  register={register}
                  name="client_one_comment"
                  placeholder="client comment"
                  errors={errors}
                  errorMessage="client comment is required"
                />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="grid grid-cols-12 gap-4 mt-8">
                <InputLabel labelText="Name" />
                <TextInput
                  register={register}
                  name="client_two_name"
                  placeholder="client name"
                  errors={errors}
                  errorMessage="weekly best deals is required"
                />

                <InputLabel labelText="Avatar" />
                <div className="col-span-12 xl:col-span-10">
                  <Uploader
                    setImageUrl={setClientTwoImg}
                    imageUrl={clientTwoImg}
                  />
                </div>
                <InputLabel labelText="Comment" />
                <TextAreaInput
                  register={register}
                  name="client_two_comment"
                  placeholder="client comment"
                  errors={errors}
                  errorMessage="client comment is required"
                />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="grid grid-cols-12 gap-4 mt-8">
                <InputLabel labelText="Name" />
                <TextInput
                  register={register}
                  name="client_three_name"
                  placeholder="client name"
                  errors={errors}
                  errorMessage="weekly best deals is required"
                />

                <InputLabel labelText="Avatar" />
                <div className="col-span-12 xl:col-span-10">
                  <Uploader
                    setImageUrl={setClientThreeImg}
                    imageUrl={clientThreeImg}
                  />
                </div>
                <InputLabel labelText="Comment" />
                <TextAreaInput
                  register={register}
                  name="client_three_comment"
                  placeholder="client comment"
                  errors={errors}
                  errorMessage="client comment is required"
                />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="grid grid-cols-12 gap-4 mt-8">
                <InputLabel labelText="Name" />
                <TextInput
                  register={register}
                  name="client_four_name"
                  placeholder="client name"
                  errors={errors}
                  errorMessage="weekly best deals is required"
                />

                <InputLabel labelText="Avatar" />
                <div className="col-span-12 xl:col-span-10">
                  <Uploader
                    setImageUrl={setClientFourImg}
                    imageUrl={clientFourImg}
                  />
                </div>
                <InputLabel labelText="Comment" />
                <TextAreaInput
                  register={register}
                  name="client_four_comment"
                  placeholder="client comment"
                  errors={errors}
                  errorMessage="client comment is required"
                />
              </div>
            </TabPanel>
            <TabPanel>
              <div className="grid grid-cols-12 gap-4 mt-8">
                <InputLabel labelText="Name" />
                <TextInput
                  register={register}
                  name="client_five_name"
                  placeholder="client name"
                  errors={errors}
                  errorMessage="weekly best deals is required"
                />

                <InputLabel labelText="Avatar" />
                <div className="col-span-12 xl:col-span-10">
                  <Uploader
                    setImageUrl={setClientFiveImg}
                    imageUrl={clientFiveImg}
                  />
                </div>
                <InputLabel labelText="Comment" />
                <TextAreaInput
                  register={register}
                  name="client_five_comment"
                  placeholder="client comment"
                  errors={errors}
                  errorMessage="client comment is required"
                />
              </div>
            </TabPanel>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="bg-white inline-block min-w-full align-middle  pt-5 pb-8 px-8 rounded-lg mt-8">
          <ContentTitle title="Footer" />
          <div className="grid grid-cols-12 gap-4">
            <InputLabel labelText="Footer Title" />
            <TextInput
              register={register}
              name="footer_title"
              placeholder="title"
              errors={errors}
              errorMessage="this is required"
            />

            <InputLabel labelText="Copy Right" />
            <TextInput
              register={register}
              name="footer_copy_right"
              placeholder="Copy right"
              errors={errors}
              errorMessage="this is required"
            />

            <InputLabel labelText="Logo" />
            <div className="col-span-12 xl:col-span-10">
              <Uploader setImageUrl={setFooterLogo} imageUrl={footerLogo} />
            </div>
            <InputLabel labelText="Icon-1" />
            <div className="col-span-12 xl:col-span-10">
              <Uploader
                setImageUrl={setFooterPaymentIconOne}
                imageUrl={footerPaymentIconOne}
              />
            </div>
            <InputLabel labelText="Icon-2" />
            <div className="col-span-12 xl:col-span-10">
              <Uploader
                setImageUrl={setFooterPaymentIconTwo}
                imageUrl={footerPaymentIconTwo}
              />
            </div>
            <InputLabel labelText="Icon-3" />
            <div className="col-span-12 xl:col-span-10">
              <Uploader
                setImageUrl={setFooterPaymentIconThree}
                imageUrl={footerPaymentIconThree}
              />
            </div>

            <InputLabel labelText="Icon-4" />
            <div className="col-span-12 xl:col-span-10">
              <Uploader
                setImageUrl={setFooterPaymentIconFour}
                imageUrl={footerPaymentIconFour}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default HomeCustomization;
