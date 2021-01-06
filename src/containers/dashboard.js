import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { commerce } from "../lib/commerce";
import { handleGetOrders } from "../actions/authActions";
import Orders from "../components/Orders";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();
  const { customer } = useSelector((state) => state.auth);
  //check auth. Redirect to login if not authenticated. Send message that link is expired
  useEffect(() => {
    if (!commerce.customer.isLoggedIn()) {
      history.push("/login");
    }
    setIsLoading(false);
    dispatch(handleGetOrders());
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>Loading</h1>
        </div>
      ) : (
        <>
          <h1>Dashboard</h1>
          <h3>Welcome back, {customer.email}</h3>
          <Orders />
        </>
      )}
    </div>
  );
};

export default Dashboard;
