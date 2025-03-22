"use client"

import React from "react";

const FormError = ({ errors, errorName }) => {
  // console.log('errors in errors component',errors)
  if (!errors[errorName]) {
    return null;
  }
 
  return (
    <span className="text-red-600 text-sm mt-1">
      {errors[errorName].message || "This field is required"}
    </span>
  );
};

export default FormError;
