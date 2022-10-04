import React, { useEffect } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import Context from "../Context/Context";

const Sidebar = () => {
  const callback = useContext(Context);
  const { login, setLogin, activeLink, SetActiveLink } = callback;

  useEffect(() => {
    if (window.location.href === "http://localhost:3000/admin") {
      SetActiveLink("admin");
    } else if (window.location.href === "http://localhost:3000/category") {
      SetActiveLink("category");
    } else if (window.location.href === "http://localhost:3000/places") {
      SetActiveLink("places");
    } else if (window.location.href === "http://localhost:3000/foods") {
      SetActiveLink("foods");
    } else if (window.location.href === "http://localhost:3000/orders") {
      SetActiveLink("orders");
    } else if (window.location.href === "http://localhost:3000/") {
      SetActiveLink("sign_out");
    } else if (window.location.href === "http://localhost:3000/admin?") {
      SetActiveLink("admin");
    } else if (window.location.href === "http://localhost:3000/category?") {
      SetActiveLink("category");
    } else if (window.location.href === "http://localhost:3000/places?") {
      SetActiveLink("places");
    } else if (window.location.href === "http://localhost:3000/foods?") {
      SetActiveLink("foods");
    } else if (window.location.href === "http://localhost:3000/orders?") {
      SetActiveLink("orders");
    } else if (window.location.href === "http://localhost:3001/admin") {
      SetActiveLink("admin");
    } else if (window.location.href === "http://localhost:3001/category") {
      SetActiveLink("category");
    } else if (window.location.href === "http://localhost:3001/places") {
      SetActiveLink("places");
    } else if (window.location.href === "http://localhost:3001/foods") {
      SetActiveLink("foods");
    } else if (window.location.href === "http://localhost:3001/orders") {
      SetActiveLink("orders");
    } else if (window.location.href === "http://localhost:3001/") {
      SetActiveLink("sign_out");
    } else if (window.location.href === "http://localhost:3001/admin?") {
      SetActiveLink("admin");
    } else if (window.location.href === "http://localhost:3001/category?") {
      SetActiveLink("category");
    } else if (window.location.href === "http://localhost:3001/places?") {
      SetActiveLink("places");
    } else if (window.location.href === "http://localhost:3001/foods?") {
      SetActiveLink("foods");
    } else if (window.location.href === "http://localhost:3001/orders?") {
      SetActiveLink("orders");
    }
  });

  function SignOut() {
    localStorage.removeItem("token");
    setLogin(false);
  }

  return (
    <>
      {login ? (
        <>
          <div className="navigation">
            <ul className="ul-list">
              <li
                className={activeLink === "admin" ? "lists active" : "lists"}
                onClick={() => SetActiveLink("admin")}
              >
                <Link
                  to={"/admin"}
                  className={activeLink === "admin" ? "nav_link__" : "nav_link"}
                >
                  <span className="icon">
                    <ion-icon name="home-outline"></ion-icon>
                  </span>
                  <span className="title">Admin</span>
                </Link>
              </li>
              <li
                className={activeLink === "category" ? "lists active" : "lists"}
                onClick={() => SetActiveLink("category")}
              >
                <Link
                  to={"/category"}
                  className={
                    activeLink === "category" ? "nav_link__" : "nav_link"
                  }
                >
                  <span className="icon">
                    <ion-icon name="logo-buffer"></ion-icon>
                  </span>
                  <span className="title">Category</span>
                </Link>
              </li>
              <li
                className={activeLink === "places" ? "lists active" : "lists"}
                onClick={() => SetActiveLink("places")}
              >
                <Link
                  to={"/places"}
                  className={
                    activeLink === "places" ? "nav_link__" : "nav_link"
                  }
                >
                  <span className="icon">
                    <ion-icon name="color-filter"></ion-icon>
                  </span>
                  <span className="title">Places</span>
                </Link>
              </li>
              <li
                className={activeLink === "foods" ? "lists active" : "lists"}
                onClick={() => SetActiveLink("foods")}
              >
                <Link
                  to={"/foods"}
                  className={activeLink === "foods" ? "nav_link__" : "nav_link"}
                >
                  <span className="icon">
                    <ion-icon name="logo-codepen"></ion-icon>
                  </span>
                  <span className="title">Foods</span>
                </Link>
              </li>
              <li
                className={activeLink === "orders" ? "lists active" : "lists"}
                onClick={() => SetActiveLink("orders")}
              >
                <Link
                  to={"/orders"}
                  className={
                    activeLink === "orders" ? "nav_link__" : "nav_link"
                  }
                >
                  <span className="icon">
                    <ion-icon name="logo-codepen"></ion-icon>
                  </span>
                  <span className="title">Orders</span>
                </Link>
              </li>
              <li
                className={activeLink === "sign_out" ? "lists active" : "lists"}
                onClick={() => SetActiveLink("sign_out")}
              >
                <Link
                  to={"/"}
                  className={
                    activeLink === "sign_out" ? "nav_link__" : "nav_link"
                  }
                  onClick={() => SignOut()}
                >
                  <span className="icon">
                    <ion-icon name="log-out-outline"></ion-icon>
                  </span>
                  <span className="title">Sign Out</span>
                </Link>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Sidebar;
