import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";

export const Home = () => {
  const [user] = useState(JSON.parse(localStorage.getItem("profile")));
  const history = useNavigate();

  useEffect(() => {
    !user && history("/auth");
  }, [history, user]);
  return (
    <div className="container">
      <div className="home">
        <h1>Homeeee</h1>
      </div>
    </div>
  );
};
