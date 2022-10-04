import { useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { foodByPlaceIdQuery } from "../components/Queries";
import "../components/Foods.css";
import { useContext } from "react";
import Context from "../Context/Context";

const Foods = () => {
  const { order, setOrder } = useContext(Context);

  const { id } = useParams();
  const [foods, setfoods] = useState();
  const data = useQuery(foodByPlaceIdQuery, {
    variables: {
      foodByPlaceId: id,
    },
  });
  useEffect(() => {
    setfoods(data.data?.foodByPlace);
  }, [data]);

  const addFood = (id, name, price, img) => {
    let newOrder = order;
    const existFood = order.find((o) => o.id === id);
    if (existFood) {
      existFood.count += 1;
    } else {
      newOrder.push({
        id,
        name,
        price,
        img,
        count: 1,
      });
    }
    setOrder(newOrder);
    localStorage.setItem("food_order", JSON.stringify(newOrder));
  };

  return (
    <ul className="d-flex mt-5">
      {foods?.map((p, i) => {
        return (
          <div key={p.id} className="main mx-3">
            <div className="box">
              <div className="faceOne" id="item_food">
                <img
                  src={p.img}
                  width={300}
                  height={400}
                  className="rounded-3 food_img"
                  alt=""
                />
              </div>
              <div className="faceTwo" id="item_food"></div>
              <div className="faceThree" id="item_food"></div>
              <div className="faceFour" id="item_food"></div>
              <div className="faceFive" id="item_food"></div>
              <div className="faceSix" id="item_food">
                <div className="rotateP">
                  <h3 className="w-100 text-success h2">{p.name}</h3>
                  <h4 className="w-100">
                    Price: <span className="text-danger">{p.price}</span>{" "}
                  </h4>
                  <button
                    className="w-100 btn btn-primary"
                    onClick={() => addFood(p.id, p.name, p.price, p.img)}
                  >
                    Add to korzinka
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </ul>
  );
};

export default Foods;
