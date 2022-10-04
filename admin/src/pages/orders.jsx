import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Context from "../Context/Context";
import { useQuery } from "@apollo/client";
import { OrdersQuery } from "../components/Queries";
import { useState } from "react";
import { useEffect } from "react";

const Orders = () => {
  const callback = useContext(Context);
  const { login } = callback;

  const [order, setOrder] = useState();

  const data = useQuery(OrdersQuery);

  useEffect(() => {
    setOrder(data?.data?.orders);
  }, [data]);

  return (
    <div className="w-100">
      {login ? (
        <div className="w-100 d-flex flex-column">
          <table className="w-100 border border-3 border-dark p-5 mt-5">
            <thead>
              <tr className="w-100 border border-3 border-success">
                <th>No</th>
                <th>Food</th>
                <th>Price</th>
                <th>Count</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Adress</th>
              </tr>
            </thead>
            <tbody>
              {order?.map((o, i) => {
                return (
                  <tr
                    key={i}
                    className="w-100 border border-3 border-success p-3"
                  >
                    <td>{i + 1}</td>
                    <td>
                      {o.foodId?.map((f, i) => {
                        return <tr key={i}>{f.name}</tr>;
                      })}
                    </td>
                    <td>
                      {o.foodId?.map((f, i) => {
                        return <tr key={i}>{f.price}</tr>;
                      })}
                    </td>
                    <td>
                      {o.counts?.map((c, i) => {
                        return <tr key={i}>{c}</tr>;
                      })}
                    </td>
                    <td>{o.name}</td>
                    <td>{o.phone}</td>
                    <td>{o.adress}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <>
          <Navigate to={"/"}></Navigate>
        </>
      )}
    </div>
  );
};

export default Orders;
