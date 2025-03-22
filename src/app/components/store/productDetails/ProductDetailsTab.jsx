import { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ReactPlayer from "react-player";
import dayjs from "dayjs";

import StarRating from "../common/others/StartRating";
const ProductDetailsTab = ({ product }) => {
  const [activeTab, setActiveTab] = useState("des");
  return (
    <>
      <Tabs className="product-info-tab next_style bg-white rounded-2 overflow-hidden pt-6 mt-4">
        <TabList className="nav nav-tabs justify-content-center gap-5 pt-info-tab-nav border-0">
          <Tab>
            <a
              type="button"
              onClick={() => setActiveTab("des")}
              href="#description"
              className={`${activeTab === "des" ? "active" : ""}`}
            >
              Description
            </a>
          </Tab>
          <Tab>
            <a
              type="button"
              onClick={() => setActiveTab("info")}
              href="#information"
              className={`${activeTab === "info" ? "active" : ""}`}
            >
              Video
            </a>
          </Tab>
          <Tab>
            <a
              type="button"
              onClick={() => setActiveTab("review")}
              href="#review"
              className={`${activeTab === "review" ? "active" : ""}`}
            >
              Reviews
            </a>
          </Tab>
        </TabList>
        <div className="tab-content">
          <TabPanel
            className={`tab-pane fade show  px-7 py-5 ${
              activeTab === "des" ? "active" : ""
            }`}
          >
            <h6 className="mb-2">Details:</h6>
            <div
              className="mb-4"
              dangerouslySetInnerHTML={{
                __html: product?.description,
              }}
            ></div>
          </TabPanel>
          <TabPanel
            className={`tab-pane fade show  px-7 py-5 ${
              activeTab === "info" ? "active" : ""
            }`}
          >
            <h6 className="my-2">Video Information:</h6>
            <ReactPlayer
              url={product?.videoUrl}
              controls
              width="100%"
              height="450px"
            />
          </TabPanel>
          <TabPanel
            className={`tab-pane fade show  px-7 py-5 ${
              activeTab === "review" ? "active" : ""
            }`}
          >
            <div className="review-tab-box bg-white rounded py-7">
              <div className="d-flex flex-wrap align-items-center justify-content-between">
                <div className="top-left">
                  <h5 className="mb-2">Reviews ({product?.ratings?.length})</h5>
                  <p className="mb-0">
                    Get specific details about this product from customers who
                    own it.
                  </p>
                  <StarRating rating={product?.averageRating} />
                </div>
              </div>
              <hr className="mt-4 mb-4" />
              {product?.ratings?.map((r, i) => (
                <div key={i} className="users_review">
                  <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap mt-5">
                    <div className="top-left d-flex align-items-center">
                      {/* <img
                      src="/img/authors/user-1.jpg"
                      alt="user"
                      className="flex-shrink-0 rounded"
                    /> */}
                      <div className="ms-3">
                        <h6 className="mb-1">{r?.name}</h6>
                        <span>{dayjs(r?.reviewDate).format("YYYY-MM-DD")}</span>
                      </div>
                    </div>
                    <StarRating rating={product?.averageRating} />
                  </div>
                  <p className="mt-3 mb-0">{r?.comment}</p>
                </div>
              ))}
            </div>
          </TabPanel>
        </div>
      </Tabs>
    </>
  );
};

export default ProductDetailsTab;
