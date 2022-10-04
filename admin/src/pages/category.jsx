import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import Context from "../Context/Context";
import {
  CategoriesQuery,
  updateCategoriesQuery,
  deleteCategoryQuery,
  addCategoryQuery,
} from "../components/Queries";
import { useEffect } from "react";

const Category = () => {
  const callback = useContext(Context);
  const { login } = callback;

  const [categoryName, setcategoryName] = useState();
  const [categoryImg, setcategoryImg] = useState();
  const [categoryId, setcategoryId] = useState();
  const [datas, setDatas] = useState();

  const data = useQuery(CategoriesQuery);

  useEffect(() => {
    setDatas(data.data?.category);
  }, [data]);

  const [addCategory] = useMutation(addCategoryQuery, {
    update: (cache, data) => {
      setDatas(data.data.addCategory);
    },
  });

  const [deleteCategory] = useMutation(deleteCategoryQuery, {
    update: (cache, data) => {
      setDatas(data.data.deleteCategory);
    },
  });

  const [updateCategory] = useMutation(updateCategoriesQuery, {
    update: (cache, data) => {
      setDatas(data.data.updateCategory);
    },
  });

  const AddCategory = () => {
    addCategory({
      variables: {
        name: categoryName,
        img: categoryImg,
      },
    });
  };

  const UpdateCategory = () => {
    updateCategory({
      variables: {
        name: categoryName,
        img: categoryImg,
        updateCategoryId: categoryId,
      },
    });
  };

  const DeleteCategory = (id) => {
    deleteCategory({
      variables: {
        deleteCategoryId: id,
      },
    });
  };

  const fillModal = ({ img, name, id }) => {
    setcategoryId(id);
    setcategoryImg(img);
    setcategoryName(name);
  };

  return (
    <>
      {login ? (
        <>
          <div className="container position-relative">
            <h1 className="text-primary h2 mt-3 mb-3">Category</h1>
            <ul className="h2 text-danger d-flex flex-wrap list-unstyled">
              {datas?.map((e, i) => {
                return (
                  <li
                    key={i}
                    className="mx-2 mb-3 p-1 bg-warning border border-2 border-dark"
                  >
                    <img
                      src={e.img}
                      width={200}
                      height={200}
                      alt=""
                      className="border border-2 border-dark"
                    />
                    <h3 className="text-success h4 mt-2">{e.name}</h3>
                    <div className="w-100 d-flex justify-content-center align-items-center">
                      <button
                        className="btn btn-info w-50 text-center h4 mx-1"
                        data-bs-toggle="modal"
                        data-bs-target={"#" + e.name.split(" ").join("")}
                        onClick={() =>
                          fillModal({ img: e.img, name: e.name, id: e.id })
                        }
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-info w-50 text-center h4 mx-1"
                        onClick={() => DeleteCategory(e.id)}
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
                              Update Category
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
                                onChange={(e) => setcategoryImg(e.target.value)}
                              />
                              <input
                                className="w-75 text-success h4 mt-2"
                                placeholder={"enter name"}
                                onChange={(e) =>
                                  setcategoryName(e.target.value)
                                }
                              />
                            </div>
                            <div className="mx-2 w-50 p-2 bg-light border border-2 border-dark list-unstyled d-flex flex-column justify-content-center align-items-center">
                              <img
                                src={categoryImg}
                                width={150}
                                height={150}
                                alt=""
                                className="border border-2 border-dark"
                              />
                              <h3 className="w-75 text-success h4 mt-2">
                                {categoryName}
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
                              onClick={() => UpdateCategory()}
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
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Add Category
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
                        onChange={(e) => setcategoryImg(e.target.value)}
                      />
                      <input
                        className="w-75 text-success h4 mt-2"
                        placeholder={"enter name"}
                        onChange={(e) => setcategoryName(e.target.value)}
                      />
                    </li>
                    <li className="mx-2 w-50 p-2 bg-light border border-2 border-dark list-unstyled d-flex flex-column justify-content-center align-items-center">
                      <img
                        src={categoryImg}
                        width={150}
                        height={150}
                        alt=""
                        className="border border-2 border-dark"
                      />
                      <h3 className="w-75 text-success h4 mt-2">
                        {categoryName}
                      </h3>
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
                      type="button"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                      onClick={() => AddCategory()}
                    >
                      ADD
                    </button>
                  </div>
                </div>
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

export default Category;
