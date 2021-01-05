import React from "react";
import styled from "styled-components";
import { handleAddToCart } from "../actions/cartActions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Product = ({
  product,
  // addToCart
}) => {
  const dispatch = useDispatch();
  const { assets, media, name, price, id, permalink } = product;
  return (
    <Card>
      <img src={media.source} alt="" width="200px" />
      <Link to={`/product/${permalink}`}>
        <h1>{name}</h1>
      </Link>
      <h2>{price.formatted_with_symbol}</h2>
    </Card>
  );
};

const Card = styled.div`
  box-shadow: 0px 12px 21px -13px rgba(50, 50, 50, 0.36);
  padding: 1rem;
  border-radius: 1rem;
`;

export default Product;
