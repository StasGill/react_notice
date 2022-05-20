import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  currentListDrawerAction,
  editDrawerAction,
  setCurrentList,
} from "../../../actions/user";
import { DotsIcon } from "../../../assets/DotsIcon";
import "./styles.scss";

export const ListItem = ({ title, color, item, id }) => {
  const { currentList } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isActive = currentList?._id === id;
  const isActiveClass = isActive ? "active-list" : "";

  const handleClick = () => {
    dispatch(editDrawerAction());
    dispatch(setCurrentList(item));
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
      <button onClick={handleClick}>
        <DotsIcon />
      </button>
    </div>
  );
};
