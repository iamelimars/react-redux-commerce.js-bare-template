import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleGenerateCheckoutToken,
  handleFetchShippingOptions,
  handleSetShippingCountry,
  handleFetchSubdivisions,
  handleSetShippingSubdivision,
  handleSetShippingOption,
  handleCaptureCheckout,
} from "../actions/checkoutActions";
import { useHistory } from "react-router-dom";

const Checkout = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    shippingCountries,
    shippingCountry,
    shippingSubdivisions,
    shippingSubdivision,
    shippingOptions,
    shippingOption,
    checkoutToken,
  } = useSelector((state) => state.checkoutData);

  const [formData, setFormData] = useState({
    // Customer details
    firstName: "Jane",
    lastName: "Doe",
    email: "janedoe@email.com",
    // Shipping details
    shippingName: "Jane Doe",
    shippingStreet: "123 Fake St",
    shippingCity: "San Francisco",
    shippingStateProvince: "CA",
    shippingPostalZipCode: "94107",
    shippingCountry: "US",
    // Payment details
    cardNum: "4242 4242 4242 4242",
    expMonth: "11",
    expYear: "2023",
    ccv: "123",
    billingPostalZipcode: "94107",
    // Shipping and fulfillment data
    // shippingCountries: {},
    // shippingSubdivisions: {},
    // shippingOptions: [],
    // shippingOption: "",
  });

  const captureCheckout = (e) => {
    // e.stopPropagation();
    // e.nativeEvent.stopImmediatePropagation();
    // e.preventDefault();
    const orderData = {
      line_items: checkoutToken.live.line_items,
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      },
      shipping: {
        name: formData.shippingName,
        street: formData.shippingStreet,
        town_city: formData.shippingCity,
        county_state: shippingSubdivision,
        postal_zip_code: formData.shippingPostalZipCode,
        country: shippingCountry,
      },
      fulfillment: {
        shipping_method: shippingOption,
      },
      payment: {
        gateway: "test_gateway",
        card: {
          number: formData.cardNum,
          expiry_month: formData.expMonth,
          expiry_year: formData.expYear,
          cvc: formData.ccv,
          postal_zip_code: formData.billingPostalZipcode,
        },
      },
    };
    console.log(orderData);

    dispatch(handleCaptureCheckout(orderData)).then((res) => {
      console.log("Order Confirmed");
      console.log("Success", res);
      if (res.success === true) {
        history.push("/confirmation");
      } else {
        console.log("Failed to submit your order");
      }
    });
  };

  useEffect(() => {
    dispatch(handleGenerateCheckoutToken());
  }, []);

  // useEffect(() => {
  //   console.log("Shipping Country Changed");
  //   fetchShippingOptions(checkoutToken.id, formData.shippingCountry);
  // }, [formData.shippingCountry]);

  const handleFormChanges = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>Checkout</h1>
      <form>
        <h4>Customer information</h4>

        <label htmlFor="firstName">First name</label>
        <input
          type="text"
          defaultValue={formData.firstName}
          onChange={handleFormChanges}
          name="firstName"
          placeholder="Enter your first name"
          required
        />

        <label htmlFor="lastName">Last name</label>
        <input
          type="text"
          defaultValue={formData.lastName}
          onChange={handleFormChanges}
          name="lastName"
          placeholder="Enter your last name"
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          defaultValue={formData.email}
          onChange={handleFormChanges}
          name="email"
          placeholder="Enter your email"
          required
        />

        <h4>Shipping details</h4>

        <label htmlFor="shippingName">Full name</label>
        <input
          type="text"
          defaultValue={formData.shippingName}
          name="shippingName"
          placeholder="Enter your shipping full name"
          required
          onChange={handleFormChanges}
        />

        <label htmlFor="shippingStreet">Street address</label>
        <input
          type="text"
          defaultValue={formData.shippingStreet}
          name="shippingStreet"
          placeholder="Enter your street address"
          required
          onChange={handleFormChanges}
        />

        <label htmlFor="shippingCity">City</label>
        <input
          type="text"
          defaultValue={formData.shippingCity}
          name="shippingCity"
          placeholder="Enter your city"
          required
          onChange={handleFormChanges}
        />

        <label htmlFor="shippingPostalZipCode">Postal/Zip code</label>
        <input
          type="text"
          defaultValue={formData.shippingPostalZipCode}
          name="shippingPostalZipCode"
          placeholder="Enter your postal/zip code"
          required
          onChange={handleFormChanges}
        />

        <label htmlFor="shippingCountry">Country</label>
        <select
          name="shippingCountry"
          onChange={(event) => {
            dispatch(handleFetchSubdivisions(event.target.value));
            dispatch(handleSetShippingCountry(event.target.value));
          }}
        >
          <option selected="true" disabled>
            Country
          </option>
          {Object.keys(shippingCountries).map((index) => {
            return (
              <option value={index} key={index}>
                {shippingCountries[index]}
              </option>
            );
          })}
          ;
        </select>

        <label htmlFor="shippingStateProvince">State/province</label>
        <select
          name="shippingStateProvince"
          onChange={(event) => {
            dispatch(handleFetchShippingOptions(event.target.value));
            dispatch(handleSetShippingSubdivision(event.target.value));
          }}
        >
          <option className="checkout__option" selected="true" disabled>
            State/province
          </option>
          {Object.keys(shippingSubdivisions).map((index) => {
            return (
              <option value={index} key={index}>
                {shippingSubdivisions[index]}
              </option>
            );
          })}
          ;
        </select>

        <label htmlFor="shippingOption">Shipping method</label>
        <select
          name="shippingOption"
          onChange={(event) =>
            dispatch(handleSetShippingOption(event.target.value))
          }
        >
          <option selected="true" disabled>
            Select a shipping method
          </option>
          {shippingOptions.map((method, index) => {
            return (
              <option
                value={method.id}
                key={index}
              >{`${method.description} - $${method.price.formatted_with_code}`}</option>
            );
          })}
          ;
        </select>

        <h4>Payment information</h4>

        <label htmlFor="cardNum">Credit card number</label>
        <input
          type="text"
          name="cardNum"
          defaultValue={formData.cardNum}
          placeholder="Enter your card number"
          onChange={handleFormChanges}
        />

        <label htmlFor="expMonth">Expiry month</label>
        <input
          type="text"
          name="expMonth"
          defaultValue={formData.expMonth}
          placeholder="Card expiry month"
          onChange={handleFormChanges}
        />

        <label htmlFor="expYear">Expiry year</label>
        <input
          type="text"
          name="expYear"
          defaultValue={formData.expYear}
          placeholder="Card expiry year"
          onChange={handleFormChanges}
        />

        <label htmlFor="ccv">CCV</label>
        <input
          type="text"
          name="ccv"
          defaultValue={formData.ccv}
          placeholder="CCV (3 digits)"
          onChange={handleFormChanges}
        />

        <label htmlFor="billingPostalZipcode">Billing Postal/Zip Code</label>
        <input
          type="text"
          name="billingPostalZipcode"
          defaultValue={formData.billingPostalZipcode}
          placeholder="Postal/Zip Code"
          onChange={handleFormChanges}
        />
      </form>
      <button onClick={() => captureCheckout()}>Confirm order</button>
    </div>
  );
};

export default Checkout;
