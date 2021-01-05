import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { handleAddToCart } from "../actions/cartActions";
import VariantSelector from "./VariantSelector";

const Product = ({ product }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const {
    id,
    name,
    assets,
    price: { raw: base },
    description,
    related_products,
    variants,
  } = product;
  const regEx = /(<([^>]+)>)/gi;
  console.log(product);

  useEffect(() => {
    setDefaultOptions();
  }, []);

  const calculatePrice = () => {
    if (!selectedOptions || typeof selectedOptions !== "object") {
      return base;
    }

    const options = Object.entries(selectedOptions);
    return (
      base +
      options.reduce((acc, [variant, option]) => {
        const variantDetail = variants.find(
          (candidate) => candidate.id === variant
        );
        if (!variantDetail) {
          return acc;
        }
        const optionDetail = variantDetail.options.find(
          (candidate) => candidate.id === option
        );
        if (!optionDetail) {
          return acc;
        }

        return acc + optionDetail.price.raw;
      }, 0)
    );
  };

  const setDefaultOptions = () => {
    setSelectedOptions({
      ...variants.reduce(
        (acc, variant) => ({
          ...acc,
          [variant.id]: variant.options[0].id,
        }),
        {}
      ),
    });
  };
  return (
    <div>
      {product && (
        <div>
          <h1>{name}</h1>
          <p>{(description || "").replace(regEx, "")}</p>
          {variants && (
            <VariantSelector
              className="mb-3"
              variants={variants}
              setSelectedOptions={setSelectedOptions}
              selectedOptions={selectedOptions}
            />
          )}
          <div>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
            <span>{quantity}</span>
            <button
              disabled={quantity === 1 && true}
              onClick={() => setQuantity(quantity - 1)}
            >
              -
            </button>
            <button
              onClick={() =>
                dispatch(handleAddToCart(id, quantity, selectedOptions))
              }
            >
              Add To Cart
            </button>

            <span className="border-left border-color-white pl-3">
              ${calculatePrice()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
