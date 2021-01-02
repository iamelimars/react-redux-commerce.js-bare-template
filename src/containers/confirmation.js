import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Confirmation = () => {
  const { order } = useSelector((state) => state.checkoutData);
  console.log(order);

  return (
    <div className="confirmation">
      {order.customer && (
        <div className="confirmation__wrapper">
          <div className="confirmation__wrapper-message">
            <h4>
              Thank you for your purchase, {order.customer.firstname}{" "}
              {order.customer.lastname}!
            </h4>
            <p className="confirmation__wrapper-reference">
              <span>Order ref:</span> {order.customer_reference}
            </p>
          </div>
          <Link className="confirmation__wrapper-back" type="button" to="/">
            <span>Back to home</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Confirmation;
