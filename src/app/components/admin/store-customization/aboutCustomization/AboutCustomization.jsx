import React from "react";
import useStoreCustomize from "../../../../hooks/useStoreCustomize";

import ContentTitle from "../common/ContentTitle";
import ContentSubtitle from "../common/ContentSubtitle";
import InputLabel from "../common/InputLabel";
import TextInput from "../common/TextInput";
import MenuInput from "../common/MenuInput";
import TextAreaInput from "../common/TextAreaInput";
import Uploader from "../../imageUploader/Uploader";
const AboutCustomization = () => {
  const {
    handleSubmit,
    onSubmit,
    errors,
    register,

    aboutTopImg,
    setAboutTopImg,
    aboutOurWorkAbilityImg,
    setAboutOurWorkAbilityImg,
    aboutWhyChooseImg,
    setAboutWhyChooseImg,
    aboutBannerImg,
    setAboutBannerImg,
  } = useStoreCustomize();
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
        {/* About top */}
        <div className="bg-white inline-block min-w-full align-middle  pt-5 pb-8 px-8 rounded-lg mt-8">
          <ContentTitle title="About Top" />
          <div className="grid grid-cols-12 gap-4">
            <InputLabel labelText="Image" />
            <div className="col-span-12 xl:col-span-10">
              <Uploader setImageUrl={setAboutTopImg} imageUrl={aboutTopImg} />
            </div>
            <InputLabel labelText="Quotes" />
            <TextAreaInput
              register={register}
              name="about_top_quotes"
              placeholder="Quotes"
              errors={errors}
              errorMessage="this is required"
            />
            <InputLabel labelText="Sub Title" />
            <TextInput
              register={register}
              name="about_top_sub_title"
              placeholder="Sub Title"
              errors={errors}
              errorMessage="this is required"
            />
            <InputLabel labelText="Title" />
            <TextInput
              register={register}
              name="about_top_title"
              placeholder="Title"
              errors={errors}
              errorMessage="this is required"
            />
            <InputLabel labelText="Description" />
            <TextAreaInput
              register={register}
              name="about_top_description"
              placeholder="description"
              errors={errors}
              errorMessage="this is required"
            />
            <InputLabel labelText="MissionTitle" />
            <TextInput
              register={register}
              name="about_top_mission_title"
              placeholder="Title"
              errors={errors}
              errorMessage="this is required"
            />
            <InputLabel labelText="Our Mission" />
            <TextAreaInput
              register={register}
              name="about_top_mission"
              placeholder="Mission"
              errors={errors}
              errorMessage="this is required"
            />
            <InputLabel labelText="Vision Title" />
            <TextInput
              register={register}
              name="about_top_vision_title"
              placeholder="Title"
              errors={errors}
              errorMessage="this is required"
            />
            <InputLabel labelText="Our Vision" />
            <TextAreaInput
              register={register}
              name="about_top_vision"
              placeholder="Vision"
              errors={errors}
              errorMessage="this is required"
            />
            <InputLabel labelText="Brand Title" />
            <TextInput
              register={register}
              name="about_top_brand_title"
              placeholder="Brand title"
              errors={errors}
              errorMessage="this is required"
            />
          </div>
        </div>
        {/* Our work ability*/}
        <div className="bg-white inline-block min-w-full align-middle  pt-5 pb-8 px-8 rounded-lg mt-8">
          <ContentTitle title="Working Ability" />
          <div className="grid grid-cols-12 gap-4">
            <InputLabel labelText="Title" />
            <TextInput
              register={register}
              name="our_work_ability_title"
              placeholder="title"
              errors={errors}
              errorMessage="this is required"
            />

            <InputLabel labelText="Description" />

            <TextAreaInput
              register={register}
              name="our_work_ability_des"
              placeholder="description"
              errors={errors}
              errorMessage="this is required"
            />
            <InputLabel labelText="Image" />
            <div className="col-span-12 xl:col-span-10">
              <Uploader
                setImageUrl={setAboutOurWorkAbilityImg}
                imageUrl={aboutOurWorkAbilityImg}
              />
            </div>
          </div>
        </div>

        {/* Bnner*/}
        <div className="bg-white inline-block min-w-full align-middle  pt-5 pb-8 px-8 rounded-lg mt-8">
          <ContentTitle title="Banner" />
          <div className="grid grid-cols-12 gap-4">
            <InputLabel labelText="Image" />
            <div className="col-span-12 xl:col-span-10">
              <Uploader
                setImageUrl={setAboutBannerImg}
                imageUrl={aboutBannerImg}
              />
            </div>
            <InputLabel labelText="Title" />
            <TextInput
              register={register}
              name="about_banner_title"
              placeholder="title"
              errors={errors}
              errorMessage="this is required"
            />

            <InputLabel labelText="Description" />

            <TextAreaInput
              register={register}
              name="about_banner_des"
              placeholder="description"
              errors={errors}
              errorMessage="this is required"
            />
          </div>
        </div>

        {/* Why Choose us */}
        <div className="bg-white inline-block min-w-full align-middle  pt-5 pb-8 px-8 rounded-lg mt-8">
          <ContentTitle title="Why Choose Us" />
          <div className="grid grid-cols-12 gap-4">
            <InputLabel labelText="Image" />
            <div className="col-span-12 xl:col-span-10">
              <Uploader
                setImageUrl={setAboutWhyChooseImg}
                imageUrl={aboutWhyChooseImg}
              />
            </div>

            <InputLabel labelText="Sub Title" />
            <TextInput
              register={register}
              name="why_choose_us_sub_title"
              placeholder="Sub Title"
              errors={errors}
              errorMessage="this is required"
            />
            <InputLabel labelText="Title" />
            <TextInput
              register={register}
              name="why_choose_us_title"
              placeholder="Title"
              errors={errors}
              errorMessage="this is required"
            />
            <InputLabel labelText="Description" />
            <TextAreaInput
              register={register}
              name="why_choose_us_description"
              placeholder="description"
              errors={errors}
              errorMessage="this is required"
            />
            <InputLabel labelText="Why Choose-1 title" />
            <TextInput
              register={register}
              name="why_choose_one_title"
              placeholder="Title"
              errors={errors}
              errorMessage="this is required"
            />
            <InputLabel labelText="Why Choose-1 Des" />
            <TextAreaInput
              register={register}
              name="why_choose_one_des"
              placeholder="des"
              errors={errors}
              errorMessage="this is required"
            />

            <InputLabel labelText="Why Choose-2 title" />
            <TextInput
              register={register}
              name="why_choose_two_title"
              placeholder="Title"
              errors={errors}
              errorMessage="this is required"
            />
            <InputLabel labelText="Why Choose-2 Des" />
            <TextAreaInput
              register={register}
              name="why_choose_two_des"
              placeholder="des"
              errors={errors}
              errorMessage="this is required"
            />

            <InputLabel labelText="Why Choose-3 title" />
            <TextInput
              register={register}
              name="why_choose_three_title"
              placeholder="Title"
              errors={errors}
              errorMessage="this is required"
            />
            <InputLabel labelText="Why Choose-3 Des" />
            <TextAreaInput
              register={register}
              name="why_choose_three_des"
              placeholder="des"
              errors={errors}
              errorMessage="this is required"
            />

            <InputLabel labelText="Why Choose-4 title" />
            <TextInput
              register={register}
              name="why_choose_four_title"
              placeholder="Title"
              errors={errors}
              errorMessage="this is required"
            />
            <InputLabel labelText="Why Choose-4 Des" />
            <TextAreaInput
              register={register}
              name="why_choose_four_des"
              placeholder="des"
              errors={errors}
              errorMessage="this is required"
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default AboutCustomization;
