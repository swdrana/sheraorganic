import React from "react";

const ActiveButton = ({ tapValue, activeValue, handleProductTap }) => {
  return (
    <span
      className={`inline-block px-4 py-2 text-base cursor-pointer ${
        tapValue === activeValue &&
        "text-emerald-600 border-emerald-600 dark:text-emerald-500 dark:border-emerald-500 rounded-t-lg border-b-2 cursor-pointer"
      } focus:outline-none`}
      aria-current="page"
      onClick={() => handleProductTap(activeValue, false, tapValue)}
    >
      {activeValue}
    </span>
  );
};

export default ActiveButton;
