import React, { useState } from "react";

const KorzinkaItem = ({ karzinka: o }) => {
  const [count, setCount] = useState(o.count);
  const Incr = (id) => {
    setCount(count + 1);
    const a = o.order.find((p) => p.id === o.id);
    a.count = count + 1;
    o.setOrder(o.order);
    localStorage.setItem("food_order", JSON.stringify(o.order));
  };
  const Decr = () => {
    setCount(count - 1);
    const a = o.order.find((p) => p.id === o.id);

    a.count = count - 1;
    if (a.count === 0) {
      const index = o.order.findIndex((p) => p.id === o.id);
      o.order.splice(index, 1);
      o.setOrder(o.order);
      localStorage.setItem("food_order", JSON.stringify(o.order));
    } else {
      o.setOrder(o.order);
      localStorage.setItem("food_order", JSON.stringify(o.order));
    }
  };

  return (
    <li
      key={o.id}
      className={
        count ? "p-2 bg-light mb-2 mx-2 border border-3 border-dark" : "d-none"
      }
    >
      <img src={o.img} alt="" width={210} height={280} className="" />
      <div className="w-100">
        <h3 className="text-success">{o.name}</h3>
        <h4 className="">
          Price: <span className="text-danger">{o.price}</span>
        </h4>
        <div className="d-flex align-items-center justify-content-between w-100 mt-3">
          <button className="btn btn-danger w-25" onClick={() => Decr()}>
            -
          </button>
          <span className="h4">{count}</span>
          <button className="btn btn-success w-25" onClick={() => Incr()}>
            +
          </button>
        </div>
      </div>
    </li>
  );
};

export default KorzinkaItem;
