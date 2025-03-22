"use client";
import Breadcrumb from "@/app/components/store/common/others/Breadcrumb";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getAllCoupons } from "@/app/backend/controllers/coupon.controller";
import OfferTimer from "@/app/components/store/coupon/OfferTimer";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Loading from "../../components/store/common/others/Loading";
import PreLoader from "../../components/store/common/others/PreLoader";
const page = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState("");
  // redux store call
  // const setting = useSelector((state) => state.setting);
  // const { settingItem } = setting;
  // const storeCustomizationSetting = settingItem.find(
  //   (value) => value.name === 'storeCustomizationSetting'
  // );

  const [enterCouponCodeList, setEnterCouponCodeList] = useState([]);
  // console.log("enterCouponCodeList", enterCouponCodeList);

  const [copied, setCopied] = useState(false);

  const handleCopied = (code) => {
    setCopiedCode(code);
    setCopied(true);
  };
  // console.log("loading..", loading);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getAllCoupons();
        // console.log("res..in", res);

        // Filter out active coupons based on endTime
        const activeCoupons = res?.filter((coupon) =>
          dayjs().isBefore(dayjs(coupon.endTime))
        );
        console.log("activeCoupons", activeCoupons);

        setEnterCouponCodeList(activeCoupons);
      } catch (error) {
        console.error("Error fetching coupons:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Breadcrumb title="All Coupons" page="coupons" />
      {loading ? (
        <PreLoader />
      ) : (
        <section className="tt-campaigns ptb-100">
          <div className="container">
            <div className="row g-4 justify-content-center">
              {enterCouponCodeList?.map((c, i) => (
                <div key={i} className="col-lg-6 col-md-6">
                  <div
                    className="card shadow-lg border-0 tt-coupon-single tt-gradient-top"
                    style={{
                      background: `url(${c.bannerImage}) no-repeat center center / cover`,
                    }}
                  >
                    <div className="card-body text-center p-5">
                      <div className="offer-text mb-2 justify-content-center">
                        <div className="up-to fw-bold text-light">UP TO</div>
                        <div className="display-4 fw-bold text-danger">
                          {c?.discountPercentage}
                        </div>
                        <p className="mb-0 fw-bold text-danger">
                          <span>%</span> <br /> Off
                        </p>
                      </div>
                      <CopyToClipboard
                        text={c.couponCode}
                        onCopy={() => handleCopied(c.couponCode)}
                      >
                        <div className="coupon-row">
                          <span className="copyCode">{c.couponCode}</span>
                          {copied && c.couponCode === copiedCode ? (
                            <span className="copyBtn">Copied!</span>
                          ) : (
                            <span className="copyBtn">Copy Code</span>
                          )}
                        </div>
                      </CopyToClipboard>
                      <h5 className="text-light">Valid Till:</h5>
                      <ul
                        className="timing-countdown countdown-timer d-inline-block gap-2 mt-3"
                        data-date="06/30/2023 23:59:59"
                      >
                        <OfferTimer expiryTimestamp={new Date(c.endTime)} />
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default page;
