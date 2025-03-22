import React from "react";
import Uploader from "../../imageUploader/Uploader";
import useStoreCustomize from "@/app/hooks/useStoreCustomize";
import ContentTitle from "../common/ContentTitle";
import InputLabel from "../common/InputLabel";
import TextInput from "../common/TextInput";
import TextAreaInput from "../common/TextAreaInput";
import ContentSubtitle from "../common/ContentSubtitle";
import SwitchToggle from "../../form/switch/SwitchToggle";

const AddAndBanner = () => {
  const { handleSubmit, onSubmit, register, errors, addOneImage,
    setAllowAddOne,
    setAddOneImage,
    allowAddTwo,
    setAllowAddTwo,
    addTwoImage,
    setAddTwoImage,
    allowAddThree,
    setAllowAddThree,
    addThreeImage,
    setAddThreeImage,
    addFourImage,
    setAddFourImage,
    allowAddFour, setAllowAddFour,allowAddOne} =
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
          <ContentTitle title="Add section" />
          {/* add-1 */}
          <div className="grid grid-cols-12 gap-4">
            <InputLabel
              labelText="Enable add -1
"
            />
            <div className="col-span-12 xl:col-span-10">
              <SwitchToggle
                handleProcess={setAllowAddOne}
                processOption={allowAddOne}
              />
            </div>
           {
            allowAddOne && <>  <InputLabel
            labelText="Add -1
"
          />
          <div className="col-span-12 xl:col-span-10">
          <Uploader setImageUrl={setAddOneImage} imageUrl={addOneImage} />
          </div> </>
           }
          </div>
          {/* add -2 */}
          <div className="grid grid-cols-12 gap-4 mt-14">
            <InputLabel
              labelText="Enable add -2
"
            />
            <div className="col-span-12 xl:col-span-10">
              <SwitchToggle
                handleProcess={setAllowAddTwo}
                processOption={allowAddTwo}
              />
            </div>
           {
            allowAddTwo && <> <InputLabel
            labelText="Add -2
"
          />
          <div className="col-span-12 xl:col-span-10">
          <Uploader setImageUrl={setAddTwoImage} imageUrl={addTwoImage} />
          </div> </>
           }
          </div>
          {/* add -3 */}
          <div className="grid grid-cols-12 gap-4 mt-14">
            <InputLabel
              labelText="Enable add -3
"
            />
            <div className="col-span-12 xl:col-span-10">
              <SwitchToggle
                handleProcess={setAllowAddThree}
                processOption={allowAddThree}
              />
            </div>
           {
            allowAddThree && <>  <InputLabel
            labelText="Add -3
"
          />
          <div className="col-span-12 xl:col-span-10">
          <Uploader setImageUrl={setAddThreeImage} imageUrl={addThreeImage} />
          </div></>
           }
          </div>
          {/* add -4 */}
          <div className="grid grid-cols-12 gap-4 mt-14">
            <InputLabel
              labelText="Enable This add
"
            />
            <div className="col-span-12 xl:col-span-10">
              <SwitchToggle
                handleProcess={setAllowAddFour}
                processOption={allowAddFour}
              />
            </div>
            {
                allowAddFour && <> <InputLabel
                labelText="Add -4
  "
              />
              <div className="col-span-12 xl:col-span-10">
              <Uploader setImageUrl={setAddFourImage} imageUrl={addFourImage} />
              </div></>
            }
          </div>
        </div>
      </form>
    </>
  );
};

export default AddAndBanner;
