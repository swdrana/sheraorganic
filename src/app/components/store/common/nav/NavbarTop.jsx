"use client";

import useSetting from "../../dataFetching/useSetting";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import skeleton CSS if needed

const NavbarTop = () => {
  const { setting, settingLoading } = useSetting();

  return (
    <>
      <div className="ghead-topbar bg-primary d-none d-lg-block">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xxl-4 col-xl-3">
              <div className="topbar-info d-none d-xl-block">
                <p className="text-white fs-sm fw-medium mb-0">
                  {setting?.home?.store_title ? (
                    setting.home.store_title
                  ) : (
                    <Skeleton width={150} height={20} />
                  )}
                </p>
              </div>
            </div>
            <div className="col-xxl-8 col-xl-9">
              <ul className="d-flex align-items-center justify-content-center justify-content-xl-end topbar-info-right">
                <li className="nav-item">
                  <a
                    className="d-flex align-items-center gap-1"
                    href="mailto:groshop@support.com"
                  >
                    <span className="me-1">
                      <svg
                        width="16"
                        height="14"
                        viewBox="0 0 20 14"
                        fill="none"
                        xmlns="http:/www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.2422 0H1.75781C0.790547 0 0 0.783572 0 1.75V12.25C0 13.2168 0.791055 14 1.75781 14H18.2422C19.2095 14 20 13.2164 20 12.25V1.75C20 0.783339 19.2091 0 18.2422 0ZM17.9723 1.16667C17.4039 1.73433 10.7283 8.40194 10.4541 8.67588C10.225 8.90462 9.77512 8.90478 9.54594 8.67588L2.02773 1.16667H17.9723ZM1.17188 12.0355V1.96447L6.21348 7L1.17188 12.0355ZM2.02773 12.8333L7.04078 7.82631L8.71598 9.49951C9.40246 10.1852 10.5978 10.1849 11.2841 9.49951L12.9593 7.82635L17.9723 12.8333H2.02773ZM18.8281 12.0355L13.7865 7L18.8281 1.96447V12.0355Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                    {setting?.home?.gmail ? (
                      setting.home.gmail
                    ) : (
                      <Skeleton width={150} height={20} />
                    )}
                  </a>
                </li>
                <li className="nav-item d-flex align-items-center gap-1">
                  <span className="me-1">
                    <svg
                      width="12"
                      height="17"
                      viewBox="0 0 12 17"
                      fill="none"
                      xmlns="http:/www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.00011 8.16427C7.44543 8.16427 8.62131 6.98781 8.62131 5.54175C8.62131 4.09569 7.44543 2.91925 6.00011 2.91925C4.55478 2.91925 3.37891 4.09569 3.37891 5.54175C3.37891 6.98781 4.55478 8.16427 6.00011 8.16427ZM6.00011 3.85662C6.92883 3.85662 7.68441 4.61259 7.68441 5.54175C7.68441 6.47093 6.92886 7.2269 6.00011 7.2269C5.07136 7.2269 4.31581 6.47093 4.31581 5.54175C4.31581 4.61259 5.07139 3.85662 6.00011 3.85662Z"
                        fill="white"
                        stroke="white"
                        strokeWidth="0.3"
                      />
                      <path
                        d="M3.14593 10.2541C3.85594 11.2159 3.57069 10.8418 5.61579 13.7635C5.80167 14.0301 6.19695 14.0314 6.38389 13.7639C8.43824 10.8284 8.15557 11.2002 8.85403 10.254C9.56155 9.29555 10.2932 8.30443 10.6941 7.14299C11.2744 5.46171 11.0236 3.79818 9.9879 2.45881C9.98787 2.45881 9.98787 2.45878 9.98784 2.45878C9.03913 1.23225 7.54834 0.5 5.99998 0.5C4.45163 0.5 2.96083 1.23225 2.01209 2.45884C0.976407 3.79821 0.725568 5.46177 1.30588 7.14305C1.70675 8.30446 2.43841 9.29558 3.14593 10.2541ZM2.75305 3.03246C3.52562 2.03369 4.73944 1.43737 5.99998 1.43737C7.26052 1.43737 8.47434 2.03369 9.24691 3.03246L9.24684 3.03243C10.0828 4.11343 10.2822 5.46462 9.80852 6.83705C9.4544 7.86293 8.76606 8.79539 8.10039 9.69717C7.5821 10.3993 7.73721 10.1845 5.99998 12.6763C4.26456 10.187 4.41771 10.399 3.89957 9.69717C3.2339 8.79539 2.54556 7.86289 2.19144 6.83705C1.71775 5.46459 1.91718 4.11343 2.75305 3.03246Z"
                        fill="white"
                        stroke="white"
                        strokeWidth="0.3"
                      />
                      <path
                        d="M3.53116 12.2865C3.393 12.0677 3.10369 12.0023 2.88495 12.1405L1.55299 12.9823C1.26243 13.1659 1.26214 13.591 1.55299 13.7748L5.75031 16.4276C5.90312 16.5242 6.09787 16.5241 6.25065 16.4276L10.448 13.7748C10.7386 13.5912 10.7388 13.1661 10.448 12.9823L9.116 12.1405C8.8972 12.0023 8.60792 12.0677 8.46979 12.2865C8.3316 12.5053 8.39693 12.7948 8.61567 12.933L9.32065 13.3786L6.00046 15.4769L2.6803 13.3786L3.38529 12.933C3.60402 12.7948 3.66933 12.5053 3.53116 12.2865Z"
                        fill="white"
                        stroke="white"
                        strokeWidth="0.3"
                      />
                    </svg>
                  </span>
                  {setting?.home?.address ? (
                    setting.home.address
                  ) : (
                    <Skeleton width={150} height={20} />
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarTop;
