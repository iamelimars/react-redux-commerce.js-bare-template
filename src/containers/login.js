import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  handleLoginCustomer,
  handleGetToken,
  handleSetCustomer,
} from "../actions/authActions";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const query = useQuery();

  useEffect(() => {
    //Get the token from the route
    const token = query.get("token");
    if (!token) return;

    dispatch(handleGetToken(token)).then(() => {
      history.replace("/dashboard");
      // dispatch(handleSetCustomer().then(() => history.replace("/dashboard")));
    });

    //check auth. Redirect to dashboard if already authenticated
    //getToken. If succeed, redirect to Dashboard
    //If fail, send message that link expired, try again
    return () => {};
  }, []);

  const loginCustomer = () => {
    setMessage("");

    // if (!token) {
    //   return;
    // }
    dispatch(
      handleLoginCustomer(
        email,
        `${window.location.origin}/login?token={token}`
      )
    ).then((status) => {
      if (status.success === true) {
        setMessage("Email was sent!!");
      }
    });
    //Submit: after submit, send message to check email.
    //Email will only be sent if the user has created an order before
  };

  return (
    <div>
      <h1>Login</h1>
      <p>Email will be sent if you have made an order on this site before.</p>
      <input onChange={(e) => setEmail(e.target.value)} type="text" />
      <button onClick={() => loginCustomer()}>Submit</button>
      {message && <h1>{message}</h1>}
    </div>
  );
};

export default Login;
