import React, { useState, useEffect } from "react";
import { useTimer } from "react-timer-hook";

const WeeklyBestDealsOfferTime = ({ expiryTimestamp }) => {
  const [isClient, setIsClient] = useState(false);
  const { seconds, minutes, hours, days } = useTimer({ expiryTimestamp });

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <>
        <li className="list-inline-item bg-white position-relative z-1 rounded-2">
          <div className="h5 mb-1 days fs-sm">0</div>
          <span className="gshop-subtitle fs-xxs d-block">Days</span>
        </li>
        <li className="list-inline-item bg-white position-relative z-1 rounded-2">
          <div className="h5 mb-1 hours fs-sm">0</div>
          <span className="gshop-subtitle fs-xxs d-block">Hours</span>
        </li>
        <li className="list-inline-item bg-white position-relative z-1 rounded-2">
          <div className="h5 mb-1 minutes fs-sm">0</div>
          <span className="gshop-subtitle fs-xxs d-block">Minutes</span>
        </li>
        <li className="list-inline-item bg-white position-relative z-1 rounded-2">
          <div className="h5 mb-1 seconds fs-sm">0</div>
          <span className="gshop-subtitle fs-xxs d-block">Seconds</span>
        </li>
      </>
    );
  }

  return (
    <>
      <li className="list-inline-item bg-white position-relative z-1 rounded-2">
        <div className="h5 mb-1 days fs-sm">{days}</div>
        <span className="gshop-subtitle fs-xxs d-block">Days</span>
      </li>
      <li className="list-inline-item bg-white position-relative z-1 rounded-2">
        <div className="h5 mb-1 hours fs-sm">{hours}</div>
        <span className="gshop-subtitle fs-xxs d-block">Hours</span>
      </li>
      <li className="list-inline-item bg-white position-relative z-1 rounded-2">
        <div className="h5 mb-1 minutes fs-sm">{minutes}</div>
        <span className="gshop-subtitle fs-xxs d-block">Minutes</span>
      </li>
      <li className="list-inline-item bg-white position-relative z-1 rounded-2">
        <div className="h5 mb-1 seconds fs-sm">{seconds}</div>
        <span className="gshop-subtitle fs-xxs d-block">Seconds</span>
      </li>
    </>
  );
};

export default React.memo(WeeklyBestDealsOfferTime);
