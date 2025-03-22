"use client";

import Loading from "../common/others/Loading";
import PreLoader from "../common/others/PreLoader";
import useSetting from "../dataFetching/useSetting";

const TermsCondition = () => {
  const { setting, settingLoading } = useSetting();
  console.log("settings in terms an", setting?.terms?.value, settingLoading);
  return (
    <>
      {settingLoading ? (
        <PreLoader />
      ) : (
        <section className="blog-details py-5">
          <div className="container">
            <div className="row g-4">
              <div className="col-12">
                {/* <div className="blog-details-content bg-white rounded-2 py-6 px-5">
                <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
                  Welcome to Grostore!
                </h2>
                <p>
                  These terms and conditions outline the rules and regulations
                  for the use of grostore's Website, located at
                  https://grostore.com/. By accessing this website we assume you
                  accept these terms and conditions. Do not continue to use
                  Grostore if you do not agree to take all of the terms and
                  conditions stated on this page.
                </p>
                <p>
                  The following terminology applies to these Terms and
                  Conditions, Privacy Statement and Disclaimer Notice and all
                  Agreements: "Client", "You" and "Your" refers to you, the
                  person log on this website and compliant to the Company’s
                  terms and conditions. "The Company", "Ourselves", "We", "Our"
                  and "Us", refers to our Company. "Party", "Parties", or "Us",
                  refers to both the Client and ourselves. All terms refer to
                  the offer, acceptance and consideration of payment necessary
                  to undertake the process of our assistance to the Client in
                  the most appropriate manner for the express purpose of meeting
                  the Client’s needs in respect of provision of the Company’s
                  stated services, in accordance with and subject to, prevailing
                  law of Netherlands. Any use of the above terminology or other
                  words in the singular, plural, capitalization and/or he/she or
                  they, are taken as interchangeable and therefore as referring
                  to same.
                </p>

                <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
                  Cookies
                </h2>
                <p>
                  We employ the use of cookies. By accessing grostore, you
                  agreed to use cookies in agreement with the grostore's Privacy
                  Policy. Most interactive websites use cookies to let us
                  retrieve the user’s details for each visit. Cookies are used
                  by our website to enable the functionality of certain areas to
                  make it easier for people visiting our website. Some of our
                  affiliate/advertising partners may also use cookies.
                </p>
                <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
                  Cookies
                </h2>
                <p>
                  Unless otherwise stated, grostore and/or its licensors own the
                  intellectual property rights for all material on KachaBazar.
                  All intellectual property rights are reserved. You may access
                  this from KachaBazar for your own personal use subjected to
                  restrictions set in these terms and conditions.This Agreement
                  shall begin on the date hereof. Our Terms and Conditions were
                  created with the help of the Terms And Conditions Generator.
                </p>
                <p>
                  <strong>You must not:</strong>
                </p>
                <ul>
                  <li>
                    Identifiers (e.g. name, mailing address, email address,
                    phone number, credit/debit card number)
                  </li>
                  <li>
                    Characteristics of protected classifications (e.g. gender,
                    age)
                  </li>
                  <li>
                    Commercial information (e.g. products or services purchased,
                    purchase history)
                  </li>
                  <li>
                    Internet or other electronic network activity (e.g. browse
                    or search history)
                  </li>
                  <li>Geo location data (e.g. latitude or longitude)</li>
                  <li>
                    Audio, electronic, visual, or similar information (e.g.
                    recording of Guest service calls)
                  </li>
                  <li>
                    Inferences drawn from any of the above (e.g. preferences or
                    characteristics)
                  </li>
                </ul>
                <p>
                  Parts of this website offer an opportunity for users to post
                  and exchange opinions and information in certain areas of the
                  website. KachaBazar does not filter, edit, publish or review
                  Comments prior to their presence on the website. Comments do
                  not reflect the views and opinions of KachaBazar, its agents
                  and/or affiliates. Comments reflect the views and opinions of
                  the person who posts them.
                </p>
                <p>
                  To the extent permitted by applicable laws, KachaBazar shall
                  not be liable for the Comments or for any liability, damages
                  or expenses caused and/or suffered as a result of any use of
                  and/or posting of and/or appearance of the Comments on this
                  website.
                </p>

                <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
                  Content Liability
                </h2>
                <p>
                  We shall not be hold responsible for any content that appears
                  on your Website. You agree to protect and defend us against
                  all claims that is rising on your Website. No link(s) should
                  appear on any Website that may be interpreted as libelous,
                  obscene or criminal, or which infringes, otherwise violates,
                  or advocates the infringement or other violation of, any third
                  party rights.Without prior approval and written permission,
                  you may not create frames around our Webpages that alter in
                  any way the visual presentation or appearance of our Website.
                </p>
                <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
                  Your Privacy
                </h2>
                <p>Please read Privacy Policy</p>
                <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
                  Reservation of Rights
                </h2>
                <p>
                  We reserve the right to request that you remove all links or
                  any particular link to our Website. You approve to immediately
                  remove all links to our Website upon request. We also reserve
                  the right to amen these terms and conditions and it’s linking
                  policy at any time. By continuously linking to our Website,
                  you agree to be bound to and follow these linking terms and
                  conditions./
                </p>
                <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
                  Removal of links from our website
                </h2>
                <p>
                  If you find any link on our Website that is offensive for any
                  reason, you are free to contact and inform us any moment. We
                  will consider requests to remove links but we are not
                  obligated to or so or to respond to you directly. We do not
                  ensure that the information on this website is correct, we do
                  not warrant its completeness or accuracy; nor do we promise to
                  ensure that the website remains available or that the material
                  on the website is kept up to date.
                </p>
                <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
                  Disclaimer
                </h2>
                <p>
                  <strong>You must not:</strong>
                </p>
                <ol>
                  <li>
                    Limit or exclude our or your liability for death or personal
                    injury;
                  </li>
                  <li>
                    Limit or exclude our or your liability for fraud or
                    fraudulent misrepresentation;
                  </li>
                  <li>
                    Limit any of our or your liabilities in any way that is not
                    permitted under applicable law; or
                  </li>
                  <li>
                    Exclude any of our or your liabilities that may not be
                    excluded under applicable law.
                  </li>
                </ol>
                <p>
                  The limitations and prohibitions of liability set in this
                  Section and elsewhere in this disclaimer:
                </p>
                <ul>
                  <li>(a) are subject to the preceding paragraph; and</li>
                  <li>
                    (b) govern all liabilities arising under the disclaimer,
                    including liabilities arising in contract, in tort and for
                    breach of statutory duty.
                  </li>
                </ul>
                <p>
                  As long as the website and the information and services on the
                  website are provided free of charge, we will not be liable for
                  any loss or damage of any nature.
                </p>
              </div> */}
                {settingLoading ? (
                  <Loading></Loading>
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: setting?.terms?.value,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default TermsCondition;
