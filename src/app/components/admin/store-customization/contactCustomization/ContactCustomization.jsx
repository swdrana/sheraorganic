import React from "react";
import Uploader from "../../imageUploader/Uploader";
import useStoreCustomize from "@/app/hooks/useStoreCustomize";
import ContentTitle from "../common/ContentTitle";
import InputLabel from "../common/InputLabel";
import TextInput from "../common/TextInput";
import TextAreaInput from "../common/TextAreaInput";

const ContactCustomization = () => {
  const { contacImg, setContactImg, handleSubmit, onSubmit, register, errors } =
    useStoreCustomize();
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="relative">
        <div className="sticky top-2 z-20 flex justify-end">
          <button
            type="submit"
            className="rounded-md bg-brand px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Update
          </button>
        </div>
        <div className="inline-block min-w-full align-middle bg-white pt-5 pb-8 px-8 rounded-lg mt-8">
          <ContentTitle title="Contact Section" />
          <div className="pl-8 mt-8">
            <div className="grid grid-cols-12 gap-4">
              <InputLabel labelText="Office address-1" />
              <TextInput
                register={register}
                name="contact_office_address_one"
                placeholder=" office address-1"
                errors={errors}
                errorMessage="this is required"
              />
              <InputLabel labelText="Office address-2" />
              <TextInput
                register={register}
                name="contact_office_address_two"
                placeholder=" office address-2"
                errors={errors}
                errorMessage="this is required"
              />
              <InputLabel labelText="Number" />
              <TextInput
                register={register}
                name="contact_emergency_call"
                placeholder="+98765432"
                errors={errors}
                errorMessage="this is required"
              />
              <InputLabel labelText="General Comunication" />
              <TextInput
                register={register}
                name="contact_general_comunication"
                placeholder="exampla@gmail.com"
                errors={errors}
                errorMessage="this is required"
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ContactCustomization;
