"use client"
import React from "react";
import { Select } from "@windmill/react-ui";

const SelectRole = ({ setRole, register, name, label }) => {
  return (
    <>
      <Select
        className="w-full rounded-lg bg-white bg-opacity-5 border border-gray-400 px-4 py-3 focus:ring-0 outline-none"
        onChange={(e) => setRole(e.target.value)}
        name={name}
        {...register(`${name}`, {
          required: `${label} is required!`,
        })}
      >
        <option value="" defaultValue hidden>
          Staff role
        </option>
        <option value="Admin">Admin</option>
        <option value="CEO">CEO</option>
        <option value="Manager">Manager</option>
        <option value="Accountant">Accountant</option>
        <option value="Driver"> Driver </option>
        <option value="Security Guard">Security Guard</option>
        <option value="Deliver Person">Delivery Person</option>
      </Select>
    </>
  );
};

export default SelectRole;
