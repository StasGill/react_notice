import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  currentListDrawerAction,
  editDrawerAction,
  setCurrentList,
} from "../../../actions/user";
import { DotsIcon } from "../../../assets/DotsIcon";
import "./styles.scss";

export const ListItem = ({ title, color, item, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(editDrawerAction());
    dispatch(setCurrentList(item));
  };

  const openList = () => {
    dispatch(currentListDrawerAction());
    dispatch(setCurrentList(item));
    navigate({
      pathname: "/",
      search: `?list=${id}`,
    });
  };

  return (
    <div
      className="list-item"
      style={{ background: `${color}70` }}
      onClick={openList}
    >
      <p>{title}</p>
      <button onClick={handleClick}>
        <DotsIcon />
      </button>
    </div>
  );
};
