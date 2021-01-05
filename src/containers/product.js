import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { commerce } from "../lib/commerce";
import Product from "../components/Product";

const ProductPage = () => {
  const { permalink } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (permalink) {
      setIsLoading(true);
      commerce.products
        .retrieve(permalink, { type: "permalink" })
        .then((data) => {
          setProduct(data);
        })
        .then(() => setIsLoading(false))
        .catch((err) => {
          setError("Could not find your product");
          setIsLoading(false);
        });
    }
  }, [permalink]);

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    return (
      <div>
        <h1>{error}</h1>
      </div>
    );
  }

  return <div>{product && <Product product={product} />}</div>;
};

export default ProductPage;
