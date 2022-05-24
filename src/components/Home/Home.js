import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getList, setCurrentList, addShareList } from "../../actions/user";
import { AddDrawer } from "./Drawer/AddDrawer";
import { ListItem } from "./ListItem/ListItem";
import { EditDrawer } from "./Drawer/EditDrawer";
import { TaskSection } from "./TaskSection/TaskSection";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CurrentTaskDrawer } from "./Drawer/CurrentTaskDrawer";
import { useWindowSize } from "../../helpers/useWindowSize";
import { ShareDrawer } from "./Drawer/ShareDrawer";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { SET_ERROR } from "../../constants/constants";
import "./styles.scss";

export const Home = () => {
  const { lists, currentList, shareId } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.auth);
  const [user] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const currentIdList = searchParams.get("list");
  const size = useWindowSize();
  const navigate = useNavigate();
  const isMobile = size.width < 700;
  const currentLis = lists?.find((item) => item._id === currentIdList);

  const resetError = () => {
    dispatch({ type: SET_ERROR, error: "" });
  };

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    dispatch(getList(navigate));
  }, [dispatch, user, navigate]);

  useEffect(() => {
    dispatch(setCurrentList(currentLis));
  }, [dispatch, currentIdList, currentLis]);

  useEffect(() => {
    const name = JSON.parse(localStorage.getItem("profile"));
    const userName = name?.user.name;
    if (shareId) dispatch(addShareList(shareId, userName));
  }, [dispatch, shareId]);

  return (
    <div className="container">
      <div className="home">
        <div className="home_left">
          {lists.length === 0 && (
            <h2 className="center_text">
              You don't have a lists. Press + button to add your'e first list.
            </h2>
          )}
          {lists?.map((item, index) => (
            <ListItem
              title={item.title}
              color={item.color}
              key={item._id + index}
              item={item}
              id={item._id}
            />
          ))}
        </div>
        <TaskSection
          currentList={currentList?._id ? currentList : lists[0]}
          styles="desktop"
          userName={user?.user.name}
        />
      </div>
      {isMobile && (
        <CurrentTaskDrawer
          currentList={currentList?._id ? currentList : lists[0]}
        />
      )}
      <AddDrawer />
      <EditDrawer />
      <ShareDrawer />
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={resetError}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert onClose={resetError} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};
