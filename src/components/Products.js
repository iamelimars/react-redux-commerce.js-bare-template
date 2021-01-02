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

  // const handleEmptyCart = () => {
  //   commerce.cart
  //     .empty()
  //     .then((resp) => {
  //       setCart(resp.cart);
  //     })
  //     .catch((error) => {
  //       console.error("There was an error emptying the cart", error);
  //     });
  // };

  // const handleRemoveFromCart = (lineItemId) => {
  //   commerce.cart
  //     .remove(lineItemId)
  //     .then((resp) => {
  //       setCart(resp.cart);
  //     })
  //     .catch((error) => {
  //       console.error(
  //         "There was an error removing the item from the cart",
  //         error
  //       );
  //     });
  // };

  // const handleUpdateCartQty = (lineItemId, quantity) => {
  //   commerce.cart
  //     .update(lineItemId, { quantity })
  //     .then((resp) => {
  //       setCart(resp.cart);
  //     })
  //     .catch((error) => {
  //       console.log("There was an error updating the cart items", error);
  //     });
  // };

  // const handleAddToCart = (productId, quantity) => {
  //   commerce.cart
  //     .add(productId, quantity)
  //     .then((item) => {
  //       console.log(item);

  //       setCart(item.cart);
  //     })
  //     .catch((error) => {
  //       console.error("There was an error adding the item to the cart", error);
  //     });
  // };

  // const fetchCart = () => {
  //   commerce.cart
  //     .retrieve()
  //     .then((cartData) => {
  //       console.log(cartData);

  //       setCart(cartData);
  //     })
  //     .catch((error) => {
  //       console.error("There was an error fetching the cart", error);
  //     });
  // };

  // const fetchProducts = () => {
  //   setIsLoading(true);
  //   commerce.products
  //     .list()
  //     .then((allProducts) => {
  //       setProducts(allProducts.data);
  //     })
  //     .then(() => {
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log("There was an error fetching the products", error);
  //       setIsLoading(false);
  //     });
  // };

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
