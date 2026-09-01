"use client";

import { useState } from "react";

const PasswordInput = ({
  register,
  name = "password",
  placeholder = "Password",
  error,
  onFocus,
}) => {
  const [show, setShow] = useState(false);
  const toggleVisibility = () => setShow((current) => !current);

  return (
    <>
      <div className="check-password position-relative">
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          className="theme-input"
          onFocus={onFocus}
          {...register(name, { required: "Password is required" })}
        />
        <span
          className="eye"
          role="button"
          tabIndex={0}
          aria-label={show ? "Hide password" : "Show password"}
          onClick={toggleVisibility}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              toggleVisibility();
            }
          }}
        >
          <i className={show ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
        </span>
      </div>
      {error && (
        <p className="text-danger">
          {typeof error === "string" ? error : error.message}
        </p>
      )}
    </>
  );
};

export default PasswordInput;
