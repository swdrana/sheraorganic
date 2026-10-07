"use client";
import React from "react";
import { MultiSelect } from "react-multi-select-component";

const AttributeOptionTwo = ({
  attributes,
  values,
  setValues,
}) => {
  const attributeOptions = (attributes?.variants || []).map((variant) => ({
    ...variant,
    label: variant?.name,
    value: variant?._id,
  }));
  const selectedIds = values?.[attributes?._id] || [];
  const selected = attributeOptions.filter((option) =>
    selectedIds.includes(option._id)
  );

  const handleSelectValue = (items) => {
    setValues((currentValues) => {
      const nextValues = { ...currentValues };
      if (items.length === 0) {
        delete nextValues[attributes._id];
      } else {
        nextValues[attributes._id] = items.map((item) => item._id);
      }
      return nextValues;
    });
  };

  return (
    <div>
      <MultiSelect
        options={attributeOptions}
        value={selected}
        onChange={(v) => handleSelectValue(v)}
        labelledBy="Select"
      />
    </div>
  );
};

export default AttributeOptionTwo;
