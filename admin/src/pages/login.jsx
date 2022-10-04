import React, { useContext } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Context from "../Context/Context";
import { useMutation } from "@apollo/client";

import "../components/login.css";
import { loginQuery } from "../components/Queries";

const Login = () => {
  const callback = useContext(Context);
  const { login, setLogin } = callback;
  const [password, setPassword] = useState();
  const [name, setname] = useState();

  const [token] = useMutation(loginQuery, {
    update: (cache, data) => {
      setLogin(data.data.token);
      localStorage.setItem("token", JSON.stringify(data.data.token));
    },
  });

  function handlPassword(e) {
    e.preventDefault();
    token({
      variables: {
        name,
        password,
      },
    });
  }

  return (
    <>
      {!login ? (
        <>
          <div className="body">
            <div id="shape"></div>

            <form
              action="/login"
              method="POST"
              id="login_form"
              className="login-div"
              onSubmit={handlPassword}
            >
              <div className="logo">
                <img src="OIP.jpg" alt="" />
              </div>
              <div className="title_login">Admin</div>
              <div className="sub-title">...</div>
              <div className="fields">
                <div className="username">
                  <i className="fas fa-user"></i>
                  <input
                    name="username"
                    type="username"
                    className="user-input"
                    placeholder="username"
                    autoComplete="off"
                    onChange={(e) => setname(e.target.value)}
                  />
                </div>
                <div className="password">
                  <i className="fas fa-lock"></i>

                  <input
                    name="password"
                    type="password"
                    className="pass-input"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="signin-button text-center d-flex justify-content-center align-items-center"
                >
                  <p className="">login</p>
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <>
          <Navigate to={"/admin"}></Navigate>
        </>
      )}
    </>
  );
};

export default Login;
