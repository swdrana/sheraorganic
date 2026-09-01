"use client";

import { useState } from "react";

const StarRatingInput = ({ value = 0, onChange, size = 24 }) => {
  const [hover, setHover] = useState(0);
  const active = hover || Number(value) || 0;

  return (
    <div className="d-flex gap-1" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          className="border-0 bg-transparent p-0"
          onMouseEnter={() => setHover(rating)}
          onMouseLeave={() => setHover(0)}
          onFocus={() => setHover(rating)}
          onBlur={() => setHover(0)}
          onClick={() => onChange(rating)}
          role="radio"
          aria-checked={Number(value) === rating}
          aria-label={`${rating} star${rating > 1 ? "s" : ""}`}
        >
          <i
            className="fa-solid fa-star"
            style={{ color: rating <= active ? "#f5b301" : "#d7d7d7", fontSize: size }}
          ></i>
        </button>
      ))}
    </div>
  );
};

export default StarRatingInput;
