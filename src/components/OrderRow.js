import React from "react";
import { Link } from "react-router-dom";

const OrderRow = ({ order }) => {
  console.log(order);
  return (
    <div>
      <Link to={`order/${order.id}`}>
        <a>#{order.customer_reference}</a>
      </Link>
    </div>
  );
};

export default OrderRow;
