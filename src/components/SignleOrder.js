import React from "react";

const SingleOrder = ({ order }) => {
  const { shipping } = order;
  const renderFullfillmentStatus = (status) => {
    switch (status) {
      case "fulfilled":
        return <span>fulfilled</span>;
      case "not_fulfilled":
        return <span>Processing</span>;
      default:
        return <span>Processing</span>;
    }
  };
  const renderPaymentStatus = (status) => {
    switch (status) {
      case "not-paid":
        return <span>Not Paid</span>;
      case "paid":
        return <span>Paid</span>;
      case "refunded":
        return <span>Refunded</span>;
      default:
        return <span>Pending</span>;
    }
  };

  return (
    <div>
      <h1>{order.id}</h1>
      {renderFullfillmentStatus(order.status_fulfillment)}
      {renderPaymentStatus(order.status_payment)}
      <div>
        <div>{shipping.name}</div>
        <div>{shipping.street}</div>
        <div>
          {shipping.town_city}
          {shipping.town_city && shipping.county_state ? "," : ""}{" "}
          {shipping.county_state}
        </div>
        <div>
          {shipping.country}
          {shipping.country && shipping.postal_zip_code ? "," : ""}{" "}
          {shipping.postal_zip_code}
        </div>
      </div>
      {order.order.line_items.map((item) => (
        <div key={item.id}>
          {item.media && <img width="60px" src={item.media.source} />}
          <h3>{item.name}</h3>
          <h4>{item.price.formatted_with_symbol}</h4>
          <h5>Quantity: {item.quantity}</h5>
        </div>
      ))}
    </div>
  );
};

export default SingleOrder;
