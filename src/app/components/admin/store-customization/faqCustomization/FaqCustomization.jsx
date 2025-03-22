import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Uploader from '../../imageUploader/Uploader';
import useStoreCustomize from '@/app/hooks/useStoreCustomize';
import ContentTitle from '../common/ContentTitle';
import SwitchToggle from '../../form/switch/SwitchToggle';
import InputLabel from '../common/InputLabel';
import TextAreaInput from '../common/TextAreaInput';
import TextInput from '../common/TextInput';

const FaqCustomization = () => {
    const {handleSubmit,onSubmit,allowFaq,setAllowFaq,
        faqImg,setFaqImg,register,errors,allowHaveFaq,setAllowHaveFaq}=useStoreCustomize()
  return (
    <>
        <form onSubmit={handleSubmit(onSubmit)} className="relative">
            <div className="sticky top-2 z-20 flex justify-end">
                <button type='submit' className="rounded-md bg-brand px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">Update</button>
            </div>
            <div className="inline-block min-w-full align-middle bg-white pt-5 pb-8 px-8 rounded-lg mt-8">
            <ContentTitle title="Faq Section"/>
                <div className="grid grid-cols-12 gap-4">
                <InputLabel labelText="Enable This Block
"/>
                <div className="col-span-12 xl:col-span-10">
                      <SwitchToggle handleProcess={ setAllowFaq} processOption={allowFaq} />  
                    </div>
                    {
                        allowFaq && <><InputLabel labelText="Sub title"/>
                        <TextInput register={register} name="faq_sub_title" placeholder="faq"  errors={errors}  errorMessage="this is required"/>
                        <InputLabel labelText="Title"/>
                        <TextInput register={register} name="faq_title" placeholder="Frequently asked question"  errors={errors}  errorMessage="this is required"/>
                        <InputLabel labelText="Description"/>
                        <TextAreaInput register={register} name="faq_description" placeholder="Product teams"  errors={errors}  errorMessage="this is required"/>

              <InputLabel labelText="Image"/>
              <div className="col-span-12 xl:col-span-10">
                  <Uploader setImageUrl={setFaqImg} imageUrl={faqImg} />
              </div></>
                    }
                </div>
               
                {
                    allowFaq && <><div className="pl-8 mt-8">
                    <h4 className="text-md font-semibold pb-3 border-b mb-5">Question and Answeer</h4>
                    <Tabs>
                        <TabList className="bg-white border-b-0 rounded-lg inline-flex items-center flex-wrap">
                            <Tab className="px-3 py-1 rounded-lg bg-white cursor-pointer outline-none">Tab 1</Tab>
                            <Tab className="px-3 py-1 rounded-lg bg-white cursor-pointer outline-none">Tab 2</Tab>
                            <Tab className="px-3 py-1 rounded-lg bg-white cursor-pointer outline-none">Tab 3</Tab>
                        </TabList>
{/* tab-1 */}
                        <TabPanel>
                            <div className="grid grid-cols-12 gap-4 mt-8">
                            <InputLabel labelText="Tab Title"/>
                            <TextInput register={register} name="faq_tab_one_title" placeholder="Shipping Information"  errors={errors}  errorMessage="this is required"/>

                            <InputLabel labelText="Question one"/>
                            <TextInput register={register} name="faq_tab_one_question_one" placeholder="queston-one"  errors={errors}  errorMessage="this is required"/>
                            <InputLabel labelText="Answeer one"/>
                            <TextInput register={register} name="faq_tab_one_answeer_one" placeholder="answeer-one"  errors={errors}  errorMessage="this is required"/>

                            <InputLabel labelText="Question two"/>
                            <TextInput register={register} name="faq_tab_one_question_two" placeholder="queston-two"  errors={errors}  errorMessage="this is required"/>
                            <InputLabel labelText="Answeer two"/>
                            <TextInput register={register} name="faq_tab_one_answeer_two" placeholder="answeer-two"  errors={errors}  errorMessage="this is required"/>

                            <InputLabel labelText="Question three"/>
                            <TextInput register={register} name="faq_tab_one_question_three" placeholder="queston-three"  errors={errors}  errorMessage="this is required"/>
                            <InputLabel labelText="Answeer three"/>
                            <TextInput register={register} name="faq_tab_one_answeer_three" placeholder="answeer-three"  errors={errors}  errorMessage="this is required"/>

                            <InputLabel labelText="Question four"/>
                            <TextInput register={register} name="faq_tab_one_question_four" placeholder="queston-four"  errors={errors}  errorMessage="this is required"/>
                            <InputLabel labelText="Answeer four"/>
                            <TextInput register={register} name="faq_tab_one_answeer_four" placeholder="answeer-four"  errors={errors}  errorMessage="this is required"/>

                            <InputLabel labelText="Question five"/>
                            <TextInput register={register} name="faq_tab_one_question_five" placeholder="queston-five"  errors={errors}  errorMessage="this is required"/>
                            <InputLabel labelText="Answeer five"/>
                            <TextInput register={register} name="faq_tab_one_answeer_five" placeholder="answeer-five"  errors={errors}  errorMessage="this is required"/>

                            <InputLabel labelText="Question six"/>
                            <TextInput register={register} name="faq_tab_one_question_six" placeholder="queston-six"  errors={errors}  errorMessage="this is required"/>
                            <InputLabel labelText="Answeer six"/>
                            <TextInput register={register} name="faq_tab_one_answeer_six" placeholder="answeer-six"  errors={errors}  errorMessage="this is required"/>

                            <InputLabel labelText="Question seven"/>
                            <TextInput register={register} name="faq_tab_one_question_seven" placeholder="queston-seven"  errors={errors}  errorMessage="this is required"/>
                            <InputLabel labelText="Answeer seven"/>
                            <TextInput register={register} name="faq_tab_one_answeer_seven" placeholder="answeer-seven"  errors={errors}  errorMessage="this is required"/>
                            <InputLabel labelText="Question eight"/>
                            <TextInput register={register} name="faq_tab_one_question_eight" placeholder="queston-seven"  errors={errors}  errorMessage="this is required"/>
                            <InputLabel labelText="Answeer eight"/>
                            <TextInput register={register} name="faq_tab_one_answeer_eight" placeholder="answeer-eight"  errors={errors}  errorMessage="this is required"/>
                            <InputLabel labelText="Question nine"/>
                            <TextInput register={register} name="faq_tab_one_question_nine" placeholder="queston-nine"  errors={errors}  errorMessage="this is required"/>
                            <InputLabel labelText="Answeer nine"/>
                            <TextInput register={register} name="faq_tab_one_answeer_nine" placeholder="answeer-nine"  errors={errors}  errorMessage="this is required"/>
                            <InputLabel labelText="Question ten"/>
                            <TextInput register={register} name="faq_tab_one_question_ten" placeholder="queston-seven"  errors={errors}  errorMessage="this is required"/>
                            <InputLabel labelText="Answeer ten"/>
                            <TextInput register={register} name="faq_tab_one_answeer_ten" placeholder="answeer-eight"  errors={errors}  errorMessage="this is required"/>
                            </div>
                        </TabPanel>
                        {/* tab-2 */}
                        <TabPanel>
                            <div className="grid grid-cols-12 gap-4 mt-8">
                            <InputLabel labelText="Tab Title"/>
                            <TextInput register={register} name="faq_tab_two_title" placeholder="Shipping Information"  errors={errors}  errorMessage="this is required"/>

                            <InputLabel labelText="Question one"/>
                            <TextInput register={register} name="faq_tab_two_question_one" placeholder="queston-one"  errors={errors}  errorMessage="this is required"/>
                            <InputLabel labelText="Answeer one"/>
                            <TextInput register={register} name="faq_tab_two_answeer_one" placeholder="answeer-one"  errors={errors}  errorMessage="this is required"/>

                            <InputLabel labelText="Question two"/>
                            <TextInput register={register} name="faq_tab_two_question_two" placeholder="queston-two"  errors={errors}  errorMessage="this is required"/>
                            <InputLabel labelText="Answeer two"/>
                            <TextInput register={register} name="faq_tab_two_answeer_two" placeholder="answeer-two"  errors={errors}  errorMessage="this is required"/>

                            <InputLabel labelText="Question three"/>
                            <TextInput register={register} name="faq_tab_two_question_three" placeholder="queston-three"  errors={errors}  errorMessage="this is required"/>
                            <InputLabel labelText="Answeer three"/>
                            <TextInput register={register} name="faq_tab_two_answeer_three" placeholder="answeer-three"  errors={errors}  errorMessage="this is required"/>

                            <InputLabel labelText="Question four"/>
                            <TextInput register={register} name="faq_tab_two_question_four" placeholder="queston-four"  errors={errors}  errorMessage="this is required"/>
                            <InputLabel labelText="Answeer four"/>
                            <TextInput register={register} name="faq_tab_two_answeer_four" placeholder="answeer-four"  errors={errors}  errorMessage="this is required"/>

                            <InputLabel labelText="Question five"/>
                            <TextInput register={register} name="faq_tab_two_question_five" placeholder="queston-five"  errors={errors}  errorMessage="this is required"/>
                            <InputLabel labelText="Answeer five"/>
                            <TextInput register={register} name="faq_tab_two_answeer_five" placeholder="answeer-five"  errors={errors}  errorMessage="this is required"/>

                            <InputLabel labelText="Question six"/>
                            <TextInput register={register} name="faq_tab_two_question_six" placeholder="queston-six"  errors={errors}  errorMessage="this is required"/>
                            <InputLabel labelText="Answeer six"/>
                            <TextInput register={register} name="faq_tab_two_answeer_six" placeholder="answeer-six"  errors={errors}  errorMessage="this is required"/>

                            <InputLabel labelText="Question seven"/>
                            <TextInput register={register} name="faq_tab_two_question_seven" placeholder="queston-seven"  errors={errors}  errorMessage="this is required"/>
                            <InputLabel labelText="Answeer seven"/>
                            <TextInput register={register} name="faq_tab_two_answeer_seven" placeholder="answeer-seven"  errors={errors}  errorMessage="this is required"/>
                            <InputLabel labelText="Question eight"/>
                            <TextInput register={register} name="faq_tab_two_question_eight" placeholder="queston-seven"  errors={errors}  errorMessage="this is required"/>
                            <InputLabel labelText="Answeer eight"/>
                            <TextInput register={register} name="faq_tab_two_answeer_eight" placeholder="answeer-eight"  errors={errors}  errorMessage="this is required"/>
                            <InputLabel labelText="Question nine"/>
                            <TextInput register={register} name="faq_tab_two_question_nine" placeholder="queston-nine"  errors={errors}  errorMessage="this is required"/>
                            <InputLabel labelText="Answeer nine"/>
                            <TextInput register={register} name="faq_tab_two_answeer_nine" placeholder="answeer-nine"  errors={errors}  errorMessage="this is required"/>
                            <InputLabel labelText="Question ten"/>
                            <TextInput register={register} name="faq_tab_two_question_ten" placeholder="queston-seven"  errors={errors}  errorMessage="this is required"/>
                            <InputLabel labelText="Answeer ten"/>
                            <TextInput register={register} name="faq_tab_two_answeer_ten" placeholder="answeer-eight"  errors={errors}  errorMessage="this is required"/>
                            </div>
                        </TabPanel>

                        <TabPanel>
                            <div className="grid grid-cols-12 gap-4 mt-8">
                            <InputLabel labelText="Tab Title"/>
                            <TextInput register={register} name="faq_tab_three_title" placeholder="Shipping Information"  errors={errors}  errorMessage="this is required"/>

                            <InputLabel labelText="Question one"/>
                            <TextInput register={register} name="faq_tab_three_question_one" placeholder="queston-one"  errors={errors}  errorMessage="this is required"/>
                            <InputLabel labelText="Answeer one"/>
                            <TextInput register={register} name="faq_tab_three_answeer_one" placeholder="answeer-one"  errors={errors}  errorMessage="this is required"/>

                            <InputLabel labelText="Question two"/>
                            <TextInput register={register} name="faq_tab_three_question_two" placeholder="queston-two"  errors={errors}  errorMessage="this is required"/>
                            <InputLabel labelText="Answeer two"/>
                            <TextInput register={register} name="faq_tab_three_answeer_two" placeholder="answeer-two"  errors={errors}  errorMessage="this is required"/>

                            <InputLabel labelText="Question three"/>
                            <TextInput register={register} name="faq_tab_three_question_three" placeholder="queston-three"  errors={errors}  errorMessage="this is required"/>
                            <InputLabel labelText="Answeer three"/>
                            <TextInput register={register} name="faq_tab_three_answeer_three" placeholder="answeer-three"  errors={errors}  errorMessage="this is required"/>

                            <InputLabel labelText="Question four"/>
                            <TextInput register={register} name="faq_tab_three_question_four" placeholder="queston-four"  errors={errors}  errorMessage="this is required"/>
                            <InputLabel labelText="Answeer four"/>
                            <TextInput register={register} name="faq_tab_three_answeer_four" placeholder="answeer-four"  errors={errors}  errorMessage="this is required"/>

                            <InputLabel labelText="Question five"/>
                            <TextInput register={register} name="faq_tab_three_question_five" placeholder="queston-five"  errors={errors}  errorMessage="this is required"/>
                            <InputLabel labelText="Answeer five"/>
                            <TextInput register={register} name="faq_tab_three_answeer_five" placeholder="answeer-five"  errors={errors}  errorMessage="this is required"/>

                            <InputLabel labelText="Question six"/>
                            <TextInput register={register} name="faq_tab_three_question_six" placeholder="queston-six"  errors={errors}  errorMessage="this is required"/>
                            <InputLabel labelText="Answeer six"/>
                            <TextInput register={register} name="faq_tab_three_answeer_six" placeholder="answeer-six"  errors={errors}  errorMessage="this is required"/>

                            <InputLabel labelText="Question seven"/>
                            <TextInput register={register} name="faq_tab_three_question_seven" placeholder="queston-seven"  errors={errors}  errorMessage="this is required"/>
                            <InputLabel labelText="Answeer seven"/>
                            <TextInput register={register} name="faq_tab_three_answeer_seven" placeholder="answeer-seven"  errors={errors}  errorMessage="this is required"/>

                            <InputLabel labelText="Question eight"/>
                            <TextInput register={register} name="faq_tab_three_question_eight" placeholder="queston-seven"  errors={errors}  errorMessage="this is required"/>
                            <InputLabel labelText="Answeer eight"/>
                            <TextInput register={register} name="faq_tab_three_answeer_eight" placeholder="answeer-eight"  errors={errors}  errorMessage="this is required"/>
                            <InputLabel labelText="Question nine"/>
                            <TextInput register={register} name="faq_tab_three_question_nine" placeholder="queston-nine"  errors={errors}  errorMessage="this is required"/>
                            <InputLabel labelText="Answeer nine"/>
                            <TextInput register={register} name="faq_tab_three_answeer_nine" placeholder="answeer-nine"  errors={errors}  errorMessage="this is required"/>
                            <InputLabel labelText="Question ten"/>
                            <TextInput register={register} name="faq_tab_three_question_ten" placeholder="queston-seven"  errors={errors}  errorMessage="this is required"/>
                            <InputLabel labelText="Answeer ten"/>
                            <TextInput register={register} name="faq_tab_three_answeer_ten" placeholder="answeer-eight"  errors={errors}  errorMessage="this is required"/>

                            </div>
                        </TabPanel>
                       
                    </Tabs>
                </div></>
                }
            </div>
            {/* Have question */}
            <div className="inline-block min-w-full align-middle bg-white pt-5 pb-8 px-8 rounded-lg mt-8">
            <ContentTitle title="Have Question"/>
                <div className="grid grid-cols-12 gap-4">
                <InputLabel labelText="Enable This Block
"/>
                <div className="col-span-12 xl:col-span-10">
                      <SwitchToggle handleProcess={ setAllowHaveFaq} processOption={allowHaveFaq} />  
                    </div>
                    {
                        allowHaveFaq && <><InputLabel labelText="Title"/>
                        <TextInput register={register} name="faq_have_title" placeholder="faq have question"  errors={errors}  errorMessage="this is required"/>
                        <InputLabel labelText="Description"/>
                        <TextAreaInput register={register} name="faq_have_description" placeholder="description"  errors={errors}  errorMessage="this is required"/>
                        <InputLabel labelText="Button Name"/>
                        <TextInput register={register} name="faq_have_button_name" placeholder="faq have question"  errors={errors}  errorMessage="this is required"/>
                        <InputLabel labelText="Button url"/>
                        <TextInput register={register} name="faq_have_button_url" placeholder="faq have question"  errors={errors}  errorMessage="this is required"/></>
                    }
                </div>
            </div>
        </form>
    </>
  )
}

export default FaqCustomization