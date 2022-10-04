import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Context from "../Context/Context";

const Admin = () => {
  const callback = useContext(Context);
  const { login, SetActiveLink } = callback;
  SetActiveLink("admin");

  return (
    <>
      {login ? (
        <>
          <h1 className="p-5 m-5">Welcome Admin </h1>
        </>
      ) : (
        <>
          <Navigate to={"/"}></Navigate>
        </>
      )}
    </>
  );
};

export default Admin;
