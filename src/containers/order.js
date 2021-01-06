import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleOrder from "../components/SignleOrder";
import { commerce } from "../lib/commerce";

const Order = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrderById(orderId);
  }, [orderId]);

  const fetchOrderById = async (id) => {
    setLoading(true);
    try {
      const { data } = await commerce.customer.getOrder(id);
      setOrder(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Order</h1>
      {loading && <h1>Loading</h1>}
      {error && <h1>Error loading order</h1>}
      {order && <SingleOrder order={order} />}
    </div>
  );
};

export default Order;
