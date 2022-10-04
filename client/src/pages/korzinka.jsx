import { useMutation } from "@apollo/client";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import KorzinkaItem from "../components/korzinka_item";
import { addOrderQuery } from "../components/Queries";
import Context from "../Context/Context";

const Korzinka = () => {
  const { order, setOrder } = useContext(Context);

  const [name, setName] = useState();
  const [phone, setphone] = useState();
  const [adress, setadress] = useState();

  const [addOrder] = useMutation(addOrderQuery, {
    update: (cache, data) => {
      console.log(data.data.addOrder);
      localStorage.setItem("food_order", JSON.stringify([]));
      window.location.replace("/");
    },
  });

  const orderFoods = (e) => {
    e.preventDefault();
    const foodsIDAll = [];
    const counts = [];
    const ordersLast = JSON.parse(localStorage.getItem("food_order"));
    for (let i = 0; i < ordersLast.length; i++) {
      foodsIDAll.push(ordersLast[i].id);
      counts.push(ordersLast[i].count);
    }
    addOrder({
      variables: {
        name: name,
        phone: phone,
        adress: adress,
        foodId: foodsIDAll,
        counts: counts,
      },
    });
  };

  return (
    <div className="d-flex justify-content-between mt-5 p-5">
      <ul className="list-unstyled w-50 d-flex flex-wrap">
        {order?.map((o, i) => {
          return (
            <KorzinkaItem
              key={o.id}
              karzinka={{
                id: o.id,
                name: o.name,
                img: o.img,
                count: o.count,
                price: o.price,
                order,
                setOrder,
              }}
            />
          );
        })}
      </ul>
      <form className="mx-5 w-50" onSubmit={orderFoods}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control p-4 fs-3"
            placeholder="Enter Name..."
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group mb-3 ">
          <input
            type="tel"
            className="form-control p-4 fs-3"
            placeholder="phone number..."
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e) => setphone(e.target.value)}
            required
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control p-4 fs-3"
            placeholder="Adress..."
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e) => setadress(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-outline-primary w-100 p-3 fs-3">
          Order
        </button>
      </form>
    </div>
  );
};

export default Korzinka;
