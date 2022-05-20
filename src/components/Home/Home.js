import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";
import { getList, setCurrentList } from "../../actions/user";
import { AddDrawer } from "./Drawer/AddDrawer";
import { ListItem } from "./ListItem/ListItem";
import { EditDrawer } from "./Drawer/EditDrawer";
import { TaskSection } from "./TaskSection/TaskSection";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CurrentTaskDrawer } from "./Drawer/CurrentTaskDrawer";
import { useWindowSize } from "../../helpers/useWindowSize";

export const Home = () => {
  const { lists, currentList } = useSelector((state) => state.user);
  const [user] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const currentIdList = searchParams.get("list");
  const size = useWindowSize();
  const navigate = useNavigate();
  const isMobile = size.width < 700;
  const currentLis = lists?.find((item) => item._id === currentIdList);

  useEffect(() => {
    if (!user) navigate("/auth");
    dispatch(getList(navigate));
  }, [dispatch, user, navigate]);

  useEffect(() => {
    dispatch(setCurrentList(currentLis));
  }, [dispatch, currentIdList, currentLis]);

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
              id={item._id}
            />
          ))}
        </div>
        <TaskSection
          currentList={currentList?._id ? currentList : lists[0]}
          styles="desktop"
        />
      </div>
      {isMobile && (
        <CurrentTaskDrawer
          currentList={currentList?._id ? currentList : lists[0]}
        />
      )}
      <AddDrawer />
      <EditDrawer />
    </div>
  );
};
