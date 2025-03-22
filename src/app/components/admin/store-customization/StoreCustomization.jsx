"use client";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AboutCustomization from "./aboutCustomization/AboutCustomization";
import HomeCustomization from "./homoCustomization/HomeCustomization";
import ContactCustomization from "./contactCustomization/ContactCustomization";
import TermsConditionCustomization from "./termsCondition/TermsConditionCustomization";
const StoreCustomization = () => {
  return (
    <>
      <h2 className="text-lg font-semibold">Store Customization</h2>
      <div className="mt-8">
        <Tabs>
          <TabList className="border-b-0 rounded-lg inline-flex items-center">
            <Tab className="px-6 py-2 rounded-lg cursor-pointer outline-none">
              Home
            </Tab>

            <Tab className="px-6 py-2 rounded-lg cursor-pointer outline-none">
              Terms & Condition
            </Tab>
            <Tab className="px-6 py-2 rounded-lg cursor-pointer outline-none">
              About
            </Tab>
            <Tab className="px-6 py-2 rounded-lg cursor-pointer outline-none">
              Contact-us
            </Tab>
          </TabList>

          <TabPanel>
            <HomeCustomization />
          </TabPanel>

          <TabPanel>
            <TermsConditionCustomization />
          </TabPanel>
          <TabPanel>
            <AboutCustomization />
          </TabPanel>
          <TabPanel>
            <ContactCustomization />
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
};

export default StoreCustomization;
