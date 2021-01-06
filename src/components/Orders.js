import React from "react";
import { useSelector } from "react-redux";
import OrderRow from "./OrderRow";

const Orders = () => {
  const { orders, isOrdersLoading } = useSelector((state) => state.auth);
  return (
    <div>
      <h1>Orders</h1>
      {isOrdersLoading ? (
        <h1>Loading </h1>
      ) : (
        <>
          {orders.data &&
            orders.data.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}

          {!orders ||
            (orders.length && (
              <div className="card text-center p-2">
                <p>You haven't placed any orders yet!</p>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Orders;
