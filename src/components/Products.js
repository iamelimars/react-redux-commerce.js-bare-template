import React, { useState, useEffect } from "react";
import { commerce } from "../lib/commerce";
import ProductCard from "./ProductCard";
import styled from "styled-components";
import Cart from "./Cart";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsActions } from "../actions/productActions";

const Products = () => {
  const { isLoading, products, error } = useSelector(
    (state) => state.allProducts
  );
  const dispatch = useDispatch();

  // const [products, setProducts] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [cart, setCart] = useState({});

  useEffect(() => {
    dispatch(fetchProductsActions());
    // fetchProducts();
    // fetchCart();
    return () => {};
  }, []);

  return (
    <>
      {isLoading && <h1>Loading</h1>}
      {error && <h1>Error Loading Products</h1>}
      <Container>
        {products.data &&
          products.data.map((product) => (
            <ProductCard
              key={`card-${product.id}`}
              // addToCart={handleAddToCart}
              product={product}
            />
          ))}
      </Container>
      {/* {products && } */}
      {/* <Cart
        handleUpdateCartQty={handleUpdateCartQty}
        handleRemoveFromCart={handleRemoveFromCart}
        handleEmptyCart={handleEmptyCart}
        cart={cart}
      />
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <Container>
          {products &&
            products.map((product) => (
              <ProductCard
                key={`card-${product.id}`}
                addToCart={handleAddToCart}
                product={product}
              />
            ))}
        </Container>
      )} */}
    </>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Products;
