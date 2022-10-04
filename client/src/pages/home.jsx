import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import "../components/Home.css";
import { useState, useEffect } from "react";
import { CategoriesQuery } from "../components/Queries";
import { Link } from "react-router-dom";

const Home = () => {
  const [category, setCategory] = useState();

  const data = useQuery(CategoriesQuery);

  useEffect(() => {
    setCategory(data?.data?.category);
  }, [data]);

  return (
    <ul className="container_home">
      {category?.map((c, i) => {
        return (
          <Link
            to={`/places/${c.id}`}
            key={c.id}
            className="panel_home active"
            style={{
              backgroundImage: `url(${c.img})`,
            }}
          >
            <h3>{c.name}</h3>
          </Link>
        );
      })}
    </ul>
  );
};

export default Home;
