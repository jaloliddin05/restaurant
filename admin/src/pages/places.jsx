import { useQuery, useMutation } from "@apollo/client";
import React from "react";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  CategoriesQuery,
  PlacesQuery,
  updatePlacesQuery,
  deletePlacesQuery,
  addPlacesQuery,
} from "../components/Queries";
import Context from "../Context/Context";

const Places = () => {
  const callback = useContext(Context);
  const { login } = callback;
  const [category, setCategory] = useState();
  const [place, setPlace] = useState();

  const [placeName, setplaceName] = useState();
  const [placeImg, setplaceImg] = useState();
  const [placeId, setplaceId] = useState();
  const [categoryId, setcategoryId] = useState();

  const categoryData = useQuery(CategoriesQuery);
  const placeData = useQuery(PlacesQuery);

  useEffect(() => {
    setCategory(categoryData.data?.category);
  }, [categoryData]);

  useEffect(() => {
    setPlace(placeData.data?.places);
  }, [placeData]);

  const [deletePlace] = useMutation(deletePlacesQuery, {
    update: (cache, data) => {
      setPlace(data.data.deletePlace);
    },
  });

  const [updatePlace] = useMutation(updatePlacesQuery, {
    update: (cache, data) => {
      setPlace(data.data.updatePlace);
    },
  });

  const [addPlace] = useMutation(addPlacesQuery, {
    update: (cache, data) => {
      setPlace(data.data.addPlace);
    },
  });

  //..................................
  const DeletePlace = (id) => {
    deletePlace({
      variables: {
        deletePlaceId: id,
      },
    });
  };

  const AddPlace = () => {
    addPlace({
      variables: {
        name: placeName,
        img: placeImg,
        categoryId: categoryId,
      },
    });
  };

  const UpdatePlace = () => {
    updatePlace({
      variables: {
        name: placeName,
        img: placeImg,
        categoryId: categoryId,
        updatePlaceId: placeId,
      },
    });
  };

  const fillModal = ({ img, name, id, category_id }) => {
    setcategoryId(category_id);
    setplaceImg(img);
    setplaceName(name);
    setplaceId(id);
  };

  return (
    <>
      {login ? (
        <>
          <div className="container position-relative">
            <h1 className="text-primary h2 mt-3 mb-3">Places</h1>
            {category?.map((c, i) => {
              return (
                <div key={c.id}>
                  <h2 className="text-success">{c.name}</h2>
                  <ul className="h2 text-danger d-flex flex-wrap list-unstyled">
                    {place
                      ?.filter((p) => p.categoryId.id === c.id)
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
                            <div className="w-100 d-flex justify-content-center align-items-center">
                              <button
                                className="btn btn-info w-50 text-center h4 mx-1"
                                data-bs-toggle="modal"
                                data-bs-target={
                                  "#" + e.name.split(" ").join("")
                                }
                                onClick={() =>
                                  fillModal({
                                    img: e.img,
                                    name: e.name,
                                    id: e.id,
                                    category_id: c.id,
                                  })
                                }
                              >
                                Update
                              </button>
                              <button
                                className="btn btn-info w-50 text-center h4 mx-1"
                                onClick={() => DeletePlace(e.id)}
                              >
                                Delete
                              </button>
                            </div>
                            <div
                              className="modal fade"
                              id={e.name.split(" ").join("")}
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
                                      Update Place
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
                                          setplaceImg(e.target.value)
                                        }
                                      />
                                      <input
                                        className="w-75 text-success h4 mt-2"
                                        placeholder={"enter name"}
                                        onChange={(e) =>
                                          setplaceName(e.target.value)
                                        }
                                      />
                                      <select
                                        className="w-75 text-secondary h5"
                                        onChange={(e) =>
                                          setcategoryId(e.target.value)
                                        }
                                      >
                                        <option value={categoryId}>
                                          Choose Category
                                        </option>
                                        {category?.map((c, i) => {
                                          return (
                                            <option key={i} value={c.id}>
                                              {c.name}
                                            </option>
                                          );
                                        })}
                                      </select>
                                    </div>
                                    <div className="mx-2 w-50 p-2 bg-light border border-2 border-dark list-unstyled d-flex flex-column justify-content-center align-items-center">
                                      <img
                                        src={placeImg}
                                        width={150}
                                        height={150}
                                        alt=""
                                        className="border border-2 border-dark"
                                      />
                                      <h3 className="w-75 text-success h4 mt-2">
                                        {placeName}
                                      </h3>
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
                                      onClick={() => UpdatePlace()}
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
                      Add Place
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
                        onChange={(e) => setplaceImg(e.target.value)}
                      />
                      <input
                        className="w-75 text-success h4 mt-2"
                        placeholder={"enter name"}
                        required
                        onChange={(e) => setplaceName(e.target.value)}
                      />
                      <select
                        className="w-75 text-secondary h5"
                        required
                        onChange={(e) => setcategoryId(e.target.value)}
                      >
                        <option value={categoryId}>Choose category</option>
                        {category?.map((c, i) => {
                          return (
                            <option key={i} value={c.id}>
                              {c.name}
                            </option>
                          );
                        })}
                      </select>
                    </li>
                    <li className="mx-2 w-50 p-2 bg-light border border-2 border-dark list-unstyled d-flex flex-column justify-content-center align-items-center">
                      <img
                        src={placeImg}
                        width={150}
                        height={150}
                        alt=""
                        className="border border-2 border-dark"
                      />
                      <h3 className="w-75 text-success h4 mt-2">{placeName}</h3>
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
                      onClick={() => AddPlace()}
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

export default Places;
