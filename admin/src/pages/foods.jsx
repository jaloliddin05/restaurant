import { useQuery, useMutation } from "@apollo/client";
import React from "react";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  PlacesQuery,
  updateFoodQuery,
  addFoodQuery,
  foodsQuery,
  deleteFoodQuery,
} from "../components/Queries";
import Context from "../Context/Context";

const Food = () => {
  const callback = useContext(Context);
  const { login } = callback;
  const [place, setPlace] = useState();
  const [food, setfood] = useState();

  const [foodName, setfoodName] = useState();
  const [foodImg, setfoodImg] = useState();
  const [foodId, setfoodId] = useState();
  const [placeId, setplaceId] = useState();
  const [foodPrice, setfoodPrice] = useState();

  const placeData = useQuery(PlacesQuery);
  const foodData = useQuery(foodsQuery);

  useEffect(() => {
    setPlace(placeData.data?.places);
  }, [placeData]);

  useEffect(() => {
    setfood(foodData.data?.foods);
  }, [foodData]);

  const [deleteFood] = useMutation(deleteFoodQuery, {
    update: (cache, data) => {
      setfood(data.data.deleteFood);
    },
  });

  const [updateFood] = useMutation(updateFoodQuery, {
    update: (cache, data) => {
      setfood(data.data.updateFood);
    },
  });

  const [addFood] = useMutation(addFoodQuery, {
    update: (cache, data) => {
      setfood(data.data.addFood);
    },
  });

  //..................................
  const DeleteFood = (id) => {
    deleteFood({
      variables: {
        deleteFoodId: id,
      },
    });
  };

  const AddFood = () => {
    addFood({
      variables: {
        name: foodName,
        img: foodImg,
        placeId: placeId,
        price: foodPrice,
      },
    });
  };

  const UpdateFood = () => {
    updateFood({
      variables: {
        name: foodName,
        img: foodImg,
        placeId: placeId,
        price: foodPrice,
        updateFoodId: foodId,
      },
    });
  };

  const fillModal = ({ img, name, id, place_id, price }) => {
    setplaceId(place_id);
    setfoodImg(img);
    setfoodName(name);
    setfoodId(id);
    setfoodPrice(price);
  };

  return (
    <>
      {login ? (
        <>
          <div className="container position-relative">
            <h1 className="text-primary h2 mt-3 mb-3">Foods</h1>
            {place?.map((p, i) => {
              return (
                <div key={p.id}>
                  {food?.filter((f) => f.placeId.id === p.id).length ? (
                    <h2 className="text-success">
                      {p.name}   
                      <span className="h5 text-secondary">(...place)</span>
                    </h2>
                  ) : (
                    ""
                  )}

                  <ul className="h2 text-danger d-flex flex-wrap list-unstyled">
                    {food
                      ?.filter((f) => f.placeId.id === p.id)
                      .map((e, j) => {
                        return (
                          <li
                            key={e.id}
                            className="mx-2 mb-3 p-1 bg-warning border border-2 border-dark"
                          >
                            <img
                              src={e.img}
                              width={250}
                              height={250}
                              alt=""
                              className="border border-2 border-dark"
                            />
                            <h3 className="text-success h4 mt-2">{e.name}</h3>
                            <h4 className="text-danger h5 mt-2">{e.price}</h4>
                            <div className="w-100 d-flex justify-content-center align-items-center">
                              <button
                                className="btn btn-info w-50 text-center h4 mx-1"
                                data-bs-toggle="modal"
                                data-bs-target={
                                  "#" +
                                  e.name.split(" ").join("").replaceAll("'", "")
                                }
                                onClick={() =>
                                  fillModal({
                                    img: e.img,
                                    name: e.name,
                                    id: e.id,
                                    category_id: p.id,
                                    price: e.price,
                                  })
                                }
                              >
                                Update
                              </button>
                              <button
                                className="btn btn-info w-50 text-center h4 mx-1"
                                onClick={() => DeleteFood(e.id)}
                              >
                                Delete
                              </button>
                            </div>
                            <div
                              className="modal fade"
                              id={e.name
                                .split(" ")
                                .join("")
                                .replaceAll("'", "")}
                              data-bs-backdrop="static"
                              data-bs-keyboard="false"
                              tabIndex="-1"
                              aria-labelledby="staticBackdropLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="staticBackdropLabel"
                                    >
                                      Update Food
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    ></button>
                                  </div>
                                  <div className="modal-body d-flex">
                                    <div className="w-50 mx-2 p-1 bg-warning border border-2 border-dark list-unstyled d-flex flex-column justify-content-center align-items-center">
                                      <input
                                        className="w-75 text-success h4 mt-2"
                                        placeholder={"enter img"}
                                        onChange={(e) =>
                                          setfoodImg(e.target.value)
                                        }
                                      />
                                      <input
                                        className="w-75 text-success h4 mt-2"
                                        placeholder={"enter name"}
                                        onChange={(e) =>
                                          setfoodName(e.target.value)
                                        }
                                      />
                                      <input
                                        className="w-75 text-success h4 mt-2"
                                        placeholder={"enter price"}
                                        onChange={(e) =>
                                          setfoodPrice(e.target.value)
                                        }
                                      />
                                      <select
                                        className="w-75 text-secondary h5"
                                        onChange={(e) =>
                                          setplaceId(e.target.value)
                                        }
                                      >
                                        <option value={placeId}>
                                          Choose place
                                        </option>
                                        {place?.map((p, i) => {
                                          return (
                                            <option key={i} value={p.id}>
                                              {p.name}
                                            </option>
                                          );
                                        })}
                                      </select>
                                    </div>
                                    <div className="mx-2 w-50 p-2 bg-light border border-2 border-dark list-unstyled d-flex flex-column justify-content-center align-items-center">
                                      <img
                                        src={foodImg}
                                        width={150}
                                        height={150}
                                        alt=""
                                        className="border border-2 border-dark"
                                      />
                                      <h3 className="w-75 text-success h4 mt-2">
                                        {foodName}
                                      </h3>
                                      <h4 className="w-75 text-success h4 mt-2">
                                        {foodPrice}
                                      </h4>
                                    </div>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-secondary"
                                      data-bs-dismiss="modal"
                                    >
                                      Close
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-primary"
                                      onClick={() => UpdateFood()}
                                      data-bs-dismiss="modal"
                                    >
                                      Update
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              );
            })}
            <button
              className="position-absolute top-0 end-0 h5 text-warning p-0 btn btn-primary w-25"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <p className="p-1 h4"> Add</p>
            </button>

            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <form className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Add Food
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body d-flex">
                    <li className="w-50 mx-2 p-1 bg-warning border border-2 border-dark list-unstyled d-flex flex-column justify-content-center align-items-center">
                      <input
                        className="w-75 text-success h4 mt-2"
                        placeholder={"enter img"}
                        required
                        onChange={(e) => setfoodImg(e.target.value)}
                      />
                      <input
                        className="w-75 text-success h4 mt-2"
                        placeholder={"enter name"}
                        required
                        onChange={(e) => setfoodName(e.target.value)}
                      />
                      <input
                        className="w-75 text-success h4 mt-2"
                        placeholder={"enter price"}
                        onChange={(e) => setfoodPrice(e.target.value)}
                      />
                      <select
                        className="w-75 text-secondary h5"
                        required
                        onChange={(e) => setplaceId(e.target.value)}
                      >
                        <option value={placeId}>Choose place</option>
                        {place?.map((p, i) => {
                          return (
                            <option key={i} value={p.id}>
                              {p.name}
                            </option>
                          );
                        })}
                      </select>
                    </li>
                    <li className="mx-2 w-50 p-2 bg-light border border-2 border-dark list-unstyled d-flex flex-column justify-content-center align-items-center">
                      <img
                        src={foodImg}
                        width={150}
                        height={150}
                        alt=""
                        className="border border-2 border-dark"
                      />
                      <h3 className="w-75 text-success h4 mt-2">{foodName}</h3>
                      <h4 className="w-75 text-success h4 mt-2">{foodPrice}</h4>
                    </li>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                      onClick={() => AddFood()}
                    >
                      ADD
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <Navigate to={"/"}></Navigate>
        </>
      )}
    </>
  );
};

export default Food;
