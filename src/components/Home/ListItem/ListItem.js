import { useDispatch } from "react-redux";
import { editDrawerAction, setCurrentList } from "../../../actions/user";
import { DotsIcon } from "../../../assets/DotsIcon";
import "./styles.scss";

export const ListItem = ({ title, color, item }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(editDrawerAction());
    dispatch(setCurrentList(item));
  };

  const openList = () => {
    dispatch(setCurrentList(item));
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
