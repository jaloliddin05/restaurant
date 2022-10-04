import { useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PlacesByCategoryIdQuery } from "../components/Queries";
import "../components/Place.css";

const Places = () => {
  const { id } = useParams();
  const [place, setPlace] = useState();
  const data = useQuery(PlacesByCategoryIdQuery, {
    variables: {
      placesByCategoryId: id,
    },
  });

  useEffect(() => {
    setPlace(data.data?.placesByCategory);
  }, [data]);

  return (
    <ul className="d-flex mt-5">
      {place?.map((p, i) => {
        return (
          <div key={p.id} className="card_place mx-3">
            <img src={p.img} width={300} height={400} alt="" />
            <div className="">
              <h2 className="btn btn-warning text-dark">{p.name}</h2>
              <Link
                to={`/foods/${p.id}`}
                className="text-decoration-none h3 text-dark _next_ btn btn-info border border-4 border-info"
              >
                <span className="h3">Find Foods</span>
              </Link>
            </div>
          </div>
        );
      })}
    </ul>
  );
};

export default Places;
