import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";
import { getList } from "../../actions/user";
import { AddDrawer } from "./Drawer/AddDrawer";
import { ListItem } from "./ListItem/ListItem";
import { EditDrawer } from "./Drawer/EditDrawer";
import { TaskSection } from "./TaskSection/TaskSection";
import { Navigate } from "react-router-dom";

export const Home = () => {
  const { lists, currentList } = useSelector((state) => state.user);
  const [user] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getList());
  }, [dispatch]);

  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return (
    <div className="container">
      <div className="home">
        <div className="home_left">
          {lists?.map((item) => (
            <ListItem
              title={item.title}
              color={item.color}
              key={item._id}
              item={item}
            />
          ))}
        </div>
        <TaskSection currentList={currentList?._id ? currentList : lists[0]} />
      </div>
      <AddDrawer />
      <EditDrawer />
    </div>
  );
};
