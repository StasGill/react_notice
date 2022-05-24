import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  currentListDrawerAction,
  editDrawerAction,
  setCurrentList,
  shareDrawerAction,
} from "../../../actions/user";
import { DotsIcon } from "../../../assets/DotsIcon";
import { EditIcon } from "../../../assets/EditIcon";
import { ShareIcon } from "../../../assets/ShareIcon";
import "./styles.scss";

export const ListItem = ({ title, color, item, id }) => {
  const { currentList } = useSelector((state) => state.user);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isActive = currentList?._id === id;
  const isActiveClass = isActive ? "active-list" : "";

  const handleClick = () => {
    dispatch(editDrawerAction());
    dispatch(setCurrentList(item));
  };

  const handleShare = () => {
    dispatch(shareDrawerAction());
  };

  const openList = () => {
    dispatch(currentListDrawerAction());
    // dispatch(setCurrentList(item));
    navigate({
      pathname: "/",
      search: `?list=${id}`,
    });
  };

  return (
    <div
      className={`list-item ${isActiveClass}`}
      style={{ background: `${color}70` }}
    >
      <p onClick={openList}>{title}</p>
      <div className="task_item_container">
        {show && (
          <>
            <button onClick={handleClick}>
              <EditIcon />
            </button>
            <button onClick={handleShare}>
              <ShareIcon />
            </button>
          </>
        )}
        <button onClick={() => setShow(!show)} className="dots-icon ">
          <DotsIcon />
        </button>
      </div>
    </div>
  );
};
