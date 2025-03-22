import React from "react";
import { useTimer } from "react-timer-hook";

const OfferTimer = ({ expiryTimestamp }) => {
  // console.log("expiryTimestamp", expiryTimestamp);
  const { seconds, minutes, hours, days } = useTimer({ expiryTimestamp });

  return (
    <>
      <li className="list-inline-item bg-white position-relative z-1 rounded-2">
        <h5 className="mb-1 days fs-sm">{days}</h5>
        <span className="gshop-subtitle fs-xxs d-block">Days</span>
      </li>
      <li className="list-inline-item bg-white position-relative z-1 rounded-2">
        <h5 className="mb-1 hours fs-sm">{hours}</h5>
        <span className="gshop-subtitle fs-xxs d-block">Hours</span>
      </li>
      <li className="list-inline-item bg-white position-relative z-1 rounded-2">
        <h5 className="mb-1 minutes fs-sm">{minutes}</h5>
        <span className="gshop-subtitle fs-xxs d-block">Minutes</span>
      </li>
      <li className="list-inline-item bg-white position-relative z-1 rounded-2">
        <h5 className="mb-1 seconds fs-sm">{seconds}</h5>
        <span className="gshop-subtitle fs-xxs d-block">Seconds</span>
      </li>
    </>
  );
};

export default React.memo(OfferTimer);
