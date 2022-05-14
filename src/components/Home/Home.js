import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";
import { getList } from "../../actions/user";
import { AddDrawer } from "./Drawer/AddDrawer";
import { ListItem } from "./ListItem/ListItem";
import { EditDrawer } from "./Drawer/EditDrawer";

export const Home = () => {
  const [user] = useState(JSON.parse(localStorage.getItem("profile")));

  const { lists } = useSelector((state) => state.user);
  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    !user && history("/auth");
    dispatch(getList());
  }, [history, dispatch, user]);

  return (
    <div className="container">
      <div className="home">
        <div className="home_left">
          {lists.map((item) => (
            <ListItem
              title={item.title}
              color={item.color}
              key={item._id}
              item={item}
            />
          ))}
        </div>
        <div className="home_right"> </div>
      </div>
      <AddDrawer />
      <EditDrawer />
    </div>
  );
};
