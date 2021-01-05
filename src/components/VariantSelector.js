import React from "react";

const VariantSelector = ({ variants, selectedOptions, setSelectedOptions }) => (
  <div>
    {variants &&
      variants.map((variant) => (
        <div key={variant.id}>
          <span>{variant.name}</span>
          {variant.options.map((option) => (
            <span
              key={option.id}
              onClick={() =>
                setSelectedOptions({
                  ...selectedOptions,
                  [variant.id]: option.id,
                })
              }
              className={`mr-3 cursor-pointer ${
                selectedOptions[variant.id] &&
                selectedOptions[variant.id] === option.id
                  ? "text-decoration-underline"
                  : "text-decoration-none"
              }`}
            >
              {option.name}
            </span>
          ))}
        </div>
      ))}
  </div>
);

export default VariantSelector;
