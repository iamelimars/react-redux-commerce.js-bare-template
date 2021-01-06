import React, { useEffect, useState } from "react";
import Products from "../components/Products";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "../containers/checkout";
import { useDispatch } from "react-redux";
import { handleFetchCart } from "../actions/cartActions";
import Cart from "../components/Cart";
import Nav from "../components/Nav";
import Confirmation from "./confirmation";
import Login from "./login";
import Dashboard from "./dashboard";
import Product from "./product";
import Order from "./order";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleFetchCart());
    return () => {};
  }, []);

  return (
    <>
      <Router>
        <Nav />
        <Cart />
        <Switch>
          <Route path="/order/:orderId">
            <Order />
          </Route>
          <Route path="/product/:permalink">
            <Product />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/confirmation">
            <Confirmation />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route exact path="/">
            <Products />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
