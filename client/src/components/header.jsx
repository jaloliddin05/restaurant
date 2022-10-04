import React from "react";
import { Link } from "react-router-dom";
import korzinkaImg from "../images/korzinka.svg";

const Header = () => {
  return (
    <div className=" bg-danger p-3 d-flex justify-content-between align-items-center">
      <Link to={"/"} className="text-warning h2 text-decoration-none">
        Foods
      </Link>
      <Link to={"/korzinka"} className="text-decoration-none text-white h4">
        <img src={korzinkaImg} alt="" width={40} height={40} /> Korzinka
      </Link>
    </div>
  );
};

export default Header;
